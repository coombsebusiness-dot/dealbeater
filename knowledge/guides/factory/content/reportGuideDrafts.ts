import {
  bootstrapGuideBlueprints,
  getAllGuideBlueprints,
} from "@/knowledge/guides/blueprints";

import {
  createGuideContentDraft,
} from "./ContentFactory";

export interface DraftReportSummary {
  totalBlueprints: number;
  totalDrafts: number;
  totalSections: number;
  totalFaqs: number;

  categories: Record<string, number>;
  types: Record<string, number>;
  statuses: Record<string, number>;

  errors: string[];
}

export function createGuideDraftReport(): DraftReportSummary {
  bootstrapGuideBlueprints();

  const blueprints =
    getAllGuideBlueprints();

  const summary: DraftReportSummary = {
    totalBlueprints:
      blueprints.length,

    totalDrafts: 0,

    totalSections: 0,

    totalFaqs: 0,

    categories: {},

    types: {},

    statuses: {},

    errors: [],
  };

  blueprints.forEach(
    (blueprint) => {
      try {
        const draft =
          createGuideContentDraft(
            blueprint,
          );

        summary.totalDrafts++;

        summary.totalSections +=
          draft.sections.length;

        summary.totalFaqs +=
          draft.faqs.length;

        summary.categories[
          draft.category
        ] =
          (
            summary.categories[
              draft.category
            ] ?? 0
          ) + 1;

        summary.types[
          draft.type
        ] =
          (
            summary.types[
              draft.type
            ] ?? 0
          ) + 1;

        summary.statuses[
          blueprint.status
        ] =
          (
            summary.statuses[
              blueprint.status
            ] ?? 0
          ) + 1;

        if (
          draft.sections.length ===
          0
        ) {
          summary.errors.push(
            `${blueprint.slug}: no sections`,
          );
        }

        if (
          draft.faqs.length ===
          0
        ) {
          summary.errors.push(
            `${blueprint.slug}: no FAQs`,
          );
        }

        if (
          !draft.askBlinlxPrompt.trim()
        ) {
          summary.errors.push(
            `${blueprint.slug}: missing Ask Blinlx prompt`,
          );
        }
      } catch (error) {
        summary.errors.push(
          error instanceof Error
            ? `${blueprint.slug}: ${error.message}`
            : `${blueprint.slug}: Unknown error`,
        );
      }
    },
  );

  return summary;
}