import {
  knowledgeCollectionRegistry,
} from "./KnowledgeCollectionRegistry";

import * as buyingGuides
  from "./buying-guides";

import type {
  KnowledgeCollection,
} from "./KnowledgeCollection";

let bootstrapped = false;

function isKnowledgeCollection(
  value: unknown,
): value is KnowledgeCollection {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const candidate =
    value as Partial<
      KnowledgeCollection
    >;

  return (
    typeof candidate.id ===
      "string" &&
    typeof candidate.title ===
      "string" &&
    typeof candidate.description ===
      "string" &&
    typeof candidate.query ===
      "object" &&
    candidate.query !== null
  );
}

export function bootstrapKnowledgeCollections():
  void {
  if (bootstrapped) {
    return;
  }

  const collections =
    Object.values(
      buyingGuides,
    ).filter(
      (
        value,
      ): value is KnowledgeCollection =>
        isKnowledgeCollection(
          value,
        ),
    );

  knowledgeCollectionRegistry.registerMany(
    collections,
  );

  bootstrapped = true;
}