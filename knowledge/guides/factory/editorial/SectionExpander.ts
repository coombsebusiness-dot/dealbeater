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
  paragraphs:
    string[];

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
      ?.trim()
      .toLowerCase() ||
    "buyers"
  );
}

function createIntroductionParagraphs(
  blueprint: GuideBlueprint,
): string[] {
  const topic =
    getTopic(
      blueprint,
    );

  const audience =
    getAudience(
      blueprint,
    );

  switch (blueprint.type) {
    case "MISTAKES":
      return [
        `Buying ${topic} can become expensive surprisingly quickly, particularly when marketing encourages ${audience} to focus on headline specifications rather than the complete setup they actually need.`,

        `Most disappointing purchases are not caused by choosing an unusable product. They happen because the buyer overspends in the wrong area, overlooks an important limitation or forgets the additional costs needed to make the purchase genuinely useful.`,

        `The aim of this guide is to identify those risks before money changes hands, explain why they catch buyers out and provide a practical way to avoid them.`,
      ];

    case "COMPARISON":
      return [
        `Choosing between ${topic} is rarely as simple as finding which option has the longest specification list. The meaningful differences usually involve how each choice performs in everyday use, what compromises it introduces and whether those differences justify the price.`,

        `The better option depends on the buyer, the intended use and the wider ownership costs rather than one isolated feature.`,

        `This guide compares the decision from a practical buying perspective so that the final choice is based on suitability rather than marketing.`,
      ];

    case "BUDGET_GUIDE":
      return [
        `A limited budget does not automatically mean accepting a poor product. It does mean being disciplined about which features deserve the money and which upgrades can safely be ignored.`,

        `With ${topic}, the strongest purchase is often the one that protects the essentials while avoiding specialist features that add cost without improving normal use.`,

        `This guide explains where the value sits, where compromises are likely and how to avoid a cheap purchase becoming an expensive mistake.`,
      ];

    case "BEST_FOR":
      return [
        `The best choice for ${audience} is not necessarily the most powerful or expensive option. It is the one that handles their real priorities without creating unnecessary cost, weight or complexity.`,

        `When comparing ${topic}, suitability matters more than winning every specification. A product can be technically impressive and still be the wrong purchase for the person using it.`,

        `This guide focuses on the factors that make an option genuinely useful for the intended buyer.`,
      ];

    case "EXPLAINER":
      return [
        `${blueprint.topic} is often presented through technical language that makes the buying decision harder than it needs to be.`,

        `What matters is not simply how the technology works, but whether it produces a benefit the buyer will actually notice and whether that benefit is worth paying for.`,

        `This guide explains the concept in practical terms and connects it directly to real purchasing decisions.`,
      ];

    default:
      return [
        `Buying ${topic} can feel complicated because specifications, price differences and competing recommendations quickly create more noise than clarity.`,

        `The sensible approach is to begin with the buyer's real needs, understand the compromises at each price level and only then compare individual products.`,

        `This guide is designed to make that process clearer and reduce the risk of paying for features that will make little difference in everyday use.`,
      ];
  }
}

function createMistakesParagraphs(
  blueprint: GuideBlueprint,
): string[] {
  const topic =
    getTopic(
      blueprint,
    );

  return [
    `One of the most common mistakes is spending the full budget on the headline purchase while leaving too little for the rest of the setup. With ${topic}, supporting items can affect usability, reliability and overall value just as much as the main product.`,

    `Another mistake is assuming that a higher price automatically produces a noticeably better experience. Premium models often justify their cost through specialist performance, stronger construction or advanced controls, but those benefits only represent value when the buyer will genuinely use them.`,

    `Buyers also underestimate convenience. Size, weight, battery life, controls, compatibility and ongoing costs may look less exciting than performance figures, but they often determine whether a product is enjoyable to own or regularly left unused.`,

    `Finally, popularity should never replace suitability. A widely recommended product may still be too complicated, too expensive or poorly matched to the buyer's intended use.`,
  ];
}

function createWhyMistakesHappenParagraphs(
  blueprint: GuideBlueprint,
): string[] {
  const topic =
    getTopic(
      blueprint,
    );

  return [
    `These mistakes happen because ${topic} is commonly marketed around numbers that are easy to compare. Faster performance, higher resolution and longer feature lists create a simple impression of progress, even when those improvements have little effect on the buyer's normal use.`,

    `Online recommendations can also remove important context. A product praised by an experienced professional may be unnecessary for a beginner, while a compact and affordable option dismissed by an enthusiast may be exactly right for somebody who values simplicity.`,

    `Buyers are also encouraged to think about the initial price rather than the total cost of ownership. Accessories, compatible products, subscriptions, maintenance and future upgrades can turn an apparently affordable purchase into a much larger commitment.`,

    `The safest response is to connect every feature and every extra pound to a specific need. When the buyer cannot explain what problem an upgrade solves, the upgrade probably does not deserve the money.`,
  ];
}

function createAvoidMistakesParagraphs(
  blueprint: GuideBlueprint,
): string[] {
  const topic =
    getTopic(
      blueprint,
    );

  return [
    `Begin by writing down what the purchase must do, what would merely be useful and what would be unnecessary. This prevents impressive but irrelevant features from controlling the decision.`,

    `Set a complete budget rather than a body-only or product-only budget. Include the accessories, compatible equipment and protection required to use ${topic} properly from the first day.`,

    `Compare weaknesses as carefully as strengths. A limitation that affects the main use should remove a product from consideration, while a limitation that will rarely be noticed may be a sensible way to save money.`,

    `Where possible, handle or test the product before buying. Comfort, menus, controls and size are difficult to judge from a specification sheet, yet they strongly influence long-term satisfaction.`,

    `Finally, walk away when the seller, condition, warranty or exact product variant cannot be confirmed. Missing information is not a reason to take a chance with a significant purchase.`,
  ];
}

function createChecklistParagraphs(
  blueprint: GuideBlueprint,
): string[] {
  const topic =
    getTopic(
      blueprint,
    );

  return [
    `Before buying ${topic}, confirm that the exact model or variant matches the intended use and that no essential feature is missing.`,

    `Check the complete ownership cost, including compatible accessories, replacements, warranties and any equipment needed immediately.`,

    `Make sure the most important limitation is acceptable. Every product has compromises, but the wrong compromise can make even a highly rated option poor value.`,

    `Compare the final choice with at least one cheaper alternative and one similarly priced competitor. The purchase should still make sense once the marketing is removed.`,

    `Spend more only when the additional cost solves a real problem, improves reliability or keeps the purchase useful for substantially longer.`,
  ];
}

function createPriorityParagraphs(
  blueprint: GuideBlueprint,
): string[] {
  const topic =
    getTopic(
      blueprint,
    );

  return [
    `Start with the features that affect every use of ${topic}. Reliability, comfort, compatibility and ease of operation usually matter more than specialist capabilities that may only be used occasionally.`,

    `A useful feature should solve a recognisable problem. When a buyer cannot explain when or why a feature will help, it should not be allowed to increase the budget.`,

    `Compatibility deserves particular attention because the first purchase may commit the buyer to additional products, accessories or an ecosystem that becomes expensive to leave later.`,

    `The strongest shortlist therefore begins with suitability and removes products that fail an essential requirement before price or prestige are considered.`,
  ];
}

function createCompromiseParagraphs(
  blueprint: GuideBlueprint,
): string[] {
  const topic =
    getTopic(
      blueprint,
    );

  return [
    `Every price level involves compromise. The important distinction is between limitations that reduce pride of ownership and limitations that genuinely interfere with the intended use.`,

    `A cheaper ${topic} option may use older technology, offer fewer controls or feel less premium without producing a meaningfully worse result for an ordinary buyer.`,

    `By contrast, weak reliability, poor compatibility or a limitation affecting the main task can create repeated frustration and may make the cheaper option more expensive in the long run.`,

    `The sensible compromise is the one the buyer understands before purchase and is unlikely to notice during normal use.`,
  ];
}

function createValueParagraphs(
  blueprint: GuideBlueprint,
): string[] {
  const topic =
    getTopic(
      blueprint,
    );

  return [
    `The best value in ${topic} usually sits above the absolute cheapest products but below the point where specialist features begin increasing the price sharply.`,

    `Value comes from dependable performance, sensible ownership costs and enough capability to remain useful. It does not require the product to lead every category.`,

    `Spending more is justified when it removes a limitation the buyer will regularly encounter, improves durability or avoids an early replacement.`,

    `When the extra money mainly purchases prestige, marginal performance or capabilities that will rarely be used, keeping the difference is normally the smarter choice.`,
  ];
}

function createNewVsUsedParagraphs(
  blueprint: GuideBlueprint,
): string[] {
  const topic =
    getTopic(
      blueprint,
    );

  return [
    `Buying new provides the greatest certainty. The buyer receives full warranty protection, clear return rights and less risk of hidden wear or missing accessories.`,

    `Buying used can provide a much stronger ${topic} option for the same budget, but condition and seller protection become part of the buying decision rather than an afterthought.`,

    `A used purchase should be checked for damage, abnormal wear, missing components and anything that could make repair uneconomical. The exact checks will depend on the product category.`,

    `The used route makes most sense when the saving is meaningful, the seller is reputable and the remaining budget can absorb a replacement accessory or minor repair if necessary.`,
  ];
}

function createRecommendationParagraphs(
  blueprint: GuideBlueprint,
): string[] {
  const topic =
    getTopic(
      blueprint,
    );

  return [
    `A useful recommendation for ${topic} must begin with the buyer rather than the product. Each option should have a clear reason to exist and a clearly defined person for whom it makes sense.`,

    `The strongest balanced choice will normally combine dependable performance, manageable ownership costs and no serious weakness for the intended audience.`,

    `Budget recommendations should protect the essentials rather than simply identify the cheapest available product. Premium recommendations should only appear when their additional capability creates a meaningful advantage.`,

    `Every recommendation also needs an honest limitation. When no weakness is acknowledged, the recommendation is unlikely to provide enough context for a responsible buying decision.`,
  ];
}

function createAlternativesParagraphs(
  blueprint: GuideBlueprint,
): string[] {
  const topic =
    getTopic(
      blueprint,
    );

  return [
    `The obvious ${topic} purchase may not be the only sensible route. An older model, a used premium product or a different product type may solve the same problem for less money.`,

    `Alternatives become especially valuable when the buyer is being asked to pay heavily for one feature while accepting weaknesses elsewhere.`,

    `Changing category can sometimes improve value more than moving between similar models. The right question is not which product is most impressive, but which route completes the job most effectively.`,

    `A good alternative should reduce cost, complexity or ownership burden without sacrificing the requirement that matters most.`,
  ];
}

function createVerdictParagraphs(
  blueprint: GuideBlueprint,
): string[] {
  const topic =
    getTopic(
      blueprint,
    );

  return [
    `The safest approach to ${topic} is to choose the least expensive option that fully satisfies the important requirements and avoids any limitation likely to cause regret.`,

    `Most buyers gain more from a balanced complete setup than from stretching the budget for the most impressive headline product.`,

    `Spend more when the improvement will be noticed regularly, when reliability matters professionally or when the cheaper route would force an early replacement.`,

    `If it were our money, we would prioritise suitability, ownership cost and long-term usefulness over prestige. The best purchase is the one that solves the problem without creating a new one.`,
  ];
}

function createGeneralParagraphs(
  blueprint: GuideBlueprint,
): string[] {
  const topic =
    getTopic(
      blueprint,
    );

  return [
    `The practical value of ${topic} depends on how well the available options match the buyer's normal use, not on which product produces the most impressive specification sheet.`,

    `Strong performance is valuable when it removes frustration or enables something the buyer genuinely wants to do. It is far less valuable when it exists mainly as unused capability.`,

    `Price should therefore be compared alongside suitability, ownership cost and the compromises involved rather than treated as a simple ranking of quality.`,

    `A sensible decision removes unsuitable products first and then compares the remaining options on the benefits the buyer will actually notice.`,
  ];
}

function createPublicParagraphs(
  blueprint: GuideBlueprint,
  section: GeneratedSectionBlueprint,
): string[] {
  switch (section.id) {
    case "introduction":
      return createIntroductionParagraphs(
        blueprint,
      );

    case "biggest-mistakes":
    case "mistakes":
    case "common-mistakes":
      return createMistakesParagraphs(
        blueprint,
      );

    case "why-they-happen":
      return createWhyMistakesHappenParagraphs(
        blueprint,
      );

    case "how-to-avoid-them":
      return createAvoidMistakesParagraphs(
        blueprint,
      );

    case "before-you-buy":
      return createChecklistParagraphs(
        blueprint,
      );

    case "what-to-prioritise":
    case "what-to-look-for":
    case "what-matters":
      return createPriorityParagraphs(
        blueprint,
      );

    case "what-to-compromise":
      return createCompromiseParagraphs(
        blueprint,
      );

    case "best-value":
    case "budget-options":
    case "best-overall":
    case "premium-options":
      return createValueParagraphs(
        blueprint,
      );

    case "new-vs-used":
      return createNewVsUsedParagraphs(
        blueprint,
      );

    case "recommendations":
      return createRecommendationParagraphs(
        blueprint,
      );

    case "alternatives":
      return createAlternativesParagraphs(
        blueprint,
      );

    case "final-verdict":
      return createVerdictParagraphs(
        blueprint,
      );

    default:
      return createGeneralParagraphs(
        blueprint,
      );
  }
}

function createResearchRequirements(
  blueprint: GuideBlueprint,
  section: GeneratedSectionBlueprint,
): string[] {
  const requirements = [
    `Verify factual claims about "${blueprint.topic}".`,
    "Replace generic statements with category-specific evidence where available.",
    "Add at least one concrete example supported by the Product Brain.",
    "Confirm that every stated trade-off is accurate.",
    "Remove any paragraph that does not help the reader make a decision.",
  ];

  if (
    section.id ===
      "recommendations" ||
    section.id ===
      "best-value" ||
    section.id ===
      "best-overall" ||
    section.id ===
      "budget-options" ||
    section.id ===
      "premium-options"
  ) {
    requirements.push(
      "Use current Product Brain records before naming products.",
      "Verify current UK prices before publication.",
      "Confirm product availability and exact variants.",
      "Explain who should not buy each recommended option.",
    );
  }

  if (
    section.id ===
    "new-vs-used"
  ) {
    requirements.push(
      "Verify warranty, returns and seller-protection information.",
    );
  }

  return requirements;
}

export function expandSectionDraft({
  blueprint,
  section,
}: ExpandSectionInput):
  ExpandedSectionDraft {
  return {
    paragraphs:
      createPublicParagraphs(
        blueprint,
        section,
      ),

    researchRequirements:
      createResearchRequirements(
        blueprint,
        section,
      ),
  };
}