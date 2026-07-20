import type { PriceData } from "@/./app/components/lib/ai/priceAgent";
import type { ReviewData } from "@/./app/components/lib/ai/reviewAgent";
import type { RetailerData } from "@/./app/components/lib/ai/retailerAgent";
import type { AlternativeData } from "@/./app/components/lib/ai/alternativeAgent";

export interface DecisionData {
  verdict:
    | "BUY_NOW"
    | "WAIT"
    | "CONSIDER_ALTERNATIVE"
    | "AVOID";

  confidence: number;

  score: number;

  reasons: string[];
}

export function decisionAgent(
  price: PriceData,
  review: ReviewData,
  retailers: RetailerData[],
  alternatives: AlternativeData[]
): DecisionData {

  let score = 50;

  const reasons: string[] = [];

  // ---------- PRICE ----------

  if (price.recommendation === "BUY_NOW") {
    score += 20;
    reasons.push(...price.reasons);
  } else if (price.recommendation === "WAIT") {
    score -= 10;
  }

  // ---------- REVIEWS ----------

  if (review.averageRating >= 4.7) {
    score += 15;
    reasons.push(
      `Excellent customer rating (${review.averageRating}/5).`
    );
  } else if (review.averageRating >= 4.2) {
    score += 8;
    reasons.push(
      `Good customer rating (${review.averageRating}/5).`
    );
  } else {
    score -= 10;
  }

  // ---------- RETAILERS ----------

  const trustedRetailer = retailers.find(
    r => r.recommended
  );

  if (trustedRetailer) {
    score += 10;

    reasons.push(
      `${trustedRetailer.name} is a trusted retailer.`
    );
  }

  // ---------- ALTERNATIVES ----------

  const bestAlternative = alternatives.find(
    a =>
      a.verdict === "Best Value" ||
      a.verdict === "Highest Rated"
  );

  if (bestAlternative) {
    score -= 8;

    reasons.push(
      `Alternative available: ${bestAlternative.name}.`
    );
  }

  score = Math.max(
    0,
    Math.min(score, 100)
  );

  let verdict:
    | "BUY_NOW"
    | "WAIT"
    | "CONSIDER_ALTERNATIVE"
    | "AVOID";

  if (score >= 80) {
    verdict = "BUY_NOW";
  } else if (score >= 60) {
    verdict = "CONSIDER_ALTERNATIVE";
  } else if (score >= 40) {
    verdict = "WAIT";
  } else {
    verdict = "AVOID";
  }

  return {
    verdict,
    confidence: score,
    score,
    reasons,
  };
}