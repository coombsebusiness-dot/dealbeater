import { AnalysisResult } from "./analysisTypes";

export interface SellerAnalysisResult extends AnalysisResult {
  score: number;
  confidence: number;
  warnings: string[];
  positives: string[];
}

export interface SellerInput {
  sellerName?: string;
  feedbackPercent?: number;
  feedbackCount?: number;
  businessSeller?: boolean;
  topRatedSeller?: boolean;
}

export function analyseSeller(
  seller: SellerInput
): SellerAnalysisResult {

  // If we have no seller information
  if (!seller.sellerName) {
    return {
      score: 60,
      confidence: 30,
      warnings: [
        "Seller information unavailable."
      ],
      positives: []
    };
  }

  let score = 50;

  const warnings: string[] = [];
  const positives: string[] = [];

  if (seller.businessSeller) {
    score += 15;
    positives.push("Business seller.");
  }

  if (seller.topRatedSeller) {
    score += 15;
    positives.push("Top Rated Seller.");
  }

  if (
    seller.feedbackPercent &&
    seller.feedbackPercent >= 99
  ) {
    score += 10;
    positives.push(
      `${seller.feedbackPercent}% positive feedback`
    );
  }

  if (
    seller.feedbackCount &&
    seller.feedbackCount > 1000
  ) {
    score += 10;
    positives.push(
      `${seller.feedbackCount.toLocaleString()} completed sales`
    );
  }

  if (
    seller.feedbackPercent &&
    seller.feedbackPercent < 95
  ) {
    score -= 20;

    warnings.push(
      "Seller feedback is below our preferred level."
    );
  }

  score = Math.max(0, Math.min(score, 100));

  return {
    score,
    confidence: 85,
    warnings,
    positives
  };

}