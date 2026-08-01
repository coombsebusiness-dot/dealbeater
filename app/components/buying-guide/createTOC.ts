import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

export interface BuyingGuideTOCItem {
  id: string;

  label: string;

  level: 2 | 3;
}

export function createBuyingGuideTOC(
  guide: BuyingGuide,
): BuyingGuideTOCItem[] {
  return guide.sections.flatMap(
    (section) => {
      const items: BuyingGuideTOCItem[] = [
        {
          id: section.id,

          label: section.heading,

          level: 2,
        },
      ];

      section.blocks.forEach(
        (block) => {
          if (
            "heading" in block &&
            typeof block.heading ===
              "string" &&
            block.heading.trim().length > 0
          ) {
            items.push({
              id: block.id,

              label: block.heading,

              level: 3,
            });
          }
        },
      );

      return items;
    },
  );
}