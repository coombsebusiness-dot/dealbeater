import type {
  ProductFingerprint,
} from "../../productFingerprint";

import type {
  ProductKnowledgeProvider,
} from "./provider";

import {
  findPanasonicCamera,
} from "../panasonic/lookup";

export const panasonicProvider: ProductKnowledgeProvider = {
  id: "panasonic",

  supports(
    fingerprint: ProductFingerprint
  ): boolean {
    return (
      fingerprint.brand === "panasonic" ||
      fingerprint.family?.toLowerCase().includes("lumix") === true
    );
  },

  getKnowledge(
    fingerprint: ProductFingerprint
  ) {
    console.log(
      "🟠 PANASONIC PROVIDER RECEIVED",
      JSON.stringify(fingerprint)
    );

    const camera =
      findPanasonicCamera(fingerprint);

    console.log(
      "🟠 PANASONIC LOOKUP RESULT",
      camera?.name ?? null
    );

    return {
      camera,
    };
  },
};
