import type {
  ProductBrainKnowledge,
} from "@/knowledge/guides/factory/knowledge";

export interface KnowledgePack {

  readonly id: string;

  readonly name: string;

  readonly tags: readonly string[];

  build():
    ProductBrainKnowledge;

}