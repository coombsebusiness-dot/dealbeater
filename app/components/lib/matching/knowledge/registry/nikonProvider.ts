import type {
  ProductFingerprint,
} from "../../productFingerprint";

import type {
  ProductKnowledgeProvider,
} from "./provider";

import {
  getNikonCameraKnowledge,
} from "../nikon/lookup";

export const nikonProvider: ProductKnowledgeProvider = {
  id: "nikon",

  supports(
    fingerprint: ProductFingerprint
  ): boolean {
    return (
      fingerprint.brand
        ?.toLowerCase() === "nikon"
    );
  },

  getKnowledge(
    fingerprint: ProductFingerprint
  ) {
    const fullModel = [
      fingerprint.model.base,
      fingerprint.model.revision,
      fingerprint.model.variant,
    ]
      .filter(Boolean)
      .join(" ");

    const searchableIdentity = [
      fingerprint.brand,
      fingerprint.family,
      fullModel,
    ]
      .filter(Boolean)
      .join(" ");

    const camera =
      getNikonCameraKnowledge(
        searchableIdentity
      );

    console.log(
      "NIKON_PROVIDER_DEBUG:",
      {
        brand:
          fingerprint.brand,

        family:
          fingerprint.family,

        modelBase:
          fingerprint.model.base,

        revision:
          fingerprint.model.revision,

        variant:
          fingerprint.model.variant,

        fullModel,

        searchableIdentity,

        cameraFound:
          camera?.name ?? null,
      }
    );

    return {
      camera,
    };
  },
};