import type { ProductType } from "../productTypeClassifier";
import type { ProductValidator } from "../validators/types";
import type { ProductFingerprint } from "../productFingerprint";
import type { CanonicalProduct } from "../canonical/types";

export interface ProductEngine {
  readonly type: ProductType | "default";

  getValidators(): ProductValidator[];

  buildCanonical(
    fingerprint: ProductFingerprint
  ): CanonicalProduct;
}