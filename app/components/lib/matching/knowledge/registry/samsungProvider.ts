import type { ProductFingerprint }
  from "../../productFingerprint";

import type {
  ProductKnowledgeProvider
} from "./provider";

import {
  getSamsungPhoneKnowledge
} from "../samsung/lookup";

export const samsungProvider:
ProductKnowledgeProvider = {

  id: "samsung",

  supports(
    fingerprint: ProductFingerprint
  ) {

    return (
      fingerprint.brand === "samsung"
    );

  },

  getKnowledge(
    fingerprint: ProductFingerprint
  ) {

    return {

      phone:
        getSamsungPhoneKnowledge(
          fingerprint.model.variant
        )

    };

  }

};