import type {
  KnowledgeArticle,
} from "./KnowledgeArticle";

import {
  knowledgeRegistry,
} from "./KnowledgeRegistry";

import {
  knowledgeSearch,
} from "./KnowledgeSearch";

import type {
  KnowledgeSearchQuery,
} from "./KnowledgeSearch";

import {
  knowledgeRelations,
} from "./KnowledgeRelations";

import {
  knowledgeScorer,
} from "./KnowledgeScorer";

import type {
  KnowledgeScoreContext,
  ScoredKnowledgeArticle,
} from "./KnowledgeScorer";

export interface KnowledgeEngineQuery
  extends KnowledgeSearchQuery,
    KnowledgeScoreContext {
  includeRelated?: boolean;

  relatedLimit?: number;
}

export interface KnowledgeEngineResult {
  articles: KnowledgeArticle[];

  scoredArticles:
    ScoredKnowledgeArticle[];

  relatedArticles:
    KnowledgeArticle[];

  totalRegistered: number;
}

export class KnowledgeEngine {
  register(
    article: KnowledgeArticle,
  ): void {
    knowledgeRegistry.register(
      article,
    );
  }

  registerMany(
    articles: KnowledgeArticle[],
  ): void {
    knowledgeRegistry.registerMany(
      articles,
    );
  }

  getById(
    id: string,
  ): KnowledgeArticle | undefined {
    return knowledgeRegistry.findById(
      id,
    );
  }

  query(
    query: KnowledgeEngineQuery,
  ): KnowledgeEngineResult {
    const articles =
      knowledgeSearch.search(
        query,
      );

    const scoredArticles =
      knowledgeScorer
        .score(
          articles,
          query,
        )
        .sort(
          (first, second) =>
            second.score -
            first.score,
        );

    const sortedArticles =
      scoredArticles.map(
        (result) =>
          result.article,
      );

    const relatedArticles =
      query.includeRelated
        ? this.collectRelated(
            sortedArticles,
            query.relatedLimit,
          )
        : [];

    return {
      articles:
        sortedArticles,

      scoredArticles,

      relatedArticles,

      totalRegistered:
        knowledgeRegistry.size,
    };
  }

  getRelated(
    id: string,
    limit = 10,
  ): KnowledgeArticle[] {
    const article =
      knowledgeRegistry.findById(
        id,
      );

    if (!article) {
      return [];
    }

    return knowledgeRelations.findRelated(
      article,
      limit,
    );
  }

  getAll():
    KnowledgeArticle[] {
    return knowledgeRegistry.active();
  }

  private collectRelated(
    articles: KnowledgeArticle[],
    limit = 10,
  ): KnowledgeArticle[] {
    const sourceIds =
      new Set(
        articles.map(
          (article) =>
            article.id,
        ),
      );

    const related =
      articles.flatMap(
        (article) =>
          knowledgeRelations.findRelated(
            article,
            limit,
          ),
      );

    const seen =
      new Set<string>();

    return related.filter(
      (article) => {
        if (
          sourceIds.has(article.id) ||
          seen.has(article.id)
        ) {
          return false;
        }

        seen.add(article.id);

        return true;
      },
    );
  }
}

export const knowledgeEngine =
  new KnowledgeEngine();