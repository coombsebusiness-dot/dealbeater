import type { ProductData } from "./productAgent";
import { searchGoogleShopping } from "../shopping/googleShopping";


export interface PriceData {
  currentPrice: number | null;

  averagePrice: number | null;

  lowestPrice: number | null;

  highestPrice: number | null;

  savings: number | null;

  marketConfidence: number;

  pricePosition:
    | "BEST_PRICE"
    | "BELOW_AVERAGE"
    | "AVERAGE"
    | "ABOVE_AVERAGE";

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

 

  

  if (offers.length === 0) {
  return {
  currentPrice: null,
  averagePrice: null,
  lowestPrice: null,
  highestPrice: null,
  savings: null,

  marketConfidence: 0,
  pricePosition: "AVERAGE",

  reasons: [],

  valueRating: "Unknown",
  recommendation: "UNKNOWN",
};
  }

  const prices = offers.map(o => o.price);

  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);

  const averagePrice =
    Math.round(
      prices.reduce((a, b) => a + b, 0) /
      prices.length
    );

  const currentPrice =
    product.price ?? averagePrice;

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
  ((currentPrice - averagePrice) / averagePrice) * 100;

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
  ((currentPrice - averagePrice) / averagePrice) * 100;

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

 return {
  currentPrice,
  averagePrice,
  lowestPrice,
  highestPrice,
  savings,

  marketConfidence,
  pricePosition,

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
    currentPrice <= averagePrice
      ? "BUY_NOW"
      : "WAIT",
};
}