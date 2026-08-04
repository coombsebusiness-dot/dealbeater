import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

import type {
  KnowledgeContext,
} from "@/knowledge/guides/factory/knowledge/KnowledgeContext";

export function writeSummary(
  knowledge: KnowledgeContext,
): BuyingGuide["summary"] {

  const product =
    knowledge.products[0];

  if (!product) {
    return [
      "More verified product knowledge is required before Blinlx can produce a trustworthy buying summary.",
    ];
  }

  const summary: string[] = [];

  if (product.strengths?.[0]) {
    summary.push(
      product.strengths[0],
    );
  }

  if (product.strengths?.[1]) {
    summary.push(
      product.strengths[1],
    );
  }

  if (product.bestFor?.[0]) {
    summary.push(
      `Best for ${product.bestFor[0].toLowerCase()}.`,
    );
  }

  if (product.weaknesses?.[0]) {
    summary.push(
      `Main compromise: ${product.weaknesses[0].replace(
        /^no\s+/i,
        "No ",
      )}`,
    );
  }

  return summary.slice(0, 4);
}