import {
  RecommendationRanker,
} from "./RecommendationRanker";

import {
  RecommendationScorer,
} from "./RecommendationScorer";

import type {
  RecommendationRequest,
  RecommendationResult,
} from "./RecommendationTypes";

export class RecommendationEngine {
  constructor(
    private readonly scorer =
      new RecommendationScorer(),

    private readonly ranker =
      new RecommendationRanker(),
  ) {}

  recommend(
    request:
      RecommendationRequest,
  ): RecommendationResult {
    const scored =
      this.scorer.score(
        request,
      );

    const ranked =
      this.ranker.rank({
        request,
        scores:
          scored,
      });

    const rankedProductIds =
      new Set(
        ranked.map(
          (recommendation) =>
            recommendation
              .score
              .productId,
        ),
      );

    const rejected =
      scored
        .filter(
          (score) =>
            score.totalScore <=
              0 ||
            !rankedProductIds.has(
              score.productId,
            ),
        )
        .sort(
          (
            scoreA,
            scoreB,
          ) =>
            scoreB.totalScore -
            scoreA.totalScore,
        );

    return {
      ranked,

      scored:
        [...scored].sort(
          (
            scoreA,
            scoreB,
          ) =>
            scoreB.totalScore -
            scoreA.totalScore,
        ),

      rejected,

      diagnostics: {
        candidateCount:
          request.candidates
            .length,

        rankedCount:
          ranked.length,

        rejectedCount:
          rejected.length,
      },
    };
  }
}

export const recommendationEngine =
  new RecommendationEngine();