import type {
  IntelligencePoint,
  IntelligenceTradeOff,
  ProductIntelligence,
  RecommendationInsight,
} from "../types/ProductIntelligence";

import type {
  ProductIntelligenceInput,
  ProductIntelligenceProvider,
} from "../types/ProductIntelligenceEngine";

type LensAttributeMap =
  Record<
    string,
    unknown
  >;

function normalise(
  value: unknown,
): string {
  return String(
    value ?? "",
  )
    .trim()
    .toLowerCase();
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

function clampScore(
  value: number,
): number {
  return Math.round(
    Math.max(
      0,
      Math.min(
        1,
        value,
      ),
    ) * 100,
  ) / 100;
}

function readString(
  attributes:
    LensAttributeMap,

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
    LensAttributeMap,

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
    LensAttributeMap,

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

    const text =
      normalise(
        value,
      );

    if (
      [
        "true",
        "yes",
        "supported",
        "included",
      ].includes(
        text,
      )
    ) {
      return true;
    }

    if (
      [
        "false",
        "no",
        "unsupported",
        "not included",
      ].includes(
        text,
      )
    ) {
      return false;
    }
  }

  return undefined;
}

function readStringArray(
  attributes:
    LensAttributeMap,

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

function createPoint(
  title: string,
  explanation: string,
  importance: number,
): IntelligencePoint {
  return {
    title,

    explanation:
      explanation.trim(),

    importance:
      clampScore(
        importance,
      ),
  };
}

function mapCanonicalPoints(
  values: string[],
  titlePrefix: string,
  importance: number,
): IntelligencePoint[] {
  return values.map(
    (
      explanation,
      index,
    ) =>
      createPoint(
        `${titlePrefix} ${index + 1}`,
        explanation,
        importance,
      ),
  );
}

function readRelationships(
  attributes:
    LensAttributeMap,

  key:
    string,
): ProductIntelligence[
  "upgrades"
] {
  const value =
    attributes[key];

  if (
    !Array.isArray(
      value,
    )
  ) {
    return [];
  }

  return value.flatMap(
    (relationship) => {
      if (
        !relationship ||
        typeof relationship !==
          "object"
      ) {
        return [];
      }

      const candidate =
        relationship as {
          productId?:
            unknown;

          reason?:
            unknown;
        };

      if (
        typeof candidate
          .productId !==
          "string" ||
        typeof candidate
          .reason !==
          "string"
      ) {
        return [];
      }

      return [
        {
          productId:
            candidate.productId,

          reason:
            candidate.reason,
        },
      ];
    },
  );
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

function buildTradeOffs(
  attributes:
    LensAttributeMap,
): IntelligenceTradeOff[] {
  const tradeOffs:
    IntelligenceTradeOff[] = [];

  const lensType =
    normalise(
      readString(
        attributes,
        [
          "lensType",
        ],
      ),
    );

  const aperture =
    readNumber(
      attributes,
      [
        "maximumApertureWide",
      ],
    );

  const stabilised =
    readBoolean(
      attributes,
      [
        "stabilised",
        "stabilized",
      ],
    );

  const weatherSealed =
    readBoolean(
      attributes,
      [
        "weatherSealed",
      ],
    );

  const weight =
    readNumber(
      attributes,
      [
        "weightGrams",
      ],
    );

  if (
    lensType ===
    "prime"
  ) {
    tradeOffs.push({
      gain:
        "A bright aperture, compact design and strong optical performance are often available for less money than an equivalent premium zoom.",

      sacrifice:
        "The fixed focal length requires the photographer to move position and provides less framing flexibility.",

      worthItFor: [
        "street photographers",
        "portrait photographers",
        "low-light photographers",
        "beginners learning composition",
      ],
    });
  }

  if (
    lensType ===
    "zoom"
  ) {
    tradeOffs.push({
      gain:
        "A zoom range provides more framing flexibility without changing lenses.",

      sacrifice:
        "Zoom lenses are often larger, heavier or slower than comparable prime lenses.",

      worthItFor: [
        "travel photographers",
        "family photographers",
        "event photographers",
        "buyers who value convenience",
      ],
    });
  }

  if (
    aperture !==
      undefined &&
    aperture <= 2
  ) {
    tradeOffs.push({
      gain:
        "The bright maximum aperture provides stronger low-light capability and greater control over background separation.",

      sacrifice:
        "Bright lenses can cost more and may provide less focal-length flexibility than slower zoom alternatives.",

      worthItFor: [
        "indoor photographers",
        "portrait photographers",
        "street photographers",
        "low-light photographers",
      ],
    });
  }

  if (
    stabilised ===
    true
  ) {
    tradeOffs.push({
      gain:
        "Optical stabilisation makes slower shutter speeds and handheld video more forgiving.",

      sacrifice:
        "Stabilised lenses may cost more or be slightly larger than unstabilised alternatives.",

      worthItFor: [
        "owners of cameras without IBIS",
        "travel photographers",
        "handheld video users",
        "low-light photographers",
      ],
    });
  }

  if (
    weatherSealed ===
    false
  ) {
    tradeOffs.push({
      gain:
        "The simpler construction may help keep the lens smaller or more affordable.",

      sacrifice:
        "The lens provides less reassurance in rain, dust or demanding outdoor conditions.",

      worthItFor: [
        "indoor photographers",
        "casual photographers",
        "buyers who mainly shoot in controlled conditions",
      ],
    });
  }

  if (
    weight !==
      undefined &&
    weight <= 250
  ) {
    tradeOffs.push({
      gain:
        "The lightweight design makes the lens easier to carry and balance on a compact camera body.",

      sacrifice:
        "A compact design may provide fewer controls, less robust construction or a narrower specialist feature set.",

      worthItFor: [
        "travellers",
        "street photographers",
        "beginners",
        "everyday photographers",
      ],
    });
  }

  return tradeOffs;
}

function buildRecommendations(
  input:
    ProductIntelligenceInput,

  attributes:
    LensAttributeMap,
): RecommendationInsight[] {
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

  if (
    bestFor.length ===
    0
  ) {
    return [
      {
        audience:
          "general photographers",

        recommendation:
          buyingAdvice ??
          `${input.productName} should only be shortlisted when its focal length, aperture, mount and main compromises match the intended photography.`,
      },
    ];
  }

  return bestFor.map(
    (audience) => ({
      audience:
        trimEnding(
          audience,
        ),

      recommendation:
        buyingAdvice ??
        `${input.productName} is worth considering when its focal length and main strengths suit this intended use.`,
    }),
  );
}

function calculateSuitability(
  attributes:
    LensAttributeMap,
): ProductIntelligence[
  "buyingSuitability"
] {
  const bestFor =
    readStringArray(
      attributes,
      "bestFor",
    )
      .join(
        " ",
      )
      .toLowerCase();

  const lensType =
    normalise(
      readString(
        attributes,
        [
          "lensType",
        ],
      ),
    );

  const weatherSealed =
    readBoolean(
      attributes,
      [
        "weatherSealed",
      ],
    );

  let beginner =
    0.62;

  let enthusiast =
    0.72;

  let professional =
    0.42;

  if (
    bestFor.includes(
      "beginner",
    ) ||
    bestFor.includes(
      "everyday",
    ) ||
    bestFor.includes(
      "family",
    )
  ) {
    beginner +=
      0.22;
  }

  if (
    bestFor.includes(
      "street",
    ) ||
    bestFor.includes(
      "portrait",
    ) ||
    bestFor.includes(
      "travel",
    )
  ) {
    enthusiast +=
      0.12;
  }

  if (
    lensType ===
    "zoom"
  ) {
    beginner +=
      0.06;
  }

  if (
    weatherSealed
  ) {
    enthusiast +=
      0.06;

    professional +=
      0.16;
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
    input.attributes ?? {};

  const sourceConfidence =
    readNumber(
      attributes,
      [
        "sourceConfidence",
      ],
    );

  if (
    sourceConfidence !==
    undefined
  ) {
    return clampScore(
      sourceConfidence,
    );
  }

  const populatedAttributes =
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

  return clampScore(
    0.5 +
      Math.min(
        0.4,
        populatedAttributes *
          0.02,
      ),
  );
}

function removeDuplicateStrings(
  values: string[],
): string[] {
  const seen =
    new Set<string>();

  return values.filter(
    (value) => {
      const key =
        normalise(
          value,
        )
          .replace(
            /[^a-z0-9\s]/g,
            "",
          )
          .replace(
            /\s+/g,
            " ",
          );

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

export class LensIntelligenceProvider
  implements ProductIntelligenceProvider {
  readonly category =
    "lens" as const;

  supports(
    input:
      ProductIntelligenceInput,
  ): boolean {
    const category =
      normalise(
        input.category,
      );

    return (
      category.includes(
        "lens",
      ) ||
      normalise(
        input.productName,
      ).includes(
        "lens",
      ) ||
      /\b\d{1,3}(?:-\d{1,3})?mm\b/i.test(
        input.productName,
      )
    );
  }

  analyse(
    input:
      ProductIntelligenceInput,
  ): ProductIntelligence {
    const attributes =
      input.attributes ?? {};

    const canonicalStrengths =
      readStringArray(
        attributes,
        "canonicalStrengths",
      );

    const canonicalWeaknesses =
      readStringArray(
        attributes,
        "canonicalWeaknesses",
      );

    const canonicalAvoidIf =
      readStringArray(
        attributes,
        "avoidIf",
      );

    const canonicalBuyingAdvice =
      readString(
        attributes,
        [
          "buyingAdvice",
        ],
      );

    const strengths =
      mapCanonicalPoints(
        canonicalStrengths,
        "Verified strength",
        0.92,
      );

    const weaknesses =
      mapCanonicalPoints(
        canonicalWeaknesses,
        "Verified limitation",
        0.9,
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

    const alternatives =
      readRelationships(
        attributes,
        "alternatives",
      );

    const upgrades =
      readRelationships(
        attributes,
        "upgrades",
      );

    const accessories =
      readRelationships(
        attributes,
        "accessories",
      );

    const compatibleProducts =
      readRelationships(
        attributes,
        "compatibleProducts",
      );

    const priceDifference =
      getPriceDifference(
        input,
      );

    const waitForSale =
      priceDifference !==
        undefined &&
      priceDifference >
        0.1;

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

    const mount =
      readString(
        attributes,
        [
          "mount",
          "lensMount",
        ],
      );

    const filterThread =
      readNumber(
        attributes,
        [
          "filterThreadMm",
        ],
      );

    const hiddenCosts =
      removeDuplicateStrings([
        filterThread
          ? `Filters must match the lens's ${filterThread}mm filter thread.`
          : "",

        "A lens hood, protective storage or suitable filters may add to the complete purchase cost.",

        "Compatibility should be confirmed before buying because lenses with similar names may use different mounts or sensor formats.",
      ]);

    const upgradePath =
      upgrades.map(
        (relationship) =>
          relationship.reason,
      );

    const ecosystemNotes =
      removeDuplicateStrings([
        mount
          ? `${input.productName} uses the ${mount} mount.`
          : "",

        ...compatibleProducts.map(
          (relationship) =>
            relationship.reason,
        ),
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
        hiddenCosts,

        upgradePath,

        ecosystemNotes,
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

                "The lens may be suitable, but its current price is high enough to justify comparing retailers or waiting for a promotion.",
              ]
                .filter(
                  Boolean,
                )
                .join(
                  " ",
                )
            : (
                canonicalBuyingAdvice ??
                "Buy when the focal length, aperture, compatibility and main compromises match the photography you intend to do."
              ),

        wait:
          waitForSale
            ? "Wait for the price to move closer to the supplied fair-price estimate."
            : "Wait when you have not yet identified which focal length or limitation your current lens needs to improve.",

        avoidIf:
          removeDuplicateStrings([
            ...canonicalAvoidIf,

            "The lens mount or format is not fully compatible with the intended camera.",

            "The focal-length range does not suit the subjects you photograph most often.",
          ]),
      },

      confidence:
        calculateConfidence(
          input,
        ),
    };
  }
}