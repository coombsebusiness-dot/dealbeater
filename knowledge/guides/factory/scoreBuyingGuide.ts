import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

import {
  validateEditorialPlaceholders,
} from "@/knowledge/guides/factory/quality/EditorialPlaceholderValidator";

export type BuyingGuideQualityStatus =
  | "BLOCKED"
  | "NEEDS_WORK"
  | "READY"
  | "EXCELLENT";

export interface BuyingGuideQualityResult {
  score: number;

  status:
    BuyingGuideQualityStatus;

  errors: string[];

  warnings: string[];

  strengths: string[];

  metrics: {
    sectionCount: number;
    blockCount: number;
    faqCount: number;
    summaryCount: number;
    keywordCount: number;
    recommendationCount: number;
    estimatedWordCount: number;
  };
}

function countWords(
  value?: string | null,
): number {
  if (!value?.trim()) {
    return 0;
  }

  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length;
}

function countStringArrayWords(
  values?: string[],
): number {
  return (
    values?.reduce<number>(
      (total, value) =>
        total +
        countWords(value),
      0,
    ) ?? 0
  );
}

function countTableRowWords(
  values: Record<
    string,
    string | number | boolean
  >,
): number {
  return Object.values(
    values,
  ).reduce<number>(
    (total, value) =>
      total +
      countWords(String(value)),
    0,
  );
}

function estimateGuideWordCount(
  guide: BuyingGuide,
): number {
  let total = 0;

  total +=
    countWords(guide.title);

  total +=
    countWords(guide.subtitle);

  total +=
    countWords(
      guide.verdict.title,
    );

  total +=
    countWords(
      guide.verdict.summary,
    );

  total +=
    countStringArrayWords(
      guide.verdict.points,
    );

  total +=
    countStringArrayWords(
      guide.summary,
    );

  if (guide.blinlxOpinion) {
    total +=
      countWords(
        guide.blinlxOpinion.title,
      );

    total +=
      countWords(
        guide.blinlxOpinion
          .summary,
      );

    total +=
      countWords(
        guide.blinlxOpinion
          .ifItWasOurMoney,
      );

    total +=
      countStringArrayWords(
        guide.blinlxOpinion
          .reasons,
      );

    total +=
      countStringArrayWords(
        guide.blinlxOpinion
          .caveats,
      );
  }

  guide.sections.forEach(
    (section) => {
      total +=
        countWords(
          section.heading,
        );

      total +=
        countWords(
          section.introduction,
        );

      section.blocks.forEach(
        (block) => {
          switch (block.type) {
            case "TEXT": {
              total +=
                countWords(
                  block.heading,
                );

              total +=
                countStringArrayWords(
                  block.paragraphs,
                );

              break;
            }

            case "IMAGE": {
              total +=
                countWords(
                  block.alt,
                );

              total +=
                countWords(
                  block.caption,
                );

              break;
            }

            case "QUOTE": {
              total +=
                countWords(
                  block.quote,
                );

              total +=
                countWords(
                  block.attribution,
                );

              break;
            }

            case "TIP":
            case "WARNING": {
              total +=
                countWords(
                  block.title,
                );

              total +=
                countWords(
                  block.text,
                );

              break;
            }

            case "TABLE": {
              total +=
                countWords(
                  block.heading,
                );

              total +=
                block.columns.reduce<number>(
                  (
                    columnTotal,
                    column,
                  ) =>
                    columnTotal +
                    countWords(
                      column.label,
                    ),
                  0,
                );

              total +=
                block.rows.reduce<number>(
                  (
                    rowTotal,
                    row,
                  ) =>
                    rowTotal +
                    countTableRowWords(
                      row.values,
                    ),
                  0,
                );

              break;
            }

            case "COMPARISON": {
              total +=
                countWords(
                  block.heading,
                );

              total +=
                block.items.reduce<number>(
                  (
                    itemTotal,
                    item,
                  ) => {
                    return (
                      itemTotal +
                      countWords(
                        item.name,
                      ) +
                      countWords(
                        item.description,
                      ) +
                      countWords(
                        item.verdict,
                      ) +
                      countStringArrayWords(
                        item.strengths,
                      ) +
                      countStringArrayWords(
                        item.weaknesses,
                      )
                    );
                  },
                  0,
                );

              break;
            }

            case "GALLERY": {
              total +=
                countWords(
                  block.heading,
                );

              total +=
                block.images.reduce<number>(
                  (
                    imageTotal,
                    image,
                  ) => {
                    return (
                      imageTotal +
                      countWords(
                        image.alt,
                      ) +
                      countWords(
                        image.caption,
                      )
                    );
                  },
                  0,
                );

              break;
            }

            case "RECOMMENDATION": {
              total +=
                countWords(
                  block.heading,
                );

              total +=
                countWords(
                  block.summary,
                );

              total +=
                countStringArrayWords(
                  block.reasons,
                );

              total +=
                countWords(
                  block.productName,
                );

              break;
            }

            case "CTA": {
              total +=
                countWords(
                  block.heading,
                );

              total +=
                countWords(
                  block.text,
                );

              total +=
                countWords(
                  block.buttonLabel,
                );

              break;
            }

            default: {
              break;
            }
          }
        },
      );
    },
  );

  total +=
    (
      guide.faqs ?? []
    ).reduce<number>(
      (faqTotal, faq) =>
        faqTotal +
        countWords(
          faq.question,
        ) +
        countWords(
          faq.answer,
        ),
      0,
    );

  return total;
}

function getStatus(
  score: number,
  hasErrors: boolean,
): BuyingGuideQualityStatus {
  if (hasErrors) {
    return "BLOCKED";
  }

  if (score >= 90) {
    return "EXCELLENT";
  }

  if (score >= 75) {
    return "READY";
  }

  return "NEEDS_WORK";
}

export function scoreBuyingGuide(
  guide: BuyingGuide,
): BuyingGuideQualityResult {
  let score = 100;

  const errors:
    string[] = [];

  const warnings:
    string[] = [];

  const strengths:
    string[] = [];

  const summary =
    guide.summary ?? [];

  const faqs =
    guide.faqs ?? [];

  const keywords =
    guide.seo.keywords ?? [];

  const recommendations =
    guide.recommendations ?? [];

  const askBlinlxPrompt =
    guide.askBlinlxPrompt ?? "";

  const openGraphImageSrc =
    guide.seo.openGraphImage
      ?.src ?? "";

  const blockCount =
    guide.sections.reduce<number>(
      (total, section) =>
        total +
        section.blocks.length,
      0,
    );

  const estimatedWordCount =
    estimateGuideWordCount(
      guide,
    );

  if (
    guide.title.trim().length <
    20
  ) {
    score -= 8;

    warnings.push(
      "Guide title may be too short.",
    );
  } else {
    strengths.push(
      "Guide title is descriptive.",
    );
  }

  if (
    guide.seo.title.length >
    65
  ) {
    score -= 5;

    warnings.push(
      "SEO title is longer than 65 characters.",
    );
  } else {
    strengths.push(
      "SEO title length is within the recommended range.",
    );
  }

  if (
    guide.seo.description
      .length < 120
  ) {
    score -= 5;

    warnings.push(
      "Meta description is shorter than 120 characters.",
    );
  } else if (
    guide.seo.description
      .length > 160
  ) {
    score -= 5;

    warnings.push(
      "Meta description is longer than 160 characters.",
    );
  } else {
    strengths.push(
      "Meta description length is within the recommended range.",
    );
  }

  if (
    guide.sections.length <
    6
  ) {
    score -= 12;

    warnings.push(
      "Guide should contain at least six substantial sections.",
    );
  } else {
    strengths.push(
      "Guide has strong section depth.",
    );
  }

  if (
    blockCount < 10
  ) {
    score -= 8;

    warnings.push(
      "Guide may need more supporting content blocks.",
    );
  } else {
    strengths.push(
      "Guide has a healthy number of content blocks.",
    );
  }

  if (
    faqs.length < 5
  ) {
    score -= 8;

    warnings.push(
      "Guide should contain at least five FAQs.",
    );
  } else {
    strengths.push(
      "Guide has useful FAQ coverage.",
    );
  }

  if (
    summary.length < 3
  ) {
    score -= 6;

    warnings.push(
      "Guide should contain at least three summary points.",
    );
  } else {
    strengths.push(
      "Guide has a useful summary.",
    );
  }

  if (
    keywords.length < 5
  ) {
    score -= 6;

    warnings.push(
      "Guide should contain at least five SEO keywords.",
    );
  } else {
    strengths.push(
      "Guide has broad keyword coverage.",
    );
  }

  if (
    estimatedWordCount <
    1500
  ) {
    score -= 15;

    warnings.push(
      "Guide may be too thin for publication.",
    );
  } else if (
    estimatedWordCount >=
    3000
  ) {
    strengths.push(
      "Guide has strong long-form depth.",
    );
  } else {
    strengths.push(
      "Guide has a useful level of content depth.",
    );
  }

  if (
    !guide.heroImage.alt.trim()
  ) {
    score -= 8;

    errors.push(
      "Hero image must have alt text.",
    );
  } else {
    strengths.push(
      "Hero image has descriptive alt text.",
    );
  }

  if (
    !openGraphImageSrc.trim()
  ) {
    score -= 8;

    errors.push(
      "Open Graph image is required.",
    );
  } else {
    strengths.push(
      "Open Graph image is configured.",
    );
  }

  if (
    !askBlinlxPrompt.trim()
  ) {
    score -= 10;

    errors.push(
      "Ask Blinlx prompt is required.",
    );
  } else {
    strengths.push(
      "Ask Blinlx prompt is configured.",
    );
  }
const editorialValidation =
  validateEditorialPlaceholders(
    guide,
  );
  const sectionIds =
    new Set<string>();

  const blockIds =
    new Set<string>();

  guide.sections.forEach(
    (section) => {
      if (
        sectionIds.has(
          section.id,
        )
      ) {
        score -= 10;

        errors.push(
          `Duplicate section ID: "${section.id}".`,
        );
      }

      sectionIds.add(
        section.id,
      );

      if (
        section.blocks.length ===
        0
      ) {
        score -= 5;

        errors.push(
          `Section "${section.heading}" has no content blocks.`,
        );
      }

      section.blocks.forEach(
        (block) => {
          if (
            blockIds.has(
              block.id,
            )
          ) {
            score -= 5;

            errors.push(
              `Duplicate block ID: "${block.id}".`,
            );
          }

          blockIds.add(
            block.id,
          );
        },
      );
    },
  );
if (
  !editorialValidation.valid
) {
  score = Math.min(
    score,
    60,
  );

  errors.push(
    ...editorialValidation.issues.map(
      (issue) =>
        `Editorial placeholder found at ${issue.location}: "${issue.marker}".`,
    ),
  );
}
  score =
    Math.max(
      0,
      Math.min(
        100,
        score,
      ),
    );

  return {
    score,

    status:
      getStatus(
        score,
        errors.length > 0,
      ),

    errors,

    warnings,

    strengths,

    metrics: {
      sectionCount:
        guide.sections.length,

      blockCount,

      faqCount:
        faqs.length,

      summaryCount:
        summary.length,

      keywordCount:
        keywords.length,

      recommendationCount:
        recommendations.length,

      estimatedWordCount,
    },
  };
}