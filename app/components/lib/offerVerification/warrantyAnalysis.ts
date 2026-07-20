import { AnalysisResult } from "./analysisTypes";

export interface WarrantyResult extends AnalysisResult {}

export function analyseWarranty(
  retailer: string,
  title: string,
  warranty?: string
): WarrantyResult {

  const text = `${title} ${warranty ?? ""}`.toLowerCase();

  // Manufacturer warranty
  if (
    text.includes("manufacturer warranty") ||
    text.includes("apple warranty") ||
    text.includes("samsung warranty")
  ) {
    return {
      score: 100,
      confidence: 100,
      warnings: [],
      positives: [
        "Manufacturer warranty included."
      ]
    };
  }

  // Extended warranty
  if (
    text.includes("2 year warranty") ||
    text.includes("3 year warranty")
  ) {
    return {
      score: 95,
      confidence: 95,
      warnings: [],
      positives: [
        "Extended warranty included."
      ]
    };
  }

  // Generic warranty
  if (
    text.includes("warranty")
  ) {
    return {
      score: 85,
      confidence: 80,
      warnings: [],
      positives: [
        "Warranty mentioned."
      ]
    };
  }

  // Marketplace default
  if (
    retailer.toLowerCase().includes("ebay") ||
    retailer.toLowerCase().includes("amazon marketplace")
  ) {
    return {
      score: 60,
       confidence: 50,
      warnings: [
        "Warranty could not be verified."
      ],
      positives: []
    };
  }

  return {
    score: 80,
     confidence: 30,
    warnings: [
      "No warranty information found."
    ],
    positives: []
  };
}