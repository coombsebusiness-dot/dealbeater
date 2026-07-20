import type { PriceData } from "@/app/components/lib/ai/priceAgent";
import type { ReviewData } from "@/app/components/lib/ai/reviewAgent";
import type { RetailerData } from "@/app/components/lib/ai/retailerAgent";
import type { AlternativeData } from "@/app/components/lib/ai/alternativeAgent";

export interface DecisionBreakdown {
  price: number;
  reviews: number;
  retailer: number;
  alternatives: number;
}

export interface DecisionData {
  verdict:
    | "BUY_NOW"
    | "WAIT"
    | "CONSIDER_ALTERNATIVE"
    | "AVOID";

  confidence: number;

  score: number;

  breakdown: DecisionBreakdown;

  reasons: string[];
}

export function decisionAgent(
  price: PriceData,
  review: ReviewData,
  retailers: RetailerData[],
  alternatives: AlternativeData[]
): DecisionData {
  const reasons: string[] = [];

  const priceScore = calculatePriceScore(
    price,
    reasons
  );

  const reviewScore = calculateReviewScore(
    review,
    reasons
  );

  const retailerScore = calculateRetailerScore(
    retailers,
    reasons
  );

  const alternativeScore =
    calculateAlternativeScore(
      alternatives,
      reasons
    );

  const score = clampScore(
    priceScore +
      reviewScore +
      retailerScore +
      alternativeScore
  );

  const confidence = calculateConfidence(
    price,
    review,
    retailers,
    alternatives
  );

  return {
    verdict: determineVerdict(
      score,
      price,
      alternatives
    ),

    confidence,

    score,

    breakdown: {
      price: priceScore,
      reviews: reviewScore,
      retailer: retailerScore,
      alternatives: alternativeScore,
    },

    reasons,
  };
}

function calculatePriceScore(
  price: PriceData,
  reasons: string[]
): number {
  if (
    price.currentPrice === null ||
    price.marketAverage === null
  ) {
    reasons.push(
      "There is not enough verified pricing evidence yet."
    );

    return 12;
  }

  let score = Math.round(
    (price.priceScore / 100) * 30
  );

  score = clamp(score, 0, 30);

  if (price.pricePosition === "BEST_PRICE") {
    reasons.push(
      "The current price is the cheapest verified offer."
    );
  } else if (
    price.pricePosition === "BELOW_AVERAGE"
  ) {
    reasons.push(
      "The current price is below the market average."
    );
  } else if (
    price.pricePosition === "ABOVE_AVERAGE"
  ) {
    reasons.push(
      "The current price is above the market average."
    );
  } else {
    reasons.push(
      "The current price is close to the market average."
    );
  }

  if (price.priceSpread >= 50) {
    reasons.push(
      `Retailer prices vary by £${price.priceSpread.toFixed(
        2
      )}, so shopping around matters.`
    );
  }

  return score;
}

function calculateReviewScore(
  review: ReviewData,
  reasons: string[]
): number {
  const rating = Number(
    review.averageRating
  );

  if (
    !Number.isFinite(rating) ||
    rating <= 0
  ) {
    reasons.push(
      "There is not enough reliable review evidence yet."
    );

    return 12;
  }

  let score: number;

  if (rating >= 4.7) {
    score = 30;

    reasons.push(
      `Customer reviews are excellent at ${rating.toFixed(
        1
      )}/5.`
    );
  } else if (rating >= 4.3) {
    score = 26;

    reasons.push(
      `Customer reviews are very strong at ${rating.toFixed(
        1
      )}/5.`
    );
  } else if (rating >= 4) {
    score = 22;

    reasons.push(
      `Customer reviews are positive at ${rating.toFixed(
        1
      )}/5.`
    );
  } else if (rating >= 3.5) {
    score = 15;

    reasons.push(
      `Customer reviews are mixed at ${rating.toFixed(
        1
      )}/5.`
    );
  } else {
    score = 7;

    reasons.push(
      `Customer reviews are weak at ${rating.toFixed(
        1
      )}/5.`
    );
  }

  const reviewCount = Number(
    review.reviewCount
  );

  if (
    Number.isFinite(reviewCount) &&
    reviewCount > 0 &&
    reviewCount < 20
  ) {
    score = Math.max(0, score - 3);

    reasons.push(
      "The review sample is still relatively small."
    );
  }

  return clamp(score, 0, 30);
}

function calculateRetailerScore(
  retailers: RetailerData[],
  reasons: string[]
): number {
  if (retailers.length === 0) {
    reasons.push(
      "No retailer trust evidence is currently available."
    );

    return 8;
  }

  const bestRetailer = [...retailers].sort(
    (a, b) =>
      b.retailScore - a.retailScore
  )[0];

  const score = clamp(
    Math.round(
      (bestRetailer.retailScore / 100) * 20
    ),
    0,
    20
  );

  reasons.push(
    `${bestRetailer.name} has the strongest retailer score at ${bestRetailer.retailScore}/100.`
  );

  if (bestRetailer.authorisedRetailer) {
    reasons.push(
      `${bestRetailer.name} is listed as an authorised retailer.`
    );
  }

  if (bestRetailer.warrantyYears > 1) {
    reasons.push(
      `${bestRetailer.name} includes a ${bestRetailer.warrantyYears}-year warranty.`
    );
  }

  if (bestRetailer.returnsDays >= 30) {
    reasons.push(
      `${bestRetailer.name} offers a ${bestRetailer.returnsDays}-day returns period.`
    );
  }

  return score;
}

function calculateAlternativeScore(
  alternatives: AlternativeData[],
  reasons: string[]
): number {
  if (alternatives.length === 0) {
    reasons.push(
      "No clearly better alternative was identified."
    );

    return 20;
  }

  const strongAlternative =
    alternatives.find(
      alternative =>
        alternative.verdict ===
          "Best Value" ||
        alternative.verdict ===
          "Highest Rated"
    );

  if (strongAlternative) {
    reasons.push(
      `A strong alternative is available: ${strongAlternative.name}.`
    );

    return 10;
  }

  reasons.push(
    "Alternatives were checked, but none clearly outperform this product."
  );

  return 17;
}

function calculateConfidence(
  price: PriceData,
  review: ReviewData,
  retailers: RetailerData[],
  alternatives: AlternativeData[]
): number {
  const priceConfidence =
    price.marketConfidence;

  const reviewConfidence =
    getReviewConfidence(review);

  const retailerConfidence =
    retailers.length > 0
      ? Math.round(
          retailers.reduce(
            (total, retailer) =>
              total + retailer.trustScore,
            0
          ) / retailers.length
        )
      : 0;

  const alternativeConfidence =
    alternatives.length > 0 ? 75 : 50;

  return clampScore(
    Math.round(
      priceConfidence * 0.4 +
        reviewConfidence * 0.3 +
        retailerConfidence * 0.2 +
        alternativeConfidence * 0.1
    )
  );
}

function getReviewConfidence(
  review: ReviewData
): number {
  const reviewCount = Number(
    review.reviewCount
  );

  if (
    !Number.isFinite(reviewCount) ||
    reviewCount <= 0
  ) {
    return 20;
  }

  if (reviewCount >= 1000) {
    return 95;
  }

  if (reviewCount >= 250) {
    return 85;
  }

  if (reviewCount >= 100) {
    return 75;
  }

  if (reviewCount >= 20) {
    return 60;
  }

  return 40;
}

function determineVerdict(
  score: number,
  price: PriceData,
  alternatives: AlternativeData[]
): DecisionData["verdict"] {
  const strongAlternative =
    alternatives.some(
      alternative =>
        alternative.verdict ===
          "Best Value" ||
        alternative.verdict ===
          "Highest Rated"
    );

  if (
    score >= 80 &&
    price.pricePosition !==
      "ABOVE_AVERAGE"
  ) {
    return "BUY_NOW";
  }

  if (
    strongAlternative &&
    score >= 55
  ) {
    return "CONSIDER_ALTERNATIVE";
  }

  if (score >= 45) {
    return "WAIT";
  }

  return "AVOID";
}

function clampScore(
  value: number
): number {
  return clamp(
    Math.round(value),
    0,
    100
  );
}

function clamp(
  value: number,
  minimum: number,
  maximum: number
): number {
  return Math.max(
    minimum,
    Math.min(maximum, value)
  );
}