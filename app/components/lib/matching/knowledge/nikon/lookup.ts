import {
  nikonCameras,
} from "./cameras";

import type {
  NikonCameraKnowledge,
} from "./types";

/**
 * Normalises Nikon camera names so retailer formatting,
 * punctuation and common naming variations do not block matches.
 */
function normaliseNikonCameraModel(
  value: string
): string {
  return value
    .toLowerCase()
    .replace(/\bnikon\b/g, "")
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
 * a canonical Nikon camera.
 */
function getCameraIdentityValues(
  camera: NikonCameraKnowledge
): string[] {
 const values = [
  camera.name,
  camera.slug,
]
    .map(normaliseNikonCameraModel)
    .filter(Boolean);

  return Array.from(
    new Set(values)
  );
}

/**
 * Finds Nikon camera knowledge from a model name,
 * fingerprint value or retailer product title.
 */
export function getNikonCameraKnowledge(
  model: string | null | undefined
): NikonCameraKnowledge | null {
  if (!model) {
    return null;
  }

  const normalisedModel =
    normaliseNikonCameraModel(model);

  if (!normalisedModel) {
    return null;
  }

  for (const camera of nikonCameras) {
    const identityValues =
      getCameraIdentityValues(camera);

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