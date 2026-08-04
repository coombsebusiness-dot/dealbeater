import type {
  KnowledgePack,
} from "./KnowledgePack";

import type {
  ProductBrainKnowledge,
} from "@/knowledge/guides/factory/knowledge";

export class MirrorlessPack
  implements KnowledgePack {

  readonly id =
    "mirrorless";

  readonly name =
    "Mirrorless";

  readonly tags = [
    "mirrorless",
    "camera",
  ] as const;

  build():
    ProductBrainKnowledge {

    return {

      products: [],

      keyFacts: [],

      tradeOffs: [],

      commonMistakes: [],

      terminology: [],

      buyerProfiles: [],

    };

  }

}