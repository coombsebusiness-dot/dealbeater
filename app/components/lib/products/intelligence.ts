export type ProductSuitability =
  | "EXCELLENT"
  | "GOOD"
  | "MIXED"
  | "LIMITED"
  | "UNKNOWN";

export interface ProductIntelligenceResult {
  score: number;
  confidence: number;
  suitability: ProductSuitability;
  headline: string;
  summary: string;
  bestFor: string[];
  limitations: string[];
}

type BuildProductIntelligenceInput = {
  productName: string;
  productQuality?: number;
  summary?: string;
  positives?: string[];
  warnings?: string[];
  confidence?: number;
};

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getSuitability(score: number): ProductSuitability {
  if (score >= 85) return "EXCELLENT";
  if (score >= 70) return "GOOD";
  if (score >= 50) return "MIXED";
  if (score >= 1) return "LIMITED";

  return "UNKNOWN";
}

function getHeadline(
  productName: string,
  suitability: ProductSuitability
) {
  switch (suitability) {
    case "EXCELLENT":
      return `${productName} appears to be an excellent product overall.`;

    case "GOOD":
      return `${productName} appears to be a strong product for the right buyer.`;

    case "MIXED":
      return `${productName} has a mixture of strengths and compromises.`;

    case "LIMITED":
      return `${productName} may only suit a limited range of buyers.`;

    case "UNKNOWN":
      return `Blinlx needs more product information before judging suitability.`;
  }
}

export function buildProductIntelligence({
  productName,
  productQuality = 0,
  summary,
  positives = [],
  warnings = [],
  confidence = 0,
}: BuildProductIntelligenceInput): ProductIntelligenceResult {
  const score = clampScore(productQuality);
  const suitability = getSuitability(score);

  return {
    score,
    confidence: clampScore(confidence),
    suitability,
    headline: getHeadline(productName, suitability),

    summary:
      summary?.trim() ||
      "Blinlx is still gathering enough product information to provide a detailed suitability assessment.",

    bestFor: positives.slice(0, 4),
    limitations: warnings.slice(0, 4),
  };
}