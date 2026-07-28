import type { Product } from "@/types/product";

export type ComparisonWinner =
  | "A"
  | "B"
  | "DRAW";

export interface PriceComparison {

  winner: ComparisonWinner;

  reason: string;
}

export function comparePrice(
  productA: Product,
  productB: Product
): PriceComparison {

  const priceA = productA.currentPrice ?? 0;
  const priceB = productB.currentPrice ?? 0;

  if (!priceA || !priceB) {
    return {
      winner: "DRAW",
      reason: "Price unavailable",
    };
  }

  if (priceA < priceB) {
    return {
      winner: "A",
      reason: "Lower purchase price",
    };
  }

  if (priceB < priceA) {
    return {
      winner: "B",
      reason: "Lower purchase price",
    };
  }

  return {
    winner: "DRAW",
    reason: "Same price",
  };
}