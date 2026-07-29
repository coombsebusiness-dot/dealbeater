import type { ProductValidator } from "./types";

import { defaultValidators } from "./registry/default";
import { laptopValidators } from "./registry/laptops";

export function getValidators(
  productType?: string | null
): ProductValidator[] {
  switch (productType) {
    case "laptop":
      return laptopValidators;

    default:
      return defaultValidators;
  }
}