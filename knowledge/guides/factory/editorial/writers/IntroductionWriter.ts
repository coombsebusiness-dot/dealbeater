import type {
  KnowledgeContext,
} from "@/knowledge/guides/factory/knowledge/KnowledgeContext";

export interface WrittenIntroduction {
  heading:
    string;

  introduction:
    string;

  paragraphs:
    string[];
}

function lowerFirstCharacter(
  value: string,
): string {
  const cleaned =
    value.trim();

  if (!cleaned) {
    return "";
  }

  return [
    cleaned
      .charAt(0)
      .toLowerCase(),

    cleaned.slice(1),
  ].join("");
}

function createOpening(
  knowledge:
    KnowledgeContext,
): string {
  const topic =
    knowledge.topic
      .trim()
      .toLowerCase();

  return `A budget for ${topic} can go further than many buyers realise, but only when the money is spent on the things that genuinely improve everyday use.`;
}

function createBuyerProblem(
  knowledge:
    KnowledgeContext,
): string {
  const tradeOff =
    knowledge.tradeOffs[0]
      ?.explanation;

  if (tradeOff) {
    return tradeOff;
  }

  return "The biggest mistake is choosing around headline specifications while overlooking suitability, ownership cost and the compromises that will matter after the purchase.";
}

function createGuidePromise(
  knowledge:
    KnowledgeContext,
): string {
  const mistake =
    knowledge.commonMistakes[0]
      ?.explanation;

  if (mistake) {
    return `This guide will help you identify the features worth prioritising, decide where sensible compromises can be made and avoid mistakes such as ${lowerFirstCharacter(
      mistake,
    )}`;
  }

  return "This guide will help you identify what matters most, where it is sensible to compromise and how to avoid wasting money on features you are unlikely to use.";
}

export function writeIntroduction(
  knowledge:
    KnowledgeContext,
): WrittenIntroduction {
  return {
    heading:
      "Introduction",

    introduction:
      `Before comparing individual products, it helps to understand what good value actually looks like for ${knowledge.topic.toLowerCase()}.`,

    paragraphs: [
      createOpening(
        knowledge,
      ),

      createBuyerProblem(
        knowledge,
      ),

      createGuidePromise(
        knowledge,
      ),
    ],
  };
}