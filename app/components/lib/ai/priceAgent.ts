import type { ProductData } from "./productAgent";
import { searchGoogleShopping } from "../shopping/googleShopping";
import { searchEbay } from "../ebay/browse";
import {
  addAmazonAffiliateTag,
} from "../affiliate/amazon";
import { searchAmazon } from "../scrapers/amazon";
import {
  compareExactProductVariant,
} from "@/app/components/lib/shopping/exactProductMatcher";
import {
  extractProductFromUrl,
  isProductUrl,
} from "@/app/components/lib/extractor/extractProduct";
import {
  getEbayItemByLegacyId,
} from "@/app/components/lib/ebay/browse";

export interface PriceOffer {
  retailer: string;
  price: number;
  url: string;
  image?: string;
  title?: string;

  

  affiliateUrl?: string;
  finalUrl?: string;
  retailerUrl?: string;
}

export interface PriceData {
  currentPrice: number | null;

  marketAverage: number | null;

  lowestPrice: number | null;

  highestPrice: number | null;

  priceSpread: number;

  savings: number | null;

  bestRetailer?: string;

  bestRetailerUrl?: string;

  productImage?: string;

  marketConfidence: number;

  topOffers: PriceOffer[];

  priceScore: number;

  pricePosition:
    | "BEST_PRICE"
    | "BELOW_AVERAGE"
    | "AVERAGE"
    | "ABOVE_AVERAGE";

  marketSummary: string;

  reasons: string[];

  valueRating:
    | "Excellent"
    | "Good"
    | "Fair"
    | "Poor"
    | "Unknown";

  recommendation:
    | "BUY_NOW"
    | "WAIT"
    | "UNKNOWN";
}

function extractEbayLegacyItemId(
  url: string
): string | null {
  const match = url.match(
    /ebay\.(?:co\.uk|com)\/itm\/(?:[^/?]+\/)?(\d{9,15})/i
  );

  return match?.[1] ?? null;
}

async function resolveOfferUrl(
  offerUrl: string
): Promise<string> {
  const ebayItemId =
    extractEbayLegacyItemId(offerUrl);

  if (!ebayItemId) {
  return addAmazonAffiliateTag(offerUrl) ?? offerUrl;
  }

  try {
    const ebayItem =
      await getEbayItemByLegacyId(
        ebayItemId
      );

   console.log("🟢 EBAY URL RESOLVED:", {
  ebayItemId,
  originalUrl: offerUrl,
  resolvedUrl:
    ebayItem?.itemUrl ?? offerUrl,
});

return ebayItem?.itemUrl ?? offerUrl;
  } catch (error) {
    console.error(
      "🔴 Failed to resolve eBay affiliate URL:",
      error
    );

    return offerUrl;
  }
}

async function measureTask<T>(
  name: string,
  task: () => Promise<T>
): Promise<T> {
  const startedAt = performance.now();

  try {
    return await task();
  } finally {
    console.info(
      `${name}: ${Math.round(
        performance.now() - startedAt
      )}ms`
    );
  }
}

export async function priceAgent(
  product: ProductData
): Promise<PriceData> {
  console.log(`Checking live prices for ${product.name}`);

let productSearchQuery = product.name;

if (isProductUrl(product.name)) {
  try {
    const extractedProduct =
      await extractProductFromUrl(product.name);

      const exactReferenceText = [
  product.searchQuery,
  product.model,
  product.mpn,
  product.description,
]
  .filter(Boolean)
  .join(" ");

    console.log("🧠 EXTRACTED PRODUCT:", {
      title: extractedProduct.title,
      brand: extractedProduct.brand,
      model: extractedProduct.model,
      searchQuery: extractedProduct.searchQuery,
      confidence: extractedProduct.confidence,
    });

    if (
      !extractedProduct.searchQuery ||
      extractedProduct.confidence < 60
    ) {
      throw new Error(
        "Product identification confidence was too low."
      );
    }

    productSearchQuery =
      extractedProduct.searchQuery;
  } catch (error) {
    console.error(
      "❌ Product URL extraction failed:",
      error
    );

    throw new Error(
      "We could not confidently identify the product from that link. Please enter the exact product name instead."
    );
  }
}

console.log(
  "🔎 FINAL PRODUCT SEARCH QUERY:",
  productSearchQuery
);

const lookupQuery =
  product.searchQuery ||
  productSearchQuery ||
  [
    product.brand,
    product.name,
    product.model,
  ]
    .filter(Boolean)
    .join(" ");

console.log(
  "🎯 EXACT PRODUCT LOOKUP QUERY:",
  lookupQuery
);

console.time("LIVE_PRICE_SEARCHES");

const [googleOffers, amazon, ebayOffers] =
  await Promise.all([
    measureTask(
      "GOOGLE_SHOPPING_TIME",
      () => searchGoogleShopping(lookupQuery)
    ),
    measureTask(
      "AMAZON_TIME",
      () => searchAmazon(lookupQuery)
    ),
    measureTask(
      "EBAY_SEARCH_TIME",
      () => searchEbay(lookupQuery)
    ),
  ]);

console.timeEnd("LIVE_PRICE_SEARCHES");

const offers = [...googleOffers];

const amazonBest = amazon.products[0];

const enhancedOffers = offers.map((offer) => {
  const retailer = offer.retailer
    .trim()
    .toLowerCase();

  if (
    !retailer.includes("amazon") ||
    !amazonBest
  ) {
    return offer;
  }

  const amazonUrl =
    amazonBest.canonicalUrl ?? null;

  return {
    ...offer,

    title:
      amazonBest.title ||
      offer.title,

    price:
      amazonBest.price ??
      offer.price,

    imageUrl:
      amazonBest.image ??
      offer.imageUrl,

    retailerUrl:
      amazonUrl ??
      offer.retailerUrl,

    affiliateUrl: null,

    finalUrl:
      amazonUrl ??
      offer.finalUrl,

    rating:
      amazonBest.rating ??
      offer.rating,

    reviewCount:
      amazonBest.reviewCount ??
      offer.reviewCount,

    delivery:
      amazonBest.availability?.length
        ? amazonBest.availability.join(" • ")
        : offer.delivery,
  };
});
const allOffers = [
  ...enhancedOffers,

  ...ebayOffers.map((offer) => ({
    title: offer.title,

    retailer: "eBay",

    price: offer.totalPrice,

    imageUrl:
      offer.imageUrl ?? null,

    googleProductUrl: null,

    retailerUrl:
      offer.itemUrl ?? null,

    affiliateUrl:
      offer.itemUrl ?? null,

    finalUrl:
      offer.itemUrl ?? null,

    rating: null,

    reviewCount: null,

    delivery: null,

    immersiveToken: null,

    description: null,
  })),
];
const verifiedOffers = allOffers.filter(
  
  (offer) => {
   const referenceProduct = [
  product.searchQuery,
  product.model,
  product.mpn,
  product.description,
]
  .filter(Boolean)
  .join(" ");

  // console.error("➡️ MATCHING:", offer.title);
const match =
  compareExactProductVariant(
    referenceProduct,
    offer.title
  );
// console.error("✅ MATCHED:", offer.title);
// console.log("🎯 VARIANT REFERENCE:");
// console.log(referenceProduct);
// console.log("================================");
// console.log("QUERY:", referenceProduct);
// console.log("TITLE:", offer.title);
// console.log("ACCEPTED:", match.accepted);
// console.log("CONFIDENCE:", match.confidence);
// console.log("REASONS:", match.reasons);
// console.log("================================");

    if (!match.accepted) {
      console.log(
        `🚫 Final offer rejected: ${offer.title} — ${match.reasons.join(
          "; "
        )}`
      );

      return false;
    }

    console.log(
      `✅ Final offer verified: ${offer.title} (${match.confidence}%)`
    );

    return true;
  }
);
console.log("VERIFIED OFFERS");

verifiedOffers.forEach((offer) => {
  console.log({
    title: offer.title,
    retailer: offer.retailer,
    price: offer.price,
  });
});
console.log("VERIFIED OFFERS");

const cheapestOffer =
  verifiedOffers.length > 0
    ? verifiedOffers.reduce((lowest, offer) =>
        offer.price < lowest.price
          ? offer
          : lowest
      )
    : null;

console.time("OFFER_URL_RESOLUTION");

const topOffers = await Promise.all(
  verifiedOffers
    .filter(
      (offer) =>
        Number.isFinite(offer.price) &&
        offer.price > 0 &&
        Boolean(offer.finalUrl)
    )
    .sort(
      (first, second) =>
        first.price - second.price
    )
    .filter(
      (offer, index, offers) =>
        index ===
        offers.findIndex(
          (candidate) =>
            candidate.retailer
              .trim()
              .toLowerCase() ===
            offer.retailer
              .trim()
              .toLowerCase()
        )
    )
    .slice(0, 3)
    .map(
      async (
        offer
      ): Promise<PriceOffer> => {
        const originalUrl =
          offer.finalUrl ?? "";

        const resolvedUrl =
          originalUrl
            ? await resolveOfferUrl(
                originalUrl
              )
            : "";

        return {
          retailer: offer.retailer,
          title: offer.title,
          price: offer.price,
          url:
            resolvedUrl ||
            originalUrl,
          image:
            offer.imageUrl ??
            undefined,
        };
      }
    )
);

console.timeEnd("OFFER_URL_RESOLUTION");

const cheapestTopOffer =
  topOffers.length > 0
    ? [...topOffers].sort(
        (first, second) =>
          first.price - second.price
      )[0]
    : undefined;

const bestRetailerUrl =
  cheapestTopOffer?.url ||
  cheapestOffer?.finalUrl ||
  undefined;


const imageOffer =
  verifiedOffers.find(
    (offer) => Boolean(offer.imageUrl)
  ) ??
  cheapestOffer;

 if (verifiedOffers.length === 0) {
return {
  currentPrice: null,

  marketAverage: null,

  lowestPrice: null,

  highestPrice: null,

  priceSpread: 0,

  savings: null,

  bestRetailer: undefined,

bestRetailerUrl: undefined,

marketConfidence: 0,

  priceScore: 0,

  productImage: undefined,

  topOffers: [],

  pricePosition: "AVERAGE",

  marketSummary: "No pricing data available.",

  reasons: [],

  valueRating: "Unknown",

  recommendation: "UNKNOWN",
};

  }

 const prices = verifiedOffers.map((offer) => offer.price);

  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);
  const priceSpread =
  highestPrice - lowestPrice;

  const marketAverage =
    Math.round(
      prices.reduce((a, b) => a + b, 0) /
      prices.length
    );

  const currentPrice =
    product.price ?? marketAverage;
    console.log("PRICE DEBUG", {
  productPrice: product.price,
  marketAverage,
  currentPrice,
  lowestPrice,
});

  const savings = currentPrice - lowestPrice;

  const reasons: string[] = [];

if (currentPrice === lowestPrice) {
  reasons.push(
    "This is currently the cheapest verified offer."
  );
}

if (verifiedOffers.length>= 5) {
  reasons.push(
    `${verifiedOffers.length} verified retailers were compared.`
  );
}

const percentDifference =
  ((currentPrice - marketAverage) / marketAverage) * 100;

if (percentDifference <= -5) {
  reasons.push(
    `Current price is ${Math.abs(
      percentDifference
    ).toFixed(1)}% below the market average.`
  );
}
else if (percentDifference >= 5) {
  reasons.push(
    `Current price is ${percentDifference.toFixed(
      1
    )}% above the market average.`
  );
}
else {
  reasons.push(
    "Current price is close to the market average."
  );
}

if (savings > 0) {
  reasons.push(
    `Potential saving of £${savings.toFixed(
      2
    )} compared with the current product price.`
  );
}

  const marketConfidence = Math.min(
  100,
  50 + allOffers.length* 5
);

const difference =
  ((currentPrice - marketAverage) / marketAverage) * 100;

let pricePosition:
  | "BEST_PRICE"
  | "BELOW_AVERAGE"
  | "AVERAGE"
  | "ABOVE_AVERAGE";

if (currentPrice === lowestPrice) {
  pricePosition = "BEST_PRICE";
} else if (difference <= -5) {
  pricePosition = "BELOW_AVERAGE";
} else if (difference <= 5) {
  pricePosition = "AVERAGE";
} else {
  pricePosition = "ABOVE_AVERAGE";
}
let priceScore = 50;

if (currentPrice === lowestPrice) {
  priceScore += 40;
}

if (difference <= -10) {
  priceScore += 10;
}

if (difference >= 10) {
  priceScore -= 20;
}

priceScore = Math.max(
  0,
  Math.min(100, priceScore)
);
let marketSummary: string;

if (currentPrice === lowestPrice) {
  marketSummary =
    "This is currently the cheapest verified price available.";
}
else if (difference <= -5) {
  marketSummary =
    "This product is currently priced below the market average.";
}
else if (difference >= 5) {
  marketSummary =
    "This product is currently priced above the market average.";
}
else {
  marketSummary =
    "This product is priced close to the market average.";
}

 return {
  currentPrice,

  marketAverage,

  lowestPrice,

  highestPrice,

  topOffers,

  priceSpread,

  savings,

  bestRetailer:
    cheapestOffer?.retailer,

 bestRetailerUrl,

  productImage:
    imageOffer?.imageUrl ??
    undefined,

  marketConfidence,

  priceScore,

  pricePosition,

  marketSummary,

  reasons,

  valueRating:
    savings >= 100
      ? "Excellent"
      : savings >= 50
        ? "Good"
        : savings >= 20
          ? "Fair"
          : "Poor",

  recommendation:
    currentPrice <= marketAverage
      ? "BUY_NOW"
      : "WAIT",
};
}