import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import type {
  CameraKnowledgeDatabase,
} from "../CameraKnowledgeDatabase";

import type {
  ProductBrainKnowledge,
} from "@/knowledge/guides/factory/knowledge";

export interface CameraKnowledgeResolver {

  readonly id: string;

  supports(
    blueprint: GuideBlueprint,
  ): boolean;

  resolve(
    blueprint: GuideBlueprint,
    database: CameraKnowledgeDatabase,
  ): ProductBrainKnowledge;

}