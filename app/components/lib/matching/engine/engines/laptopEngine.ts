import type { ProductEngine } from "../types";
import type { ProductValidator } from "../../validators/types";

import { laptopValidators } from "../../validators/registry/laptops";

export const laptopEngine: ProductEngine = {
  type: "laptop",

  getValidators(): ProductValidator[] {
    return laptopValidators;
  },
};