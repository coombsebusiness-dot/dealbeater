import type {
  DisplayCapability,
  DisplayCapabilityLevel,
} from "./DisplayIntelligence";

export function clampDisplayScore(
  score: number,
): number {
  return Math.max(
    0,
    Math.min(100, Math.round(score)),
  );
}

export function getDisplayCapabilityLevel(
  score: number,
): DisplayCapabilityLevel {
  if (score >= 90) return "EXCELLENT";
  if (score >= 75) return "GOOD";
  if (score >= 55) return "MIXED";
  if (score >= 35) return "LIMITED";
  if (score > 0) return "POOR";

  return "UNKNOWN";
}

export function createDisplayCapability(
  score: number,
  explanation: string,
): DisplayCapability {
  const safeScore =
    clampDisplayScore(score);

  return {
    score: safeScore,

    level:
      getDisplayCapabilityLevel(
        safeScore,
      ),

    explanation,
  };
}