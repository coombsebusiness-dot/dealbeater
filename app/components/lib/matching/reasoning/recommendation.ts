import type { ReasoningResult } from "./reasoning";

export type RecommendationVerdict =
  | "BUY"
  | "CONSIDER"
  | "WAIT"
  | "AVOID";

export interface RecommendationResult {
  verdict: RecommendationVerdict;
  score: number;
  confidence: number;
  reasons: string[];
}

export function recommend(
  reasoning: ReasoningResult
): RecommendationResult {

  const score = calculateScore(reasoning);

  let verdict: RecommendationVerdict;

  if (!reasoning.hasEnoughKnowledge) {

    verdict = "WAIT";

  } else if (score >= 85) {

    verdict = "BUY";

  } else if (score >= 65) {

    verdict = "CONSIDER";

  } else if (score >= 40) {

    verdict = "WAIT";

  } else {

    verdict = "AVOID";

  }

  return {

    verdict,

    score,

    confidence: reasoning.confidence,

    reasons: reasoning.signals.map(
      signal => signal.message
    )

  };

}

function calculateScore(
  reasoning: ReasoningResult
): number {

  let score = 50;

  for (const signal of reasoning.signals) {

    switch (signal.impact) {

      case "positive":
        score += 10;
        break;

      case "negative":
        score -= 15;
        break;

      case "neutral":
        score += 2;
        break;

    }

  }

  return Math.max(
    0,
    Math.min(100, score)
  );

}