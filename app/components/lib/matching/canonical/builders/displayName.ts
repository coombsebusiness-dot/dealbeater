import type { ProductFingerprint } from "../../productFingerprint";

export function buildDisplayName(
  fingerprint: ProductFingerprint
): string {

  return [
    fingerprint.brand,
    fingerprint.family,
    fingerprint.model.base,
    fingerprint.model.revision,
    fingerprint.model.variant,
  ]
    .filter(Boolean)
    .join(" ");
}