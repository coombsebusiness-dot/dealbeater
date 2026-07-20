import type { ProductData } from "./productAgent";
import { searchGoogleShopping } from "../shopping/googleShopping";


export interface PriceData {
  currentPrice: number | null;

  marketAverage: number | null;

  lowestPrice: number | null;

  highestPrice: number | null;

  priceSpread: number;

  savings: number | null;

  bestRetailer?: string;

  marketConfidence: number;

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

  const offers = await searchGoogleShopping(product.name);

  const cheapestOffer =
  offers.length > 0
    ? offers.reduce((lowest, offer) =>
        offer.price < lowest.price
          ? offer
          : lowest
      )
    : null;

 

  

  if (offers.length === 0) {
return {
  currentPrice: null,

  marketAverage: null,

  lowestPrice: null,

  highestPrice: null,

  priceSpread: 0,

  savings: null,

  bestRetailer: undefined,

  marketConfidence: 0,

  priceScore: 0,

  pricePosition: "AVERAGE",

  marketSummary: "No pricing data available.",

  reasons: [],

  valueRating: "Unknown",

  recommendation: "UNKNOWN",
};

  }

  const prices = offers.map(o => o.price);

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

if (offers.length >= 5) {
  reasons.push(
    `${offers.length} verified retailers were compared.`
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
  50 + offers.length * 5
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

  priceSpread,

  savings,

  bestRetailer:
    cheapestOffer?.retailer,

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