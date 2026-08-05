import type {
  ProductIntelligence,
  IntelligencePoint,
  IntelligenceTradeOff,
  RecommendationInsight,
} from "../types/ProductIntelligence";

import type {
  ProductIntelligenceInput,
  ProductIntelligenceProvider,
} from ".././types/ProductIntelligenceEngine";

type CameraAttributeMap =
  Record<
    string,
    unknown
  >;

function normalise(
  value:
    unknown,
): string {
  return String(
    value ??
    "",
  )
    .trim()
    .toLowerCase();
}

function normaliseMeaning(
  value: string,
): string {
  return normalise(
    value,
  )
    .replace(
      /\bno in-body image stabilisation\b/g,
      "no ibis",
    )
    .replace(
      /\bno in-body stabilisation\b/g,
      "no ibis",
    )
    .replace(
      /\bin-body image stabilisation\b/g,
      "ibis",
    )
    .replace(
      /\bin-body stabilisation\b/g,
      "ibis",
    );
}

function readString(
  attributes:
    CameraAttributeMap,

  keys:
    string[],
): string | undefined {
  for (
    const key of keys
  ) {
    const value =
      attributes[key];

    if (
      typeof value ===
        "string" &&
      value.trim()
    ) {
      return value.trim();
    }
  }

  return undefined;
}

function readNumber(
  attributes:
    CameraAttributeMap,

  keys:
    string[],
): number | undefined {
  for (
    const key of keys
  ) {
    const value =
      attributes[key];

    if (
      typeof value ===
        "number" &&
      Number.isFinite(
        value,
      )
    ) {
      return value;
    }

    if (
      typeof value ===
        "string"
    ) {
      const parsed =
        Number.parseFloat(
          value.replace(
            /[^0-9.-]+/g,
            "",
          ),
        );

      if (
        Number.isFinite(
          parsed,
        )
      ) {
        return parsed;
      }
    }
  }

  return undefined;
}

function readBoolean(
  attributes:
    CameraAttributeMap,

  keys:
    string[],
): boolean | undefined {
  for (
    const key of keys
  ) {
    const value =
      attributes[key];

    if (
      typeof value ===
      "boolean"
    ) {
      return value;
    }

    const normalised =
      normalise(
        value,
      );

    if (
      [
        "yes",
        "true",
        "included",
        "supported",
      ].includes(
        normalised,
      )
    ) {
      return true;
    }

    if (
      [
        "no",
        "false",
        "not included",
        "unsupported",
      ].includes(
        normalised,
      )
    ) {
      return false;
    }
  }

  return undefined;
}

function clampScore(
  value:
    number,
): number {
  const clamped =
    Math.max(
      0,
      Math.min(
        1,
        value,
      ),
    );

  return Math.round(
    clamped * 100,
  ) / 100;
}

function createPoint(
  title:
    string,

  explanation:
    string,

  importance:
    number,
): IntelligencePoint {
  return {
    title,

    explanation,

    importance:
      clampScore(
        importance,
      ),
  };
}

function getPriceDifference(
  input:
    ProductIntelligenceInput,
): number | undefined {
  if (
    input.currentPrice ===
      undefined ||
    input.fairPrice ===
      undefined ||
    input.fairPrice <= 0
  ) {
    return undefined;
  }

  return (
    input.currentPrice -
    input.fairPrice
  ) /
  input.fairPrice;
}

function getSensorType(
  attributes:
    CameraAttributeMap,
): string {
  return (
    readString(
      attributes,
      [
        "sensorType",
        "sensor",
        "sensorFormat",
        "format",
      ],
    ) ??
    "unknown"
  );
}

function trimEnding(
  value: string,
): string {
  return value
    .trim()
    .replace(
      /[.!?]+$/g,
      "",
    );
}

function isFullFrame(
  sensorType:
    string,
): boolean {
  const value =
    normalise(
      sensorType,
    );

  return (
    value.includes(
      "full frame",
    ) ||
    value.includes(
      "full-frame",
    )
  );
}

function isApsc(
  sensorType:
    string,
): boolean {
  const value =
    normalise(
      sensorType,
    );

  return (
    value.includes(
      "aps-c",
    ) ||
    value.includes(
      "apsc",
    )
  );
}

function isMicroFourThirds(
  sensorType:
    string,
): boolean {
  const value =
    normalise(
      sensorType,
    );

  return (
    value.includes(
      "micro four thirds",
    ) ||
    value.includes(
      "micro-four-thirds",
    ) ||
    value.includes(
      "mft",
    )
  );
}
function lowerFirst(
  value: string,
): string {
  if (!value) {
    return value;
  }

  return (
    value.charAt(0)
      .toLowerCase() +
    value.slice(1)
  );
}
function buildRelationships(
  attributes:
    CameraAttributeMap,

  key:
    string,
): ProductIntelligence[
  "upgrades"
] {
  const relationships =
    attributes[key];

  if (
    !Array.isArray(
      relationships,
    )
  ) {
    return [];
  }

  return relationships.flatMap(
    (relationship) => {
      if (
        !relationship ||
        typeof relationship !==
          "object"
      ) {
        return [];
      }

      const value =
        relationship as {
          productId?:
            unknown;

          reason?:
            unknown;
        };

      if (
        typeof value.productId !==
          "string" ||
        typeof value.reason !==
          "string"
      ) {
        return [];
      }

      return [
        {
          productId:
            value.productId,

          reason:
            value.reason,
        },
      ];
    },
  );
}
function buildAlternatives(
  attributes:
    CameraAttributeMap,
): ProductIntelligence[
  "alternatives"
] {
  const alternatives =
    attributes.alternatives;

  if (
    !Array.isArray(
      alternatives,
    )
  ) {
    return [];
  }

  return alternatives.flatMap(
    (alternative) => {
      if (
        !alternative ||
        typeof alternative !==
          "object"
      ) {
        return [];
      }

      const value =
        alternative as {
          productId?:
            unknown;

          reason?:
            unknown;
        };

      if (
        typeof value.productId !==
          "string" ||
        typeof value.reason !==
          "string"
      ) {
        return [];
      }

      return [
        {
          productId:
            value.productId,

          reason:
            value.reason,
        },
      ];
    },
  );
}
function removeDuplicateStrings(
  values:
    string[],
): string[] {
  const seen =
    new Set<string>();

  return values.filter(
    (value) => {
      const key =
        normaliseMeaning(
          value,
        )
          .replace(
            /[^a-z0-9\s]/g,
            "",
          )
          .replace(
            /\s+/g,
            " ",
          )
          .trim();

      if (
        !key ||
        seen.has(
          key,
        )
      ) {
        return false;
      }

      seen.add(
        key,
      );

      return true;
    },
  );
}

function haveSharedStrengthMeaning(
  first:
    string,

  second:
    string,
): boolean {
  const concepts = [
    [
      "autofocus",
      "subject tracking",
      "eye detection",
      "eye autofocus",
    ],

    [
      "ibis",
      "stabilisation",
      "stabilization",
    ],

    [
      "burst",
      "continuous shooting",
      "frames per second",
    ],

    [
      "portable",
      "lightweight",
      "compact",
      "easy to carry",
    ],

    [
      "weather",
      "sealed",
      "weather-resistant",
    ],

    [
      "video",
      "4k",
      "full hd",
      "6k",
      "8k",
    ],

    [
      "lens ecosystem",
      "lens availability",
      "lens mount",
      "e-mount",
      "rf mount",
      "z mount",
    ],
  ];

  return concepts.some(
    (conceptGroup) => {
      const firstMatches =
        conceptGroup.some(
          (concept) =>
            first.includes(
              concept,
            ),
        );

      const secondMatches =
        conceptGroup.some(
          (concept) =>
            second.includes(
              concept,
            ),
        );

      return (
        firstMatches &&
        secondMatches
      );
    },
  );
}

function buildStrengths(
  input:
    ProductIntelligenceInput,

  attributes:
    CameraAttributeMap,
): IntelligencePoint[] {
  const strengths:
    IntelligencePoint[] = [];

  const canonicalStrengths =
    readStringArray(
      attributes,
      "canonicalStrengths",
    );

  canonicalStrengths.forEach(
    (
      strength,
      index,
    ) => {
      strengths.push(
        createPoint(
          `Verified strength ${index + 1}`,

          strength,

          0.92,
        ),
      );
    },
  );

  const autofocus =
    readString(
      attributes,
      [
        "autofocusSystem",
        "autofocus",
        "afSystem",
      ],
    );

  const ibis =
    readBoolean(
      attributes,
      [
        "ibis",
        "inBodyStabilisation",
        "imageStabilisation",
      ],
    );

  const burstRate =
    readNumber(
      attributes,
      [
        "burstRate",
        "continuousShootingFps",
        "fps",
      ],
    );

  const weight =
    readNumber(
      attributes,
      [
        "weight",
        "weightGrams",
      ],
    );

  const weatherSealed =
    readBoolean(
      attributes,
      [
        "weatherSealed",
        "weatherResistance",
      ],
    );

  const videoResolution =
    readString(
      attributes,
      [
        "videoResolution",
        "maximumVideoResolution",
        "video",
      ],
    );

  const lensAvailability =
    readString(
      attributes,
      [
        "lensAvailability",
        "lensEcosystem",
        "mountEcosystem",
      ],
    );

  const calculatedStrengths:
    IntelligencePoint[] = [];

  if (autofocus) {
    calculatedStrengths.push(
      createPoint(
        "Autofocus capability",

        `${input.productName} uses ${lowerFirst(
          trimEnding(
            autofocus,
          ),
        )}. Reliable autofocus can reduce missed shots and make the camera easier to trust for moving subjects, family photography and everyday use.`,

        0.92,
      ),
    );
  }

  if (ibis) {
    calculatedStrengths.push(
      createPoint(
        "In-body image stabilisation",

        "In-body stabilisation can make handheld photography and video more forgiving, particularly in lower light or when using lenses without optical stabilisation.",

        0.88,
      ),
    );
  }

  if (
    burstRate !==
      undefined &&
    burstRate >= 10
  ) {
    calculatedStrengths.push(
      createPoint(
        "Fast continuous shooting",

        `A burst rate of around ${burstRate} frames per second can be valuable for sport, wildlife, children and other unpredictable subjects.`,

        0.82,
      ),
    );
  }

  if (
    weight !==
      undefined &&
    weight <= 550
  ) {
    calculatedStrengths.push(
      createPoint(
        "Portable body",

        `At roughly ${Math.round(
          weight,
        )}g, the body should be easier to carry for travel, street photography and long days out than many larger alternatives.`,

        0.76,
      ),
    );
  }

  if (weatherSealed) {
    calculatedStrengths.push(
      createPoint(
        "Weather-resistant construction",

        "Weather resistance adds reassurance for outdoor photographers, although it should not be treated as complete waterproofing.",

        0.72,
      ),
    );
  }

  if (videoResolution) {
    calculatedStrengths.push(
      createPoint(
        "Video capability",

        `The stated video capability is ${videoResolution}. This may make the camera more useful for hybrid creators, provided recording limits, crop factors and overheating behaviour are also suitable.`,

        0.74,
      ),
    );
  }

  if (lensAvailability) {
    calculatedStrengths.push(
      createPoint(
        "Lens ecosystem",

        lensAvailability,

        0.9,
      ),
    );
  }

  calculatedStrengths.forEach(
    (
      calculatedStrength,
    ) => {
      const calculatedMeaning =
        normaliseMeaning(
          [
            calculatedStrength.title,
            calculatedStrength
              .explanation,
          ].join(
            " ",
          ),
        );

      const alreadyCovered =
        strengths.some(
          (existingStrength) => {
            const existingMeaning =
              normaliseMeaning(
                [
                  existingStrength.title,
                  existingStrength
                    .explanation,
                ].join(
                  " ",
                ),
              );

            return (
              existingMeaning.includes(
                calculatedMeaning,
              ) ||
              calculatedMeaning.includes(
                existingMeaning,
              ) ||
              haveSharedStrengthMeaning(
                existingMeaning,
                calculatedMeaning,
              )
            );
          },
        );

      if (!alreadyCovered) {
        strengths.push(
          calculatedStrength,
        );
      }
    },
  );

  return strengths;
}

function buildWeaknesses(
  input:
    ProductIntelligenceInput,

  attributes:
    CameraAttributeMap,
): IntelligencePoint[] {
  const weaknesses:
    IntelligencePoint[] = [];

  const ibis =
    readBoolean(
      attributes,
      [
        "ibis",
        "inBodyStabilisation",
        "imageStabilisation",
      ],
    );

  const batteryLife =
    readNumber(
      attributes,
      [
        "batteryLife",
        "batteryShots",
        "cipaBatteryLife",
      ],
    );

  const weight =
    readNumber(
      attributes,
      [
        "weight",
        "weightGrams",
      ],
    );

  const singleCardSlot =
    readBoolean(
      attributes,
      [
        "singleCardSlot",
      ],
    );

  const cardSlots =
    readNumber(
      attributes,
      [
        "cardSlots",
        "memoryCardSlots",
      ],
    );

  const crop4k =
    readBoolean(
      attributes,
      [
        "cropped4k",
        "fourKCrop",
      ],
    );

  const priceDifference =
    getPriceDifference(
      input,
    );

  if (ibis === false) {
    weaknesses.push(
      createPoint(
        "No in-body stabilisation",
        "The lack of in-body stabilisation can make handheld video and slower shutter speeds less forgiving, especially with lenses that do not include optical stabilisation.",
        0.87,
      ),
    );
  }

  if (
    batteryLife !==
      undefined &&
    batteryLife < 350
  ) {
    weaknesses.push(
      createPoint(
        "Limited battery endurance",
        `A rated battery life of roughly ${Math.round(
          batteryLife,
        )} shots may make a spare battery worthwhile for travel, events or long shooting days.`,
        0.7,
      ),
    );
  }

  if (
    weight !==
      undefined &&
    weight >= 850
  ) {
    weaknesses.push(
      createPoint(
        "Heavy body",
        `At roughly ${Math.round(
          weight,
        )}g before a lens is attached, the camera may become tiring during travel or long handheld sessions.`,
        0.76,
      ),
    );
  }

  if (
    singleCardSlot ===
      true ||
    cardSlots === 1
  ) {
    weaknesses.push(
      createPoint(
        "Single memory-card slot",
        "A single card slot is normally acceptable for enthusiasts, but professionals covering weddings, events or paid work may prefer immediate in-camera backup.",
        0.68,
      ),
    );
  }

  if (crop4k) {
    weaknesses.push(
      createPoint(
        "Cropped 4K recording",
        "A crop in 4K video reduces the effective field of view, which can make wide-angle filming and handheld vlogging less convenient.",
        0.73,
      ),
    );
  }

  if (
    priceDifference !==
      undefined &&
    priceDifference > 0.12
  ) {
    weaknesses.push(
      createPoint(
        "Current price appears high",
        "The current price is meaningfully above the supplied fair-price estimate, so waiting for a promotion or comparing alternative retailers may provide better value.",
        0.9,
      ),
    );
  }

const canonicalWeaknesses =
  readStringArray(
    attributes,
    "canonicalWeaknesses",
  );

const existingWeaknesses =
  weaknesses.map(
    (weakness) =>
      normaliseMeaning(
        [
          weakness.title,
          weakness.explanation,
        ].join(
          " ",
        ),
      ),
  );

  canonicalWeaknesses
    .filter(
      (canonicalWeakness) => {
        const normalisedCanonical =
          normaliseMeaning(
            canonicalWeakness,
          );

        return !existingWeaknesses.some(
          (existingWeakness) =>
            existingWeakness.includes(
              normalisedCanonical,
            ) ||
            normalisedCanonical.includes(
              existingWeakness,
            ) ||
            (
              existingWeakness.includes(
                "no ibis",
              ) &&
              normalisedCanonical.includes(
                "no ibis",
              )
            ),
        );
      },
    )
    .slice(
      0,
      4,
    )
    .forEach(
      (
        weakness,
        index,
      ) => {
        weaknesses.push(
          createPoint(
            `Verified limitation ${index + 1}`,
            weakness,
            0.7,
          ),
        );
      },
    );

  return weaknesses;
}

function buildTradeOffs(
  attributes:
    CameraAttributeMap,
): IntelligenceTradeOff[] {
  const tradeOffs:
    IntelligenceTradeOff[] = [];

  const sensorType =
    getSensorType(
      attributes,
    );

  const weight =
    readNumber(
      attributes,
      [
        "weight",
        "weightGrams",
      ],
    );

  const ibis =
    readBoolean(
      attributes,
      [
        "ibis",
        "inBodyStabilisation",
        "imageStabilisation",
      ],
    );

  if (
    isFullFrame(
      sensorType,
    )
  ) {
    tradeOffs.push({
      gain:
        "Improved low-light potential, shallower depth of field and access to full-frame image quality.",

      sacrifice:
        "Bodies and lenses are often larger and more expensive than equivalent APS-C or Micro Four Thirds systems.",

      worthItFor: [
        "portrait photographers",
        "event photographers",
        "low-light photographers",
        "buyers who need stronger high-ISO performance",
      ],
    });
  }

  if (
    isApsc(
      sensorType,
    )
  ) {
    tradeOffs.push({
      gain:
        "A strong balance of image quality, portability and system cost.",

      sacrifice:
        "Less low-light flexibility and depth-of-field control than full frame at equivalent framing and aperture.",

      worthItFor: [
        "beginners",
        "travel photographers",
        "family photographers",
        "enthusiasts wanting a smaller system",
      ],
    });
  }

  if (
    isMicroFourThirds(
      sensorType,
    )
  ) {
    tradeOffs.push({
      gain:
        "Compact bodies and lenses, effective stabilisation and strong reach for wildlife or travel.",

      sacrifice:
        "Less high-ISO flexibility and shallow-depth-of-field potential than larger sensors.",

      worthItFor: [
        "travel photographers",
        "wildlife photographers",
        "video creators",
        "buyers prioritising portability",
      ],
    });
  }

  if (
    weight !==
      undefined &&
    weight <= 550
  ) {
    tradeOffs.push({
      gain:
        "A lighter camera that is easier to carry regularly.",

      sacrifice:
        "A smaller grip, fewer physical controls or reduced balance with large lenses.",

      worthItFor: [
        "travellers",
        "street photographers",
        "casual photographers",
      ],
    });
  }

  if (ibis === false) {
    tradeOffs.push({
      gain:
        "A simpler or more affordable body design.",

      sacrifice:
        "Less forgiving handheld video and low-light shooting with unstabilised lenses.",

      worthItFor: [
        "photographers using stabilised lenses",
        "buyers who mainly shoot in good light",
        "users who rarely record handheld video",
      ],
    });
  }

  return tradeOffs;
}

function buildRecommendations(
  input:
    ProductIntelligenceInput,

  attributes:
    CameraAttributeMap,
): RecommendationInsight[] {
  const recommendations:
    RecommendationInsight[] = [];

  const bestFor =
    readStringArray(
      attributes,
      "bestFor",
    );

  const buyingAdvice =
    readString(
      attributes,
      [
        "buyingAdvice",
      ],
    );

  bestFor.forEach(
    (
      audience,
      index,
    ) => {
      recommendations.push({
        audience:
          trimEnding(
            audience,
          ),

        recommendation:
          buyingAdvice
            ? buyingAdvice
            : `${input.productName} is worth considering when its strengths and main limitations match this buyer's intended use.`,
      });
    },
  );

  if (
    recommendations.length ===
    0
  ) {
    recommendations.push({
      audience:
        "general photographers",

      recommendation:
        `${input.productName} should be judged on how well its handling, autofocus, lens ecosystem and ownership cost match the buyer's normal photography rather than on specifications alone.`,
    });
  }

  return recommendations;
}

function calculateSuitability(
  attributes:
    CameraAttributeMap,
): ProductIntelligence["buyingSuitability"] {
  const autofocus =
    normalise(
      readString(
        attributes,
        [
          "autofocusSystem",
          "autofocus",
        ],
      ),
    );

  const weatherSealed =
    readBoolean(
      attributes,
      [
        "weatherSealed",
        "weatherResistance",
      ],
    );

  const cardSlots =
    readNumber(
      attributes,
      [
        "cardSlots",
        "memoryCardSlots",
      ],
    );

  let beginner =
    0.65;

  let enthusiast =
    0.72;

  let professional =
    0.45;

  if (
    autofocus.includes(
      "eye",
    ) ||
    autofocus.includes(
      "subject",
    ) ||
    autofocus.includes(
      "tracking",
    )
  ) {
    beginner +=
      0.18;

    enthusiast +=
      0.12;
  }

  if (weatherSealed) {
    enthusiast +=
      0.08;

    professional +=
      0.12;
  }

  if (
    cardSlots !==
      undefined &&
    cardSlots >= 2
  ) {
    professional +=
      0.22;
  }

  return {
    beginner:
      clampScore(
        beginner,
      ),

    enthusiast:
      clampScore(
        enthusiast,
      ),

    professional:
      clampScore(
        professional,
      ),
  };
}

function calculateConfidence(
  input:
    ProductIntelligenceInput,
): number {
  const attributes =
    input.attributes ??
    {};

  const attributeCount =
    Object.values(
      attributes,
    ).filter(
      (value) =>
        value !==
          undefined &&
        value !==
          null &&
        value !==
          "",
    ).length;

  const base =
    0.45;

  const attributeContribution =
    Math.min(
      0.4,
      attributeCount *
        0.025,
    );

  const priceContribution =
    input.currentPrice !==
        undefined &&
      input.fairPrice !==
        undefined
      ? 0.1
      : 0;

  return clampScore(
    base +
      attributeContribution +
      priceContribution,
  );
}
function readStringArray(
  attributes:
    CameraAttributeMap,

  key:
    string,
): string[] {
  const value =
    attributes[key];

  if (
    !Array.isArray(
      value,
    )
  ) {
    return [];
  }

  return value.filter(
    (
      item,
    ): item is string =>
      typeof item ===
        "string" &&
      Boolean(
        item.trim(),
      ),
  );
}

export class CameraIntelligenceProvider
  implements ProductIntelligenceProvider {
  readonly category =
    "camera" as const;

  supports(
    input:
      ProductIntelligenceInput,
  ): boolean {
    const category =
      normalise(
        input.category,
      );

    const productName =
      normalise(
        input.productName,
      );

    return (
      category.includes(
        "camera",
      ) &&
      !productName.includes(
        "lens",
      )
    );
  }

  analyse(
    input:
      ProductIntelligenceInput,
  ): ProductIntelligence {
    const attributes =
      input.attributes ??
      {};

    const strengths =
      buildStrengths(
        input,
        attributes,
      );

      const upgrades =
  buildRelationships(
    attributes,
    "upgrades",
  );

const accessories =
  buildRelationships(
    attributes,
    "accessories",
  );

const compatibleProducts =
  buildRelationships(
    attributes,
    "compatibleProducts",
  );

    const weaknesses =
      buildWeaknesses(
        input,
        attributes,
      );

    const tradeOffs =
      buildTradeOffs(
        attributes,
      );

    const recommendations =
      buildRecommendations(
        input,
        attributes,
      );

    const priceDifference =
      getPriceDifference(
        input,
      );

    const excellentUsed =
      input.condition ===
        "USED" &&
      (
        priceDifference ===
          undefined ||
        priceDifference <=
          -0.08
      );

    const worthBuyingNew =
      input.condition !==
        "USED" &&
      (
        priceDifference ===
          undefined ||
        priceDifference <=
          0.05
      );

    const waitForSale =
      priceDifference !==
        undefined &&
      priceDifference >
        0.1;

    const brand =
      input.brand?.trim() ||
      "the manufacturer";

      const alternatives =
  buildAlternatives(
    attributes,
  );

    const model =
      input.model?.trim() ||
      input.productName;
      const canonicalBuyingAdvice =
  readString(
    attributes,
    [
      "buyingAdvice",
    ],
  );

const canonicalAvoidIf =
  readStringArray(
    attributes,
    "avoidIf",
  );

const calculatedAvoidIf = [
  "The compatible lens system does not offer affordable options for the intended photography.",

  "The main weakness affects something the buyer will use regularly.",

  "The complete setup cost leaves too little budget for an appropriate lens.",
];

const avoidIf =
  removeDuplicateStrings([
    ...canonicalAvoidIf,
    ...calculatedAvoidIf,
  ]);

    return {
      buyingSuitability:
        calculateSuitability(
          attributes,
        ),

      valueAssessment: {
        excellentUsed,

        worthBuyingNew,

        waitForSale,
      },

      ownership: {
        hiddenCosts: [
          "Lenses can cost as much as or more than the camera body.",
          "A spare battery and suitable memory card may be needed immediately.",
          "Bags, filters, tripods, microphones or lighting can increase the complete setup cost.",
        ],

        upgradePath: [
          `Check that ${brand} offers suitable lenses for the photography the buyer wants to pursue.`,
          `Confirm whether ${model} shares batteries, accessories or lenses with likely future upgrades.`,
          "Consider whether the lens mount provides an affordable route from beginner equipment to more advanced options.",
        ],

        ecosystemNotes: [
          "The value of a camera body depends heavily on the cost and availability of compatible lenses.",
          "Third-party lens support can materially improve the long-term value of a camera system.",
          "Used-market availability affects the cost of future lenses, accessories and replacement bodies.",
        ],
      },

      strengths,

      weaknesses,

      tradeOffs,

      alternatives,

      upgrades,

accessories,

compatibleProducts,

      recommendations,

     buyingAdvice: {
  buyNow:
    waitForSale
      ? [
          canonicalBuyingAdvice,

          "The product may be suitable, but the current price appears high enough to justify comparing retailers or waiting for a promotion.",
        ]
          .filter(
            Boolean,
          )
          .join(
            " ",
          )
      : (
          canonicalBuyingAdvice ??
          "Buy when its autofocus, handling, lens system and main compromises clearly match the intended photography."
        ),

  wait:
    waitForSale
      ? "Wait for the price to move closer to the supplied fair-price estimate."
      : "Wait when the buyer has not yet confirmed which lenses or accessories will be needed.",

  avoidIf,
},

      confidence:
        calculateConfidence(
          input,
        ),
    };
  }
}