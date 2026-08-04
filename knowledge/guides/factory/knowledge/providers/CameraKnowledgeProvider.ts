import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import {
  matchCameraKnowledge,
} from "@/knowledge/cameras";

import type {
  ProductBrainKnowledge,
} from "../ProductBrainAdapter";

import type {
  KnowledgeProvider,
} from "./KnowledgeProvider";

export class CameraKnowledgeProvider
  implements KnowledgeProvider {
  readonly category =
    "Photography";

  buildKnowledge(
    blueprint: GuideBlueprint,
  ): ProductBrainKnowledge {
    const match =
      matchCameraKnowledge(
        blueprint,
      );

    return {
      products:
        [
          ...match.knowledge
            .products,
        ],

      keyFacts:
        [
          ...match.knowledge
            .keyFacts,
        ],

      tradeOffs:
        [
          ...match.knowledge
            .tradeOffs,
        ],

      commonMistakes:
        [
          ...match.knowledge
            .commonMistakes,
        ],

      terminology:
        [
          ...match.knowledge
            .terminology,
        ],

        buyerProfiles:
  [
    ...match
      .matchedBuyerProfiles,
  ],
    };
  }
}