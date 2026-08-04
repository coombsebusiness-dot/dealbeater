import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

import {
  beginnerPhotographyBuyingGuide,
} from "@/knowledge/guides/photography/beginner-buying-guide";

const guides: BuyingGuide[] = [
  beginnerPhotographyBuyingGuide,
];

export function getAllBuyingGuides():
  BuyingGuide[] {
  return [...guides];
}

export function getBuyingGuideBySlug(
  slug: string,
): BuyingGuide | undefined {
  return guides.find(
    (guide) =>
      guide.slug === slug,
  );
}