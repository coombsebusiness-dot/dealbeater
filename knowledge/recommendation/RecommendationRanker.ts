import {
  getRecommendationCategoryLabel,
} from "./RecommendationCategories";

import type {
  RecommendationCategory,
} from "./RecommendationCategories";

import type {
  RankedRecommendation,
  RecommendationCandidate,
  RecommendationRequest,
  RecommendationScore,
} from "./RecommendationTypes";

interface RankerInput {
  request:
    RecommendationRequest;

  scores:
    RecommendationScore[];
}

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
      /[^a-z0-9]+/g,
      " ",
    )
    .replace(
      /\s+/g,
      " ",
    )
    .trim();
}

function getCandidateByScore(
  request:
    RecommendationRequest,

  score:
    RecommendationScore,
): RecommendationCandidate | undefined {
  return request.candidates.find(
    (candidate) => {
      const productId =
        candidate.product.slug ??
        normalise(
          candidate.product.name,
        ).replace(
          /\s+/g,
          "-",
        );

      return (
        productId ===
        score.productId
      );
    },
  );
}

function getCandidateText(
  candidate:
    RecommendationCandidate,
): string {
  return normalise(
    [
      candidate.product.name,
      candidate.product.reason,
      candidate.product.buyingAdvice,
      ...(candidate.product.bestFor ?? []),
      ...(candidate.product.strengths ?? []),
      ...(candidate.product.weaknesses ?? []),
    ].join(
      " ",
    ),
  );
}

function candidateMatchesCategory(
  category:
    RecommendationCategory,

  candidate:
    RecommendationCandidate,
): boolean {
  const text =
    getCandidateText(
      candidate,
    );

  switch (
    category
  ) {
    case "BEST_BEGINNER":
      return (
        text.includes(
          "beginner",
        ) ||
        text.includes(
          "first lens",
        ) ||
        text.includes(
          "first camera",
        ) ||
        text.includes(
          "easy to use",
        )
      );

    case "BEST_VALUE":
    case "BEST_BUDGET":
      return (
        text.includes(
          "value",
        ) ||
        text.includes(
          "budget",
        ) ||
        text.includes(
          "affordable",
        ) ||
        text.includes(
          "low cost",
        ) ||
        text.includes(
          "inexpensive",
        )
      );

    case "BEST_PRIME":
      return (
        text.includes(
          "prime",
        ) ||
        /\b\d{1,3}mm\b/.test(
          normalise(
            candidate.product.name,
          ),
        )
      );

    case "BEST_ZOOM":
      return (
        text.includes(
          "zoom",
        ) ||
        /\b\d{1,3}\s+\d{1,3}mm\b/.test(
          text,
        ) ||
        /\b\d{1,3}-\d{1,3}mm\b/.test(
          normalise(
            candidate.product.name,
          ),
        )
      );

    case "BEST_USED":
      return (
        text.includes(
          "used",
        ) ||
        candidate.intelligence
          ?.intelligence
          .valueAssessment
          .excellentUsed ===
          true
      );

    case "BEST_UPGRADE":
      return (
        text.includes(
          "upgrade",
        ) ||
        candidate.intelligence
          ?.intelligence
          .upgrades
          .length
          ? true
          : false
      );

    case "BEST_TRAVEL":
      return text.includes(
        "travel",
      );

    case "BEST_STREET":
      return text.includes(
        "street",
      );

    case "BEST_PORTRAIT":
      return text.includes(
        "portrait",
      );

    case "BEST_WILDLIFE":
      return (
        text.includes(
          "wildlife",
        ) ||
        text.includes(
          "bird",
        )
      );

    case "BEST_SPORTS":
      return (
        text.includes(
          "sports",
        ) ||
        text.includes(
          "sport",
        )
      );

    case "BEST_VIDEO":
      return (
        text.includes(
          "video",
        ) ||
        text.includes(
          "vlogging",
        )
      );

    case "SPECIALIST":
      return (
        text.includes(
          "specialist",
        ) ||
        text.includes(
          "macro",
        ) ||
        text.includes(
          "wildlife",
        ) ||
        text.includes(
          "sports",
        ) ||
        text.includes(
          "professional",
        )
      );

    case "ALTERNATIVE":
      return true;

    case "BEST_OVERALL":
      return true;
  }
}

function getReasons(
  score:
    RecommendationScore,
): string[] {
  return score.factors
    .sort(
      (
        factorA,
        factorB,
      ) =>
        factorB.score -
        factorA.score,
    )
    .slice(
      0,
      4,
    )
    .map(
      (factor) =>
        factor.explanation,
    );
}

function getCaveats(
  score:
    RecommendationScore,

  candidate:
    RecommendationCandidate,
): string[] {
  const penaltyCaveats =
    score.penalties.map(
      (penalty) =>
        penalty.explanation,
    );

  const productWeaknesses =
    candidate.product
      .weaknesses
      ?.slice(
        0,
        4,
      ) ??
    [];

  return Array.from(
    new Set([
      ...penaltyCaveats,
      ...productWeaknesses,
    ]),
  ).slice(
    0,
    5,
  );
}

function createRankedRecommendation(
  category:
    RecommendationCategory,

  rank:
    number,

  score:
    RecommendationScore,

  candidate:
    RecommendationCandidate,
): RankedRecommendation {
  return {
    category,

    label:
      getRecommendationCategoryLabel(
        category,
      ),

    rank,

    score,

    product:
      candidate.product,

    intelligence:
      candidate.intelligence,

    reasons:
      getReasons(
        score,
      ),

    caveats:
      getCaveats(
        score,
        candidate,
      ),
  };
}

function selectForCategory(
  category:
    RecommendationCategory,

  sortedScores:
    RecommendationScore[],

  request:
    RecommendationRequest,

  usedProductIds:
    Set<string>,
): {
  score:
    RecommendationScore;

  candidate:
    RecommendationCandidate;
} | null {
  for (
    const score of sortedScores
  ) {
    if (
      usedProductIds.has(
        score.productId,
      )
    ) {
      continue;
    }

    const candidate =
      getCandidateByScore(
        request,
        score,
      );

    if (!candidate) {
      continue;
    }

    if (
      candidateMatchesCategory(
        category,
        candidate,
      )
    ) {
      return {
        score,

        candidate,
      };
    }
  }

  return null;
}

function getPreferredCategories(
  request:
    RecommendationRequest,
): RecommendationCategory[] {
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

  const categories:
    RecommendationCategory[] = [
    "BEST_OVERALL",
  ];

  if (
    topic.includes(
      "beginner",
    ) ||
    topic.includes(
      "first",
    )
  ) {
    categories.push(
      "BEST_BEGINNER",
    );
  }

  if (
    topic.includes(
      "lens",
    )
  ) {
    categories.push(
      "BEST_ZOOM",
      "BEST_PRIME",
    );
  }

  if (
    topic.includes(
      "travel",
    )
  ) {
    categories.push(
      "BEST_TRAVEL",
    );
  }

  if (
    topic.includes(
      "street",
    )
  ) {
    categories.push(
      "BEST_STREET",
    );
  }

  if (
    topic.includes(
      "portrait",
    )
  ) {
    categories.push(
      "BEST_PORTRAIT",
    );
  }

  if (
    topic.includes(
      "wildlife",
    ) ||
    topic.includes(
      "bird",
    )
  ) {
    categories.push(
      "BEST_WILDLIFE",
    );
  }

  if (
    topic.includes(
      "sport",
    )
  ) {
    categories.push(
      "BEST_SPORTS",
    );
  }

  if (
    topic.includes(
      "video",
    ) ||
    topic.includes(
      "vlog",
    )
  ) {
    categories.push(
      "BEST_VIDEO",
    );
  }

  categories.push(
    "BEST_VALUE",
    "ALTERNATIVE",
  );

  return Array.from(
    new Set(
      categories,
    ),
  );
}

export class RecommendationRanker {
  rank({
    request,
    scores,
  }: RankerInput):
    RankedRecommendation[] {
    const sortedScores =
      [...scores]
        .filter(
          (score) =>
            score.totalScore >
            0,
        )
        .sort(
          (
            scoreA,
            scoreB,
          ) =>
            scoreB.totalScore -
            scoreA.totalScore,
        );

    const limit =
      Math.max(
        1,
        request.limit ??
          5,
      );

    const ranked:
      RankedRecommendation[] = [];

    const usedProductIds =
      new Set<string>();

    const preferredCategories =
      getPreferredCategories(
        request,
      );

    preferredCategories.forEach(
      (category) => {
        if (
          ranked.length >=
          limit
        ) {
          return;
        }

        const selected =
          selectForCategory(
            category,
            sortedScores,
            request,
            usedProductIds,
          );

        if (!selected) {
          return;
        }

        usedProductIds.add(
          selected.score
            .productId,
        );

        ranked.push(
          createRankedRecommendation(
            category,
            ranked.length +
              1,
            selected.score,
            selected.candidate,
          ),
        );
      },
    );

    for (
      const score of sortedScores
    ) {
      if (
        ranked.length >=
        limit
      ) {
        break;
      }

      if (
        usedProductIds.has(
          score.productId,
        )
      ) {
        continue;
      }

      const candidate =
        getCandidateByScore(
          request,
          score,
        );

      if (!candidate) {
        continue;
      }

      usedProductIds.add(
        score.productId,
      );

      ranked.push(
        createRankedRecommendation(
          ranked.length ===
              0
            ? "BEST_OVERALL"
            : "ALTERNATIVE",

          ranked.length +
            1,

          score,

          candidate,
        ),
      );
    }

    return ranked;
  }
}