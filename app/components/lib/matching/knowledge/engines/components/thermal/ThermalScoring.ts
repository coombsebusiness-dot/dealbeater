import {
  ThermalCapability,
  ThermalCapabilityLevel,
} from "./ThermalIntelligence";

export function clampThermalScore(
  score: number,
): number {
  return Math.max(
    0,
    Math.min(100, Math.round(score)),
  );
}

export function getThermalCapabilityLevel(
  score: number,
): ThermalCapabilityLevel {
  if (score >= 85) {
    return "EXCELLENT";
  }

  if (score >= 70) {
    return "GOOD";
  }

  if (score >= 50) {
    return "MIXED";
  }

  if (score >= 30) {
    return "LIMITED";
  }

  return "POOR";
}

export function createThermalCapability(
  score: number,
  confidence: number,
  explanation: string,
): ThermalCapability {
  const safeScore =
    clampThermalScore(score);

  return {
    score: safeScore,
    level:
      getThermalCapabilityLevel(
        safeScore,
      ),
    confidence:
      clampThermalScore(confidence),
    explanation,
  };
}