import type {
  ProductBrainKnowledge,
} from "@/knowledge/guides/factory/knowledge";

import type {
  KnowledgePack,
} from "./KnowledgePack";

export class KnowledgeModuleBuilder {

  build(
    modules:
      KnowledgePack[],
  ): ProductBrainKnowledge {

    return modules.reduce<ProductBrainKnowledge>(
      (
        knowledge,
        module,
      ) => {

        const next =
          module.build();

        return {

          products: [
            ...knowledge.products,
            ...next.products,
          ],

          keyFacts: [
            ...knowledge.keyFacts,
            ...next.keyFacts,
          ],

          tradeOffs: [
            ...knowledge.tradeOffs,
            ...next.tradeOffs,
          ],

          commonMistakes: [
            ...knowledge.commonMistakes,
            ...next.commonMistakes,
          ],

          terminology: [
            ...knowledge.terminology,
            ...next.terminology,
          ],

          buyerProfiles: [
            ...knowledge.buyerProfiles,
            ...next.buyerProfiles,
          ],

        };

      },

      {

        products: [],

        keyFacts: [],

        tradeOffs: [],

        commonMistakes: [],

        terminology: [],

        buyerProfiles: [],

      },

    );

  }

}