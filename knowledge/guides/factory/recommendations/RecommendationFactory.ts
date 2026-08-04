import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

export type GuideRecommendations =
  NonNullable<
    BuyingGuide["recommendations"]
  >;

export interface RecommendationDataset {
  id: string;

  category: string;

  topic: string;

  recommendations:
    GuideRecommendations;
}

const recommendationDatasets =
  new Map<
    string,
    RecommendationDataset
  >();

function normaliseValue(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createDatasetKey(
  category: string,
  topic: string,
): string {
  return [
    normaliseValue(category),
    normaliseValue(topic),
  ].join(":");
}

export function registerRecommendationDataset(
  dataset: RecommendationDataset,
): void {
  const key =
    createDatasetKey(
      dataset.category,
      dataset.topic,
    );

  if (
    recommendationDatasets.has(
      key,
    )
  ) {
    throw new Error(
      `Duplicate recommendation dataset: "${key}".`,
    );
  }

  recommendationDatasets.set(
    key,
    {
      ...dataset,

      recommendations: [
        ...dataset.recommendations,
      ],
    },
  );
}

export function getRecommendations(
  category: string,
  topic: string,
): GuideRecommendations {
  const key =
    createDatasetKey(
      category,
      topic,
    );

  const dataset =
    recommendationDatasets.get(
      key,
    );

  if (!dataset) {
    return [];
  }

  return [
    ...dataset.recommendations,
  ];
}

export function hasRecommendationDataset(
  category: string,
  topic: string,
): boolean {
  return recommendationDatasets.has(
    createDatasetKey(
      category,
      topic,
    ),
  );
}

export function getAllRecommendationDatasets():
  RecommendationDataset[] {
  return Array.from(
    recommendationDatasets.values(),
  ).map(
    (dataset) => ({
      ...dataset,

      recommendations: [
        ...dataset.recommendations,
      ],
    }),
  );
}