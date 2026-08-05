import type {
  EditorialCoverageItem,
} from "./EditorialContext";

export interface CoveragePlannerInput {
  topic: string;

  category?: string;

  audience?: string;

  recommendationTopic?: string;

  sectionIds?: string[];
}

export class CoveragePlanner {
  plan({
    topic,
    category,
    audience,
    recommendationTopic,
    sectionIds = [],
  }: CoveragePlannerInput): EditorialCoverageItem[] {
    const normalizedTopic =
      topic.trim();

    if (!normalizedTopic) {
      return [];
    }

    const coverageItems =
      this.createBaseCoverage({
        topic: normalizedTopic,

        category,

        audience,

        recommendationTopic,
      });

    return coverageItems.map(
      (
        item,
        index,
      ) => ({
        ...item,

        status: "PENDING",

        importance:
          item.importance ??
          Math.max(
            1,
            10 - index,
          ),

        assignedSectionId:
          this.findSuggestedSection(
            item.id,
            sectionIds,
          ),
      }),
    );
  }

  private createBaseCoverage({
    topic,
    category,
    audience,
    recommendationTopic,
  }: Omit<
    CoveragePlannerInput,
    "sectionIds"
  >): EditorialCoverageItem[] {
    const items:
      EditorialCoverageItem[] = [
        createCoverageItem({
          id: "buying-problem",

          topic:
            `The buying problem behind ${topic}`,

          description:
            `Explain what problem the reader is trying to solve by considering ${topic}.`,

          importance: 10,
        }),

        createCoverageItem({
          id: "need",

          topic:
            `Whether the reader genuinely needs ${topic}`,

          description:
            "Help the reader decide whether to buy now, wait or improve their current setup.",

          importance: 10,
        }),

        createCoverageItem({
          id: "ideal-user",

          topic:
            `Who ${topic} suits best`,

          description:
            audience?.trim()
              ? `Explain how ${topic} fits the needs of ${audience.trim()}.`
              : `Explain which users and situations ${topic} suits best.`,

          importance: 9,
        }),

        createCoverageItem({
          id: "poor-fit",

          topic:
            `Who should avoid ${topic}`,

          description:
            "Explain when another option would be more suitable.",

          importance: 9,
        }),

        createCoverageItem({
          id: "essential-features",

          topic:
            `The essential features of ${topic}`,

          description:
            "Explain which features materially affect everyday use.",

          importance: 10,
        }),

        createCoverageItem({
          id: "compatibility",

          topic:
            `${topic} compatibility`,

          description:
            "Explain compatibility, ecosystem or supporting-product requirements.",

          importance: 9,
        }),

        createCoverageItem({
          id: "trade-offs",

          topic:
            `The main trade-offs of ${topic}`,

          description:
            "Explain what buyers gain, what they give up and which compromises matter.",

          importance: 10,
        }),

        createCoverageItem({
          id: "budget",

          topic:
            `A sensible budget for ${topic}`,

          description:
            "Explain realistic spending levels and where diminishing returns begin.",

          importance: 10,
        }),

        createCoverageItem({
          id: "ownership-cost",

          topic:
            `The complete ownership cost of ${topic}`,

          description:
            "Include accessories, supporting equipment, replacement costs and ongoing expenses.",

          importance: 8,
        }),

        createCoverageItem({
          id: "common-mistakes",

          topic:
            `Common mistakes when buying ${topic}`,

          description:
            "Protect the reader from poor-value decisions and unsuitable purchases.",

          importance: 10,
        }),

        createCoverageItem({
          id: "recommendations",

          topic:
            recommendationTopic?.trim()
              ? recommendationTopic.trim()
              : `Recommended ${topic} options`,

          description:
            "Explain which types or products suit different buyer needs.",

          importance: 10,
        }),

        createCoverageItem({
          id: "alternatives",

          topic:
            `Alternatives to buying ${topic}`,

          description:
            "Consider cheaper, used, older or different-category alternatives.",

          importance: 8,
        }),

        createCoverageItem({
          id: "used-buying",

          topic:
            `Whether to buy ${topic} new or used`,

          description:
            "Compare value, warranty, condition risk and long-term ownership.",

          importance: 7,
        }),

        createCoverageItem({
          id: "final-checklist",

          topic:
            `Final checks before buying ${topic}`,

          description:
            "Give the reader a practical checklist before spending money.",

          importance: 10,
        }),

        createCoverageItem({
          id: "verdict",

          topic:
            `The final buying decision for ${topic}`,

          description:
            "Give one clear next step based on suitability, value and evidence.",

          importance: 10,
        }),
      ];

    if (category?.trim()) {
      items.push(
        createCoverageItem({
          id: "category-context",

          topic:
            `${category.trim()} buying context`,

          description:
            `Explain the category-specific factors that affect buying decisions within ${category.trim()}.`,

          importance: 8,
        }),
      );
    }

    return items;
  }

  private findSuggestedSection(
    coverageId: string,
    sectionIds: string[],
  ): string | undefined {
    const sectionMap:
      Record<string, string[]> = {
        "buying-problem": [
          "introduction",
        ],

        need: [
          "do-you-need-it",
        ],

        "ideal-user": [
          "who-is-it-for",
        ],

        "poor-fit": [
          "who-is-it-for",
          "alternatives",
        ],

        "essential-features": [
          "what-to-look-for",
        ],

        compatibility: [
          "what-to-look-for",
          "before-you-buy",
        ],

        "trade-offs": [
          "what-to-look-for",
        ],

        budget: [
          "budget",
        ],

        "ownership-cost": [
          "budget",
        ],

        "common-mistakes": [
          "common-mistakes",
        ],

        recommendations: [
          "recommendations",
        ],

        alternatives: [
          "alternatives",
        ],

        "used-buying": [
          "alternatives",
          "before-you-buy",
        ],

        "final-checklist": [
          "before-you-buy",
        ],

        verdict: [
          "final-verdict",
        ],

        "category-context": [
          "introduction",
          "what-to-look-for",
        ],
      };

    const candidates =
      sectionMap[coverageId] ?? [];

    return candidates.find(
      (candidate) =>
        sectionIds.includes(
          candidate,
        ),
    );
  }
}

function createCoverageItem({
  id,
  topic,
  description,
  importance,
}: {
  id: string;

  topic: string;

  description: string;

  importance: number;
}): EditorialCoverageItem {
  return {
    id,

    topic,

    description,

    importance,

    status: "PENDING",
  };
}