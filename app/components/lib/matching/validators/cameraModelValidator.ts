import type {
  ProductFingerprint,
} from "../productFingerprint";

import type {
  ValidationResult,
} from "./types";

function romanToNumber(
  value: string
): string {
  return value
    .replace(/\bviii\b/g, "8")
    .replace(/\bvii\b/g, "7")
    .replace(/\bvi\b/g, "6")
    .replace(/\biv\b/g, "4")
    .replace(/\biii\b/g, "3")
    .replace(/\bii\b/g, "2")
    .replace(/\bv\b/g, "5");
}

function normaliseCameraModel(
  value: string | null | undefined
): string {
  if (!value) {
    return "";
  }

  let normalised = value
    .toLowerCase()
    .replace(/\bsony\b/g, "")
    .replace(/\balpha\b/g, "")
    .replace(/\bcanon\b/g, "")
    .replace(/\beos\b/g, "")
    .replace(/\bnikon\b/g, "")
    .replace(/\bfujifilm\b/g, "")
    .replace(/\bfuji\b/g, "")
    .replace(/\bpanasonic\b/g, "")
    .replace(/\blumix\b/g, "")
    .replace(/\bmark\b/g, "mk");

  normalised =
    romanToNumber(normalised);

  return normalised
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

/**
 * Converts common Sony manufacturer SKUs into
 * the equivalent public-facing camera model.
 *
 * Examples:
 * ILCE-7RM4  -> A7R4
 * ILCE-7RM4A -> A7R4
 * ILCE-7M4   -> A74
 * ILCE-7SM3  -> A7S3
 */
function normaliseSonySku(
  value: string
): string {
  const normalised = value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  const fullFrameMatch =
    normalised.match(
      /^ilce7([rs]?)m(\d+)[a-z]?$/
    );

  if (fullFrameMatch) {
    const series =
      fullFrameMatch[1] ?? "";

    const generation =
      fullFrameMatch[2] ?? "";

    return `a7${series}${generation}`;
  }

  const apscMatch =
    normalised.match(
      /^ilce(\d+)[a-z]?$/
    );

  if (apscMatch?.[1]) {
    return `a${apscMatch[1]}`;
  }

  return normalised;
}

function getCameraModelValues(
  fingerprint: ProductFingerprint
): string[] {
  const values = new Set<string>();

  const base =
    normaliseCameraModel(
      fingerprint.model.base
    );

  if (base) {
    values.add(base);
  }

  const sku =
    fingerprint.model.sku;

  if (sku) {
    const normalisedSku =
      normaliseCameraModel(sku);

    if (normalisedSku) {
      values.add(normalisedSku);
    }

    if (
      fingerprint.brand?.toLowerCase() ===
      "sony"
    ) {
      const sonySku =
        normaliseSonySku(sku);

      if (sonySku) {
        values.add(sonySku);
      }
    }
  }

  return Array.from(values);
}

export function validateCameraModel(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  const originalModels =
    getCameraModelValues(original);

  const candidateModels =
    getCameraModelValues(candidate);

  if (originalModels.length === 0) {
    return {
      name: "camera-model",
      passed: true,
      required: false,
      confidence: 100,
      reason: "Not specified",
    };
  }

  if (candidateModels.length === 0) {
    return {
      name: "camera-model",
      passed: false,
      required: true,
      confidence: 0,
      reason:
        `Camera model could not be verified as "${original.model.base}"`,
    };
  }

  const matched =
    originalModels.some(
      (originalModel) =>
        candidateModels.includes(
          originalModel
        )
    );
console.log(
  "📷 CAMERA MODEL VALIDATION",
  {
    original: {
      base: original.model.base,
      sku: original.model.sku,
      values: originalModels,
    },
    candidate: {
      base: candidate.model.base,
      sku: candidate.model.sku,
      values: candidateModels,
    },
    matched,
  }
);
  if (!matched) {
    return {
      name: "camera-model",
      passed: false,
      required: true,
      confidence: 0,
      reason:
        `Camera model mismatch: expected "${original.model.base}", found "${candidate.model.base}"`,
    };
  }

  return {
    name: "camera-model",
    passed: true,
    required: true,
    confidence: 100,
    reason:
      `Camera model matched: "${original.model.base}"`,
  };
}