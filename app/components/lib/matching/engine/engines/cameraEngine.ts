import type {
  ProductEngine,
} from "../types";

import type {
  ProductValidator,
} from "../../validators/types";

import type {
  ProductFingerprint,
} from "../../productFingerprint";

import type {
  CanonicalProduct,
} from "../../canonical/types";

import {
  cameraValidators,
} from "../../validators/registry/cameras";

import {
  buildCanonicalProduct,
} from "../../canonical/canonicalBuilder";

export const cameraEngine:
  ProductEngine = {
  type: "camera",

  getValidators():
    ProductValidator[] {
    return cameraValidators;
  },

  buildCanonical(
    fingerprint: ProductFingerprint
  ): CanonicalProduct {
    return buildCanonicalProduct(
      fingerprint
    );
  },
};