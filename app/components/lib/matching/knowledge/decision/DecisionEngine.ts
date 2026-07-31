import type { ProductReasoningResult } from "../reasoning/ReasoningEngine";

export type BuyingVerdict =
  | "BUY_NOW"
  | "GOOD_BUY"
  | "BUY_WITH_CAUTION"
  | "WAIT"
  | "DO_NOT_BUY";

export interface DecisionResult {
  verdict: BuyingVerdict;

  score: number;

  headline: string;

  explanation: string;
}
export class DecisionEngine {
  decide(
    reasoning: ProductReasoningResult,
  ): DecisionResult {

    let score = reasoning.confidence;

    score += reasoning.strengths.length * 2;

    score -= reasoning.concerns.length * 3;

    score = Math.max(0, Math.min(score, 100));

    if (score >= 90) {
      return {
        verdict: "BUY_NOW",
        score,
        headline: "Excellent choice",
        explanation:
          "Blinlx found very strong evidence supporting this purchase.",
      };
    }

    if (score >= 75) {
      return {
        verdict: "GOOD_BUY",
        score,
        headline: "Recommended",
        explanation:
          "The evidence strongly supports this purchase.",
      };
    }

    if (score >= 55) {
      return {
        verdict: "BUY_WITH_CAUTION",
        score,
        headline: "Worth considering",
        explanation:
          "There are some trade-offs you should understand before buying.",
      };
    }

    if (score >= 35) {
      return {
        verdict: "WAIT",
        score,
        headline: "Consider waiting",
        explanation:
          "The current evidence isn't convincing enough yet.",
      };
    }

    return {
      verdict: "DO_NOT_BUY",
      score,
      headline: "Not recommended",
      explanation:
        "Blinlx found more negative evidence than positive evidence.",
    };
  }
}