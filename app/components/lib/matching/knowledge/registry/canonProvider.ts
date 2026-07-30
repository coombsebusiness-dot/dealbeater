import type {
  ProductFingerprint,
} from "../../productFingerprint";

import type {
  ProductKnowledgeProvider,
} from "./provider";

import {
  getCanonCameraKnowledge,
} from "../canon/lookup";

export const canonProvider: ProductKnowledgeProvider = {
  id: "canon",

  supports(
    fingerprint: ProductFingerprint
  ) {
    return (
      fingerprint.brand
        ?.trim()
        .toLowerCase() ===
      "canon"
    );
  },

  getKnowledge(
    fingerprint: ProductFingerprint
  ) {
    const searchValue = [
      fingerprint.brand,
      fingerprint.family,
      fingerprint.model?.base,
      fingerprint.model?.revision,
      fingerprint.model?.variant,
    ]
      .filter(Boolean)
      .join(" ");

    return {
      camera:
        getCanonCameraKnowledge(
          searchValue
        ),
    };
  },
};