import { EbayOffer } from "../ebay/browse";

export type DealScore = {
  score: number;
  verdict:
    | "Outstanding"
    | "Excellent"
    | "Good"
    | "Fair"
    | "Poor";
  reasons: string[];
};

export function scoreDeal(
  offer: EbayOffer,
  cheapestVerifiedPrice: number
): DealScore {
  let score = 100;
  const reasons: string[] = [];

  // Price

  const difference =
    offer.totalPrice - cheapestVerifiedPrice;

  if (difference === 0) {
    reasons.push("Cheapest verified offer");
  } else if (difference <= 20) {
    score -= 2;
    reasons.push("Very close to cheapest");
  } else if (difference <= 50) {
    score -= 6;
    reasons.push("Slightly more expensive");
  } else {
    score -= 15;
    reasons.push("Considerably more expensive");
  }

  // Seller feedback

  const feedback =
    offer.sellerFeedbackPercentage ?? 0;

  if (feedback >= 99.8) {
    reasons.push("Excellent seller reputation");
  } else if (feedback >= 99) {
    score -= 2;
  } else if (feedback >= 98) {
    score -= 5;
  } else {
    score -= 15;
    reasons.push("Seller reputation is below ideal");
  }

  // Seller history

  const sellerScore =
    offer.sellerFeedbackScore ?? 0;

  if (sellerScore < 20) {
    score -= 10;
    reasons.push("Very little seller history");
  } else if (sellerScore < 100) {
    score -= 4;
  }

  // Shipping

  if (offer.shippingPrice === 0) {
    reasons.push("Free delivery");
  } else if (offer.shippingPrice > 10) {
    score -= 5;
    reasons.push("High shipping cost");
  }

  score = Math.max(0, Math.min(100, score));

  let verdict: DealScore["verdict"];

  if (score >= 95)
    verdict = "Outstanding";
  else if (score >= 90)
    verdict = "Excellent";
  else if (score >= 80)
    verdict = "Good";
  else if (score >= 65)
    verdict = "Fair";
  else
    verdict = "Poor";

  return {
    score,
    verdict,
    reasons,
  };
}