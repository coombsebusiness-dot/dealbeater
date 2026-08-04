import type {
  KnowledgeFact,
} from "@/knowledge/guides/factory/knowledge";

export interface ExplainKnowledgeInput {
  fact:
    KnowledgeFact;

  topic:
    string;

  audience?: string;

  buyingAdvice?: string;
}

export interface ExplainedKnowledge {
  title: string;

  explanation: string;

  whyItMatters: string;

  buyingAdvice: string;

  paragraph: string;

  confidence: number;
}

function lowerFirst(
  value: string,
): string {
  if (!value) {
    return value;
  }

  return (
    value.charAt(0).toLowerCase() +
    value.slice(1)
  );
}

function createWhyItMatters(
  fact: KnowledgeFact,
  topic: string,
  audience?: string,
): string {
  const audienceText =
    audience?.trim()
      ? ` For ${audience.toLowerCase()},`
      : "";

  return `${audienceText} this matters because ${lowerFirst(
    fact.explanation,
  )}`;
}

function createBuyingAdvice(
  fact: KnowledgeFact,
  topic: string,
  buyingAdvice?: string,
): string {
  if (
    buyingAdvice?.trim()
  ) {
    return buyingAdvice.trim();
  }

  return `When comparing ${topic.toLowerCase()}, use this as a practical filter rather than treating it as another specification to chase. Ask whether it solves a real need, improves everyday use or protects the value of the purchase over time.`;
}

function createParagraph(
  fact: KnowledgeFact,
  whyItMatters: string,
  buyingAdvice: string,
): string {
  return [
    fact.explanation,
    whyItMatters,
    buyingAdvice,
  ]
    .map(
      (value) =>
        value.trim(),
    )
    .filter(Boolean)
    .join(" ");
}

export class KnowledgeExplainer {
  explain({
    fact,
    topic,
    audience,
    buyingAdvice,
  }: ExplainKnowledgeInput):
    ExplainedKnowledge {
    const whyItMatters =
      createWhyItMatters(
        fact,
        topic,
        audience,
      );

    const advice =
      createBuyingAdvice(
        fact,
        topic,
        buyingAdvice,
      );

    return {
      title:
        fact.title,

      explanation:
        fact.explanation,

      whyItMatters,

      buyingAdvice:
        advice,

      paragraph:
        createParagraph(
          fact,
          whyItMatters,
          advice,
        ),

      confidence:
        fact.confidence,
    };
  }

  explainMany(
    facts:
      KnowledgeFact[],
    input: Omit<
      ExplainKnowledgeInput,
      "fact"
    >,
  ): ExplainedKnowledge[] {
    return facts.map(
      (fact) =>
        this.explain({
          ...input,
          fact,
        }),
    );
  }
}