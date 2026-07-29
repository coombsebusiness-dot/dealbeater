import type { ProductType } from "../productTypeClassifier";
import type { ProductEngine } from "./types";

import { defaultEngine } from "./engines/defaultEngine";
import { laptopEngine } from "./engines/laptopEngine";

const engines = new Map<
  ProductType,
  ProductEngine
>([
  ["laptop", laptopEngine],
]);

export function getProductEngine(
  productType?: ProductType | null
): ProductEngine {
  if (!productType) {
    return defaultEngine;
  }

  return engines.get(productType) ?? defaultEngine;
}