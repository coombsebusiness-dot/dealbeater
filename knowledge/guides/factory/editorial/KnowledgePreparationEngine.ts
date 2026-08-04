import type {
  KnowledgeFact,
} from "../knowledge/KnowledgeContext";

import {
  KnowledgeExplainer,
} from "./explainer";

export interface PreparedKnowledge {
  facts:
    KnowledgeFact[];

  tradeOffs:
    KnowledgeFact[];

  explainedFacts:
    ReturnType<
      KnowledgeExplainer["explainMany"]
    >;

  explainedTradeOffs:
    ReturnType<
      KnowledgeExplainer["explainMany"]
    >;
}

export class KnowledgePreparationEngine {
  constructor(
    private readonly explainer =
      new KnowledgeExplainer(),
  ) {}

  prepare(
    facts: KnowledgeFact[],
    tradeOffs: KnowledgeFact[],
    topic: string,
    audience: string,
    buyingAdvice?: string,
  ): PreparedKnowledge {

    const explainedFacts =
      this.explainer
        .explainMany(
          facts,
          {
            topic,
            audience,
            buyingAdvice,
          },
        );

    const explainedTradeOffs =
      this.explainer
        .explainMany(
          tradeOffs,
          {
            topic,
            audience,
            buyingAdvice,
          },
        );

    return {
      facts,

      tradeOffs,

      explainedFacts,

      explainedTradeOffs,
    };
  }
}