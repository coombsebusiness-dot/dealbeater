import { compareExactProductVariant } from "./exactProductMatcher";

export interface ShoppingOffer {
  title: string;
  retailer: string;
  price: number;
  link: string | null;
  rating: number | null;
  reviewCount: number | null;
  delivery: string | null;
  thumbnail: string | null;
}

interface SerpApiShoppingResult {
  title?: string;
  source?: string;
  price?: string;
  extracted_price?: number;
  product_link?: string;
  link?: string;
  rating?: number;
  reviews?: number;
  delivery?: string;
  thumbnail?: string;
}

interface SerpApiResponse {
  shopping_results?: SerpApiShoppingResult[];
  error?: string;
}

const ACCESSORY_TERMS = [
  "case",
  "cover",
  "screen protector",
  "protector",
  "tempered glass",
  "keyboard case",
  "keyboard cover",
  "folio",
  "sleeve",
  "skin",
  "stand",
  "holder",
  "mount",
  "dock",
  "cable",
  "adapter",
  "charger",
  "charging",
  "replacement",
  "strap",
  "bag",
  "stylus",
  "apple pencil",
  "pencil holder",
];

const USED_TERMS = [
  "refurbished",
  "renewed",
  "pre-owned",
  "pre owned",
  "second hand",
  "used",
  "open box",
  "grade a",
  "grade b",
  "grade c",
  "acceptable condition",
  "good condition",
];

const PAYMENT_PLAN_TERMS = [
  "per month",
  "monthly",
  "/month",
  "contract",
  "deposit",
  "finance from",
];

const IGNORED_WORDS = new Set([
  "the",
  "and",
  "with",
  "for",
  "from",
  "new",
  "latest",
  "wifi",
  "wi-fi",
  "inch",
  "inches",
  "generation",
  "gen",
]);

export async function searchGoogleShopping(
  query: string
): Promise<ShoppingOffer[]> {
  const apiKey = process.env.SERPAPI_API_KEY;

  console.log(
    "🛒 GOOGLE SHOPPING SEARCH RUNNING:",
    query
  );

  if (!apiKey) {
    throw new Error(
      "SERPAPI_API_KEY is missing from .env.local."
    );
  }

  const cleanQuery = query.trim();

  if (!cleanQuery) {
    return [];
  }

  const params = new URLSearchParams({
    engine: "google_shopping",
    q: cleanQuery,
    api_key: apiKey,
    gl: "uk",
    hl: "en",
    location: "United Kingdom",
  });

  const response = await fetch(
    `https://serpapi.com/search.json?${params.toString()}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `SerpApi returned ${response.status} ${response.statusText}`
    );
  }

  const data =
    (await response.json()) as SerpApiResponse;

  if (data.error) {
    throw new Error(
      `SerpApi error: ${data.error}`
    );
  }

  const rawResults = data.shopping_results ?? [];

  console.log(
    `📦 Google Shopping returned ${rawResults.length} raw results for:`,
    cleanQuery
  );

  const textMatchedOffers = rawResults
    .map((result): ShoppingOffer | null => {
      const title =
        result.title?.trim() ?? "";

      if (!title) {
        return null;
      }

   const basicRejectionReason =
  getRejectionReason(cleanQuery, title);

const hardRejectionTerms = [
  "used",
  "refurbished",
  "renewed",
  "pre-owned",
  "preowned",
  "lease",
  "subscription",
  "monthly payment",
  "pay monthly",
  "contract",
  "parts only",
  "spares or repair",
];

const isHardRejection =
  basicRejectionReason &&
  hardRejectionTerms.some((term) =>
    basicRejectionReason
      .toLowerCase()
      .includes(term)
  );

if (isHardRejection) {
  console.log(
    `🚫 Hard rejected: ${title} — ${basicRejectionReason}`
  );

  return null;
}

if (basicRejectionReason === "appears to be an accessory") {
  console.log(
    `🚫 Rejected accessory: ${title}`
  );

  return null;
}

if (basicRejectionReason) {
  console.log(
    `⚠️ Possible mismatch, sending to variant matcher: ${title} — ${basicRejectionReason}`
  );
}

const exactMatch = compareExactProductVariant(
  cleanQuery,
  title
);

const minimumConfidence = 75;

if (
  !exactMatch.accepted &&
  exactMatch.confidence < minimumConfidence
) {
  console.log(
    `🚫 Variant rejected: ${title}`
  );

  console.log(
    "Reasons:",
    exactMatch.reasons.join(" | ")
  );

  console.log(
    "Confidence:",
    `${exactMatch.confidence}%`
  );

  return null;
}

console.log(
  `✅ Variant accepted: ${title} (${exactMatch.confidence}%)`
);

      const price =
        typeof result.extracted_price === "number"
          ? result.extracted_price
          : extractPrice(result.price);

      if (
        price === null ||
        !Number.isFinite(price) ||
        price <= 0
      ) {
        console.log(
          `🚫 Rejected: ${title} — invalid price`
        );

        return null;
      }

      return {
        title,
        retailer:
          result.source?.trim() ||
          "Unknown retailer",
        price,
        link:
          result.product_link ??
          result.link ??
          null,
        rating:
          typeof result.rating === "number"
            ? result.rating
            : null,
        reviewCount:
          typeof result.reviews === "number"
            ? result.reviews
            : null,
        delivery:
          result.delivery?.trim() || null,
        thumbnail:
          result.thumbnail?.trim() || null,
      };
    })
    .filter(
      (offer): offer is ShoppingOffer =>
        offer !== null
    );

  const cleanedOffers =
    removePriceOutliers(textMatchedOffers);

  console.log(
    `✅ Kept ${cleanedOffers.length} genuine matching offers`
  );

  cleanedOffers.forEach((offer) => {
    console.log(
      `💷 ${offer.retailer}: £${offer.price.toFixed(
        2
      )} — ${offer.title}`
    );
  });

  return cleanedOffers.sort(
    (a, b) => a.price - b.price
  );
}

function getRejectionReason(
  query: string,
  title: string
): string | null {
  const normalisedQuery = normaliseText(query);
  const normalisedTitle = normaliseText(title);

  if (
    containsAnyTerm(
      normalisedTitle,
      ACCESSORY_TERMS
    ) &&
    !containsAnyTerm(
      normalisedQuery,
      ACCESSORY_TERMS
    )
  ) {
    return "appears to be an accessory";
  }

  if (
    containsAnyTerm(
      normalisedTitle,
      USED_TERMS
    ) &&
    !containsAnyTerm(
      normalisedQuery,
      USED_TERMS
    )
  ) {
    return "used or refurbished listing";
  }

  if (
    containsAnyTerm(
      normalisedTitle,
      PAYMENT_PLAN_TERMS
    )
  ) {
    return "monthly payment or contract listing";
  }

  const queryTokens =
    extractImportantTokens(normalisedQuery);

  const titleTokens = new Set(
    extractImportantTokens(normalisedTitle)
  );

  if (queryTokens.length === 0) {
    return null;
  }

  const matchedTokens = queryTokens.filter(
    (token) => titleTokens.has(token)
  );

  const similarity =
    matchedTokens.length / queryTokens.length;

  const requiredTokens =
    extractRequiredProductTokens(queryTokens);

  const missingRequiredTokens =
    requiredTokens.filter(
      (token) => !titleTokens.has(token)
    );

  if (missingRequiredTokens.length > 0) {
    return `missing important detail: ${missingRequiredTokens.join(
      ", "
    )}`;
  }

  if (similarity < 0.55) {
    return `weak title match (${Math.round(
      similarity * 100
    )}%)`;
  }

  return null;
}

function extractImportantTokens(
  value: string
): string[] {
  return Array.from(
    new Set(
      value
        .split(/\s+/)
        .map(normaliseToken)
        .filter(Boolean)
        .filter(
          (token) =>
            token.length > 1 &&
            !IGNORED_WORDS.has(token)
        )
    )
  );
}

function extractRequiredProductTokens(
  tokens: string[]
): string[] {
  return tokens.filter((token) => {
    return (
      /^\d{4}$/.test(token) ||
      /^\d+(gb|tb)$/.test(token) ||
      /^\d+$/.test(token) ||
      isColour(token)
    );
  });
}

function isColour(value: string): boolean {
  return [
    "black",
    "white",
    "silver",
    "grey",
    "gray",
    "blue",
    "green",
    "red",
    "pink",
    "purple",
    "yellow",
    "gold",
    "orange",
    "beige",
  ].includes(value);
}

function removePriceOutliers(
  offers: ShoppingOffer[]
): ShoppingOffer[] {
  if (offers.length < 3) {
    return offers;
  }

  const sortedPrices = offers
    .map((offer) => offer.price)
    .sort((a, b) => a - b);

  const median = getMedian(sortedPrices);

  const minimumReasonablePrice =
    median * 0.5;

  const maximumReasonablePrice =
    median * 1.8;

  console.log(
    `📊 Market median: £${median.toFixed(2)}`
  );

  return offers.filter((offer) => {
    const isReasonable =
      offer.price >= minimumReasonablePrice &&
      offer.price <= maximumReasonablePrice;

    if (!isReasonable) {
      console.log(
        `🚫 Rejected price outlier: ${offer.title} at £${offer.price.toFixed(
          2
        )}`
      );
    }

    return isReasonable;
  });
}

function getMedian(
  sortedValues: number[]
): number {
  const middle = Math.floor(
    sortedValues.length / 2
  );

  if (sortedValues.length % 2 === 0) {
    return (
      (sortedValues[middle - 1] +
        sortedValues[middle]) /
      2
    );
  }

  return sortedValues[middle];
}

function containsAnyTerm(
  value: string,
  terms: string[]
): boolean {
  return terms.some((term) =>
    value.includes(normaliseText(term))
  );
}

function normaliseText(value: string): string {
  return value
    .toLowerCase()
    .replace(/(\d+)\s*(tb|gb)\b/g, "$1$2")
    .replace(/[“”"'’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normaliseToken(
  token: string
): string {
  if (token === "ipad") {
    return "ipad";
  }

  return token
    .replace(/^0+(\d)/, "$1")
    .trim();
}

function extractPrice(
  formattedPrice: string | undefined
): number | null {
  if (!formattedPrice) {
    return null;
  }

  const match = formattedPrice.match(
    /[\d,]+(?:\.\d{1,2})?/
  );

  if (!match) {
    return null;
  }

  const parsedPrice = Number(
    match[0].replace(/,/g, "")
  );

  return Number.isFinite(parsedPrice)
    ? parsedPrice
    : null;
}