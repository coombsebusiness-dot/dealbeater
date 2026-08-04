import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import type {
  GeneratedSectionBlueprint,
} from "@/knowledge/guides/factory/content";

import type {
  EditorialPlan,
} from "./EditorialPlanner";

export interface ExpandSectionInput {
  blueprint:
    GuideBlueprint;

  section:
    GeneratedSectionBlueprint;

  plan:
    EditorialPlan;
}

export interface ExpandedSectionDraft {
  paragraphs: string[];

  researchRequirements:
    string[];
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

function createWhyItMattersParagraph(
  blueprint: GuideBlueprint,
  section: GeneratedSectionBlueprint,
): string {
  const topic =
    lowerFirst(
      blueprint.topic,
    );

  switch (section.id) {
    case "what-to-prioritise":
    case "what-to-look-for":
      return `This matters because the features that look most impressive in an advert are not always the ones that improve everyday use. With ${topic}, reliability, ease of use and suitability for the job usually matter more than owning every premium extra.`;

    case "what-to-compromise":
      return `A compromise only becomes a problem when it gets in the way of what you actually need to do. Paying more to remove a limitation you will never notice is not an upgrade. It is simply extra expense.`;

    case "best-value":
      return `Good value does not mean choosing the lowest price. It means getting the capability you genuinely need without paying heavily for small improvements, specialist features or a more prestigious name.`;

    case "new-vs-used":
      return `The difference between new and used is about more than price. New gives you greater certainty, while used can unlock a much stronger product for the same budget. The right route depends on how much risk you are comfortable accepting.`;

    case "mistakes":
    case "common-mistakes":
      return `Most poor purchases are not caused by choosing a terrible product. They happen because the buyer chooses something unsuitable, forgets about the wider costs or pays extra for features that do not solve a real problem.`;

    case "recommendations":
      return `A recommendation is only useful when it is tied to a particular buyer. The strongest choice for one person may be unnecessarily expensive, too complicated or simply wrong for somebody else.`;

    case "final-verdict":
      return `The purpose of the verdict is not to repeat everything above it. It should turn the evidence into one clear decision and explain the circumstances in which that decision would change.`;

    default:
      return `Understanding ${topic} properly helps the reader judge value rather than relying on price, popularity or marketing claims alone.`;
  }
}

function createTradeOffParagraph(
  section: GeneratedSectionBlueprint,
): string {
  switch (section.id) {
    case "introduction":
      return "There will rarely be one perfect option. A cheaper choice may involve accepting fewer controls, older technology or less room to grow, while a more expensive option may offer improvements that many buyers will never use.";

    case "what-to-prioritise":
    case "what-to-look-for":
      return "Prioritising one feature often means accepting less somewhere else. Better performance may increase cost, a smaller design may reduce comfort and a more advanced product may introduce complexity that a beginner does not need.";

    case "what-to-compromise":
      return "Some compromises are easy to live with. Others become frustrating every time the product is used. The guide should separate harmless limitations from the ones that could make the buyer regret the purchase.";

    case "best-value":
      return "The best-value option may not lead every category. It may instead combine dependable performance, sensible ownership costs and fewer serious weaknesses than similarly priced alternatives.";

    case "new-vs-used":
      return "Buying new reduces uncertainty but usually buys less capability for the money. Buying used improves value but makes condition, seller protection and inspection far more important.";

    case "mistakes":
    case "common-mistakes":
      return "Avoiding one mistake can sometimes create another. Choosing purely on price may mean buying twice, while stretching the budget too far can leave no money for the accessories or supporting products needed to use the purchase properly.";

    case "recommendations":
      return "Every recommended option should have an honest weakness. If a product appears perfect, the draft probably has not examined its price, limitations or intended buyer carefully enough.";

    case "final-verdict":
      return "The answer may change for buyers with specialist needs. The final recommendation should therefore cover the sensible default choice and the clearest reasons somebody might choose differently.";

    default:
      return "The useful answer lies in the trade-off: what the buyer gains, what they give up and whether that exchange makes sense for their needs.";
  }
}

function createAudienceParagraph(
  blueprint: GuideBlueprint,
): string {
  const audience =
    blueprint.audience?.trim();

  if (!audience) {
    return "Think about how the product will actually be used. Occasional users, beginners and experienced buyers can all value very different things, even when they are shopping within the same category.";
  }

  return `For ${audience.toLowerCase()}, simplicity and suitability may be more valuable than maximum performance. The guide should speak to their likely use rather than assuming every reader wants the most advanced option available.`;
}

function createMoneyParagraph(
  section: GeneratedSectionBlueprint,
): string {
  switch (section.id) {
    case "best-value":
    case "recommendations":
      return "Spending more is worthwhile when it removes a meaningful limitation, improves reliability or keeps the purchase useful for considerably longer. It is not worthwhile when the difference mainly exists on a specification sheet.";

    case "new-vs-used":
      return "Remember to compare the complete cost. Warranty cover, replacement batteries, missing accessories, repairs and return protection can quickly change whether a used bargain is genuinely cheaper.";

    case "mistakes":
    case "common-mistakes":
      return "Leave room in the budget for the complete setup. A low headline price can become poor value once essential accessories, compatible extras or an early replacement are added.";

    default:
      return "Before increasing the budget, identify the exact problem the extra money will solve. When there is no clear answer, saving the money is usually the smarter decision.";
  }
}

function createNextStepParagraph(
  blueprint: GuideBlueprint,
  plan: EditorialPlan,
): string {
  const topic =
    lowerFirst(
      blueprint.topic,
    );

  return `The next step is to use these points as a filter when comparing ${topic}. Remove options that fail the important requirements first, then compare the remaining choices on value rather than trying to find one product that wins every specification. ${plan.finishWith}`;
}

function createResearchRequirements(
  blueprint: GuideBlueprint,
  section: GeneratedSectionBlueprint,
): string[] {
  const requirements = [
    `Verify all claims made about "${blueprint.topic}".`,
    "Add at least one concrete, verified example.",
    "Confirm that every stated trade-off is accurate.",
    "Remove generic advice that does not help the reader decide.",
  ];

  if (
    section.id ===
      "recommendations" ||
    section.id ===
      "best-value"
  ) {
    requirements.push(
      "Add current UK prices from verified sources.",
      "Confirm product availability and exact variants.",
      "Explain who should not buy each option.",
    );
  }

  if (
    section.id ===
    "new-vs-used"
  ) {
    requirements.push(
      "Verify current warranty and retailer return information.",
    );
  }

  return requirements;
}

export function expandSectionDraft({
  blueprint,
  section,
  plan,
}: ExpandSectionInput):
  ExpandedSectionDraft {
  return {
    paragraphs: [
      createWhyItMattersParagraph(
        blueprint,
        section,
      ),

      createTradeOffParagraph(
        section,
      ),

      createAudienceParagraph(
        blueprint,
      ),

      createMoneyParagraph(
        section,
      ),

      createNextStepParagraph(
        blueprint,
        plan,
      ),
    ],

    researchRequirements:
      createResearchRequirements(
        blueprint,
        section,
      ),
  };
}