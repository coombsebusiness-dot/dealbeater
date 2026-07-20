import { AnalysisResult } from "./analysisTypes";

export interface ReturnsResult extends AnalysisResult {
  score: number;
  confidence: number;
  warnings: string[];
  positives: string[];
}

export function analyseReturns(
  retailer: string,
  returns?: string
): ReturnsResult {

  const text = (returns ?? "").toLowerCase();

  if (
    text.includes("30 day") ||
    text.includes("30-day")
  ) {
    return {
      score: 100,
      confidence: 95,
      warnings: [],
      positives: [
        "30-day returns available."
      ]
    };
  }

  if (
    text.includes("14 day") ||
    text.includes("14-day")
  ) {
    return {
      score: 90,
      confidence: 90,
      warnings: [],
      positives: [
        "14-day returns available."
      ]
    };
  }

  if (
    text.includes("no returns")
  ) {
    return {
      score: 20,
      confidence: 95,
      warnings: [
        "No returns accepted."
      ],
      positives: []
    };
  }

  if (
    retailer.toLowerCase().includes("ebay")
  ) {
    return {
      score: 70,
      confidence: 60,
      warnings: [
        "Returns policy could not be verified."
      ],
      positives: []
    };
  }

  return {
    score: 85,
    confidence: 70,
    warnings: [
      "Returns information unavailable."
    ],
    positives: []
  };
}