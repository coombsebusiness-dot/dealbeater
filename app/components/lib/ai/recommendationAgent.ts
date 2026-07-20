import type { DealReport, Recommendation } from "../types";
import type { ProductData } from "./productAgent";
import type { PriceData } from "./priceAgent";
import type { ReviewData } from "./reviewAgent";
import type { RetailerData } from "./retailerAgent";
import type { AlternativeData } from "./alternativeAgent";
import type { DecisionData } from "@/./app/components/lib/agents/decisionAgent";

interface RecommendationInput {
  product: ProductData;
  pricing: PriceData;
  reviews: ReviewData;
  retailers: RetailerData[];
  alternatives: AlternativeData[];
  decision: DecisionData;
}

export async function recommendationAgent({
  product,
  pricing,
  reviews,
  retailers,
  alternatives,
  decision,
}: RecommendationInput): Promise<DealReport> {
  const recommendation = mapDecisionToRecommendation(
    decision.verdict
  );

 const recommendedRetailer =
  retailers.length > 0
    ? [...retailers].sort(
        (a, b) =>
          b.retailScore - a.retailScore
      )[0]
    : undefined;

  return {
    recommendation,

    confidence: decision.confidence,

    dealScore: decision.score,

   scoreBreakdown: {
    price: decision.breakdown.price,

    reviews: decision.breakdown.reviews,

    retailer: decision.breakdown.retailer,

    warranty:
      recommendedRetailer?.warrantyYears ?? 0,

    value:
      decision.breakdown.alternatives,
},

    product: {
      name: product.name,
      brand: product.brand,
      model: product.model,
    imageUrl: product.image,
    },

    reviews,

    pricing,

   summary: buildSummary(
  product,
  pricing,
  decision
),

    ifItWasOurMoney: buildMoneyVerdict(
      decision,
      recommendedRetailer,
      alternatives
    ),

    strengths: buildStrengths(
      pricing,
      reviews,
      retailers,
      decision
    ),

    concerns: buildConcerns(
      pricing,
      reviews,
      alternatives,
      decision
    ),

    betterAlternatives: alternatives,

    retailers,
  };
}

function mapDecisionToRecommendation(
  verdict: DecisionData["verdict"]
): Recommendation {
  switch (verdict) {
    case "BUY_NOW":
      return "BUY";

    case "CONSIDER_ALTERNATIVE":
      return "NEGOTIATE";

    case "WAIT":
      return "WAIT";

    case "AVOID":
      return "WALK_AWAY";
  }
}

function buildSummary(
  product: ProductData,
  pricing: PriceData,
  decision: DecisionData
): string {
  const productName = product.name || "This product";
  const mainReason =
  pricing.marketSummary ||
  decision.reasons[0] ||
  "Our analysis found no major concerns.";

  switch (decision.verdict) {
    case "BUY_NOW":
      return mainReason
        ? `${productName} currently looks like a strong buying opportunity. ${mainReason}`
        : `${productName} currently looks like a strong buying opportunity.`;

    case "CONSIDER_ALTERNATIVE":
      return mainReason
        ? `${productName} may be worth buying, but an alternative should be considered first. ${mainReason}`
        : `${productName} may be worth buying, but an alternative should be considered first.`;

    case "WAIT":
      return mainReason
        ? `${productName} is not a bad product, but the current deal does not justify buying immediately. ${mainReason}`
        : `${productName} is not a bad product, but the current deal does not justify buying immediately.`;

    case "AVOID":
      return mainReason
        ? `${productName} does not currently represent a deal we would recommend. ${mainReason}`
        : `${productName} does not currently represent a deal we would recommend.`;
  }
}

function buildMoneyVerdict(
  decision: DecisionData,
  recommendedRetailer: RetailerData | undefined,
  alternatives: AlternativeData[]
): string {
  const retailerText = recommendedRetailer
  ? ` We would choose ${recommendedRetailer.name} because it has a retailer trust score of ${recommendedRetailer.retailScore}/100, a ${recommendedRetailer.returnsDays}-day returns policy and a ${recommendedRetailer.warrantyYears}-year warranty.`
  : "";

  const bestAlternative = alternatives.find(
    alternative =>
      alternative.verdict === "Best Value" ||
      alternative.verdict === "Highest Rated"
  );

  switch (decision.verdict) {
    case "BUY_NOW":
      return `If it was our money, we would be comfortable buying at the current price.${retailerText}`;

    case "CONSIDER_ALTERNATIVE":
      return bestAlternative
        ? `If it was our money, we would compare this directly with ${bestAlternative.name} before buying.`
        : "If it was our money, we would compare the strongest alternatives before buying.";

    case "WAIT":
      return "If it was our money, we would wait for a stronger price or a better retailer offer.";

    case "AVOID":
      return "If it was our money, we would walk away and choose a better-value alternative.";
  }
}

function buildStrengths(
  pricing: PriceData,
  reviews: ReviewData,
  retailers: RetailerData[],
  decision: DecisionData
): string[] {
  const strengths: string[] = [];

  if (
    pricing.pricePosition === "BEST_PRICE" ||
    pricing.pricePosition === "BELOW_AVERAGE"
  ) {
    strengths.push("The current price compares well with the wider market");
  }

  if (reviews.averageRating >= 4.2) {
    strengths.push(
      `Strong customer rating of ${reviews.averageRating}/5`
    );
  }

  if (reviews.reviewCount > 0) {
    strengths.push(
      `Based on ${reviews.reviewCount.toLocaleString()} customer reviews`
    );
  }

  if (retailers.length > 0) {
    strengths.push(
      `Available from ${retailers.length} checked retailer${
        retailers.length === 1 ? "" : "s"
      }`
    );
  }

  for (const reason of decision.reasons) {
    if (
      !strengths.includes(reason) &&
      strengths.length < 5
    ) {
      strengths.push(reason);
    }
  }

  return strengths;
}

function buildConcerns(
  pricing: PriceData,
  reviews: ReviewData,
  alternatives: AlternativeData[],
  decision: DecisionData
): string[] {
  const concerns: string[] = [];

  if (
    pricing.pricePosition === "ABOVE_AVERAGE"
  ) {
    concerns.push(
      "The current price is above the wider market average"
    );
  }

  if (pricing.marketConfidence < 70) {
    concerns.push(
      "There is limited market data available for this price comparison"
    );
  }

  if (reviews.averageRating < 4.2) {
    concerns.push(
      "Customer feedback is weaker than we would normally expect"
    );
  }

  if (alternatives.length > 0) {
    concerns.push(
      "There are competing products that may offer better value"
    );
  }

  if (
    decision.verdict === "WAIT" &&
    concerns.length === 0
  ) {
    concerns.push(
      "The available evidence does not currently support buying immediately"
    );
  }

  if (
    decision.verdict === "AVOID" &&
    concerns.length === 0
  ) {
    concerns.push(
      "The overall buying score is currently too low to recommend this deal"
    );
  }

  return concerns;
}

function getPriceBreakdown(
  pricing: PriceData
): number {
  switch (pricing.pricePosition) {
    case "BEST_PRICE":
      return 25;

    case "BELOW_AVERAGE":
      return 22;

    case "AVERAGE":
      return 16;

    case "ABOVE_AVERAGE":
      return 10;
  }
}

function getReviewBreakdown(
  reviews: ReviewData
): number {
  const normalisedRating = Math.min(
    1,
    Math.max(0, reviews.averageRating / 5)
  );

  return Math.round(
    normalisedRating * 25
  );
}

function getValueBreakdown(
  decision: DecisionData
): number {
  if (decision.verdict === "BUY_NOW") {
    return 20;
  }

  if (
    decision.verdict === "CONSIDER_ALTERNATIVE"
  ) {
    return 15;
  }

  if (decision.verdict === "WAIT") {
    return 10;
  }

  return 5;
}