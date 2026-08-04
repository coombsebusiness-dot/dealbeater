import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import type {
  ProductBrainKnowledge,
} from "../ProductBrainAdapter";

export interface KnowledgeProvider {

  readonly category: string;

  buildKnowledge(
    blueprint: GuideBlueprint,
  ): ProductBrainKnowledge;

}