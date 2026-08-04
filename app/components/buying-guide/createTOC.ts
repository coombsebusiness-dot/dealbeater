import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

export interface BuyingGuideTOCItem {
  id: string;

  label: string;
}

export function createBuyingGuideTOC(
  guide: BuyingGuide,
): BuyingGuideTOCItem[] {
  return guide.sections.map(
    (section) => ({
      id: section.id,

      label: section.heading,
    }),
  );
}