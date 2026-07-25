import type {
  ProductFingerprint,
  ProductModelFingerprint,
  ProductSpecsFingerprint,
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

import { parseCategoryModel } from "./categories/model";

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

  const categoryModel = parseCategoryModel(
    originalTitle,
    productType
  );

  const genericBundle =
    extractBundle(originalTitle);

  const bundle =
    categoryModel.bundle ?? genericBundle;

  const specs: ProductSpecsFingerprint = {
    storage: capacities.storage,
    memory: capacities.memory,

    colour: extractColour(originalTitle),

    screenSize: extractScreenSize(
      originalTitle,
      productType
    ),

    resolution: null,
    refreshRate: null,
    panelType: null,
    aspectRatio: null,

    ddrGeneration: null,
    memorySpeed: null,
    moduleCount: null,
    memoryFormFactor: null,
    latency: null,

    sensorSize: null,
    mount: null,
    megapixels: null,
    videoResolution: null,
    focalLength: null,
maximumAperture: null,
stabilisation: null,

processor: null,
graphics: null,
operatingSystem: null,


    connectivity:
      extractConnectivity(originalTitle),

    ...categoryModel.specs,
  };

  const model: ProductModelFingerprint = {
    ...createEmptyModel(),
    ...categoryModel.model,

    sku:
      extractSku(
        normalisedTitle,
        productType
      ) ??
      categoryModel.model?.sku ??
      null,
  };

  return {
  originalTitle,
  normalisedTitle,

  brand:
  categoryModel.brand ??
  findBrand(originalTitle),
  family: categoryModel.family ?? null,

  productType,

  model,
  specs,

  condition: detectCondition(normalisedTitle),

  bundle,

  tokens: createTokens(normalisedTitle),
};
}