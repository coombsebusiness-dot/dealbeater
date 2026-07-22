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

export interface PriceOffer {
  retailer: string;
  title: string;
  price: number;
  url?: string;
  image?: string;
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

export async function priceAgent(
  product: ProductData
): Promise<PriceData> {
  console.log(`Checking live prices for ${product.name}`);

 const [googleOffers, amazon, ebayOffers] =
  await Promise.all([
    searchGoogleShopping(product.name),

    searchAmazon(product.name, {
      limit: 1,
    }).catch(() => ({
      products: [],
    })),

    searchEbay(product.name, 10).catch(() => []),
  ]);

const offers = [...googleOffers];

const amazonBest = amazon.products[0];

const enhancedOffers = offers.map((offer) => {
  const retailer = offer.retailer
    .trim()
    .toLowerCase();

  if (!retailer.includes("amazon")) {
    return offer;
  }

  if (!amazonBest) {
    return offer;
  }

  return {
    ...offer,

    title: amazonBest.title,

    price:
      amazonBest.price ??
      offer.price,

    link:
      amazonBest.canonicalUrl,

    thumbnail:
      amazonBest.image,

    rating:
      amazonBest.rating,

    reviewCount:
      amazonBest.reviewCount,

    delivery:
      amazonBest.availability
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

    link: offer.itemUrl,

    thumbnail: offer.imageUrl,

    rating: null,

    reviewCount: null,

    delivery: null,
  })),
];
const verifiedOffers = allOffers.filter(
  (offer) => {
    const match =
      compareExactProductVariant(
        product.name,
        offer.title
      );

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

  const topOffers = verifiedOffers
  .filter(
    (offer) =>
      Number.isFinite(offer.price) &&
      offer.price > 0
  )
  .sort((a, b) => a.price - b.price)
  .filter(
    (offer, index, verifiedOffers) =>
      index ===
      allOffers.findIndex(
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
  .map((offer) => ({
  retailer: offer.retailer,
  title: offer.title,
  price: offer.price,

  url: addAmazonAffiliateTag(
    offer.link
  ),

  image:
    offer.thumbnail ?? undefined,
}));

 const cheapestOffer =
 verifiedOffers.length > 0
    ? verifiedOffers.reduce((lowest, offer) =>
        offer.price < lowest.price
          ? offer
          : lowest
      )
    : null;

 
const imageOffer =
  verifiedOffers.find((offer) => offer.thumbnail) ??
  cheapestOffer;
  

 if (allOffers.length === 0){
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
  50 + verifiedOffers.length* 5
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



bestRetailerUrl:
  addAmazonAffiliateTag(
    cheapestOffer?.link
  ),

productImage:
  imageOffer?.thumbnail ?? undefined,
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