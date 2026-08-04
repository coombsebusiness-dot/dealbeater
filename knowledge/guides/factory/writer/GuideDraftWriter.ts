import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import {
  createGuideContentDraft,
} from "@/knowledge/guides/factory/content";

import {
  writeSectionDraft,
} from "./SectionWriter";

export interface WrittenGuideDraft {
  blueprint:
    GuideBlueprint;

  contentPlan:
    ReturnType<
      typeof createGuideContentDraft
    >;

  sections:
    ReturnType<
      typeof writeSectionDraft
    >[];

  estimatedParagraphCount:
    number;

  requiresEditorialReview:
    true;
}

export function writeGuideDraft(
  blueprint: GuideBlueprint,
): WrittenGuideDraft {
  const contentPlan =
    createGuideContentDraft(
      blueprint,
    );

  const sections =
    contentPlan.sections.map(
      (section) =>
        writeSectionDraft({
          blueprint,
          section,
        }),
    );

  const estimatedParagraphCount =
    sections.reduce(
      (total, section) =>
        total +
        section.paragraphs.length,
      0,
    );

  return {
    blueprint,

    contentPlan,

    sections,

    estimatedParagraphCount,

    requiresEditorialReview:
      true,
  };
}