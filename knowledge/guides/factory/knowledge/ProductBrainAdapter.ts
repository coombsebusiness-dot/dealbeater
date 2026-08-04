import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import {
  KnowledgeProviderRegistry,
} from "./providers";

import type {
  BuyerWarning,
  KnowledgeFact,
  ProductRecommendation,
} from "./KnowledgeContext";

const registry =
  new KnowledgeProviderRegistry();

export interface ProductBrainKnowledge {

  products:
    ProductRecommendation[];

  keyFacts:
    KnowledgeFact[];

  tradeOffs:
    KnowledgeFact[];

  commonMistakes:
    BuyerWarning[];

  terminology:
    string[];

    buyerProfiles:
  string[];
}

export function loadProductBrainKnowledge(
  blueprint: GuideBlueprint,
): ProductBrainKnowledge {

  const provider =
    registry.resolve(
      blueprint.category,
    );

  if (!provider) {
    return {
      products: [],
      keyFacts: [],
      tradeOffs: [],
      commonMistakes: [],
      terminology: [],
      buyerProfiles: [],
    };
  }

  return provider.buildKnowledge(
    blueprint,
  );
}