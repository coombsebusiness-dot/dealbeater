import type {
  ProductFingerprint,
} from "../../productFingerprint";

import type {
  ProductKnowledgeProvider,
} from "./provider";

import {
  findSonyCamera,
} from "../sony/lookup";

export const sonyProvider:
  ProductKnowledgeProvider = {
  id: "sony-camera-provider",

  supports(
    fingerprint: ProductFingerprint
  ): boolean {
    return (
      fingerprint.productType === "camera" &&
      fingerprint.brand?.toLowerCase() === "sony"
    );
  },

  getKnowledge(
    fingerprint: ProductFingerprint
  ) {
    console.log(
      "🔵 SONY PROVIDER RECEIVED",
      JSON.stringify(fingerprint)
    );

    const camera =
      findSonyCamera(fingerprint);

    console.log(
      "🔵 SONY LOOKUP RESULT",
      camera?.name ?? null
    );

    return {
      camera,
    };
  },
};