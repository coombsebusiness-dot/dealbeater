import type {
  KnowledgeArticle,
} from "./KnowledgeArticle";

import type {
  KnowledgeCollection,
} from "./KnowledgeCollection";

import {
  knowledgeCollectionRegistry,
} from "./KnowledgeCollectionRegistry";

import {
  knowledgeEngine,
} from "./KnowledgeEngine";

export interface KnowledgeCollectionResult {
  collection:
    KnowledgeCollection;

  articles:
    KnowledgeArticle[];

  totalArticles:
    number;
}

export class KnowledgeCollectionEngine {
  build(
    collectionId: string,
  ): KnowledgeCollectionResult | undefined {
    const collection =
      knowledgeCollectionRegistry.findById(
        collectionId,
      );

    if (
      !collection ||
      collection.active === false
    ) {
      return undefined;
    }

    const explicitArticles =
      this.getExplicitArticles(
        collection,
      );

    const queryResult =
      knowledgeEngine.query({
        tags:
          collection.query.tags,

        categories:
          collection.query.categories,

        types:
          collection.query.types,

        minimumConfidence:
          collection.query.minimumConfidence,

        includeRelated:
          collection.query.includeRelated,

        relatedLimit:
          collection.query.relatedLimit,

        limit:
          collection.query.limit,
      });

    const articles =
      this.mergeArticles([
        ...explicitArticles,
        ...queryResult.articles,
        ...queryResult.relatedArticles,
      ]);

    return {
      collection,

      articles,

      totalArticles:
        articles.length,
    };
  }

  buildMany(
    collectionIds: string[],
  ): KnowledgeCollectionResult[] {
    return collectionIds
      .map((collectionId) =>
        this.build(
          collectionId,
        ),
      )
      .filter(
        (
          result,
        ): result is KnowledgeCollectionResult =>
          Boolean(result),
      );
  }

  private getExplicitArticles(
    collection:
      KnowledgeCollection,
  ): KnowledgeArticle[] {
    return (
      collection.query.articleIds ??
      []
    )
      .map((articleId) =>
        knowledgeEngine.getById(
          articleId,
        ),
      )
      .filter(
        (
          article,
        ): article is KnowledgeArticle =>
          Boolean(article),
      );
  }

  private mergeArticles(
    articles:
      KnowledgeArticle[],
  ): KnowledgeArticle[] {
    const seen =
      new Set<string>();

    return articles.filter(
      (article) => {
        if (
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

export const
  knowledgeCollectionEngine =
    new KnowledgeCollectionEngine();