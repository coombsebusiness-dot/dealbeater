import type {
  BlinlxOpinion,
} from "@/types/buying-guide/BlinlxOpinion";

import type {
  KnowledgeContext,
} from "@/knowledge/guides/factory/knowledge/KnowledgeContext";

function createSummary(
  product: KnowledgeContext["products"][number],
): string {
  const bestFor =
    product.bestFor?.[0];

  if (bestFor) {
    return `If we were buying today, ${product.name} would be our first choice for ${bestFor.toLowerCase()}.`;
  }

  return `If we were buying today, ${product.name} would be our first choice.`;
}

function createIfItWasOurMoney(
  product: KnowledgeContext["products"][number],
): string {
  const strengths =
    product.strengths ?? [];

  const weakness =
    product.weaknesses?.[0];

  const parts: string[] = [];

  parts.push(
    `We'd happily spend our own money on the ${product.name} because it still delivers excellent real-world value.`,
  );

  if (strengths.length > 0) {
    parts.push(
      `The biggest reason is ${strengths[0].charAt(0).toLowerCase()}${strengths[0].slice(1)}.`,
    );
  }

  if (weakness) {
    parts.push(
      `The only compromise we'd seriously consider is the lack of ${weakness
        .replace(/^no\s+/i, "")
        .toLowerCase()}.`,
    );
  }

  return parts.join(" ");
}

export function writeOpinion(
  knowledge: KnowledgeContext,
): BlinlxOpinion {

  const product =
    knowledge.products[0];

  if (!product) {
    return {
      summary:
        "Blinlx doesn't yet have enough verified product knowledge to form a trustworthy opinion.",

      ifItWasOurMoney:
        "We'd wait until more verified information becomes available.",

      reasons: [],

      confidence: 0,
    };
  }

  return {
    title:
      "What Blinlx Thinks",

    summary:
      createSummary(product),

    ifItWasOurMoney:
      createIfItWasOurMoney(product),

    reasons:
      (product.strengths ?? []).slice(0, 3),

    caveats:
      product.weaknesses ?? [],

    confidence:
      product.confidence,
  };
}