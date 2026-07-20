import { AnalysisResult } from "./analysisTypes";

export interface DeliveryResult extends AnalysisResult {
  estimatedDays?: number;
}

export function analyseDelivery(
  delivery?: string
): DeliveryResult {

  const text = (delivery ?? "").toLowerCase();

  if (
    text.includes("same day")
  ) {
    return {
      score: 100,
      confidence: 100,
      estimatedDays: 0,
      warnings: [],
      positives: [
        "Same-day delivery available."
      ]
    };
  }

  if (
    text.includes("next day") ||
    text.includes("tomorrow")
  ) {
    return {
      score: 98,
      confidence: 100,
      estimatedDays: 1,
      warnings: [],
      positives: [
        "Next-day delivery available."
      ]
    };
  }

  if (
    text.includes("2-3") ||
    text.includes("2 to 3")
  ) {
    return {
      score: 90,
      confidence: 90,
      estimatedDays: 3,
      warnings: [],
      positives: [
        "Fast delivery."
      ]
    };
  }

  if (
    text.includes("5-7") ||
    text.includes("5 to 7")
  ) {
    return {
      score: 75,
      confidence: 90,
      estimatedDays: 7,
      warnings: [],
      positives: []
    };
  }

  if (
    text.includes("pre-order") ||
    text.includes("preorder")
  ) {
    return {
      score: 60,
      confidence: 95,
      estimatedDays: undefined,
      warnings: [
        "Pre-order item."
      ],
      positives: []
    };
  }

  return {
    score: 80,
    confidence: 40,
    estimatedDays: undefined,
    warnings: [
      "Delivery estimate unavailable."
    ],
    positives: []
  };
}