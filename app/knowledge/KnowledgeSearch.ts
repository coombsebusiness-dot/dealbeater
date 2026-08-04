import type {
  KnowledgeArticle,
  KnowledgeArticleType,
} from "./KnowledgeArticle";

import {
  knowledgeRegistry,
} from "./KnowledgeRegistry";

export interface KnowledgeSearchQuery {
  query?: string;

  tags?: string[];

  categories?: string[];

  types?: KnowledgeArticleType[];

  minimumConfidence?: number;

  limit?: number;
}

export class KnowledgeSearch {
  search(
    searchQuery: KnowledgeSearchQuery,
  ): KnowledgeArticle[] {
    const query =
      this.normalise(
        searchQuery.query ?? "",
      );

    const tags =
      (searchQuery.tags ?? []).map(
        (tag) =>
          this.normalise(tag),
      );

    const categories =
      (
        searchQuery.categories ?? []
      ).map((category) =>
        this.normalise(category),
      );

    const minimumConfidence =
      this.normaliseConfidence(
        searchQuery.minimumConfidence ??
          0,
      );

    const limit =
      this.normaliseLimit(
        searchQuery.limit,
      );

    const matches =
      knowledgeRegistry
        .active()
        .filter((article) =>
          this.matchesType(
            article,
            searchQuery.types,
          ),
        )
        .filter((article) =>
          this.matchesConfidence(
            article,
            minimumConfidence,
          ),
        )
        .filter((article) =>
          this.matchesQuery(
            article,
            query,
          ),
        )
        .filter((article) =>
          this.matchesTags(
            article,
            tags,
          ),
        )
        .filter((article) =>
          this.matchesCategories(
            article,
            categories,
          ),
        );

    return matches.slice(
      0,
      limit,
    );
  }

  private matchesType(
    article: KnowledgeArticle,
    types:
      | KnowledgeArticleType[]
      | undefined,
  ): boolean {
    if (
      !types ||
      types.length === 0
    ) {
      return true;
    }

    return types.includes(
      article.type,
    );
  }

  private matchesConfidence(
    article: KnowledgeArticle,
    minimumConfidence: number,
  ): boolean {
    return (
      article.confidence >=
      minimumConfidence
    );
  }

  private matchesQuery(
    article: KnowledgeArticle,
    query: string,
  ): boolean {
    if (!query) {
      return true;
    }

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

  private matchesTags(
    article: KnowledgeArticle,
    tags: string[],
  ): boolean {
    if (tags.length === 0) {
      return true;
    }

    const articleTags =
      article.tags.map((tag) =>
        this.normalise(tag),
      );

    return tags.some((tag) =>
      articleTags.some(
        (articleTag) =>
          articleTag === tag ||
          articleTag.includes(tag) ||
          tag.includes(articleTag),
      ),
    );
  }

  private matchesCategories(
    article: KnowledgeArticle,
    categories: string[],
  ): boolean {
    if (categories.length === 0) {
      return true;
    }

    const articleCategories =
      article.categories.map(
        (category) =>
          this.normalise(
            category,
          ),
      );

    if (
      articleCategories.includes(
        "all",
      )
    ) {
      return true;
    }

    return categories.some(
      (category) =>
        articleCategories.includes(
          category,
        ),
    );
  }

  private normaliseConfidence(
    confidence: number,
  ): number {
    if (
      !Number.isFinite(
        confidence,
      )
    ) {
      return 0;
    }

    return Math.max(
      0,
      Math.min(
        100,
        Math.round(
          confidence,
        ),
      ),
    );
  }

  private normaliseLimit(
    limit: number | undefined,
  ): number {
    if (
      limit === undefined ||
      !Number.isFinite(limit)
    ) {
      return 50;
    }

    return Math.max(
      1,
      Math.floor(limit),
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

export const knowledgeSearch =
  new KnowledgeSearch();