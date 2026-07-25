import type {
  ProductFingerprint,
  ProductModelFingerprint,
} from "./types";

import { normaliseTitle } from "./utils";

import { findBrand } from "./generic/brand";
import { detectCondition } from "./generic/condition";
import { extractColour } from "./generic/colour";
import { extractConnectivity } from "./generic/connectivity";
import { extractBundle } from "./generic/bundle";
import { createTokens } from "./generic/tokens";
import { detectProductType } from "./generic/productType";
import { extractCapacities } from "./generic/capacity";
import { extractSku } from "./generic/sku";
import { extractScreenSize } from "./generic/screenSize";
import {
  parseCategoryModel,
} from "./categories/model";

function createEmptyModel(): ProductModelFingerprint {
  return {
    base: null,
    revision: null,
    variant: null,
    sku: null,
  };
}

export function createProductFingerprintV3(
  title: string
): ProductFingerprint {
  const originalTitle = title.trim();

  const normalisedTitle =
    normaliseTitle(originalTitle);

  const productType =
    detectProductType(normalisedTitle);

  const capacities = extractCapacities(
    originalTitle,
    productType
  );

 const categoryModel =
  parseCategoryModel(
    originalTitle,
    productType
  );

const model: ProductModelFingerprint = {
  ...createEmptyModel(),
  ...categoryModel,
  sku:
    extractSku(
      originalTitle,
      productType
    ) ??
    categoryModel.sku ??
    null,
};

  return {
    originalTitle,
    normalisedTitle,

    brand: findBrand(originalTitle),
    family: null,
    productType,

    model,

    specs: {
      memory: capacities.memory,
      storage: capacities.storage,
      colour: extractColour(originalTitle),
      screenSize: extractScreenSize(
        originalTitle,
        productType
      ),
      connectivity:
        extractConnectivity(originalTitle),
    },

    condition:
      detectCondition(normalisedTitle),

    bundle:
      extractBundle(normalisedTitle),

    tokens:
      createTokens(normalisedTitle),
  };
}

export * from "./types";