import type {
  LaptopCapability,
  LaptopCapabilityLevel,
  LaptopIntelligenceScores,
} from "./LaptopCapabilities";

export function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function getCapabilityLevel(
  score: number,
): LaptopCapabilityLevel {
  const safeScore = clampScore(score);

  if (safeScore >= 90) {
    return "EXCELLENT";
  }

  if (safeScore >= 75) {
    return "GOOD";
  }

  if (safeScore >= 55) {
    return "MIXED";
  }

  if (safeScore >= 35) {
    return "LIMITED";
  }

  if (safeScore > 0) {
    return "POOR";
  }

  return "UNKNOWN";
}

export function createLaptopCapability(
  score: number,
  confidence: number,
  explanation: string,
): LaptopCapability {
  const safeScore = clampScore(score);

  return {
    score: safeScore,
    level: getCapabilityLevel(safeScore),
    confidence: clampScore(confidence),
    explanation,
  };
}

export function calculateLaptopOverallScore(
  scores: LaptopIntelligenceScores,
): number {
  const weightedScore =
    scores.performance * 0.2 +
    scores.battery * 0.12 +
    scores.display * 0.12 +
    scores.portability * 0.1 +
    scores.buildQuality * 0.1 +
    scores.connectivity * 0.08 +
    scores.repairability * 0.05 +
    scores.upgradeability * 0.05 +
    scores.longevity * 0.1 +
    scores.value * 0.08;

  return clampScore(weightedScore);
}