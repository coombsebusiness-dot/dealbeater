import type { ProductEngine } from "../types";
import type { ProductValidator } from "../../validators/types";

import { defaultValidators } from "../../validators/registry/default";

export const defaultEngine: ProductEngine = {
  type: "default",

  getValidators(): ProductValidator[] {
    return defaultValidators;
  },
};