import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import type {
  KnowledgeContext,
} from "./KnowledgeContext";

import {
  loadProductBrainKnowledge,
} from "./ProductBrainAdapter";

export function createKnowledgeContext(
  blueprint: GuideBlueprint,
): KnowledgeContext {

  const knowledge =
    loadProductBrainKnowledge(
      blueprint,
    );

  const buyerProfiles =
    Array.from(
      new Set([
        ...knowledge.buyerProfiles,

        ...(blueprint.audience
          ? [
              blueprint.audience,
            ]
          : []),
      ]),
    );

  return {
    topic:
      blueprint.topic,

    category:
      blueprint.category,

    products:
      knowledge.products,

    keyFacts:
      knowledge.keyFacts,

    tradeOffs:
      knowledge.tradeOffs,

    commonMistakes:
      knowledge.commonMistakes,

    terminology:
      knowledge.terminology,

    buyerProfiles,
  };
}