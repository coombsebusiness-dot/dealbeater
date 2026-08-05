import type {
  LensProduct,
} from "@/knowledge/products/lenses/LensProduct";

import type {
  ProductIntelligenceInput,
} from "../types/ProductIntelligenceEngine";

export interface LensIntelligencePriceInput {
  currentPrice?:
    number;

  fairPrice?:
    number;

  condition?:
    ProductIntelligenceInput[
      "condition"
    ];
}

function joinStatements(
  values:
    string[] | undefined,
): string | undefined {
  if (
    !values ||
    values.length === 0
  ) {
    return undefined;
  }

  return values.join(
    " ",
  );
}

function createFocalLengthLabel(
  product:
    LensProduct,
): string {
  const {
    minimumMm,
    maximumMm,
  } =
    product.lens.focalLength;

  if (
    minimumMm ===
    maximumMm
  ) {
    return `${minimumMm}mm`;
  }

  return `${minimumMm}-${maximumMm}mm`;
}

function createApertureLabel(
  product:
    LensProduct,
): string {
  const {
    maximumWide,
    maximumTelephoto,
  } =
    product.lens.aperture;

  if (
    maximumWide ===
    maximumTelephoto
  ) {
    return `f/${maximumWide}`;
  }

  return `f/${maximumWide}-${maximumTelephoto}`;
}

function createRelationshipAttributes(
  product:
    LensProduct,
): Record<
  string,
  unknown
> {
  return {
    alternatives:
      product.relationships
        .alternatives,

    upgrades:
      product.relationships
        .upgrades,

    accessories:
      product.relationships
        .accessories,

    compatibleProducts:
      product.relationships
        .compatibleProducts,

    compatibleProductIds:
      product.compatibleProducts,
  };
}

export function createLensIntelligenceInput(
  product:
    LensProduct,

  priceInput:
    LensIntelligencePriceInput = {},
): ProductIntelligenceInput {
  return {
    productId:
      product.id,

    productName:
      product.fullName,

    category:
      "lens",

    brand:
      product.brand,

    model:
      product.model,

    currentPrice:
      priceInput.currentPrice,

    fairPrice:
      priceInput.fairPrice,

    condition:
      priceInput.condition ??
      "UNKNOWN",

    attributes: {
      productType:
        product.productType,

      status:
        product.status,

      releaseYear:
        product.releaseYear,

      mount:
        product.lens.mount,

      lensMount:
        product.lens.mount,

      format:
        product.lens.format,

      lensFormat:
        product.lens.format,

      lensType:
        product.lens.type,

      focalLength:
        createFocalLengthLabel(
          product,
        ),

      minimumFocalLengthMm:
        product.lens
          .focalLength
          .minimumMm,

      maximumFocalLengthMm:
        product.lens
          .focalLength
          .maximumMm,

      maximumAperture:
        createApertureLabel(
          product,
        ),

      maximumApertureWide:
        product.lens
          .aperture
          .maximumWide,

      maximumApertureTelephoto:
        product.lens
          .aperture
          .maximumTelephoto,

      minimumAperture:
        product.lens
          .aperture
          .minimum,

      stabilised:
        product.lens
          .stabilised,

      autofocus:
        product.lens
          .autofocus,

      weatherSealed:
        product.lens
          .weatherSealed,

      minimumFocusDistanceMetres:
        product.lens
          .minimumFocusDistanceMetres,

      maximumMagnification:
        product.lens
          .maximumMagnification,

      filterThreadMm:
        product.lens
          .filterThreadMm,

      weightGrams:
        product.lens
          .weightGrams,

      canonicalDescription:
        product.description,

      canonicalStrengths:
        product.strengths,

      canonicalWeaknesses:
        product.weaknesses,

      bestFor:
        product.bestFor,

      avoidIf:
        product.avoidIf,

      buyingAdvice:
        product.buyingAdvice,

      sources:
        product.sources,

      sourceConfidence:
        product.confidence,

      strengthsSummary:
        joinStatements(
          product.strengths,
        ),

      weaknessesSummary:
        joinStatements(
          product.weaknesses,
        ),

      ...createRelationshipAttributes(
        product,
      ),
    },
  };
}