import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import type {
  EditorialSectionKind,
  ReaderQuestion,
} from "./EditorialTypes";

function lowerFirst(
  value: string,
): string {
  if (!value) {
    return value;
  }

  return (
    value.charAt(0)
      .toLowerCase() +
    value.slice(1)
  );
}

function getTopic(
  blueprint: GuideBlueprint,
): string {
  return lowerFirst(
    blueprint.topic.trim(),
  );
}

function getAudience(
  blueprint: GuideBlueprint,
): string {
  return (
    blueprint.audience
      ?.trim() ||
    "buyers"
  );
}

export class QuestionEngine {
  resolve(
  blueprint:
    GuideBlueprint,

  sectionKind:
    EditorialSectionKind,
): ReaderQuestion {
  const topic =
    getTopic(
      blueprint,
    );

  const audience =
    getAudience(
      blueprint,
    );

  switch (sectionKind) {
    case "INTRODUCTION":
      return {
        question:
          `What decision is the reader trying to make about ${topic}?`,

        buyerDecision:
          `Whether ${topic} is suitable for their needs and budget.`,

        desiredOutcome:
          "The reader understands what matters before comparing individual products.",
      };

    case "NEED":
      return {
        question:
          `Does the reader actually need ${topic} yet?`,

        buyerDecision:
          "Whether buying now will solve a real limitation or simply add unnecessary cost.",

        desiredOutcome:
          "The reader can decide whether to buy, wait or improve the current setup first.",
      };

    case "AUDIENCE":
      return {
        question:
          `Who is ${topic} genuinely suitable for?`,

        buyerDecision:
          "Whether the product matches the reader's experience, priorities and intended use.",

        desiredOutcome:
          "The reader understands who benefits most and who should consider a different option.",
      };

    case "PRIORITIES":
      return {
        question:
          `Which features of ${topic} will genuinely affect everyday use?`,

        buyerDecision:
          "Where the buyer should spend the budget first.",

        desiredOutcome:
          "The reader can separate useful capability from expensive extras.",
      };

    case "BUDGET":
      return {
        question:
          `How much should somebody realistically spend on ${topic}?`,

        buyerDecision:
          "Which price level provides enough capability without paying for unnecessary extras.",

        desiredOutcome:
          "The reader understands where sensible value ends and diminishing returns begin.",
      };

    case "COMPROMISES":
      return {
        question:
          `Which compromises in ${topic} are sensible, and which are likely to cause regret?`,

        buyerDecision:
          "Where the buyer can safely save money.",

        desiredOutcome:
          "The reader understands which limitations matter for their intended use.",
      };

    case "BEST_VALUE":
      return {
        question:
          `Where does ${topic} offer the strongest balance of price and capability?`,

        buyerDecision:
          "Whether spending more creates a meaningful improvement.",

        desiredOutcome:
          "The reader recognises the point where additional spending stops delivering useful value.",
      };

    case "BUYING_USED":
      return {
        question:
          `Should the reader buy ${topic} new or used?`,

        buyerDecision:
          "Whether the saving from buying used justifies the additional risk.",

        desiredOutcome:
          "The reader can compare price, condition, warranty and seller protection.",
      };

    case "MISTAKES":
      return {
        question:
          `Which mistakes cause ${audience.toLowerCase()} to waste money on ${topic}?`,

        buyerDecision:
          "Which warning signs should remove an option from consideration.",

        desiredOutcome:
          "The reader avoids unsuitable products, hidden costs and unnecessary upgrades.",
      };

    case "RECOMMENDATIONS":
      return {
        question:
          `Which verified options best suit ${audience.toLowerCase()} shopping for ${topic}?`,

        buyerDecision:
          "Which product best matches the reader's priorities and acceptable compromises.",

        desiredOutcome:
          "The reader understands who each recommendation suits and why.",
      };

    case "ALTERNATIVES":
      return {
        question:
          `What alternatives to ${topic} could offer better value or suitability?`,

        buyerDecision:
          "Whether another product type, older model or cheaper route would solve the same problem more effectively.",

        desiredOutcome:
          "The reader understands the strongest escape routes from the obvious purchase.",
      };

    case "CHECKLIST":
      return {
        question:
          `What should the reader confirm before spending money on ${topic}?`,

        buyerDecision:
          "Whether the exact product, complete cost and important limitations have been checked.",

        desiredOutcome:
          "The reader has a practical final checklist before buying.",
      };

    case "VERDICT":
      return {
        question:
          `What should the reader ultimately do about ${topic}?`,

        buyerDecision:
          "Whether to buy, spend more, save money or wait.",

        desiredOutcome:
          "The reader leaves with one clear next step.",
      };
  }
}
}