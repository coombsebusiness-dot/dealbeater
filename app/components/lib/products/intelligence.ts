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
  strengths: string[];
  limitations: string[];
}

export interface ProductOverviewResult {
  shortDescription: string;
  bestFor: string[];
  strengths: string[];
  considerations: string[];
  confidence: number;
}

type BuildProductIntelligenceInput = {
  productName: string;
  productQuality?: number;
  summary?: string;
  positives?: string[];
  warnings?: string[];
  confidence?: number;
};

type BuildProductOverviewInput = {
  shortDescription?: string;
  bestFor?: string[];
  strengths?: string[];
  considerations?: string[];
  confidence?: number;
};

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function cleanItems(items: string[] = []) {
  return [...new Set(items.map((item) => item.trim()).filter(Boolean))].slice(
    0,
    4
  );
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
      return "Blinlx needs more product information before judging suitability.";
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
      "Blinlx is still gathering enough information to provide a detailed product assessment.",

    strengths: cleanItems(positives),
    limitations: cleanItems(warnings),
  };
}

export function buildProductOverview({
  shortDescription,
  bestFor = [],
  strengths = [],
  considerations = [],
  confidence = 0,
}: BuildProductOverviewInput): ProductOverviewResult | null {
  const description = shortDescription?.trim();

  if (!description) {
    return null;
  }

  return {
    shortDescription: description,
    bestFor: cleanItems(bestFor),
    strengths: cleanItems(strengths),
    considerations: cleanItems(considerations),
    confidence: clampScore(confidence),
  };
}