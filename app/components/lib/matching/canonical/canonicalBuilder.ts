import type { ProductFingerprint } from "../productFingerprint";
import type { CanonicalProduct } from "./types";

export function buildCanonicalProduct(
  fingerprint: ProductFingerprint
): CanonicalProduct {

  const key = [
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

  return {
    key,

    brand: fingerprint.brand,

    family: fingerprint.family,

    productType: fingerprint.productType,

    displayName: [
      fingerprint.brand,
      fingerprint.family,
      fingerprint.model.base,
      fingerprint.model.revision,
      fingerprint.model.variant,
    ]
      .filter(Boolean)
      .join(" "),

    fingerprint,
  };
}