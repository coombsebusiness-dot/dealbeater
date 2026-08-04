import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

import {
  scoreBuyingGuide,
} from "@/knowledge/guides/factory";

import type {
  BuyingGuideQualityResult,
} from "@/knowledge/guides/factory";

import {
  createBuyingGuideArtifact,
} from "./createBuyingGuideArtifact";

import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import {
  createGuideContentDraft,
} from "@/knowledge/guides/factory/content";

import {
  createGuideSeo,
} from "@/knowledge/guides/factory";

export interface PublishGuideOptions {
  heroImage:
    BuyingGuide["heroImage"];

  subtitle?: string;

  seoOverrides?:
    Partial<
      BuyingGuide["seo"]
    >;
}

export type PublishedGuideStatus =
  | "DRAFT"
  | "REVIEW"
  | "READY"
  | "BLOCKED";

export interface PublishedGuide {
  blueprint:
    GuideBlueprint;

  content:
    ReturnType<
      typeof createGuideContentDraft
    >;

  seo:
    ReturnType<
      typeof createGuideSeo
    >;

  heroImage:
    BuyingGuide["heroImage"];

  buyingGuide:
    BuyingGuide;

  quality:
    BuyingGuideQualityResult;

  status:
    PublishedGuideStatus;

  publishable:
    boolean;
}
function getPublishedGuideStatus(
  quality: BuyingGuideQualityResult,
): PublishedGuideStatus {
  if (
    quality.status ===
    "BLOCKED"
  ) {
    return "BLOCKED";
  }

  if (
    quality.status ===
    "EXCELLENT" ||
    quality.status ===
    "READY"
  ) {
    return "READY";
  }

  return "DRAFT";
}

export function publishGuide(
  blueprint: GuideBlueprint,
  options: PublishGuideOptions,
): PublishedGuide {
  const content =
    createGuideContentDraft(
      blueprint,
    );

  const seo =
    createGuideSeo({
      title:
        content.title,

      subtitle:
        options.subtitle,

      slug:
        content.slug,

      category:
        content.category,

      topic:
        content.topic,

      primaryKeyword:
        content.primaryKeyword,

      secondaryKeywords:
        content.secondaryKeywords,

      heroImage:
        options.heroImage,

      overrides:
        options.seoOverrides,
    });

 const buyingGuide =
  createBuyingGuideArtifact({
    blueprint,

    content,

    seo,

    heroImage:
      options.heroImage,

    subtitle:
      options.subtitle,
  });

const quality =
  scoreBuyingGuide(
    buyingGuide,
  );

const status =
  getPublishedGuideStatus(
    quality,
  );

const publishable =
  status === "READY" &&
  blueprint.status ===
    "READY";

return {
  blueprint,

  content,

  seo,

  heroImage:
    options.heroImage,

  buyingGuide,

  quality,

  status,

  publishable,
};
}