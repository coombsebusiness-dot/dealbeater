import type {
  KnowledgeCollection,
} from "./KnowledgeCollection";

export class KnowledgeCollectionRegistry {
  private readonly collections =
    new Map<
      string,
      KnowledgeCollection
    >();

  register(
    collection:
      KnowledgeCollection,
  ): void {
    if (
      this.collections.has(
        collection.id,
      )
    ) {
      throw new Error(
        `Knowledge collection "${collection.id}" is already registered.`,
      );
    }

    this.collections.set(
      collection.id,
      collection,
    );
  }

  registerMany(
    collections:
      KnowledgeCollection[],
  ): void {
    collections.forEach(
      (collection) => {
        this.register(
          collection,
        );
      },
    );
  }

  findById(
    id: string,
  ):
    | KnowledgeCollection
    | undefined {
    return this.collections.get(
      id,
    );
  }

  findByTag(
    tag: string,
  ): KnowledgeCollection[] {
    const normalisedTag =
      this.normalise(tag);

    return this.active().filter(
      (collection) =>
        collection.tags?.some(
          (collectionTag) =>
            this.normalise(
              collectionTag,
            ) === normalisedTag,
        ) ?? false,
    );
  }

  findByCategory(
    category: string,
  ): KnowledgeCollection[] {
    const normalisedCategory =
      this.normalise(category);

    return this.active().filter(
      (collection) =>
        collection.categories?.some(
          (collectionCategory) => {
            const value =
              this.normalise(
                collectionCategory,
              );

            return (
              value === "all" ||
              value ===
                normalisedCategory
            );
          },
        ) ?? false,
    );
  }

  active():
    KnowledgeCollection[] {
    return this.all().filter(
      (collection) =>
        collection.active !==
        false,
    );
  }

  all():
    KnowledgeCollection[] {
    return Array.from(
      this.collections.values(),
    );
  }

  has(
    id: string,
  ): boolean {
    return this.collections.has(
      id,
    );
  }

  get size(): number {
    return this.collections.size;
  }

  clear(): void {
    this.collections.clear();
  }

  private normalise(
    value: string,
  ): string {
    return value
      .trim()
      .toLowerCase();
  }
}

export const
  knowledgeCollectionRegistry =
    new KnowledgeCollectionRegistry();