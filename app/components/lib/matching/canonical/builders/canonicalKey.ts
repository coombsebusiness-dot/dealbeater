import type { ProductFingerprint } from "../../productFingerprint";

export function buildCanonicalKey(
  fingerprint: ProductFingerprint
): string {

  return [
    fingerprint.brand,
    fingerprint.family,
    fingerprint.model.base,
    fingerprint.model.revision,
    fingerprint.model.variant,
    fingerprint.specs.memory,
    fingerprint.specs.storage,
    fingerprint.specs.colour,
  ]
    .filter(Boolean)
    .join("-")
    .toLowerCase()
    .replace(/\s+/g, "-");
}