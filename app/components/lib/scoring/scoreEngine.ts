import { WEIGHTS } from "./weights";

export interface ScoreInput {
  priceScore: number;

  reviewScore: number;

  retailerScore: number;

  warrantyScore: number;

  valueScore: number;
}

export function calculateDealScore(
  input: ScoreInput
) {
  const total =
      input.priceScore * WEIGHTS.price +
      input.reviewScore * WEIGHTS.reviews +
      input.retailerScore * WEIGHTS.retailer +
      input.warrantyScore * WEIGHTS.warranty +
      input.valueScore * WEIGHTS.value;

  return Math.round(total / 100);
}