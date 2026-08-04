import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import {
  
  expandSectionDraft,
  
} from "@/knowledge/guides/factory/editorial";

import type {
  GeneratedSectionBlueprint,
} from "@/knowledge/guides/factory/content";

import {
  createEditorialPlan,
  humaniseParagraphs,
} from "@/knowledge/guides/factory/editorial";

import {
  BLINLX_EDITORIAL_MARKER,
} from "./EditorialVoice";

export interface WrittenSectionDraft {
  id: string;

  heading: string;

  introduction: string;

  paragraphs: string[];

  requiresResearch: boolean;

  researchNotes: string[];

  editorialPlan:
    ReturnType<
      typeof createEditorialPlan
    >;

  humanisationChanges:
    string[];
}

export interface WriteSectionInput {
  blueprint:
    GuideBlueprint;

  section:
    GeneratedSectionBlueprint;
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

function createOpeningParagraph(
  blueprint: GuideBlueprint,
  section: GeneratedSectionBlueprint,
): string {
  const topic =
    lowerFirst(
      blueprint.topic,
    );

  switch (section.id) {
    case "introduction":
      return `${BLINLX_EDITORIAL_MARKER} Buying ${topic} can look more complicated than it really is. Specifications, marketing claims and price differences quickly pile up, but only a handful of those details will genuinely affect what you should buy. The aim here is to simplify the decision and show you what your money can realistically achieve.`;

    case "what-to-prioritise":
    case "what-to-look-for":
      return `${BLINLX_EDITORIAL_MARKER} Start with the things you will notice every time you use it. A longer specification sheet does not automatically make something the better purchase. The sensible choice is usually the one that handles your main needs reliably without charging you for extras you may never use.`;

    case "what-to-compromise":
      return `${BLINLX_EDITORIAL_MARKER} Every budget involves compromise. The important question is not whether a product has weaknesses, but whether those weaknesses will actually matter to you. Saving money can be completely sensible when the missing features would rarely make a difference.`;

    case "best-value":
      return `${BLINLX_EDITORIAL_MARKER} The cheapest option is not always the best value, and the most expensive one rarely makes sense for everybody. The sweet spot is usually where the important features are dependable but the price has not yet been pushed up by specialist extras.`;

    case "new-vs-used":
      return `${BLINLX_EDITORIAL_MARKER} Buying used can stretch your budget considerably, but it changes the risks involved. Condition, warranty cover, seller reputation and the cost of replacing worn accessories all matter. A well-kept older product from a reputable seller may be a much better buy than a weak new model at the same price.`;

    case "mistakes":
    case "common-mistakes":
      return `${BLINLX_EDITORIAL_MARKER} One of the easiest ways to waste money is to buy around marketing rather than real needs. Buyers often pay for impressive headline features, overlook the wider cost of ownership or choose something that becomes inconvenient to use regularly.`;

    case "recommendations":
      return `${BLINLX_EDITORIAL_MARKER} Recommendations should come after the buying criteria are clear. Popularity alone is not enough. A useful recommendation needs to explain who each option suits, where it compromises and why it offers good value at its current price.`;

    case "alternatives":
      return `${BLINLX_EDITORIAL_MARKER} The obvious product category is not always the smartest answer. Depending on what you need, a cheaper alternative, an older model or a different product type may solve the same problem with less expense.`;

    case "final-verdict":
      return `${BLINLX_EDITORIAL_MARKER} The final decision should be simple. This section needs to explain which route makes the most sense for most buyers, who should spend more and who should save their money. You should leave knowing what to do next, not staring at another list of specifications.`;

    default:
      return `${BLINLX_EDITORIAL_MARKER} ${section.purpose} Keep the explanation practical, honest and focused on how this affects the reader's buying decision.`;
  }
}

function createPlannedParagraph(
  blueprint: GuideBlueprint,
  section: GeneratedSectionBlueprint,
): string {
  const plan =
    createEditorialPlan({
      blueprint,
      section,
    });

  const audience =
    blueprint.audience?.trim();

  const audienceSentence =
    audience
      ? `This is especially important for ${audience.toLowerCase()}, because the right choice often depends more on real use than headline specifications.`
      : "The right choice often depends more on real use than headline specifications.";

  switch (section.id) {
    case "introduction":
      return `${BLINLX_EDITORIAL_MARKER} ${audienceSentence} By the end of this section, the reader should understand the realistic strengths, limitations and costs involved before narrowing down any specific products.`;

    case "what-to-prioritise":
    case "what-to-look-for":
      return `${BLINLX_EDITORIAL_MARKER} Focus on the features that solve a genuine problem. Explain why each one matters, who will benefit from it and when it is little more than an expensive extra. The reader should be able to separate useful capability from clever marketing.`;

    case "what-to-compromise":
      return `${BLINLX_EDITORIAL_MARKER} Be clear about what the buyer gains by accepting each compromise. A cheaper option may have slower performance, fewer controls or a less premium build, but those trade-offs can still be perfectly reasonable when they do not interfere with the way the product will be used.`;

    case "best-value":
      return `${BLINLX_EDITORIAL_MARKER} Value is about the balance between price, capability and how long the purchase will remain useful. Show where paying a little more creates a meaningful improvement, and where the extra money only buys features most readers are unlikely to notice.`;

    case "new-vs-used":
      return `${BLINLX_EDITORIAL_MARKER} Compare the routes honestly. New products offer warranty protection and fewer unknowns, while used products can deliver far more capability for the same money. The smarter route depends on condition, seller protection and how confident the buyer is checking the product properly.`;

    case "mistakes":
    case "common-mistakes":
      return `${BLINLX_EDITORIAL_MARKER} The most useful advice is often what not to buy. Cover the tempting upgrades that offer little real benefit, the accessories people forget to budget for and the warning signs that should make a buyer walk away.`;

    case "recommendations":
      return `${BLINLX_EDITORIAL_MARKER} Each recommendation should have a clear reason to exist. Explain the ideal buyer, the strongest advantage, the most important weakness and whether the current price makes sense. If the evidence is not strong enough, do not recommend it yet.`;

    case "alternatives":
      return `${BLINLX_EDITORIAL_MARKER} Give the reader a genuine escape route from the obvious purchase. That could mean spending less, buying used, choosing an older generation or switching to a different type of product that better matches the job they need done.`;

    case "final-verdict":
      return `${BLINLX_EDITORIAL_MARKER} Finish with a direct answer. Say what Blinlx would choose, explain why and name the circumstances that would change that decision. If spending more is unnecessary, say so plainly.`;

    default:
      return `${BLINLX_EDITORIAL_MARKER} ${plan.openingGoal} ${plan.finishWith}`;
  }
}

function createResearchNotes(
  blueprint: GuideBlueprint,
  section: GeneratedSectionBlueprint,
): string[] {
  const plan =
    createEditorialPlan({
      blueprint,
      section,
    });

  const notes = [
    `Answer the reader question: ${plan.readerQuestion}`,
    `Support the section objective: ${plan.objective}`,
    `Follow the opening goal: ${plan.openingGoal}`,
    `Finish with: ${plan.finishWith}`,
    `Verify current information relevant to "${blueprint.topic}".`,
    "Add specific examples only when supported by verified product knowledge.",
    "Explain at least one meaningful trade-off.",
    "State when spending more would not be worthwhile.",
    ...plan.avoid.map(
      (item) =>
        `Avoid: ${item}.`,
    ),
  ];

  if (
    section.id ===
      "recommendations" ||
    section.id ===
      "best-value"
  ) {
    notes.push(
      "Use current Product Intelligence data before naming specific products.",
      "Check current UK pricing and retailer availability.",
      "Explain who should not buy each recommended option.",
    );
  }

  if (
    section.id ===
    "new-vs-used"
  ) {
    notes.push(
      "Include warranty, condition, returns and seller-risk considerations.",
    );
  }

  return notes;
}

export function writeSectionDraft({
  blueprint,
  section,
}: WriteSectionInput): WrittenSectionDraft {
  const editorialPlan =
    createEditorialPlan({
      blueprint,
      section,
    });

    const expandedDraft =
  expandSectionDraft({
    blueprint,
    section,
    plan:
      editorialPlan,
  });

  const rawParagraphs = [
  createOpeningParagraph(
    blueprint,
    section,
  ),

  createPlannedParagraph(
    blueprint,
    section,
  ),

  ...expandedDraft.paragraphs.map(
    (paragraph) =>
      `${BLINLX_EDITORIAL_MARKER} ${paragraph}`,
  ),
];


  const humanised =
    humaniseParagraphs(
      rawParagraphs,
    );

  return {
    id:
      section.id,

    heading:
      section.heading,

    introduction:
      section.purpose,

    paragraphs:
      humanised.map(
        (paragraph) =>
          paragraph.value,
      ),

    requiresResearch:
      true,

   researchNotes: [
  ...createResearchNotes(
    blueprint,
    section,
  ),

  ...expandedDraft
    .researchRequirements,
],

    editorialPlan,

    humanisationChanges:
      humanised.flatMap(
        (paragraph) =>
          paragraph.changes,
      ),
  };
}