import type {
  BatteryCapability,
  BatteryCapabilityLevel,
} from "./BatteryIntelligence";

export function clampBatteryScore(
  score: number,
): number {
  return Math.max(
    0,
    Math.min(100, Math.round(score)),
  );
}

export function getBatteryCapabilityLevel(
  score: number,
): BatteryCapabilityLevel {
  if (score >= 90) return "EXCELLENT";
  if (score >= 75) return "GOOD";
  if (score >= 55) return "MIXED";
  if (score >= 35) return "LIMITED";
  if (score > 0) return "POOR";

  return "UNKNOWN";
}

export function createBatteryCapability(
  score: number,
  explanation: string,
): BatteryCapability {
  const safeScore =
    clampBatteryScore(score);

  return {
    score: safeScore,
    level:
      getBatteryCapabilityLevel(
        safeScore,
      ),
    explanation,
  };
}