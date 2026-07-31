import type {
  MemoryCapability,
  MemoryCapabilityLevel,
} from "./MemoryIntelligence";

export function clampMemoryScore(
  score: number,
): number {
  return Math.max(
    0,
    Math.min(100, Math.round(score)),
  );
}

export function getMemoryCapabilityLevel(
  score: number,
): MemoryCapabilityLevel {

  if (score >= 90) return "EXCELLENT";

  if (score >= 75) return "GOOD";

  if (score >= 55) return "MIXED";

  if (score >= 35) return "LIMITED";

  if (score > 0) return "POOR";

  return "UNKNOWN";
}

export function createMemoryCapability(
  score: number,
  explanation: string,
): MemoryCapability {

  const safeScore =
    clampMemoryScore(score);

  return {
    score: safeScore,
    level:
      getMemoryCapabilityLevel(
        safeScore,
      ),
    explanation,
  };
}