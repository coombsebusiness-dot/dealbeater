import type {
  StorageCapability,
  StorageCapabilityLevel,
} from "./StorageIntelligence";

export function clampStorageScore(
  score: number,
): number {
  return Math.max(
    0,
    Math.min(
      100,
      Math.round(score),
    ),
  );
}

export function getStorageCapabilityLevel(
  score: number,
): StorageCapabilityLevel {
  if (score >= 90) {
    return "EXCELLENT";
  }

  if (score >= 75) {
    return "GOOD";
  }

  if (score >= 55) {
    return "FAIR";
  }

  if (score > 0) {
    return "LIMITED";
  }

  return "UNKNOWN";
}

export function createStorageCapability(
  score: number,
  explanation: string,
): StorageCapability {
  const clampedScore =
    clampStorageScore(score);

  return {
    score: clampedScore,

    level:
      getStorageCapabilityLevel(
        clampedScore,
      ),

    explanation,
  };
}