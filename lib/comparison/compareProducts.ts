import type { Product } from "@/types/product";
import type { ComparisonResult } from "./types";

import { comparePrice } from "./validators/comparePrice";
import { compareValue } from "./validators/compareValue";
import { comparePerformance } from "./validators/comparePerformance";
import { compareFeatures } from "./validators/compareFeatures";
import { compareRetailerTrust } from "./validators/compareRetailerTrust";

function createSummary(
  productAName: string,
  productBName: string,
  winner: "A" | "B" | "DRAW",
  scoreA: number,
  scoreB: number
) {
  if (winner === "A") {
    return `${productAName} wins this comparison by ${scoreA} categories to ${scoreB}. ${productBName} may still be the better choice for buyers with different priorities.`;
  }

  if (winner === "B") {
    return `${productBName} wins this comparison by ${scoreB} categories to ${scoreA}. ${productAName} may still be the better choice for buyers with different priorities.`;
  }

  return `${productAName} and ${productBName} are evenly matched overall. The better choice depends on which features and benefits matter most to the buyer.`;
}

function createBestFor(
  productName: string,
  categories: string[]
) {
  if (categories.length === 0) {
    return [
      `${productName} is best for buyers whose priorities are not fully covered by the available comparison data.`,
    ];
  }

  return categories.map(
    (category) =>
      `${productName} is the stronger choice for buyers prioritising ${category}.`
  );
}

export function compareProducts(
  productA: Product,
  productB: Product
): ComparisonResult {
  // 1. Run validators
  const price = comparePrice(productA, productB);
  const value = compareValue(productA, productB);

  const performance = comparePerformance(
    productA,
    productB
  );

  const features = compareFeatures(
    productA,
    productB
  );

  const retailerTrust = compareRetailerTrust(
    productA,
    productB
  );

  // 2. Calculate scores
  let scoreA = 0;
  let scoreB = 0;

  if (price.winner === "A") scoreA++;
  if (price.winner === "B") scoreB++;

  if (value.winner === "A") scoreA++;
  if (value.winner === "B") scoreB++;

  if (performance.winner === "A") scoreA++;
  if (performance.winner === "B") scoreB++;

  if (features.winner === "A") scoreA++;
  if (features.winner === "B") scoreB++;

  if (retailerTrust.winner === "A") scoreA++;
  if (retailerTrust.winner === "B") scoreB++;

  // 3. Decide overall winner
  const winner =
    scoreA > scoreB
      ? "A"
      : scoreB > scoreA
        ? "B"
        : "DRAW";

  // 4. Build reasons
  const reasonsA: string[] = [];
  const reasonsB: string[] = [];

  if (price.winner === "A") {
    reasonsA.push(price.reason);
  }

  if (price.winner === "B") {
    reasonsB.push(price.reason);
  }

  if (value.winner === "A") {
    reasonsA.push(value.reason);
  }

  if (value.winner === "B") {
    reasonsB.push(value.reason);
  }

  if (performance.winner === "A") {
    reasonsA.push(performance.reason);
  }

  if (performance.winner === "B") {
    reasonsB.push(performance.reason);
  }

  if (features.winner === "A") {
    reasonsA.push(features.reason);
  }

  if (features.winner === "B") {
    reasonsB.push(features.reason);
  }

  if (retailerTrust.winner === "A") {
    reasonsA.push(retailerTrust.reason);
  }

  if (retailerTrust.winner === "B") {
    reasonsB.push(retailerTrust.reason);
  }

  // 5. Build best-for recommendations
  const winningCategoriesA: string[] = [];
  const winningCategoriesB: string[] = [];

  if (price.winner === "A") {
    winningCategoriesA.push("a lower purchase price");
  }

  if (price.winner === "B") {
    winningCategoriesB.push("a lower purchase price");
  }

  if (value.winner === "A") {
    winningCategoriesA.push("overall value for money");
  }

  if (value.winner === "B") {
    winningCategoriesB.push("overall value for money");
  }

  if (performance.winner === "A") {
    winningCategoriesA.push("stronger performance");
  }

  if (performance.winner === "B") {
    winningCategoriesB.push("stronger performance");
  }

  if (features.winner === "A") {
    winningCategoriesA.push("a broader feature set");
  }

  if (features.winner === "B") {
    winningCategoriesB.push("a broader feature set");
  }

  if (retailerTrust.winner === "A") {
    winningCategoriesA.push("retailer confidence");
  }

  if (retailerTrust.winner === "B") {
    winningCategoriesB.push("retailer confidence");
  }

  const summary = createSummary(
    productA.name,
    productB.name,
    winner,
    scoreA,
    scoreB
  );

  const bestFor = {
    productA: createBestFor(
      productA.name,
      winningCategoriesA
    ),
    productB: createBestFor(
      productB.name,
      winningCategoriesB
    ),
  };

  // 6. Return comparison result
  return {
    winner,

    overallScoreA: scoreA,
    overallScoreB: scoreB,

    categories: {
      price: price.winner,
      value: value.winner,
      performance: performance.winner,
      features: features.winner,
      retailerTrust: retailerTrust.winner,
    },

    summary,

    reasonsA,
    reasonsB,

    bestFor,
  };
}