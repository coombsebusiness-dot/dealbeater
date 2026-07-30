import type { ProductFingerprint } from "@/app/components/lib/matching/productFingerprint";
import type { CanonicalProduct } from "../types";

import { buildCanonicalKey } from "../builders/canonicalKey";
import { buildDisplayName } from "../builders/displayName";

export function buildCanonicalProduct(
  fingerprint: ProductFingerprint
): CanonicalProduct {

  return {

    key: buildCanonicalKey(fingerprint),

    brand: fingerprint.brand,

    family: fingerprint.family,

    productType: fingerprint.productType,

    displayName: buildDisplayName(fingerprint),

    fingerprint,
  };
}