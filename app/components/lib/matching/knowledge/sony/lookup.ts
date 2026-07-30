import type {
  ProductFingerprint,
} from "../../productFingerprint";

import {
  sonyCameras,
} from "./cameras";

import type {
  SonyCameraKnowledge,
} from "./types";

/**
 * Normalises Sony camera model text so retailer formatting
 * differences do not prevent a successful lookup.
 */
function normaliseSonyCameraModel(
  value: string
): string {
  return value
    .toLowerCase()
    .replace(/\bsony\b/g, "")
    .replace(/\balpha\b/g, "")
    .replace(/\bbody only\b/g, "")
    .replace(/\bmirrorless\b/g, "")
    .replace(/\bdigital camera\b/g, "")
    .replace(/\bcamera\b/g, "")
    .replace(
      /\b\d+(\.\d+)?\s?(mp|megapixel|megapixels)\b/g,
      ""
    )
    .replace(/\bmark\b/g, "")
    .replace(/\bmk\b/g, "")
    .replace(/\biii\b/g, "3")
    .replace(/\bsony\b/g, "")
    .replace(/\balpha\b/g, "")
.replace(/\bsony\b/g, "")
    .replace(/\balpha\b/g, "")

    .replace(/\bii\b/g, "2")
    .replace(/\biv\b/g, "4")
    .replace(/\bv\b/g, "5")
      .replace(/\bii\b/g, "2")
    .replace(/\biv\b/g, "4")
     .replace(/\bv\b/g, "5")
    .replace(/[^a-z0-9]+/g, "")
    
    .trim();
}

/**
 * Returns every exact identity that may represent
 * a canonical Sony camera.
 */
function getSonyCameraIdentityValues(
  camera: SonyCameraKnowledge
): string[] {
  const values = [
    camera.name,
    camera.slug,
    ...(camera.aliases ?? []),
  ]
    .map(normaliseSonyCameraModel)
    .filter(Boolean);

  return Array.from(
    new Set(values)
  );
}

/**
 * Returns all useful Sony model values from the fingerprint.
 */
function getSonyFingerprintValues(
  fingerprint: ProductFingerprint
): string[] {
  const values = [
    fingerprint.model?.base,
    fingerprint.model?.sku,
    fingerprint.model?.revision,
    fingerprint.model?.variant,
    fingerprint.family,
  ]
    .filter(
      (value): value is string =>
        typeof value === "string" &&
        value.trim().length > 0
    )
    .map(normaliseSonyCameraModel)
    .filter(Boolean);

  return Array.from(
    new Set(values)
  );
}

/**
 * Finds Sony camera knowledge from the complete
 * canonical product fingerprint.
 */
export function findSonyCamera(
  fingerprint: ProductFingerprint
): SonyCameraKnowledge | null {
  const searchableValues =
    getSonyFingerprintValues(
      fingerprint
    );

  if (searchableValues.length === 0) {
    return null;
  }

  console.log(
    "🔵 SONY LOOKUP SEARCH VALUES",
    searchableValues
  );

  for (const camera of sonyCameras) {
    const identityValues =
      getSonyCameraIdentityValues(
        camera
      );

    const matched =
      identityValues.some(
        identity =>
          searchableValues.includes(
            identity
          )
      );

    if (matched) {
      console.log(
        "✅ SONY CAMERA MATCHED",
        camera.name
      );

      return camera;
    }
  }

  console.log(
    "⚠️ SONY CAMERA NOT FOUND",
    {
      searchableValues,
      model:
        fingerprint.model?.base,
      sku:
        fingerprint.model?.sku,
    }
  );

  return null;
}