export type ReviewSentiment =
  | "EXCELLENT"
  | "POSITIVE"
  | "MIXED"
  | "POOR"
  | "UNKNOWN";

export interface ReviewIntelligenceResult {
  score: number;
  sentiment: ReviewSentiment;
  headline: string;
  summary: string;
  strengths: string[];
  concerns: string[];
  confidence: number;
}

type BuildReviewIntelligenceInput = {
  analysis?: string;
  reviewQuality?: number;
  positives?: string[];
  warnings?: string[];
  confidence?: number;
};

function clampScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function getSentiment(score: number): ReviewSentiment {
  if (score >= 85) return "EXCELLENT";
  if (score >= 70) return "POSITIVE";
  if (score >= 50) return "MIXED";
  if (score >= 1) return "POOR";

  return "UNKNOWN";
}

function getHeadline(sentiment: ReviewSentiment) {
  switch (sentiment) {
    case "EXCELLENT":
      return "Customer feedback appears exceptionally strong.";

    case "POSITIVE":
      return "Most customer feedback appears positive.";

    case "MIXED":
      return "Customer feedback is mixed.";

    case "POOR":
      return "Customer feedback raises concerns.";

    case "UNKNOWN":
      return "Not enough review information is available yet.";
  }
}

export function buildReviewIntelligence({
  analysis,
  reviewQuality = 0,
  positives = [],
  warnings = [],
  confidence = 0,
}: BuildReviewIntelligenceInput): ReviewIntelligenceResult {
  const score = clampScore(reviewQuality);
  const sentiment = getSentiment(score);

  return {
    score,
    sentiment,
    headline: getHeadline(sentiment),
    summary:
      analysis?.trim() ||
      "Blinlx is still gathering enough review information to provide a reliable summary.",
    strengths: positives.slice(0, 3),
    concerns: warnings.slice(0, 3),
    confidence: clampScore(confidence),
  };
}