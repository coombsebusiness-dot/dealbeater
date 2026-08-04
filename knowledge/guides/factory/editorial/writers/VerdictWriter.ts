import type {
  Verdict,
} from "@/types/buying-guide/Verdict";

import type {
  KnowledgeContext,
} from "@/knowledge/guides/factory/knowledge/KnowledgeContext";

function buildSummary(
  product: KnowledgeContext["products"][number],
): string {
  const strengths =
    product.strengths ?? [];

  const strongest =
    strengths[0];

  const weakness =
    product.weaknesses?.[0];

  const parts: string[] = [];

  parts.push(
    `${product.name} is our strongest recommendation for most buyers.`,
  );

  if (strongest) {
    parts.push(
      `Its biggest strength is ${strongest.charAt(0).toLowerCase()}${strongest.slice(
        1,
      )}.`,
    );
  }

  if (weakness) {
    parts.push(
      `The biggest compromise is ${weakness.charAt(0).toLowerCase()}${weakness.slice(
        1,
      )}.`,
    );
  }

  return parts.join(" ");
}

export function writeVerdict(
  knowledge: KnowledgeContext,
): Verdict {
  const product =
    knowledge.products[0];

  if (!product) {
    return {
      title:
        "No recommendation available",

      summary:
        "There is currently not enough verified product knowledge to reach a confident verdict.",

      confidence:
        0,

      points: [],
    };
  }

  return {
    title:
      "The Blinlx Verdict",

    summary:
      buildSummary(
        product,
      ),

    confidence:
      product.confidence,

    points: [
      ...(product.strengths ??
        []).slice(
        0,
        3,
      ),
    ],
  };
}