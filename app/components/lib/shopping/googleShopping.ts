import { compareExactProductVariant } from "./exactProductMatcher";
import { findEbayAffiliateListing } from "@/app/components/lib/ebay";
import { getAffiliateLink } from "@/app/components/lib/affiliates/engine";
import { getMerchantByUrl } from "@/app/components/lib/affiliates/registry";

export interface ShoppingOffer {
  title: string;
  retailer: string;
  price: number;

  imageUrl: string | null;

  googleProductUrl: string | null;
  retailerUrl: string | null;
  affiliateUrl: string | null;
  finalUrl: string | null;

  rating: number | null;
  reviewCount: number | null;
  delivery: string | null;

  immersiveToken: string | null;
  description?: string | null;
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
  immersive_product_page_token?: string;
}

interface SerpApiResponse {
  shopping_results?: SerpApiShoppingResult[];
  error?: string;
}

interface ImmersiveStore {
  name?: string;
  link?: string;
  title?: string;
  price?: string;
  extracted_price?: number;
  rating?: number;
  reviews?: number;
  shipping?: string;
}

interface ImmersiveProductResponse {
  product_results?: {
    stores?: ImmersiveStore[];
  };
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
    "case",
  "cover",
  "protector",
  "tempered glass",
  "screen guard",
  "bumper",
  "wallet",
  "flip cover",
  "folio",
  "shockproof",
  "rugged",
  "armour",
  "armor",
  "silicone",
  "phone holder",
  "car mount",
  "replacement back",
  "protective shell",
  "hydrogel",
  "service",
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

const PHONE_QUERY_TERMS = [
  "iphone",
  "samsung galaxy",
  "galaxy s",
  "google pixel",
  "smartphone",
  "mobile phone",
  " phone",
];

const PHONE_ACCESSORY_TERMS = [
  "case",
  "cover",
  "protector",
  "tempered glass",
  "screen guard",
  "bumper",
  "wallet",
  "flip cover",
  "folio",
  "shockproof",
  "rugged",
  "armour",
  "armor",
  "silicone",
  "phone holder",
  "car mount",
  "replacement back",
  "protective shell",
  "hydrogel",
];

function looksLikePhoneQuery(text: string): boolean {
  const normalised = text.toLowerCase();

  return PHONE_QUERY_TERMS.some((term) =>
    normalised.includes(term)
  );
}

function looksLikePhoneAccessory(text: string): boolean {
  const normalised = text.toLowerCase();

  return PHONE_ACCESSORY_TERMS.some((term) =>
    normalised.includes(term)
  );
}
const phoneSearch = looksLikePhoneQuery(cleanQuery);
const phoneAccessory = looksLikePhoneAccessory(title);

// console.log("📱 PHONE FILTER:", {
//   cleanQuery,
//   title,
//   phoneSearch,
//   phoneAccessory,
// });

if (phoneSearch && phoneAccessory) {
  console.log(
    `🚫 Phone accessory rejected before matching: ${title}`
  );

  return null;
}

const exactMatch = compareExactProductVariant(
  cleanQuery,
  title
);

if (!exactMatch.accepted) {
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
// console.log("================================");
// console.log("TITLE:", result.title);
// console.log("PRODUCT LINK:", result.product_link);
// console.log("LINK:", result.link);
    const googleProductUrl =
  result.product_link ??
  result.link ??
  null;

return {
  title,

  retailer:
    result.source?.trim() ||
    "Unknown retailer",

  price,

  imageUrl:
    result.thumbnail?.trim() ||
    null,

  googleProductUrl,

  retailerUrl: null,
  affiliateUrl: null,

  // Temporary fallback until retailer enrichment succeeds.
  finalUrl: googleProductUrl,

  rating:
    typeof result.rating === "number"
      ? result.rating
      : null,

  reviewCount:
    typeof result.reviews === "number"
      ? result.reviews
      : null,

  delivery:
    result.delivery?.trim() ||
    null,

  immersiveToken:
    result.immersive_product_page_token ??
    null,
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

/**
 * Strict validation gate.
 *
 * Every Google Shopping offer must match the requested
 * product before it can be sorted, enriched or returned.
 */
const validatedOffers =
  cleanedOffers.filter((offer) => {
    const candidateText = [
      offer.title,
      offer.description,
    ]
      .filter(Boolean)
      .join(" ");

    const match =
      compareExactProductVariant(
        cleanQuery,
        candidateText
      );

    console.log(
      match.accepted
        ? "✅ GOOGLE OFFER ACCEPTED"
        : "🚫 GOOGLE OFFER REJECTED",
      {
        query: cleanQuery,
        title: offer.title,
        confidence: match.confidence,
        reasons: match.reasons,
      }
    );

    return match.accepted;
  });

console.info(
  "GOOGLE_PRE_ENRICHMENT_VALIDATION:",
  {
    candidates: cleanedOffers.length,
    accepted: validatedOffers.length,
    rejected:
      cleanedOffers.length -
      validatedOffers.length,
  }
);

const sortedOffers = [
  ...validatedOffers,
].sort(
  (a, b) =>
    a.price - b.price
);

// Only enrich verified offers most likely
// to be displayed.
const offersToEnrich =
  sortedOffers.slice(0, 5);

const enrichmentStartedAt =
  performance.now();

const enrichedResults =
  await Promise.all(
    offersToEnrich.map(
      async (offer) => {
        try {
          const directOffer =
            await enrichOfferWithDirectLink(
              offer,
              apiKey,
              cleanQuery
            );

          if (!directOffer) {
            return null;
          }

          const ebayOffer =
            await enrichEbayAffiliateLink(
              directOffer
            );

          console.info(
            "🟠 BEFORE:",
            directOffer.finalUrl
          );

          console.info(
            "🟢 AFTER :",
            ebayOffer.finalUrl
          );

          return ebayOffer;
        } catch (error) {
          console.error(
            "Offer enrichment failed:",
            error
          );

          return null;
        }
      }
    )
  );

console.info(
  `DIRECT_LINK_ENRICHMENT_TIME: ${Math.round(
    performance.now() -
      enrichmentStartedAt
  )}ms`
);

const enrichedOffers =
  enrichedResults.filter(
    (
      offer
    ): offer is ShoppingOffer =>
      offer !== null
  );

const remainingOffers =
  sortedOffers.slice(5);

const finalOffers = [
  ...enrichedOffers,
  ...remainingOffers,
].sort(
  (a, b) =>
    a.price - b.price
);

console.info(
  "GOOGLE_FINAL_VALIDATION:",
  {
    candidates: cleanedOffers.length,
    accepted: finalOffers.length,
    rejected:
      cleanedOffers.length -
      finalOffers.length,
  }
);

console.info(
  `GOOGLE_FINAL_OFFERS_COUNT: ${finalOffers.length}`
);

return finalOffers;
async function enrichOfferWithDirectLink(
  offer: ShoppingOffer,
  apiKey: string,
  originalQuery: string
): Promise<ShoppingOffer | null> {

  console.log("🔥 ENTERED enrichOfferWithDirectLink()", offer.title);

  if (!offer.immersiveToken) {
    console.log(`⚠️ No immersive token for: ${offer.title}`);

    const originalMatch =compareExactProductVariant(
  originalQuery,
  `${offer.title} ${offer.description ?? ""}`
)

    if (!originalMatch.accepted) {
      console.log(
        `❌ Removing unrelated original offer: ${offer.title}`
      );

      return null;
    }
console.log("➡️ About to apply affiliate link");
    return offer;
  }

  try {
    const params = new URLSearchParams({
      engine: "google_immersive_product",
      page_token: offer.immersiveToken,
      more_stores: "true",
      api_key: apiKey,
    });

    const response = await fetch(
      `https://serpapi.com/search.json?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.log(
        `⚠️ Immersive lookup failed for ${offer.title}:`,
        response.status
      );

      const originalMatch = compareExactProductVariant(
  originalQuery,
  `${offer.title} ${offer.description ?? ""}`
)

      return originalMatch.accepted ? offer : null;
    }

    const data =
      (await response.json()) as ImmersiveProductResponse;

    if (data.error) {
      console.log(
        `⚠️ Immersive API error for ${offer.title}:`,
        data.error
      );

      const originalMatch = compareExactProductVariant(
  originalQuery,
  `${offer.title} ${offer.description ?? ""}`
)

      return originalMatch.accepted ? offer : null;
    }

    const stores =
      data.product_results?.stores?.filter(
        (store) =>
          typeof store.link === "string" &&
          isDirectRetailerUrl(store.link)
      ) ?? [];
      console.log("================================");


stores.forEach((store, index) => {
  console.log(`STORE ${index + 1}`, {
    name: store.name,
    title: store.title,
    link: store.link,
  });
});
console.log("================================");

    if (stores.length === 0) {
      console.log(
        `⚠️ No direct retailer stores found for: ${offer.title}`
      );

      const originalMatch = compareExactProductVariant(
  originalQuery,
  `${offer.title} ${offer.description ?? ""}`
)

      return originalMatch.accepted ? offer : null;
    }

    console.log("ORIGINAL QUERY:", originalQuery);
console.log("================================");
console.log("🔍 CHECKING STORE MATCHES");
console.log("ORIGINAL QUERY:", originalQuery);
console.log("================================");
    const matchingStores = stores.filter((store) => {
      const storeTitle = store.title?.trim() ?? "";

      if (!storeTitle) {
        return false;
      }
      console.log("🏪 STORES FOUND:", stores.length);

stores.forEach((store, i) => {
  console.log(`Store ${i + 1}`, {
    name: store.name,
    title: store.title,
    link: store.link,
  });
});

      const match = compareExactProductVariant(
  originalQuery,
  storeTitle
);

console.log({
  title: storeTitle,
  accepted: match.accepted,
  reasons: match.reasons,
});

return match.accepted;
    });
console.log("================================");
console.log("✅ MATCHING STORES:", matchingStores.length);
console.log("================================");
    if (matchingStores.length === 0) {
      console.log(
        `❌ No exact product stores matched query "${originalQuery}" for ${offer.title}`
      );

      return null;
    }

  const selectedStore = findBestRetailerStore(
  offer,
  matchingStores
);
console.log("================================");
console.log("⭐ SELECTED STORE");
console.dir(selectedStore, { depth: null });
console.log("================================");

    if (!selectedStore?.link) {
      return null;
    }

    const directRetailerUrl = selectedStore.link;

    console.log(
      `🔗 Direct retailer link found: ${selectedStore.name} — ${directRetailerUrl}`
    );
const requestedSonyModel =
  extractSonyCameraIdentity(
    originalQuery
  );

const storeTitleSonyModel =
  extractSonyCameraIdentity(
    selectedStore.title
  );

const retailerUrlSonyModel =
  extractSonyCameraIdentity(
    directRetailerUrl
  );

console.log(
  "📷 RETAILER LINK MODEL CHECK",
  {
    originalQuery,
    requestedSonyModel,
    storeTitle:
      selectedStore.title,
    storeTitleSonyModel,
    directRetailerUrl,
    retailerUrlSonyModel,
  }
);

if (
  requestedSonyModel &&
  retailerUrlSonyModel &&
  requestedSonyModel !==
    retailerUrlSonyModel
) {
  console.log(
    "🚫 RETAILER LINK MODEL MISMATCH",
    {
      expected:
        requestedSonyModel,
      found:
        retailerUrlSonyModel,
      title:
        selectedStore.title,
      link:
        directRetailerUrl,
    }
  );

  return null;
}

if (
  requestedSonyModel &&
  storeTitleSonyModel &&
  requestedSonyModel !==
    storeTitleSonyModel
) {
  console.log(
    "🚫 RETAILER TITLE MODEL MISMATCH",
    {
      expected:
        requestedSonyModel,
      found:
        storeTitleSonyModel,
      title:
        selectedStore.title,
    }
  );

  return null;
}
const directOffer: ShoppingOffer = {
  ...offer,

  title:
    selectedStore.title?.trim() ||
    offer.title,

  retailer:
    selectedStore.name?.trim() ||
    offer.retailer,

  price:
    typeof selectedStore.extracted_price === "number"
      ? selectedStore.extracted_price
      : offer.price,

  retailerUrl: directRetailerUrl,

  // Use the retailer URL unless the affiliate engine
  // successfully replaces it below.
  finalUrl: directRetailerUrl,

  rating:
    typeof selectedStore.rating === "number"
      ? selectedStore.rating
      : offer.rating,

  reviewCount:
    typeof selectedStore.reviews === "number"
      ? selectedStore.reviews
      : offer.reviewCount,

  delivery:
    selectedStore.shipping?.trim() ||
    offer.delivery,
};

    const affiliateResult = await getAffiliateLink(
      directRetailerUrl,
      "blinlx-shopping"
    );

    console.log("🔗 AFFILIATE ENGINE RESULT:", {
      retailer: directOffer.retailer,
      network: affiliateResult.network,
      success: affiliateResult.success,
      originalUrl: directRetailerUrl,
      affiliateUrl: affiliateResult.affiliateUrl,
    });

  const affiliateUrl =
  affiliateResult.success &&
  affiliateResult.affiliateUrl
    ? affiliateResult.affiliateUrl
    : null;
console.log("================================");
console.log("🎉 RETURNING ENRICHED OFFER");

console.dir(
  {
    retailer: directOffer.retailer,
    retailerUrl: directRetailerUrl,
    affiliateUrl,
    finalUrl:
      affiliateUrl ??
      directRetailerUrl,
  },
  { depth: null }
);

console.log("================================");
return {
  ...directOffer,

  affiliateUrl,

  finalUrl:
    affiliateUrl ??
    directRetailerUrl,
};
  } catch (error) {
    console.error(
      `⚠️ Direct-link lookup failed for ${offer.title}:`,
      error
    );

    const originalMatch = compareExactProductVariant(
  originalQuery,
  `${offer.title} ${offer.description ?? ""}`
)

    return originalMatch.accepted ? offer : null;
  }
}
function retailerNamesMatch(
  first: string,
  second: string
): boolean {
  const firstName = normaliseRetailerName(first);
  const secondName = normaliseRetailerName(second);

  if (!firstName || !secondName) {
    return false;
  }

  return (
    firstName.includes(secondName) ||
    secondName.includes(firstName)
  );
}

function normaliseRetailerName(
  value: string
): string {
  return value
    .toLowerCase()
    .replace(/amazon\.co\.uk/g, "amazon")
    .replace(/ebay\.co\.uk/g, "ebay")
    .replace(/\s*-\s*seller.*$/g, "")
    .replace(/\s*store\s*$/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}
function isAffiliateSupportedStore(
  store: ImmersiveStore
): boolean {
  if (!store.link) {
    return false;
  }

  const merchant = getMerchantByUrl(store.link);

  return Boolean(
    merchant &&
    merchant.enabled
  );
}

function getAffiliateStorePriority(
  store: ImmersiveStore
): number {
  if (!store.link) {
    return 0;
  }

  const merchant = getMerchantByUrl(store.link);

  if (!merchant || !merchant.enabled) {
    return 0;
  }

  /*
   * Higher number means greater priority.
   *
   * Direct AWIN merchants are preferred first,
   * followed by Amazon and eBay.
   */
  switch (merchant.network) {
    case "awin":
      return 300;

    case "amazon":
      return 200;

    case "ebay":
      return 100;

    default:
      return 50;
  }
}

function findBestRetailerStore(
  originalOffer: ShoppingOffer,
  stores: ImmersiveStore[]
): ImmersiveStore | undefined {
  const rankedStores = [...stores].sort(
    (first, second) => {
      const firstPriority =
        getAffiliateStorePriority(first);

      const secondPriority =
        getAffiliateStorePriority(second);

      if (firstPriority !== secondPriority) {
        return secondPriority - firstPriority;
      }

      const firstRetailerMatch =
        retailerNamesMatch(
          originalOffer.retailer,
          first.name ?? ""
        )
          ? 1
          : 0;

      const secondRetailerMatch =
        retailerNamesMatch(
          originalOffer.retailer,
          second.name ?? ""
        )
          ? 1
          : 0;

      if (
        firstRetailerMatch !==
        secondRetailerMatch
      ) {
        return (
          secondRetailerMatch -
          firstRetailerMatch
        );
      }

      const firstPriceDifference =
        typeof first.extracted_price === "number"
          ? Math.abs(
              first.extracted_price -
                originalOffer.price
            )
          : Number.MAX_SAFE_INTEGER;

      const secondPriceDifference =
        typeof second.extracted_price === "number"
          ? Math.abs(
              second.extracted_price -
                originalOffer.price
            )
          : Number.MAX_SAFE_INTEGER;

      return (
        firstPriceDifference -
        secondPriceDifference
      );
    }
  );

  const selectedStore = rankedStores[0];

  if (selectedStore) {
    console.log(
      "🏪 BEST RETAILER STORE SELECTED:",
      {
        retailer: selectedStore.name,
        url: selectedStore.link,
        affiliateSupported:
          isAffiliateSupportedStore(
            selectedStore
          ),
        affiliatePriority:
          getAffiliateStorePriority(
            selectedStore
          ),
        price:
          selectedStore.extracted_price,
      }
    );
  }

  return selectedStore;
}

function findClosestPricedStore(
  targetPrice: number,
  stores: ImmersiveStore[]
): ImmersiveStore | undefined {
  return stores
    .filter(
      (store) =>
        typeof store.extracted_price === "number" &&
        store.extracted_price > 0
    )
    .sort((first, second) => {
      const firstDifference = Math.abs(
        (first.extracted_price ?? 0) -
          targetPrice
      );

      const secondDifference = Math.abs(
        (second.extracted_price ?? 0) -
          targetPrice
      );

      return firstDifference - secondDifference;
    })[0];
}

function isDirectRetailerUrl(
  value: string
): boolean {
  try {
    const url = new URL(value);
    const hostname = url.hostname
      .replace(/^www\./, "")
      .toLowerCase();

    return (
      hostname !== "google.com" &&
      hostname !== "google.co.uk" &&
      !hostname.endsWith(".google.com") &&
      !hostname.endsWith(".google.co.uk")
    );
  } catch {
    return false;
  }
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
function isEbayOffer(
  offer: ShoppingOffer
): boolean {
  const retailer =
    offer.retailer.toLowerCase();

  const possibleUrls = [
    offer.finalUrl,
    offer.affiliateUrl,
    offer.retailerUrl,
    offer.googleProductUrl,
  ]
    .filter(
      (value): value is string =>
        typeof value === "string"
    )
    .map((value) =>
      value.toLowerCase()
    );

  return (
    retailer.includes("ebay") ||
    possibleUrls.some(
      (url) =>
        url.includes("ebay.co.uk") ||
        url.includes("ebay.com")
    )
  );
}
async function enrichEbayAffiliateLink(
  offer: ShoppingOffer
): Promise<ShoppingOffer> {
  console.log("🟣 EBAY ENRICHMENT CALLED:", {
    title: offer.title,
    retailer: offer.retailer,
    finalUrl: offer.finalUrl,
  });

  const recognisedAsEbay = isEbayOffer(offer);

  console.log(
    "🟡 RECOGNISED AS EBAY:",
    recognisedAsEbay
  );

  if (!recognisedAsEbay) {
    console.warn(
      "⚠️ Offer was not recognised as eBay:",
      offer
    );

    return offer;
  }

  try {
    const result = await findEbayAffiliateListing(
      offer.title,
      offer.price
    );

    console.log("🟠 EBAY API RESULT:", result);

    if (!result?.affiliateUrl) {
      console.warn(
        "No eBay affiliate listing found:",
        offer.title
      );

      return offer;
    }

    console.log(
      "🟢 EBAY AFFILIATE URL:",
      result.affiliateUrl
    );

   return {
  ...offer,

  affiliateUrl:
    result.affiliateUrl,

  finalUrl:
    result.affiliateUrl,
};
  } catch (error) {
    console.error(
      "Failed to generate eBay affiliate link:",
      error
    );

    return offer;
  }
}
function isInvalidBuyingOffer(offer: ShoppingOffer): boolean {
  const url = (
    offer.finalUrl ??
    offer.retailerUrl ??
    ""
  ).toLowerCase();

  return (
    url.includes("sell.gizmo2go.com") ||
    url.includes("/sell-your-") ||
    url.includes("/trade-in") ||
    url.includes("/tradein")
  );
}

}
function numberFromCameraGeneration(
  value: string
): string {
  const generations: Record<
    string,
    string
  > = {
    ii: "2",
    iii: "3",
    iv: "4",
    v: "5",
    vi: "6",
    vii: "7",
    viii: "8",
  };

  return (
    generations[
      value.toLowerCase()
    ] ?? value
  );
}

/**
 * Extracts a strict Sony Alpha 7 model identity
 * from a search query, product title or URL.
 *
 * Examples:
 * Sony A7R IV      -> a7r4
 * ILCE-7RM4        -> a7r4
 * ILCE-7RM4A       -> a7r4
 * Sony A7 IV       -> a74
 * ILCE-7M4B        -> a74
 */
function extractSonyCameraIdentity(
  value: string | null | undefined
): string | null {
  if (!value) {
    return null;
  }

  let decodedValue = value;

  try {
    decodedValue =
      decodeURIComponent(value);
  } catch {
    // Keep the original value when URL decoding fails.
  }

  const normalised = decodedValue
    .toLowerCase()
    .replace(/[+/_-]+/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const skuValue = decodedValue
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  const skuMatch = skuValue.match(
    /ilce7([rs]?)m(\d+)[a-z]*/
  );

  if (skuMatch) {
    const series =
      skuMatch[1] ?? "";

    const generation =
      skuMatch[2];

    return generation
      ? `a7${series}${generation}`
      : null;
  }

  const publicModelMatch =
    normalised.match(
      /\ba?7\s*([rs]?)\s*(?:(?:mark|mk)\s*)?(ii|iii|iv|v|vi|vii|viii|\d+)\b/
    );

  if (publicModelMatch) {
    const series =
      publicModelMatch[1] ?? "";

    const generation =
      numberFromCameraGeneration(
        publicModelMatch[2]
      );

    return `a7${series}${generation}`;
  }

  const compactValue =
    normalised.replace(/\s+/g, "");

  const compactModelMatch =
    compactValue.match(
      /\ba7([rs]?)(\d+)\b/
    );

  if (compactModelMatch) {
    return `a7${
      compactModelMatch[1] ?? ""
    }${compactModelMatch[2]}`;
  }

  return null;
}