import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import {
  createFAQBlueprints,
} from "./FAQFactory";

import {
  createSectionBlueprints,
} from "./SectionFactory";

export interface GeneratedGuideContentDraft {
  blueprintId: string;

  slug: string;

  title: string;

  category: string;

  topic: string;

  type:
    GuideBlueprint["type"];

  audience?: string;

  searchIntent:
    GuideBlueprint["searchIntent"];

  primaryKeyword: string;

  secondaryKeywords: string[];

  recommendationTopic?: string;

  sections:
    ReturnType<
      typeof createSectionBlueprints
    >;

  faqs:
    ReturnType<
      typeof createFAQBlueprints
    >;

  askBlinlxPrompt: string;
}

function createAskBlinlxPrompt(
  blueprint: GuideBlueprint,
): string {
  const audience =
    blueprint.audience?.trim();

  const audienceText =
  audience
    ? ` My buying needs are best described as: ${audience.toLowerCase()}.`
    : "";

  switch (blueprint.type) {
    case "COMPARISON":
      return `Help me compare ${blueprint.topic} and decide which option best matches my needs, budget and priorities.${audienceText}`;

    case "BUDGET_GUIDE":
      return `Help me choose the best option for ${blueprint.topic} without wasting money.${audienceText}`;

    case "BEST_FOR":
      return `Help me choose the best ${blueprint.topic} for my needs and budget.${audienceText}`;

    case "EXPLAINER":
      return `Explain ${blueprint.topic} in plain English and tell me whether it matters for my buying decision.${audienceText}`;

    case "MISTAKES":
      return `Help me avoid the biggest mistakes when buying ${blueprint.topic}.${audienceText}`;

    case "BUYING_GUIDE":
    default:
      return `Help me choose the right ${blueprint.topic} for my needs and budget.${audienceText}`;
  }
}

export function createGuideContentDraft(
  blueprint: GuideBlueprint,
): GeneratedGuideContentDraft {
  return {
    blueprintId:
      blueprint.id,

    slug:
      blueprint.slug,

    title:
      blueprint.title,

    category:
      blueprint.category,

    topic:
      blueprint.topic,

    type:
      blueprint.type,

    audience:
      blueprint.audience,

    searchIntent:
      blueprint.searchIntent,

    primaryKeyword:
      blueprint.primaryKeyword,

    secondaryKeywords: [
      ...(
        blueprint.secondaryKeywords ??
        []
      ),
    ],

    recommendationTopic:
      blueprint.recommendationTopic,

    sections:
      createSectionBlueprints(
        blueprint,
      ),

    faqs:
      createFAQBlueprints(
        blueprint,
      ),

    askBlinlxPrompt:
      createAskBlinlxPrompt(
        blueprint,
      ),
  };
}