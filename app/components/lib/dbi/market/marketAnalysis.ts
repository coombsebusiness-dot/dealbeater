import { ShoppingOffer } from "@/app/components/lib/shopping/googleShopping";

export interface MarketAnalysis {
  offersFound: number;

  lowestPrice: number;
  highestPrice: number;

  averagePrice: number;
  medianPrice: number;

  cheapestRetailer: string;

  priceSpread: number;

  savingsVsAverage: number;

  confidence: number;

  verdict:
    | "excellent"
    | "good"
    | "average"
    | "poor";
}

export function analyseMarket(
  offers: ShoppingOffer[]
): MarketAnalysis | null {
  if (offers.length === 0) {
    return null;
  }

  const sorted = [...offers].sort(
    (a, b) => a.price - b.price
  );

  const prices = sorted.map((o) => o.price);

  const lowestPrice = prices[0];
  const highestPrice = prices[prices.length - 1];

  const averagePrice =
    prices.reduce((a, b) => a + b, 0) /
    prices.length;

  const medianPrice = getMedian(prices);

  const priceSpread =
    highestPrice - lowestPrice;

  const savingsVsAverage =
    averagePrice - lowestPrice;

  const confidence = calculateConfidence(
    offers.length,
    priceSpread
  );

  let verdict:
    | "excellent"
    | "good"
    | "average"
    | "poor";

  const savingPercent =
    (savingsVsAverage / averagePrice) * 100;

  if (savingPercent >= 15) {
    verdict = "excellent";
  } else if (savingPercent >= 8) {
    verdict = "good";
  } else if (savingPercent >= 3) {
    verdict = "average";
  } else {
    verdict = "poor";
  }

  return {
    offersFound: offers.length,

    lowestPrice: round(lowestPrice),
    highestPrice: round(highestPrice),

    averagePrice: round(averagePrice),
    medianPrice: round(medianPrice),

    cheapestRetailer:
      sorted[0].retailer,

    priceSpread: round(priceSpread),

    savingsVsAverage: round(
      savingsVsAverage
    ),

    confidence,

    verdict,
  };
}

function calculateConfidence(
  offers: number,
  spread: number
) {
  let score = 50;

  score += Math.min(offers * 5, 40);

  if (spread > 0) {
    score += 10;
  }

  return Math.min(score, 100);
}

function getMedian(
  values: number[]
) {
  const sorted = [...values].sort(
    (a, b) => a - b
  );

  const middle = Math.floor(
    sorted.length / 2
  );

  if (sorted.length % 2 === 0) {
    return (
      (sorted[middle - 1] +
        sorted[middle]) /
      2
    );
  }

  return sorted[middle];
}

function round(
  value: number
) {
  return Math.round(value * 100) / 100;
}