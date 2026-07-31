import type {
  CpuCapability,
  CpuCapabilityLevel,
} from "./CpuIntelligence";

export function clampCpuScore(
  score: number,
): number {
  return Math.max(
    0,
    Math.min(100, Math.round(score)),
  );
}

export function getCpuCapabilityLevel(
  score: number,
): CpuCapabilityLevel {
  if (score >= 90) return "EXCELLENT";
  if (score >= 75) return "GOOD";
  if (score >= 55) return "MIXED";
  if (score >= 35) return "LIMITED";
  if (score > 0) return "POOR";

  return "UNKNOWN";
}

export function createCpuCapability(
  score: number,
  explanation: string,
): CpuCapability {
  const normalisedScore =
    clampCpuScore(score);

  return {
    score: normalisedScore,

    level:
      getCpuCapabilityLevel(
        normalisedScore,
      ),

    explanation,
  };
}