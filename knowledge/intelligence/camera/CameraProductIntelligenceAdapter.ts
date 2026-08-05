import type {
  CameraProduct,
} from "@/knowledge/products/cameras/CameraProduct";

import type {
  ProductIntelligenceInput,
} from "@/knowledge/intelligence";

export interface CameraIntelligencePriceInput {
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

function createLensEcosystemSummary(
  product:
    CameraProduct,
): string | undefined {
  const ecosystemStrength =
    product.strengths.find(
      (strength) => {
        const value =
          strength.toLowerCase();

        return (
          value.includes(
            "lens",
          ) ||
          value.includes(
            "mount",
          ) ||
          value.includes(
            "ecosystem",
          )
        );
      },
    );

  if (ecosystemStrength) {
    return ecosystemStrength;
  }

  const mount =
    product.specifications
      .lensMount;

  if (!mount) {
    return undefined;
  }

  return `${product.fullName} uses the ${mount} lens mount. Buyers should confirm that the system offers suitable and affordable lenses for their intended photography.`;
}

function createAutofocusSummary(
  product:
    CameraProduct,
): string | undefined {
  const autofocusStrength =
    product.strengths.find(
      (strength) => {
        const value =
          strength.toLowerCase();

        return (
          value.includes(
            "autofocus",
          ) ||
          value.includes(
            "subject tracking",
          ) ||
          value.includes(
            "eye",
          )
        );
      },
    );

  if (autofocusStrength) {
    return autofocusStrength;
  }

  const autofocus =
    product.camera
      ?.autofocus;

  if (!autofocus) {
    return undefined;
  }

  const details = [
    autofocus.rating
      ? `Autofocus rating ${autofocus.rating}/10`
      : undefined,

    autofocus.phaseDetectionPoints
      ? `${autofocus.phaseDetectionPoints} phase-detection points`
      : undefined,
  ].filter(
    (
      value,
    ): value is string =>
      Boolean(
        value,
      ),
  );

  return details.length > 0
    ? details.join(
        ", ",
      )
    : undefined;
}

function inferCardSlots(
  product:
    CameraProduct,
): number | undefined {
  const singleSlotWeakness =
    product.weaknesses.some(
      (weakness) =>
        weakness
          .toLowerCase()
          .includes(
            "single memory-card slot",
          ),
    );

  if (singleSlotWeakness) {
    return 1;
  }

  return undefined;
}

function inferBatteryLife(
  product:
    CameraProduct,
): number | undefined {
  const camera =
    product.camera as
      | {
          battery?: {
            ratedShots?:
              number;
          };
        }
      | undefined;

  return camera?.battery
    ?.ratedShots;
}

function createRelationshipAttributes(
  product:
    CameraProduct,
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
  };
}

export function createCameraIntelligenceInput(
  product:
    CameraProduct,

  priceInput:
    CameraIntelligencePriceInput = {},
): ProductIntelligenceInput {
  return {
    productId:
      product.id,

    productName:
      product.fullName,

    category:
      "camera",

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

      sensorType:
        product.specifications
          .sensorFormat,

      sensorFormat:
        product.specifications
          .sensorFormat,

      megapixels:
        product.specifications
          .megapixels,

      lensMount:
        product.specifications
          .lensMount,

      burstRate:
        product.specifications
          .maximumBurstRateFps,

      maximumVideoResolution:
        product.specifications
          .maximumVideoResolution,

      videoResolution:
        product.specifications
          .maximumVideoResolution,

      ibis:
        product.specifications
          .ibis,

      weatherSealed:
        product.specifications
          .weatherSealed,

      batteryModel:
        product.specifications
          .batteryModel,

      batteryLife:
        inferBatteryLife(
          product,
        ),

      weightGrams:
        product.specifications
          .bodyWeightGrams,

      cardSlots:
        inferCardSlots(
          product,
        ),

      autofocusSystem:
        createAutofocusSummary(
          product,
        ),

      lensAvailability:
        createLensEcosystemSummary(
          product,
        ),

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