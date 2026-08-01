import type { ProductEngine } from "../types";
import type { ProductValidator } from "../../validators/types";
import type { ProductFingerprint } from "../../productFingerprint";
import type { CanonicalProduct } from "../../canonical/types";
import type {
  ReasoningInput,
} from "@/app/components/lib/matching/knowledge/engines/reasoning/ReasoningInput";
import { laptopValidators } from "../../validators/registry/laptops";
import { buildCanonicalProduct } from "../../canonical/canonicalBuilder";
import { normaliseLaptopFingerprint } from "../../normalisers/laptopNormaliser";

export const laptopEngine: ProductEngine = {
  type: "laptop",

  getValidators(): ProductValidator[] {
    return laptopValidators;
  },

  buildCanonical(
    fingerprint: ProductFingerprint
  ): CanonicalProduct {
    const normalisedFingerprint =
      normaliseLaptopFingerprint(fingerprint);

    return buildCanonicalProduct(
      normalisedFingerprint
    );
  },
};