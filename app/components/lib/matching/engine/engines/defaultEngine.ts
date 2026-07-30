import type { ProductEngine } from "../types";
import type { ProductValidator } from "../../validators/types";
import { buildCanonicalProduct } from "../../canonical/canonicalBuilder";
import { defaultValidators } from "../../validators/registry/default";

export const defaultEngine: ProductEngine = {
  type: "default",

  getValidators(): ProductValidator[] {
    return defaultValidators;
  },
  buildCanonical(fingerprint) {
    return buildCanonicalProduct(fingerprint);
},
};
