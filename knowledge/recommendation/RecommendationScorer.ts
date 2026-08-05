import type {
  ProductRecommendation,
} from "@/knowledge/guides/factory/knowledge/KnowledgeContext";

import type {
  RecommendationCandidate,
  RecommendationFactor,
  RecommendationRequest,
  RecommendationScore,
} from "./RecommendationTypes";

function normalise(
  value:
    string | undefined,
): string {
  return (
    value ?? ""
  )
    .trim()
    .toLowerCase()
    .replace(
      /&/g,
      "and",
    )
    .replace(
      /['’]/g,
      "",
    )
    .replace(
      /[^a-z0-9£]+/g,
      " ",
    )
    .replace(
      /\s+/g,
      " ",
    )
    .trim();
}

function createTokens(
  values:
    Array<
      string | undefined
    >,
): string[] {
  const stopWords =
    new Set([
      "a",
      "an",
      "and",
      "best",
      "buy",
      "buying",
      "choose",
      "choosing",
      "for",
      "guide",
      "how",
      "of",
      "the",
      "to",
      "your",
    ]);

  return Array.from(
    new Set(
      values
        .flatMap(
          (value) =>
            normalise(
              value,
            ).split(
              " ",
            ),
        )
        .filter(
          (token) =>
            token.length > 2 &&
            !stopWords.has(
              token,
            ),
        ),
    ),
  );
}

function clampScore(
  value:
    number,
): number {
  return Math.max(
    -100,
    Math.min(
      100,
      Math.round(
        value * 100,
      ) / 100,
    ),
  );
}

function createFactor(
  factor:
    RecommendationFactor,
): RecommendationFactor {
  return {
    ...factor,

    score:
      clampScore(
        factor.score,
      ),
  };
}

function getCandidateText(
  product:
    ProductRecommendation,
): string {
  return normalise(
    [
      product.name,
      product.reason,
      product.buyingAdvice,
      ...(product.bestFor ?? []),
      ...(product.avoidIf ?? []),
      ...(product.strengths ?? []),
      ...(product.weaknesses ?? []),
    ].join(
      " ",
    ),
  );
}

function countTokenMatches(
  text:
    string,

  tokens:
    string[],
): number {
  return tokens.filter(
    (token) =>
      text.includes(
        token,
      ),
  ).length;
}

function createTopicFactor(
  request:
    RecommendationRequest,

  product:
    ProductRecommendation,
): RecommendationFactor | null {
  const tokens =
    createTokens([
      request.topic,
      request.recommendationTopic,
      request.primaryKeyword,
      ...(request.secondaryKeywords ?? []),
    ]);

  if (
    tokens.length ===
    0
  ) {
    return null;
  }

  const text =
    getCandidateText(
      product,
    );

  const matches =
    countTokenMatches(
      text,
      tokens,
    );

  if (
    matches ===
    0
  ) {
    return createFactor({
      kind:
        "PENALTY",

      name:
        "Weak topic match",

      score:
        -18,

      explanation:
        `${product.name} does not strongly match the guide topic.`,
    });
  }

  return createFactor({
    kind:
      "TOPIC",

    name:
      "Guide topic match",

    score:
      Math.min(
        30,
        10 +
          matches * 5,
      ),

    explanation:
      `${product.name} matches ${matches} important guide-topic signals.`,
  });
}

function createAudienceFactor(
  request:
    RecommendationRequest,

  product:
    ProductRecommendation,
): RecommendationFactor | null {
  const audienceTokens =
    createTokens([
      request.audience,
    ]);

  if (
    audienceTokens.length ===
    0
  ) {
    return null;
  }

  const bestForText =
    normalise(
      (
        product.bestFor ??
        []
      ).join(
        " ",
      ),
    );

  const avoidIfText =
    normalise(
      (
        product.avoidIf ??
        []
      ).join(
        " ",
      ),
    );

  const bestForMatches =
    countTokenMatches(
      bestForText,
      audienceTokens,
    );

  const avoidMatches =
    countTokenMatches(
      avoidIfText,
      audienceTokens,
    );

  if (
    avoidMatches >
    bestForMatches
  ) {
    return createFactor({
      kind:
        "PENALTY",

      name:
        "Audience conflict",

      score:
        -25,

      explanation:
        `${product.name} includes avoid conditions that conflict with the intended audience.`,
    });
  }

  if (
    bestForMatches ===
    0
  ) {
    return null;
  }

  return createFactor({
    kind:
      "AUDIENCE",

    name:
      "Audience fit",

    score:
      Math.min(
        28,
        14 +
          bestForMatches * 7,
      ),

    explanation:
      `${product.name} is explicitly suited to the intended audience.`,
  });
}

function createConfidenceFactor(
  product:
    ProductRecommendation,

  candidate:
    RecommendationCandidate,
): RecommendationFactor {
  const intelligenceConfidence =
    candidate.intelligence
      ?.confidence;

  const confidence =
    Math.max(
      product.confidence,
      intelligenceConfidence ??
        0,
    );

  return createFactor({
    kind:
      "CONFIDENCE",

    name:
      "Knowledge confidence",

    score:
      confidence * 15,

    explanation:
      `${product.name} has a verified confidence score of ${Math.round(
        confidence * 100,
      )}%.`,
  });
}

function createSuitabilityFactor(
  request:
    RecommendationRequest,

  candidate:
    RecommendationCandidate,
): RecommendationFactor | null {
  const suitability =
    candidate.intelligence
      ?.intelligence
      .buyingSuitability;

  if (!suitability) {
    return null;
  }

  const audience =
    normalise(
      request.audience,
    );

  let score =
    suitability.enthusiast;

  let label =
    "general suitability";

  if (
    audience.includes(
      "beginner",
    )
  ) {
    score =
      suitability.beginner;

    label =
      "beginner suitability";
  } else if (
    audience.includes(
      "professional",
    )
  ) {
    score =
      suitability.professional;

    label =
      "professional suitability";
  }

  return createFactor({
    kind:
      "SUITABILITY",

    name:
      label,

    score:
      score * 20,

    explanation:
      `${candidate.product.name} scored ${Math.round(
        score * 100,
      )}% for ${label}.`,
  });
}

function createValueFactor(
  candidate:
    RecommendationCandidate,
): RecommendationFactor | null {
  const value =
    candidate.intelligence
      ?.intelligence
      .valueAssessment;

  if (!value) {
    return null;
  }

  if (
    value.waitForSale
  ) {
    return createFactor({
      kind:
        "PENALTY",

      name:
        "Price concern",

      score:
        -12,

      explanation:
        `${candidate.product.name} currently looks expensive relative to its fair-price estimate.`,
    });
  }

  if (
    value.excellentUsed
  ) {
    return createFactor({
      kind:
        "VALUE",

      name:
        "Strong used value",

      score:
        16,

      explanation:
        `${candidate.product.name} appears especially attractive as a used purchase.`,
    });
  }

  if (
    value.worthBuyingNew
  ) {
    return createFactor({
      kind:
        "VALUE",

      name:
        "Reasonable new value",

      score:
        10,

      explanation:
        `${candidate.product.name} appears reasonably priced as a new purchase.`,
    });
  }

  return null;
}

function createSpecialistPenalty(
  request:
    RecommendationRequest,

  product:
    ProductRecommendation,
): RecommendationFactor | null {
  const topic =
    normalise(
      [
        request.topic,
        request.recommendationTopic,
        request.audience,
      ].join(
        " ",
      ),
    );

  const productText =
    getCandidateText(
      product,
    );

  const beginnerGuide =
    topic.includes(
      "beginner",
    ) ||
    topic.includes(
      "first",
    );

  const specialistTerms = [
    "wildlife",
    "sports",
    "aviation",
    "macro",
    "professional",
    "specialist",
    "super telephoto",
    "telephoto",
  ];

  const specialistProduct =
    specialistTerms.some(
      (term) =>
        productText.includes(
          term,
        ),
    );

  const everydayTerms = [
    "everyday",
    "family",
    "travel",
    "general",
    "beginner",
    "walk around",
    "walk-around",
  ];

  const broadlyUseful =
    everydayTerms.some(
      (term) =>
        productText.includes(
          term,
        ),
    );

  if (
    beginnerGuide &&
    specialistProduct &&
    !broadlyUseful
  ) {
    return createFactor({
      kind:
        "PENALTY",

      name:
        "Too specialist",

      score:
        -22,

      explanation:
        `${product.name} is too specialised to be a strong general first choice.`,
    });
  }

  return null;
}

function createProductTypeFactor(
  request:
    RecommendationRequest,

  product:
    ProductRecommendation,
): RecommendationFactor | null {
  const topic =
    normalise(
      [
        request.topic,
        request.recommendationTopic,
      ].join(
        " ",
      ),
    );

  const productText =
    getCandidateText(
      product,
    );

  if (
    topic.includes(
      "first camera lens",
    ) ||
    topic.includes(
      "beginner lens",
    )
  ) {
    const standardZoom =
      productText.includes(
        "standard zoom",
      ) ||
      productText.includes(
        "kit zoom",
      ) ||
      productText.includes(
        "everyday",
      ) ||
      productText.includes(
        "single lens",
      );

    if (
      standardZoom
    ) {
      return createFactor({
        kind:
          "PRODUCT_TYPE",

        name:
          "Strong first-lens format",

        score:
          18,

        explanation:
          `${product.name} offers a practical focal range for a first or general-purpose lens.`,
      });
    }
  }

  return null;
}

function scoreCandidate(
  request:
    RecommendationRequest,

  candidate:
    RecommendationCandidate,
): RecommendationScore {
  const factors:
    RecommendationFactor[] = [];

  const possibleFactors = [
    createTopicFactor(
      request,
      candidate.product,
    ),

    createAudienceFactor(
      request,
      candidate.product,
    ),

    createConfidenceFactor(
      candidate.product,
      candidate,
    ),

    createSuitabilityFactor(
      request,
      candidate,
    ),

    createValueFactor(
      candidate,
    ),

    createSpecialistPenalty(
      request,
      candidate.product,
    ),

    createProductTypeFactor(
      request,
      candidate.product,
    ),
  ];

  possibleFactors
    .filter(
      (
        factor,
      ): factor is RecommendationFactor =>
        Boolean(
          factor,
        ),
    )
    .forEach(
      (factor) => {
        factors.push(
          factor,
        );
      },
    );

  const positiveFactors =
    factors.filter(
      (factor) =>
        factor.score >= 0,
    );

  const penalties =
    factors.filter(
      (factor) =>
        factor.score < 0,
    );

  const positiveScore =
    positiveFactors.reduce(
      (
        total,
        factor,
      ) =>
        total +
        factor.score,
      0,
    );

  const penaltyScore =
    penalties.reduce(
      (
        total,
        factor,
      ) =>
        total +
        Math.abs(
          factor.score,
        ),
      0,
    );

  return {
    productId:
      candidate.product.slug ??
      normalise(
        candidate.product.name,
      ).replace(
        /\s+/g,
        "-",
      ),

    productName:
      candidate.product.name,

    slug:
      candidate.product.slug,

    totalScore:
      clampScore(
        positiveScore -
          penaltyScore,
      ),

    positiveScore:
      clampScore(
        positiveScore,
      ),

    penaltyScore:
      clampScore(
        penaltyScore,
      ),

    factors:
      positiveFactors,

    penalties,
  };
}

export class RecommendationScorer {
  score(
    request:
      RecommendationRequest,
  ): RecommendationScore[] {
    return request.candidates.map(
      (candidate) =>
        scoreCandidate(
          request,
          candidate,
        ),
    );
  }
}