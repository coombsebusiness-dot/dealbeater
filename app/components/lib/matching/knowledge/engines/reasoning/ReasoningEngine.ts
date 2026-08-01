import {
  ReasoningIntelligence,
} from "./ReasoningIntelligence";

import { LaptopIntelligence } from "../laptop/LaptopCapabilities";

export class ReasoningEngine {
analyse(
  intelligence: LaptopIntelligence,
): ReasoningIntelligence {
  const overallScore =
    this.calculateOverallScore([
      intelligence.capabilities
        .softwareDevelopment.score,

      intelligence.capabilities
        .videoEditing.score,

      intelligence.capabilities
        .aaaGaming.score,

      intelligence.capabilities
        .aiWorkloads.score,
    ]);

 const confidence =
  this.calculateConfidence([
    intelligence.capabilities
      .softwareDevelopment.confidence,

    intelligence.capabilities
      .videoEditing.confidence,

    intelligence.capabilities
      .aaaGaming.confidence,

    intelligence.capabilities
      .aiWorkloads.confidence,
  ]);

  return {
    overallScore,

    confidence,

    verdict: "UNKNOWN",

    summary: "",

    suitableFor: [],

    notIdealFor: [],

    bestFeatures: [],

    tradeOffs: [],

    concerns: [],

    workloads: [],
  };
}
  private calculateOverallScore(
  scores: number[],
): number {
  const validScores = scores.filter(
    (score) =>
      typeof score === "number" &&
      Number.isFinite(score),
  );

  if (validScores.length === 0) {
    return 0;
  }

  return Math.round(
    validScores.reduce(
      (sum, score) => sum + score,
      0,
    ) / validScores.length,
  );
}
private calculateConfidence(
  confidences: number[],
): number {
  const validConfidences =
    confidences.filter(
      (confidence) =>
        typeof confidence === "number" &&
        Number.isFinite(confidence),
    );

  if (
    validConfidences.length === 0
  ) {
    return 0;
  }

  return Math.round(
    validConfidences.reduce(
      (sum, confidence) =>
        sum + confidence,
      0,
    ) /
      validConfidences.length,
  );
}
}