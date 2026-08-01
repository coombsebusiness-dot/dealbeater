import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

function countWords(
  value: string,
): number {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length;
}

export function calculateBuyingGuideWordCount(
  guide: BuyingGuide,
): number {
  let total = 0;

  total += countWords(
    guide.title,
  );

  total += countWords(
    guide.subtitle ?? "",
  );

  guide.summary.forEach(
    (item) => {
      total += countWords(item);
    },
  );

  guide.sections.forEach(
    (section) => {
      total += countWords(
        section.heading,
      );

      total += countWords(
        section.introduction ?? "",
      );

      section.blocks.forEach(
        (block) => {
          switch (block.type) {
            case "TEXT":
              total += countWords(
                block.heading ?? "",
              );

              block.paragraphs.forEach(
                (paragraph) => {
                  total +=
                    countWords(
                      paragraph,
                    );
                },
              );

              break;

            case "QUOTE":
              total += countWords(
                block.quote,
              );

              total += countWords(
                block.attribution ?? "",
              );

              break;

            case "TIP":
            case "WARNING":
              total += countWords(
                block.title ?? "",
              );

              total += countWords(
                block.text,
              );

              break;

            case "RECOMMENDATION":
              total += countWords(
                block.heading,
              );

              total += countWords(
                block.summary,
              );

              block.reasons.forEach(
                (reason) => {
                  total +=
                    countWords(reason);
                },
              );

              break;

            case "CTA":
              total += countWords(
                block.heading,
              );

              total += countWords(
                block.text,
              );

              break;

            default:
              break;
          }
        },
      );
    },
  );

  guide.faqs.forEach(
    (faq) => {
      total += countWords(
        faq.question,
      );

      total += countWords(
        faq.answer,
      );
    },
  );

  return total;
}

export function calculateBuyingGuideReadingTime(
  guide: BuyingGuide,
  wordsPerMinute = 220,
): number {
  const wordCount =
    calculateBuyingGuideWordCount(
      guide,
    );

  if (wordCount === 0) {
    return 1;
  }

  return Math.max(
    1,
    Math.ceil(
      wordCount /
        wordsPerMinute,
    ),
  );
}