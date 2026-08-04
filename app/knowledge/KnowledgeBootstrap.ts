import {
  knowledgeEngine,
} from "./KnowledgeEngine";


import * as principles
  from "./principles";

import * as wisdom
  from "./wisdom";

import * as mistakes
  from "./mistakes";

import * as methodology
  from "./methodology";

import * as trust
  from "./trust";

import * as glossary
  from "./glossary";

import * as faqs
  from "./faqs";

import type {
  KnowledgeArticle,
} from "./KnowledgeArticle";

let bootstrapped = false;

function getKnowledgeArticles(
  collection: Record<
    string,
    unknown
  >,
): KnowledgeArticle[] {
  return Object.values(
    collection,
  ).filter(
    (
      value,
    ): value is KnowledgeArticle =>
      thisIsKnowledgeArticle(
        value,
      ),
  );
}

function thisIsKnowledgeArticle(
  value: unknown,
): value is KnowledgeArticle {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const candidate =
    value as Partial<
      KnowledgeArticle
    >;

  return (
    typeof candidate.id ===
      "string" &&
    typeof candidate.title ===
      "string" &&
    Array.isArray(
      candidate.content,
    ) &&
    Array.isArray(
      candidate.tags,
    ) &&
    Array.isArray(
      candidate.categories,
    )
  );
}

export function bootstrapKnowledge():
  void {
  if (bootstrapped) {
    return;
  }

  const articles = [
    ...getKnowledgeArticles(
      principles,
    ),

    ...getKnowledgeArticles(
      wisdom,
    ),

    ...getKnowledgeArticles(
      mistakes,
    ),

    ...getKnowledgeArticles(
      methodology,
    ),

    ...getKnowledgeArticles(
      trust,
    ),

    ...getKnowledgeArticles(
      glossary,
    ),

    ...getKnowledgeArticles(
      faqs,
    ),
  ];

  knowledgeEngine.registerMany(
    articles,
  );

  bootstrapped = true;
}