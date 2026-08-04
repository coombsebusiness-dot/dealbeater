import type {
  KnowledgeArticle,
  KnowledgeArticleType,
} from "./KnowledgeArticle";

export class KnowledgeRegistry {
  private readonly articles =
    new Map<string, KnowledgeArticle>();

  register(
    article: KnowledgeArticle,
  ): void {
    if (
      this.articles.has(article.id)
    ) {
      throw new Error(
        `Knowledge article "${article.id}" is already registered.`,
      );
    }

    this.articles.set(
      article.id,
      article,
    );
  }

  registerMany(
    articles: KnowledgeArticle[],
  ): void {
    articles.forEach((article) => {
      this.register(article);
    });
  }

  findById(
    id: string,
  ): KnowledgeArticle | undefined {
    return this.articles.get(id);
  }

  findByType(
    type: KnowledgeArticleType,
  ): KnowledgeArticle[] {
    return this.active().filter(
      (article) =>
        article.type === type,
    );
  }

  findByTag(
    tag: string,
  ): KnowledgeArticle[] {
    const normalisedTag =
      this.normalise(tag);

    return this.active().filter(
      (article) =>
        article.tags.some(
          (articleTag) =>
            this.normalise(
              articleTag,
            ) === normalisedTag,
        ),
    );
  }

  findByCategory(
    category: string,
  ): KnowledgeArticle[] {
    const normalisedCategory =
      this.normalise(category);

    return this.active().filter(
      (article) =>
        article.categories.some(
          (articleCategory) => {
            const value =
              this.normalise(
                articleCategory,
              );

            return (
              value === "all" ||
              value ===
                normalisedCategory
            );
          },
        ),
    );
  }

  findRelated(
    id: string,
  ): KnowledgeArticle[] {
    const article =
      this.findById(id);

    if (!article) {
      return [];
    }

    return (
      article.relatedKnowledge ?? []
    )
      .map((relatedId) =>
        this.findById(relatedId),
      )
      .filter(
        (
          related,
        ): related is KnowledgeArticle =>
          Boolean(
            related &&
              related.active !==
                false,
          ),
      );
  }

  active(): KnowledgeArticle[] {
    return this.all().filter(
      (article) =>
        article.active !== false,
    );
  }

  all(): KnowledgeArticle[] {
    return Array.from(
      this.articles.values(),
    );
  }

  has(
    id: string,
  ): boolean {
    return this.articles.has(id);
  }

  get size(): number {
    return this.articles.size;
  }

  clear(): void {
    this.articles.clear();
  }

  private normalise(
    value: string,
  ): string {
    return value
      .trim()
      .toLowerCase();
  }
}

export const knowledgeRegistry =
  new KnowledgeRegistry();