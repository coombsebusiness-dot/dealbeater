import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

import {
  createGuideSeo,
} from "./createGuideSeo";



import {
  bootstrapRecommendationDatasets,
  getRecommendations,
} from "./recommendations";

type BuyingGuideSeo =
  BuyingGuide["seo"];

export interface CreateBuyingGuideInput
  extends Omit<
    BuyingGuide,
    | "slug"
    | "publishedAt"
    | "updatedAt"
    | "seo"
    | "summary"
    | "faqs"
    | "relatedGuides"
    | "recommendations"
  > {
  slug?: string;

  publishedAt?: string;

  updatedAt?: string;

  primaryKeyword: string;

  secondaryKeywords?: string[];

  summary?: string[];

  faqs?: BuyingGuide["faqs"];

  relatedGuides?:
    BuyingGuide["relatedGuides"];

  recommendations?:
    BuyingGuide["recommendations"];

  seo?: Partial<BuyingGuideSeo>;

  recommendationTopic?: string;
}

function createSlug(
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

function createDate():
  string {
  return new Date()
    .toISOString()
    .slice(0, 10);
}

export function createBuyingGuide(
  input: CreateBuyingGuideInput,
): BuyingGuide {
  const today =
    createDate();

  const slug =
    input.slug?.trim() ||
    createSlug(input.title);

  const publishedAt =
    input.publishedAt ??
    today;

  const updatedAt =
    input.updatedAt ??
    publishedAt;

  const seo =
    createGuideSeo({
      title:
        input.title,

      subtitle:
        input.subtitle,

      slug,

      category:
        input.category,

      topic:
        input.topic,

      primaryKeyword:
        input.primaryKeyword,

      secondaryKeywords:
        input.secondaryKeywords,

      heroImage:
        input.heroImage,

      overrides:
        input.seo,
        
    });
bootstrapRecommendationDatasets();

const recommendations =
  input.recommendations ??
  getRecommendations(
    input.category,
    input.recommendationTopic ??
      input.topic ??
      input.title,
  );

  return {
    slug,

    title:
      input.title,

    subtitle:
      input.subtitle,

    category:
      input.category,

    topic:
      input.topic,

    publishedAt,

    updatedAt,

    author:
      input.author,

    heroImage:
      input.heroImage,

    seo,

    verdict:
      input.verdict,

    blinlxOpinion:
      input.blinlxOpinion,

    summary:
      input.summary ?? [],

    recommendations,

    sections:
      input.sections,

    faqs:
      input.faqs ?? [],

    relatedGuides:
      input.relatedGuides ??
      [],

    askBlinlxPrompt:
      input.askBlinlxPrompt,
  };
}