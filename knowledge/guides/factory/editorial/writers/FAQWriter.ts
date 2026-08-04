import type {
  FAQ,
} from "@/types/buying-guide/FAQ";

import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import type {
  KnowledgeContext,
} from "@/knowledge/guides/factory/knowledge/KnowledgeContext";

import {
  generateQuestions,
} from "../questions/QuestionGenerator";

function answerBestQuestion(
  knowledge: KnowledgeContext,
): string {
  const product =
    knowledge.products[0];

  if (!product) {
    return "Blinlx does not yet have enough verified product knowledge to recommend a single option confidently.";
  }

  return `${product.name} is currently our strongest recommendation because it offers the best balance of performance, value and long-term ownership for most buyers.`;
}

function answerBudgetQuestion(
  knowledge: KnowledgeContext,
): string {
  return `For most buyers, this budget is capable of delivering excellent real-world results. Focus on buying the right product for your needs rather than chasing the newest specifications.`;
}

function answerValueQuestion(
  knowledge: KnowledgeContext,
): string {
  const product =
    knowledge.products[0];

  if (!product) {
    return "Value depends on balancing price, features and long-term ownership rather than simply buying the cheapest option.";
  }

  return `${product.name} currently represents one of the strongest value choices because it combines proven performance with sensible pricing.`;
}

function answerUsedQuestion(): string {
  return "Buying used can often provide significantly better value, provided the product has been well looked after and is purchased from a trusted seller with appropriate buyer protection.";
}

function answerFeaturesQuestion(
  knowledge: KnowledgeContext,
): string {
  const fact =
    knowledge.keyFacts[0];

  if (fact) {
    return fact.explanation;
  }

  return "Prioritise the features that genuinely improve everyday use instead of paying extra for specifications you are unlikely to benefit from.";
}

function answerMistakesQuestion(
  knowledge: KnowledgeContext,
): string {
  const mistake =
    knowledge.commonMistakes[0];

  if (mistake) {
    return mistake.explanation;
  }

  return "The biggest mistake is buying purely from marketing or specifications without considering how the product will actually be used.";
}

export function writeFAQs(
  blueprint: GuideBlueprint,
  knowledge: KnowledgeContext,
): FAQ[] {

  const questions =
    generateQuestions(
      blueprint,
      knowledge,
    );

  return questions.map(
    (question) => {

      let answer = "";

      switch (
        question.intent
      ) {
        case "BEST":
          answer =
            answerBestQuestion(
              knowledge,
            );
          break;

        case "BUDGET":
          answer =
            answerBudgetQuestion(
              knowledge,
            );
          break;

        case "VALUE":
          answer =
            answerValueQuestion(
              knowledge,
            );
          break;

        case "USED":
          answer =
            answerUsedQuestion();
          break;

        case "FEATURES":
          answer =
            answerFeaturesQuestion(
              knowledge,
            );
          break;

        case "MISTAKES":
          answer =
            answerMistakesQuestion(
              knowledge,
            );
          break;
      }

      return {
        question:
          question.question,

        answer,
      };
    },
  );
}