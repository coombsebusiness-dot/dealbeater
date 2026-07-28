import type { Product } from "@/types/product";
import type { ComparisonWinner } from "./comparePrice";

export interface PerformanceComparison {
  winner: ComparisonWinner;
  scoreA: number | null;
  scoreB: number | null;
  reason: string;
}
function getPerformanceScore(product: Product) {
  const score = product.specs["performanceScore"];

  if (
    typeof score !== "number" ||
    !Number.isFinite(score)
  ) {
    return null;
  }

  return Math.max(0, Math.min(100, score));
}

export function comparePerformance(
  productA: Product,
  productB: Product
): PerformanceComparison {
  const scoreA = getPerformanceScore(productA);
  const scoreB = getPerformanceScore(productB);

  if (scoreA === null || scoreB === null) {
    return {
      winner: "DRAW",
      scoreA,
      scoreB,
      reason:
        "Not enough performance data is available to compare these products.",
    };
  }

  const difference = Math.abs(scoreA - scoreB);

  if (difference < 3) {
    return {
      winner: "DRAW",
      scoreA,
      scoreB,
      reason:
        "Both products offer very similar overall performance.",
    };
  }

  if (scoreA > scoreB) {
    return {
      winner: "A",
      scoreA,
      scoreB,
      reason: `${productA.name} offers stronger overall performance.`,
    };
  }

  return {
    winner: "B",
    scoreA,
    scoreB,
    reason: `${productB.name} offers stronger overall performance.`,
  };
}