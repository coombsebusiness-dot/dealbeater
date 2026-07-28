import type { Product } from "@/types/product";
import type { ComparisonWinner } from "./comparePrice";

export interface ValueComparison {
  winner: ComparisonWinner;
  scoreA: number | null;
  scoreB: number | null;
  reason: string;
}

function getValueScore(product: Product) {
  const score = product.scoreBreakdown?.value;

  if (
    typeof score !== "number" ||
    !Number.isFinite(score)
  ) {
    return null;
  }

  return Math.max(0, Math.min(100, score));
}

export function compareValue(
  productA: Product,
  productB: Product
): ValueComparison {
  const valueA = getValueScore(productA);
  const valueB = getValueScore(productB);

  if (valueA === null || valueB === null) {
    return {
      winner: "DRAW",
      scoreA: valueA,
      scoreB: valueB,
      reason:
        "Not enough value data is available to compare these products.",
    };
  }

  const percentageDifference =
    Math.abs(valueA - valueB) /
    Math.max(valueA, valueB);

  if (percentageDifference < 0.03) {
    return {
      winner: "DRAW",
      scoreA: valueA,
      scoreB: valueB,
      reason:
        "Both products offer very similar overall value.",
    };
  }

  if (valueA > valueB) {
    return {
      winner: "A",
      scoreA: valueA,
      scoreB: valueB,
      reason:
        `${productA.name} offers stronger overall value for money.`,
    };
  }

  return {
    winner: "B",
    scoreA: valueA,
    scoreB: valueB,
    reason:
      `${productB.name} offers stronger overall value for money.`,
  };
}