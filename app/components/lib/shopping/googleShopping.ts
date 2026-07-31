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

interface SerpApiShoppingResponse {
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

interface SerpRequestDiagnostics {
  googleShopping: number;
  immersiveProduct: number;
}

const MAX_OFFERS_TO_ENRICH = 2;

const ACCESSORY_TERMS = [
  // General
  "accessory",
  "replacement",
  "spare part",
  "parts only",
  "service",

  // Cases and protection
  "case",
  "cover",
  "protector",
  "screen protector",
  "tempered glass",
  "screen guard",
  "bumper",
  "wallet",
  "flip cover",
  "folio",
  "sleeve",
  "skin",
  "protective shell",
  "hydrogel",
  "shockproof",
  "rugged",
  "armour",
  "armor",

  // Power
  "battery",
  "battery pack",
  "charger",
  "charging",
  "power adapter",
  "mains adapter",
  "cable",

  // Camera accessories
  "camera cage",
  "cage",
  "camera grip",
  "battery grip",
  "strap",
  "camera bag",
  "lens cap",
  "body cap",
  "filter",
  "tripod",
  "flash trigger",
  "memory card",

  // Computer and mobile accessories
  "keyboard case",
  "keyboard cover",
  "stand",
  "holder",
  "mount",
  "dock",
  "adapter",
  "stylus",
  "apple pencil",
  "pencil holder",
  "phone holder",
  "car mount",
  "replacement back",
];

const USED_TERMS = [
  "refurbished",
  "renewed",
  "pre-owned",
  "pre owned",
  "preowned",
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
  "pay monthly",
  "subscription",
  "lease",
];

const INVALID_BUYING_URL_TERMS = [
  "sell.gizmo2go.com",
  "/sell-your-",
  "/trade-in",
  "/tradein",
];

export async function searchGoogleShopping(
  query: string
): Promise<ShoppingOffer[]> {
  const startedAt = performance.now();
  const apiKey = process.env.SERPAPI_API_KEY;
  const cleanQuery = query.trim();

  if (!apiKey) {
    throw new Error(
      "SERPAPI_API_KEY is missing from .env.local."
    );
  }

  if (!cleanQuery) {
    return [];
  }

  const diagnostics: SerpRequestDiagnostics = {
    googleShopping: 0,
    immersiveProduct: 0,
  };

  console.log(
    "🛒 GOOGLE SHOPPING SEARCH RUNNING:",
    cleanQuery
  );

  try {
    const rawResults = await fetchGoogleShoppingResults(
      cleanQuery,
      apiKey,
      diagnostics
    );

    const mappedOffers = rawResults
      .map((result) =>
        mapShoppingResultToOffer(result)
      )
      .filter(
        (offer): offer is ShoppingOffer =>
          offer !== null
      );

    const preValidatedOffers =
      mappedOffers.filter((offer) =>
        validateOfferBeforeEnrichment(
          cleanQuery,
          offer
        )
      );

    const priceFilteredOffers =
      removePriceOutliers(
        preValidatedOffers
      );

    const sortedOffers = [
      ...priceFilteredOffers,
    ].sort((a, b) => a.price - b.price);

    console.info(
      "GOOGLE_PRE_ENRICHMENT_VALIDATION:",
      {
        candidates: mappedOffers.length,
        accepted: sortedOffers.length,
        rejected:
          mappedOffers.length -
          sortedOffers.length,
      }
    );

    const offersToEnrich =
      sortedOffers.slice(
        0,
        MAX_OFFERS_TO_ENRICH
      );

    const remainingOffers =
      sortedOffers.slice(
        MAX_OFFERS_TO_ENRICH
      );

    const enrichmentStartedAt =
      performance.now();

    const enrichedResults =
      await Promise.all(
        offersToEnrich.map((offer) =>
          enrichOffer(
            offer,
            cleanQuery,
            apiKey,
            diagnostics
          )
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

    const finalOffers = [
      ...enrichedOffers,
      ...remainingOffers,
    ]
      .filter(
        (offer) =>
          !isInvalidBuyingOffer(offer)
      )
      .filter((offer) =>
        validateFinalOffer(
          cleanQuery,
          offer
        )
      )
      .sort((a, b) => a.price - b.price);

    console.info(
      "GOOGLE_FINAL_VALIDATION:",
      {
        candidates:
          sortedOffers.length,
        accepted: finalOffers.length,
        rejected:
          sortedOffers.length -
          finalOffers.length,
      }
    );

    console.info(
      `GOOGLE_FINAL_OFFERS_COUNT: ${finalOffers.length}`
    );

    return finalOffers;
  } finally {
    const totalSerpRequests =
      diagnostics.googleShopping +
      diagnostics.immersiveProduct;

    console.info(
      "================================"
    );
    console.info(
      "📊 SERP REQUEST DIAGNOSTICS"
    );
    console.info({
      query: cleanQuery,
      googleShopping:
        diagnostics.googleShopping,
      immersiveProduct:
        diagnostics.immersiveProduct,
      totalSerpRequests,
      maximumPossibleWithCurrentConfig:
        1 + MAX_OFFERS_TO_ENRICH,
      totalTimeMs: Math.round(
        performance.now() - startedAt
      ),
    });
    console.info(
      "================================"
    );
  }
}

async function fetchGoogleShoppingResults(
  query: string,
  apiKey: string,
  diagnostics: SerpRequestDiagnostics
): Promise<SerpApiShoppingResult[]> {
  diagnostics.googleShopping += 1;

  console.info(
    `📡 SERP REQUEST ${getTotalSerpRequests(
      diagnostics
    )}: google_shopping`
  );

  const params = new URLSearchParams({
    engine: "google_shopping",
    q: query,
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
    (await response.json()) as SerpApiShoppingResponse;

  if (data.error) {
    throw new Error(
      `SerpApi error: ${data.error}`
    );
  }

  const rawResults =
    data.shopping_results ?? [];

  console.log(
    `📦 Google Shopping returned ${rawResults.length} raw results for:`,
    query
  );

  return rawResults;
}

function mapShoppingResultToOffer(
  result: SerpApiShoppingResult
): ShoppingOffer | null {
  const title =
    result.title?.trim() ?? "";

  if (!title) {
    return null;
  }

  const price =
    typeof result.extracted_price ===
    "number"
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
    finalUrl: googleProductUrl,
    rating:
      typeof result.rating ===
      "number"
        ? result.rating
        : null,
    reviewCount:
      typeof result.reviews ===
      "number"
        ? result.reviews
        : null,
    delivery:
      result.delivery?.trim() ||
      null,
    immersiveToken:
      result.immersive_product_page_token ??
      null,
  };
}

function validateOfferBeforeEnrichment(
  query: string,
  offer: ShoppingOffer
): boolean {
  const rejectionReason =
    getHardRejectionReason(
      query,
      offer.title
    );

  if (rejectionReason) {
    console.log(
      `🚫 Hard rejected: ${offer.title} — ${rejectionReason}`
    );

    return false;
  }

  const match =
    compareExactProductVariant(
      query,
      offer.title
    );

  if (!match.accepted) {
    console.log(
      `🚫 Variant rejected: ${offer.title}`
    );
    console.log(
      "Reasons:",
      match.reasons.join(" | ")
    );
    console.log(
      "Confidence:",
      `${match.confidence}%`
    );

    return false;
  }

  console.log(
    `✅ Variant accepted: ${offer.title} (${match.confidence}%)`
  );

  return true;
}

function validateFinalOffer(
  query: string,
  offer: ShoppingOffer
): boolean {
  const candidateText = [
    offer.title,
    offer.description,
    offer.finalUrl,
    offer.retailerUrl,
  ]
    .filter(Boolean)
    .join(" ");

  const match =
    compareExactProductVariant(
      query,
      candidateText
    );

  if (!match.accepted) {
    console.log(
      "🚫 GOOGLE FINAL OFFER REJECTED",
      {
        query,
        title: offer.title,
        finalUrl: offer.finalUrl,
        confidence:
          match.confidence,
        reasons: match.reasons,
      }
    );

    return false;
  }

  const requestedSonyModel =
    extractSonyCameraIdentity(query);

  const finalSonyModel =
    extractSonyCameraIdentity(
      candidateText
    );

  if (
    requestedSonyModel &&
    finalSonyModel &&
    requestedSonyModel !==
      finalSonyModel
  ) {
    console.log(
      "🚫 SONY FINAL MODEL MISMATCH",
      {
        query,
        expected:
          requestedSonyModel,
        found:
          finalSonyModel,
        title: offer.title,
        finalUrl: offer.finalUrl,
      }
    );

    return false;
  }

  return true;
}

async function enrichOffer(
  offer: ShoppingOffer,
  originalQuery: string,
  apiKey: string,
  diagnostics: SerpRequestDiagnostics
): Promise<ShoppingOffer | null> {
  try {
    const directOffer =
      await enrichOfferWithDirectLink(
        offer,
        originalQuery,
        apiKey,
        diagnostics
      );

    if (!directOffer) {
      return null;
    }

    return await enrichEbayAffiliateLink(
  directOffer,
  originalQuery
);
  } catch (error) {
    console.error(
      "Offer enrichment failed:",
      error
    );

    return validateFinalOffer(
      originalQuery,
      offer
    )
      ? offer
      : null;
  }
}

async function enrichOfferWithDirectLink(
  offer: ShoppingOffer,
  originalQuery: string,
  apiKey: string,
  diagnostics: SerpRequestDiagnostics
): Promise<ShoppingOffer | null> {
  if (!offer.immersiveToken) {
    console.log(
      `⚠️ No immersive token for: ${offer.title}`
    );

    return validateFinalOffer(
      originalQuery,
      offer
    )
      ? offer
      : null;
  }

  diagnostics.immersiveProduct += 1;

  console.info(
    `📡 SERP REQUEST ${getTotalSerpRequests(
      diagnostics
    )}: google_immersive_product`
  );

  const params = new URLSearchParams({
    engine:
      "google_immersive_product",
    page_token:
      offer.immersiveToken,
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

    return validateFinalOffer(
      originalQuery,
      offer
    )
      ? offer
      : null;
  }

  const data =
    (await response.json()) as ImmersiveProductResponse;

  if (data.error) {
    console.log(
      `⚠️ Immersive API error for ${offer.title}:`,
      data.error
    );

    return validateFinalOffer(
      originalQuery,
      offer
    )
      ? offer
      : null;
  }

  const stores =
    data.product_results?.stores?.filter(
      (store) =>
        typeof store.link ===
          "string" &&
        isDirectRetailerUrl(
          store.link
        )
    ) ?? [];

  const matchingStores =
    stores.filter((store) => {
      const title =
        store.title?.trim() ?? "";

      if (!title) {
        return false;
      }

      const rejectionReason =
        getHardRejectionReason(
          originalQuery,
          title
        );

      if (rejectionReason) {
        return false;
      }

      const match =
        compareExactProductVariant(
          originalQuery,
          title
        );

      return match.accepted;
    });

  if (matchingStores.length === 0) {
    console.log(
      `⚠️ No exact retailer store matched: ${offer.title}`
    );

    return validateFinalOffer(
      originalQuery,
      offer
    )
      ? offer
      : null;
  }

  const selectedStore =
    findBestRetailerStore(
      offer,
      matchingStores
    );

  if (!selectedStore?.link) {
    return null;
  }

  const directRetailerUrl =
    selectedStore.link;

  if (
    hasSonyCameraModelMismatch(
      originalQuery,
      selectedStore.title,
      directRetailerUrl
    )
  ) {
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
      typeof selectedStore.extracted_price ===
      "number"
        ? selectedStore.extracted_price
        : offer.price,
    retailerUrl:
      directRetailerUrl,
    finalUrl:
      directRetailerUrl,
    rating:
      typeof selectedStore.rating ===
      "number"
        ? selectedStore.rating
        : offer.rating,
    reviewCount:
      typeof selectedStore.reviews ===
      "number"
        ? selectedStore.reviews
        : offer.reviewCount,
    delivery:
      selectedStore.shipping?.trim() ||
      offer.delivery,
  };

  const affiliateResult =
    await getAffiliateLink(
      directRetailerUrl,
      "blinlx-shopping"
    );

  const affiliateUrl =
    affiliateResult.success &&
    affiliateResult.affiliateUrl
      ? affiliateResult.affiliateUrl
      : null;

  return {
    ...directOffer,
    affiliateUrl,
    finalUrl:
      affiliateUrl ??
      directRetailerUrl,
  };
}

function getHardRejectionReason(
  query: string,
  title: string
): string | null {
  const normalisedQuery =
    normaliseText(query);

  const normalisedTitle =
    normaliseText(title);

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
    return "monthly payment, contract or lease listing";
  }

  return null;
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

  const median =
    getMedian(sortedPrices);

  const minimumReasonablePrice =
    median * 0.5;

  const maximumReasonablePrice =
    median * 1.8;

  console.log(
    `📊 Market median: £${median.toFixed(2)}`
  );

  return offers.filter((offer) => {
    const isReasonable =
      offer.price >=
        minimumReasonablePrice &&
      offer.price <=
        maximumReasonablePrice;

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

  if (
    sortedValues.length % 2 ===
    0
  ) {
    return (
      (sortedValues[middle - 1] +
        sortedValues[middle]) /
      2
    );
  }

  return sortedValues[middle];
}

function findBestRetailerStore(
  originalOffer: ShoppingOffer,
  stores: ImmersiveStore[]
): ImmersiveStore | undefined {
  return [...stores].sort(
    (first, second) => {
      const priorityDifference =
        getAffiliateStorePriority(
          second
        ) -
        getAffiliateStorePriority(
          first
        );

      if (
        priorityDifference !== 0
      ) {
        return priorityDifference;
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

      return (
        getPriceDifference(
          originalOffer.price,
          first.extracted_price
        ) -
        getPriceDifference(
          originalOffer.price,
          second.extracted_price
        )
      );
    }
  )[0];
}

function getAffiliateStorePriority(
  store: ImmersiveStore
): number {
  if (!store.link) {
    return 0;
  }

  const merchant =
    getMerchantByUrl(store.link);

  if (
    !merchant ||
    !merchant.enabled
  ) {
    return 0;
  }

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

function getPriceDifference(
  targetPrice: number,
  candidatePrice:
    | number
    | undefined
): number {
  if (
    typeof candidatePrice !==
      "number" ||
    candidatePrice <= 0
  ) {
    return Number.MAX_SAFE_INTEGER;
  }

  return Math.abs(
    candidatePrice - targetPrice
  );
}

function retailerNamesMatch(
  first: string,
  second: string
): boolean {
  const firstName =
    normaliseRetailerName(first);

  const secondName =
    normaliseRetailerName(second);

  if (
    !firstName ||
    !secondName
  ) {
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
    .replace(
      /amazon\.co\.uk/g,
      "amazon"
    )
    .replace(
      /ebay\.co\.uk/g,
      "ebay"
    )
    .replace(
      /\s*-\s*seller.*$/g,
      ""
    )
    .replace(
      /\s*store\s*$/g,
      ""
    )
    .replace(
      /[^a-z0-9]+/g,
      ""
    )
    .trim();
}

function isDirectRetailerUrl(
  value: string
): boolean {
  try {
    const url = new URL(value);
    const hostname =
      url.hostname
        .replace(/^www\./, "")
        .toLowerCase();

    return (
      hostname !== "google.com" &&
      hostname !==
        "google.co.uk" &&
      !hostname.endsWith(
        ".google.com"
      ) &&
      !hostname.endsWith(
        ".google.co.uk"
      )
    );
  } catch {
    return false;
  }
}

function isInvalidBuyingOffer(
  offer: ShoppingOffer
): boolean {
  const url = (
    offer.finalUrl ??
    offer.retailerUrl ??
    ""
  ).toLowerCase();

  return INVALID_BUYING_URL_TERMS.some(
    (term) =>
      url.includes(term)
  );
}

function containsAnyTerm(
  value: string,
  terms: string[]
): boolean {
  return terms.some((term) =>
    value.includes(
      normaliseText(term)
    )
  );
}

function normaliseText(
  value: string
): string {
  return value
    .toLowerCase()
    .replace(
      /(\d+)\s*(tb|gb)\b/g,
      "$1$2"
    )
    .replace(/[“”"'’]/g, "")
    .replace(
      /[^a-z0-9]+/g,
      " "
    )
    .replace(/\s+/g, " ")
    .trim();
}

function extractPrice(
  formattedPrice:
    | string
    | undefined
): number | null {
  if (!formattedPrice) {
    return null;
  }

  const match =
    formattedPrice.match(
      /[\d,]+(?:\.\d{1,2})?/
    );

  if (!match) {
    return null;
  }

  const parsedPrice = Number(
    match[0].replace(/,/g, "")
  );

  return Number.isFinite(
    parsedPrice
  )
    ? parsedPrice
    : null;
}

function getTotalSerpRequests(
  diagnostics: SerpRequestDiagnostics
): number {
  return (
    diagnostics.googleShopping +
    diagnostics.immersiveProduct
  );
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
      (
        value
      ): value is string =>
        typeof value === "string"
    )
    .map((value) =>
      value.toLowerCase()
    );

  return (
    retailer.includes("ebay") ||
    possibleUrls.some(
      (url) =>
        url.includes(
          "ebay.co.uk"
        ) ||
        url.includes("ebay.com")
    )
  );
}

async function enrichEbayAffiliateLink(
  offer: ShoppingOffer,
  originalQuery: string
): Promise<ShoppingOffer> {
  if (!isEbayOffer(offer)) {
    return offer;
  }

  try {
   const result =
  await findEbayAffiliateListing(
    originalQuery,
    offer.price
  );

    if (!result?.affiliateUrl) {
      return offer;
    }

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

function hasSonyCameraModelMismatch(
  originalQuery: string,
  storeTitle:
    | string
    | undefined,
  retailerUrl: string
): boolean {
  const requestedModel =
    extractSonyCameraIdentity(
      originalQuery
    );

  if (!requestedModel) {
    return false;
  }

  const storeTitleModel =
    extractSonyCameraIdentity(
      storeTitle
    );

  const retailerUrlModel =
    extractSonyCameraIdentity(
      retailerUrl
    );

  const mismatch =
    Boolean(
      storeTitleModel &&
      storeTitleModel !==
        requestedModel
    ) ||
    Boolean(
      retailerUrlModel &&
      retailerUrlModel !==
        requestedModel
    );

  if (mismatch) {
    console.log(
      "🚫 RETAILER SONY MODEL MISMATCH",
      {
        expected:
          requestedModel,
        storeTitleModel,
        retailerUrlModel,
        storeTitle,
        retailerUrl,
      }
    );
  }

  return mismatch;
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

function extractSonyCameraIdentity(
  value:
    | string
    | null
    | undefined
): string | null {
  if (!value) {
    return null;
  }

  let decodedValue = value;

  try {
    decodedValue =
      decodeURIComponent(value);
  } catch {
    // Keep the original value if URL decoding fails.
  }

  const normalised =
    decodedValue
      .toLowerCase()
      .replace(
        /[+/_-]+/g,
        " "
      )
      .replace(
        /[^a-z0-9\s]/g,
        " "
      )
      .replace(/\s+/g, " ")
      .trim();

  const skuValue =
    decodedValue
      .toLowerCase()
      .replace(
        /[^a-z0-9]/g,
        ""
      );

  const skuMatch =
    skuValue.match(
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
      publicModelMatch[1] ??
      "";

    const generation =
      numberFromCameraGeneration(
        publicModelMatch[2]
      );

    return `a7${series}${generation}`;
  }

  const compactValue =
    normalised.replace(
      /\s+/g,
      ""
    );

  const compactModelMatch =
    compactValue.match(
      /\ba7([rs]?)(\d+)\b/
    );

  if (compactModelMatch) {
    return `a7${
      compactModelMatch[1] ??
      ""
    }${compactModelMatch[2]}`;
  }

  return null;
}