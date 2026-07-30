import {
  canonCameras,
} from "./cameras";

import type {
  CanonCameraKnowledge,
} from "./types";

/**
 * Normalises Canon camera model names so retailer
 * formatting differences do not affect matching.
 */
function normaliseCanonCameraModel(
  value: string
): string {
  return value
    .toLowerCase()
    .replace(/\bcanon\b/g, "")
    .replace(/\beos\b/g, "")
    .replace(/\bbody only\b/g, "")
    .replace(/\bmirrorless\b/g, "")
    .replace(/\bdigital camera\b/g, "")
    .replace(/\bcamera\b/g, "")
    .replace(/\bwith\b.*$/g, "")
    .replace(
      /\b\d+(\.\d+)?\s?(mp|megapixel|megapixels)\b/g,
      ""
    )
    .replace(/\bmark\b/g, "")
    .replace(/\bmk\b/g, "")
    .replace(/\biii\b/g, "3")
    .replace(/\bii\b/g, "2")
    .replace(/\biv\b/g, "4")
    .replace(/\bv\b/g, "5")
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

/**
 * Returns every exact identity that may represent
 * a canonical Canon camera.
 */
function getCanonCameraIdentityValues(
  camera: CanonCameraKnowledge
): string[] {
  const values = [
    camera.name,
    camera.slug,
  ]
    .map(normaliseCanonCameraModel)
    .filter(Boolean);

  return Array.from(
    new Set(values)
  );
}

/**
 * Finds Canon camera knowledge using a model name,
 * product fingerprint or retailer title.
 */
export function getCanonCameraKnowledge(
  model: string | null | undefined
): CanonCameraKnowledge | null {
  if (!model) {
    return null;
  }

  const normalisedModel =
    normaliseCanonCameraModel(model);

  if (!normalisedModel) {
    return null;
  }

  for (const camera of canonCameras) {
    const identityValues =
      getCanonCameraIdentityValues(camera);

    if (
      identityValues.some(
        (identity) =>
          normalisedModel === identity
      )
    ) {
      return camera;
    }
  }

  return null;
}