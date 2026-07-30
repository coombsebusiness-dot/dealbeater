import type { ProductFingerprint } from "../../productFingerprint";

import type { ProductKnowledgeProvider }
  from "./provider";

import { getAppleChipKnowledge }
  from "../apple/lookup";

export const appleProvider:
ProductKnowledgeProvider = {

  id: "apple",

  supports(
    fingerprint: ProductFingerprint
  ) {

    return (
      fingerprint.brand === "apple"
    );

  },

  getKnowledge(
    fingerprint: ProductFingerprint
  ) {

    return {

      chip: getAppleChipKnowledge(
        fingerprint.model.variant
      )

    };

  }

};