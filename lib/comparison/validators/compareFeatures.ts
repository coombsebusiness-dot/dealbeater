import type { Product } from "@/types/product";
import type { ComparisonWinner } from "./comparePrice";

export interface FeaturesComparison {
  winner: ComparisonWinner;
  scoreA: number | null;
  scoreB: number | null;
  reason: string;
}

type ProductWithFeatures = Product & {
  featureScore?: number | null;
  features?: unknown;
  strengths?: unknown;
};

function countFeatureItems(value: unknown) {
  if (!Array.isArray(value)) {
    return 0;
  }

  return value.filter((item) => {
    if (typeof item === "string") {
      return item.trim().length > 0;
    }

    return item !== null && item !== undefined;
  }).length;
}

function getFeatureScore(product: Product) {
  const candidate =
    product as ProductWithFeatures;

  if (
    typeof candidate.featureScore === "number" &&
    Number.isFinite(candidate.featureScore)
  ) {
    return Math.max(
      0,
      Math.min(100, candidate.featureScore)
    );
  }

  const featureCount =
    countFeatureItems(candidate.features);

  const strengthCount =
    countFeatureItems(candidate.strengths);

  const totalCount =
    featureCount + strengthCount;

  if (totalCount <= 0) {
    return null;
  }

  return Math.min(100, totalCount * 10);
}

export function compareFeatures(
  productA: Product,
  productB: Product
): FeaturesComparison {
  const scoreA = getFeatureScore(productA);
  const scoreB = getFeatureScore(productB);

  if (scoreA === null || scoreB === null) {
    return {
      winner: "DRAW",
      scoreA,
      scoreB,
      reason:
        "Not enough feature data is available to compare these products.",
    };
  }

  const difference = Math.abs(scoreA - scoreB);

  if (difference < 5) {
    return {
      winner: "DRAW",
      scoreA,
      scoreB,
      reason:
        "Both products offer a very similar range of features.",
    };
  }

  if (scoreA > scoreB) {
    return {
      winner: "A",
      scoreA,
      scoreB,
      reason: `${productA.name} offers the stronger overall feature set.`,
    };
  }

  return {
    winner: "B",
    scoreA,
    scoreB,
    reason: `${productB.name} offers the stronger overall feature set.`,
  };
}