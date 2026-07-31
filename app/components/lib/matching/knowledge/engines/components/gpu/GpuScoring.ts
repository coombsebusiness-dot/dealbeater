import type {
  GpuCapability,
  GpuCapabilityLevel,
} from "./GpuIntelligence";

export function clampGpuScore(
  score: number,
): number {
  return Math.max(
    0,
    Math.min(100, Math.round(score)),
  );
}

export function getGpuCapabilityLevel(
  score: number,
): GpuCapabilityLevel {
  if (score >= 90) return "EXCELLENT";
  if (score >= 75) return "GOOD";
  if (score >= 55) return "MIXED";
  if (score >= 35) return "LIMITED";
  if (score > 0) return "POOR";

  return "UNKNOWN";
}

export function createGpuCapability(
  score: number,
  explanation: string,
): GpuCapability {
  const safeScore =
    clampGpuScore(score);

  return {
    score: safeScore,

    level:
      getGpuCapabilityLevel(
        safeScore,
      ),

    explanation,
  };
}