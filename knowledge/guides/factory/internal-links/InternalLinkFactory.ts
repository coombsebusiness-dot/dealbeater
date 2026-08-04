import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

import {
  scoreGuideRelationship,
} from "@/knowledge/graph";

export interface InternalLink {
  slug: string;

  title: string;

  href: string;

  description?: string;

  score: number;

  reasons: string[];
}

export interface CreateInternalLinksOptions {
  limit?: number;

  minimumScore?: number;

  manualBoosts?: Record<
    string,
    number
  >;
}

export function createInternalLinks(
  currentGuide: BuyingGuide,
  allGuides: BuyingGuide[],
  options:
    CreateInternalLinksOptions = {},
): InternalLink[] {
  const limit =
    options.limit ?? 8;

  const minimumScore =
    options.minimumScore ?? 20;

  return allGuides
    .filter(
      (guide) =>
        guide.slug !==
        currentGuide.slug,
    )
    .map((guide) => {
      const relationship =
        scoreGuideRelationship(
          currentGuide,
          guide,
          {
            manualBoost:
              options.manualBoosts?.[
                guide.slug
              ] ?? 0,
          },
        );

      return {
        slug:
          guide.slug,

        title:
          guide.title,

        href:
          guide.seo
            .canonicalPath,

        description:
          guide.subtitle,

        score:
          relationship.score,

        reasons:
          relationship.reasons,
      };
    })
    .filter(
      (link) =>
        link.score >=
        minimumScore,
    )
    .sort(
      (first, second) =>
        second.score -
        first.score,
    )
    .slice(
      0,
      limit,
    );
}