import type { Product } from "@/types/product";
import type { ComparisonWinner } from "./comparePrice";

export interface RetailerTrustComparison {
  winner: ComparisonWinner;
  scoreA: number | null;
  scoreB: number | null;
  reason: string;
}

type ProductWithRetailerTrust = Product & {
  retailerTrustScore?: number | null;
  retailerScore?: number | null;
  retailerTrust?: number | null;
};

function getRetailerTrustScore(product: Product) {
  const score = product.scoreBreakdown?.retailer;

  if (
    typeof score !== "number" ||
    !Number.isFinite(score)
  ) {
    return null;
  }

  return Math.max(0, Math.min(100, score));
}

export function compareRetailerTrust(
  productA: Product,
  productB: Product
): RetailerTrustComparison {
  const scoreA =
    getRetailerTrustScore(productA);

  const scoreB =
    getRetailerTrustScore(productB);

  if (scoreA === null || scoreB === null) {
    return {
      winner: "DRAW",
      scoreA,
      scoreB,
      reason:
        "Not enough retailer trust data is available to compare these products.",
    };
  }

  const difference =
    Math.abs(scoreA - scoreB);

  if (difference < 5) {
    return {
      winner: "DRAW",
      scoreA,
      scoreB,
      reason:
        "Both products are sold through retailers with similar trust levels.",
    };
  }

  if (scoreA > scoreB) {
    return {
      winner: "A",
      scoreA,
      scoreB,
      reason:
        `${productA.name} is available from the more trusted retailer.`,
    };
  }

  return {
    winner: "B",
    scoreA,
    scoreB,
    reason:
      `${productB.name} is available from the more trusted retailer.`,
  };
}