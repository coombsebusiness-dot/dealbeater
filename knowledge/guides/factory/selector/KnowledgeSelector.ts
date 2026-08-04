import type {
  BuyerWarning,
  KnowledgeContext,
  KnowledgeFact,
} from "../knowledge/KnowledgeContext";



import {
  KnowledgeRanker,
} from "./KnowledgeRanker";

export class KnowledgeSelector {
  private readonly ranker =
    new KnowledgeRanker();

    selectPriorityFacts(
  context: KnowledgeContext,
  limit = 3,
): KnowledgeFact[] {
  return this.ranker
    .rankFacts(
      context.keyFacts,
      {
        topic:
          context.topic,

        audience:
          context.buyerProfiles[
            0
          ],

        section:
          "PRIORITIES",
      },
    )
    .slice(
      0,
      limit,
    )
    .map(
      (ranked) =>
        ranked.value,
    );
}
selectBestValueFacts(
  context: KnowledgeContext,
  limit = 3,
): KnowledgeFact[] {
  return this.ranker
    .rankFacts(
      context.keyFacts,
      {
        topic:
          context.topic,

        audience:
          context.buyerProfiles[
            0
          ],

        section:
          "RECOMMENDATIONS",
      },
    )
    .slice(
      0,
      limit,
    )
    .map(
      (ranked) =>
        ranked.value,
    );
}
selectBuyingUsedFacts(
  context: KnowledgeContext,
  limit = 3,
): KnowledgeFact[] {
  return this.ranker
    .rankFacts(
      context.keyFacts,
      {
        topic:
          context.topic,

        audience:
          context.buyerProfiles[
            0
          ],

        section:
          "TRADE_OFFS",
      },
    )
    .slice(
      0,
      limit,
    )
    .map(
      (ranked) =>
        ranked.value,
    );
}
selectMistakeFacts(
  context: KnowledgeContext,
  limit = 3,
): KnowledgeFact[] {
  return this.ranker
    .rankFacts(
      context.keyFacts,
      {
        topic:
          context.topic,

        audience:
          context.buyerProfiles[
            0
          ],

        section:
          "MISTAKES",
      },
    )
    .slice(
      0,
      limit,
    )
    .map(
      (ranked) =>
        ranked.value,
    );
}
selectRecommendationFacts(
  context: KnowledgeContext,
  limit = 3,
): KnowledgeFact[] {
  return this.ranker
    .rankFacts(
      context.keyFacts,
      {
        topic:
          context.topic,

        audience:
          context.buyerProfiles[
            0
          ],

        section:
          "RECOMMENDATIONS",
      },
    )
    .slice(
      0,
      limit,
    )
    .map(
      (ranked) =>
        ranked.value,
    );
}
selectVerdictFacts(
  context: KnowledgeContext,
  limit = 3,
): KnowledgeFact[] {
  return this.ranker
    .rankFacts(
      context.keyFacts,
      {
        topic:
          context.topic,

        audience:
          context.buyerProfiles[
            0
          ],

        section:
          "VERDICT",
      },
    )
    .slice(
      0,
      limit,
    )
    .map(
      (ranked) =>
        ranked.value,
    );
}

  selectIntroductionFacts(
    context: KnowledgeContext,
    limit = 3,
  ): KnowledgeFact[] {
    return this.ranker
      .rankFacts(
        context.keyFacts,
        {
          topic:
            context.topic,

          audience:
            context.buyerProfiles[
              0
            ],

          section:
            "INTRODUCTION",
        },
      )
      .slice(
        0,
        limit,
      )
      .map(
        (ranked) =>
          ranked.value,
      );
  }

  selectTradeOffs(
    context: KnowledgeContext,
    limit = 3,
  ): KnowledgeFact[] {
    return this.ranker
      .rankFacts(
        context.tradeOffs,
        {
          topic:
            context.topic,

          audience:
            context.buyerProfiles[
              0
            ],

          section:
            "TRADE_OFFS",
        },
      )
      .slice(
        0,
        limit,
      )
      .map(
        (ranked) =>
          ranked.value,
      );
  }
  selectCompromiseFacts(
  context: KnowledgeContext,
  limit = 3,
): KnowledgeFact[] {
  return this.ranker
    .rankFacts(
      context.keyFacts,
      {
        topic:
          context.topic,

        audience:
          context.buyerProfiles[
            0
          ],

        section:
          "TRADE_OFFS",
      },
    )
    .slice(
      0,
      limit,
    )
    .map(
      (ranked) =>
        ranked.value,
    );
}

  selectMistakes(
    context: KnowledgeContext,
    limit = 3,
  ): BuyerWarning[] {
    return this.ranker
      .rankWarnings(
        context.commonMistakes,
        {
          topic:
            context.topic,

          audience:
            context.buyerProfiles[
              0
            ],

          section:
            "MISTAKES",
        },
      )
      .slice(
        0,
        limit,
      )
      .map(
        (ranked) =>
          ranked.value,
      );
  }
}