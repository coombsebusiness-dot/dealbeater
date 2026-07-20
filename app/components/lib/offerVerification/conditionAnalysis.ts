import { AnalysisResult } from "./analysisTypes";

export interface ConditionResult extends AnalysisResult {
  condition:
    | "Brand New"
    | "Like New"
    | "Open Box"
    | "Refurbished"
    | "Used"
    | "Damaged"
    | "Parts Only"
    | "Unknown";
}

export function analyseCondition(
  title: string
): ConditionResult {

  const text = title.toLowerCase();

  // Parts only
  if (
    text.includes("parts only") ||
    text.includes("for parts") ||
    text.includes("spares")
  ) {
 return {
  score: 10,
  confidence: 100,
  condition: "Parts Only",
  warnings: [
    "Item is being sold for parts or repair."
  ],
  positives: []
};
  }

  // Damaged
  if (
    text.includes("damaged") ||
    text.includes("faulty") ||
    text.includes("broken")
  ) {
    return {
      score: 20,
      confidence: 100,
      condition: "Damaged",
      warnings: [
        "Item is described as damaged."
      ],
      positives: []
    };
  }

  // Used
  if (
    text.includes("used") ||
    text.includes("pre-owned") ||
    text.includes("second hand")
  ) {
    return {
      score: 55,
      confidence: 95,
      condition: "Used",
      warnings: [
        "Item has previously been used."
      ],
      positives: []
    };
  }

  // Refurbished
  if (
    text.includes("refurb") ||
    text.includes("renewed") ||
    text.includes("grade a") ||
    text.includes("grade b") ||
    text.includes("grade c")
  ) {
    return {
      score: 75,
      confidence: 90,
      condition: "Refurbished",
      warnings: [
        "Refurbished device."
      ],
      positives: [
        "Lower purchase price."
      ]
    };
  }

  // Open Box
  if (
    text.includes("open box") ||
    text.includes("opened")
  ) {
    return {
      score: 90,
      confidence: 90,
      condition: "Open Box",
      warnings: [],
      positives: [
        "Likely unused with opened packaging."
      ]
    };
  }

  // Like New
  if (
    text.includes("like new") ||
    text.includes("mint")
  ) {
    return {
      score: 95,
      confidence: 85,
      condition: "Like New",
      warnings: [],
      positives: [
        "Excellent cosmetic condition."
      ]
    };
  }

  return {
    score: 100,
    confidence: 40,
    condition: "Brand New",
    warnings: [],
    positives: [
      "Brand new product."
    ]
  };
}