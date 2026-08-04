import type {
  KnowledgeArticle,
  KnowledgeArticleType,
} from "./KnowledgeArticle";

export interface KnowledgeScoreContext {
  query?: string;

  tags?: string[];

  categories?: string[];

  types?: KnowledgeArticleType[];
}

export interface ScoredKnowledgeArticle {
  article: KnowledgeArticle;

  score: number;

  reasons: string[];
}

export class KnowledgeScorer {
  score(
    articles: KnowledgeArticle[],
    context: KnowledgeScoreContext,
  ): ScoredKnowledgeArticle[] {
    return articles.map((article) =>
      this.scoreArticle(
        article,
        context,
      ),
    );
  }

  private scoreArticle(
    article: KnowledgeArticle,
    context: KnowledgeScoreContext,
  ): ScoredKnowledgeArticle {
    let score =
      Math.round(
        article.confidence * 0.25,
      );

    const reasons: string[] = [
      `Confidence contribution: ${score}`,
    ];

    const query =
      this.normalise(
        context.query ?? "",
      );

    if (
      query &&
      this.matchesQuery(
        article,
        query,
      )
    ) {
      score += 30;

      reasons.push(
        "Matches the search query.",
      );
    }

    const matchedTags =
      this.countMatches(
        article.tags,
        context.tags ?? [],
      );

    if (matchedTags > 0) {
      const tagScore =
        matchedTags * 15;

      score += tagScore;

      reasons.push(
        `Matched ${matchedTags} tag${matchedTags === 1 ? "" : "s"}.`,
      );
    }

    const matchedCategories =
      this.countCategoryMatches(
        article.categories,
        context.categories ?? [],
      );

    if (
      matchedCategories > 0
    ) {
      const categoryScore =
        matchedCategories * 12;

      score += categoryScore;

      reasons.push(
        `Matched ${matchedCategories} categor${matchedCategories === 1 ? "y" : "ies"}.`,
      );
    }

    if (
      context.types?.includes(
        article.type,
      )
    ) {
      score += 10;

      reasons.push(
        "Matches the requested knowledge type.",
      );
    }

    if (
      article.active !== false
    ) {
      score += 5;

      reasons.push(
        "Knowledge article is active.",
      );
    }

    return {
      article,

      score:
        Math.max(
          0,
          Math.round(score),
        ),

      reasons,
    };
  }

  private matchesQuery(
    article: KnowledgeArticle,
    query: string,
  ): boolean {
    const searchableText = [
      article.id,
      article.title,
      article.summary,
      ...article.content,
      ...article.tags,
      ...article.categories,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(
      query,
    );
  }

  private countMatches(
    articleValues: string[],
    requestedValues: string[],
  ): number {
    const normalisedArticleValues =
      articleValues.map((value) =>
        this.normalise(value),
      );

    return requestedValues.filter(
      (requestedValue) => {
        const normalisedRequested =
          this.normalise(
            requestedValue,
          );

        return normalisedArticleValues.some(
          (articleValue) =>
            articleValue ===
              normalisedRequested ||
            articleValue.includes(
              normalisedRequested,
            ) ||
            normalisedRequested.includes(
              articleValue,
            ),
        );
      },
    ).length;
  }

  private countCategoryMatches(
    articleCategories: string[],
    requestedCategories: string[],
  ): number {
    const normalisedCategories =
      articleCategories.map(
        (category) =>
          this.normalise(category),
      );

    if (
      normalisedCategories.includes(
        "all",
      ) &&
      requestedCategories.length > 0
    ) {
      return 1;
    }

    return this.countMatches(
      articleCategories,
      requestedCategories,
    );
  }

  private normalise(
    value: string,
  ): string {
    return value
      .trim()
      .toLowerCase();
  }
}

export const knowledgeScorer =
  new KnowledgeScorer();