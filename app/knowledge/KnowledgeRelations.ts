import type {
  KnowledgeArticle,
} from "./KnowledgeArticle";

import {
  knowledgeRegistry,
} from "./KnowledgeRegistry";

export interface KnowledgeRelationship {
  sourceId: string;

  targetId: string;

  sharedTags: string[];

  sharedCategories: string[];

  confidence: number;
}

export class KnowledgeRelations {
  findRelated(
    article: KnowledgeArticle,
    limit = 10,
  ): KnowledgeArticle[] {
    const explicitRelated =
      knowledgeRegistry.findRelated(
        article.id,
      );

    const explicitIds =
      new Set(
        explicitRelated.map(
          (related) =>
            related.id,
        ),
      );

    const inferredRelated =
      knowledgeRegistry
        .active()
        .filter(
          (candidate) =>
            candidate.id !==
            article.id,
        )
        .filter(
          (candidate) =>
            !explicitIds.has(
              candidate.id,
            ),
        )
        .map((candidate) => ({
          article: candidate,

          score:
            this.calculateRelationshipScore(
              article,
              candidate,
            ),
        }))
        .filter(
          (result) =>
            result.score > 0,
        )
        .sort(
          (first, second) =>
            second.score -
            first.score,
        )
        .map(
          (result) =>
            result.article,
        );

    return [
      ...explicitRelated,
      ...inferredRelated,
    ].slice(
      0,
      this.normaliseLimit(
        limit,
      ),
    );
  }

  describeRelationship(
    source: KnowledgeArticle,
    target: KnowledgeArticle,
  ): KnowledgeRelationship {
    const sharedTags =
      this.findSharedValues(
        source.tags,
        target.tags,
      );

    const sharedCategories =
      this.findSharedValues(
        source.categories,
        target.categories,
      );

    return {
      sourceId:
        source.id,

      targetId:
        target.id,

      sharedTags,

      sharedCategories,

      confidence:
        this.calculateRelationshipScore(
          source,
          target,
        ),
    };
  }

  private calculateRelationshipScore(
    first: KnowledgeArticle,
    second: KnowledgeArticle,
  ): number {
    let score = 0;

    const sharedTags =
      this.findSharedValues(
        first.tags,
        second.tags,
      );

    const sharedCategories =
      this.findSharedValues(
        first.categories,
        second.categories,
      );

    score +=
      sharedTags.length * 15;

    score +=
      sharedCategories.filter(
        (category) =>
          category !== "all",
      ).length * 10;

    if (
      first.type ===
      second.type
    ) {
      score += 5;
    }

    if (
      first.relatedKnowledge?.includes(
        second.id,
      )
    ) {
      score += 30;
    }

    return Math.max(
      0,
      Math.min(
        100,
        score,
      ),
    );
  }

  private findSharedValues(
    first: string[],
    second: string[],
  ): string[] {
    const secondValues =
      new Set(
        second.map((value) =>
          this.normalise(value),
        ),
      );

    return Array.from(
      new Set(
        first
          .map((value) =>
            this.normalise(value),
          )
          .filter((value) =>
            secondValues.has(
              value,
            ),
          ),
      ),
    );
  }

  private normaliseLimit(
    limit: number,
  ): number {
    if (
      !Number.isFinite(limit)
    ) {
      return 10;
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

export const knowledgeRelations =
  new KnowledgeRelations();