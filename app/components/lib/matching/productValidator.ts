import type { ProductFingerprint } from "./productFingerprint";
import type { ProductValidation } from "./validators/types";

import { getProductEngine } from "./engine/engineManager";
import { runValidators } from "./validators/validatorRunner";

export function validateProduct(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ProductValidation {
  const engine = getProductEngine(
    original.productType
  );

  const validators =
    engine.getValidators();

  return runValidators(
    original,
    candidate,
    validators
  );
}