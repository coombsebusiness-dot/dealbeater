import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import type {
  GeneratedSectionBlueprint,
} from "@/knowledge/guides/factory/content";

import {
  createEditorialPlan,
  expandSectionDraft,
  humaniseParagraphs,
} from "@/knowledge/guides/factory/editorial";

export interface WrittenSectionDraft {
  id:
    string;

  heading:
    string;

  introduction:
    string;

  paragraphs:
    string[];

  requiresResearch:
    boolean;

  researchNotes:
    string[];

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

function createIntroduction(
  paragraphs: string[],
): string {
  return (
    paragraphs[0] ??
    ""
  );
}

function removeIntroductionFromParagraphs(
  paragraphs: string[],
): string[] {
  return paragraphs.slice(
    1,
  );
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
    `Verify factual claims about "${blueprint.topic}".`,
    "Use specific examples only when supported by verified product knowledge.",
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
      "best-value" ||
    section.id ===
      "best-overall" ||
    section.id ===
      "budget-options" ||
    section.id ===
      "premium-options"
  ) {
    notes.push(
      "Use current Product Brain records before naming products.",
      "Verify current UK pricing before publication.",
      "Confirm product availability and exact variants.",
      "Explain who should not buy each recommended option.",
    );
  }

  if (
    section.id ===
    "new-vs-used"
  ) {
    notes.push(
      "Verify warranty, return rights, condition and seller-protection information.",
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

  const humanised =
    humaniseParagraphs(
      expandedDraft.paragraphs,
    );

  const finishedParagraphs =
    humanised
      .map(
        (paragraph) =>
          paragraph.value.trim(),
      )
      .filter(
        Boolean,
      );

  return {
    id:
      section.id,

    heading:
      section.heading,

    introduction:
      createIntroduction(
        finishedParagraphs,
      ),

    paragraphs:
      removeIntroductionFromParagraphs(
        finishedParagraphs,
      ),

    requiresResearch:
      expandedDraft
        .researchRequirements
        .length > 0,

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