import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

export interface EditorialPlaceholderIssue {
  location: string;

  value: string;

  marker: string;
}

export interface EditorialPlaceholderResult {
  valid: boolean;

  issues:
    EditorialPlaceholderIssue[];
}

const PLACEHOLDER_MARKERS = [
  "editorial draft:",
  "todo",
  "placeholder",
  "replace this",
  "replace with",
  "write a clear",
  "write the",
  "add the",
  "add an",
  "add another",
  "insert ",
  "lorem ipsum",
];

function findPlaceholderMarker(
  value?: string | null,
): string | null {
  if (!value?.trim()) {
    return null;
  }

  const normalised =
    value
      .trim()
      .toLowerCase();

  return (
    PLACEHOLDER_MARKERS.find(
      (marker) =>
        normalised.includes(
          marker,
        ),
    ) ?? null
  );
}

function checkValue(
  issues:
    EditorialPlaceholderIssue[],
  location: string,
  value?: string | null,
): void {
  const marker =
    findPlaceholderMarker(
      value,
    );

  if (!marker || !value) {
    return;
  }

  issues.push({
    location,

    value,

    marker,
  });
}

export function validateEditorialPlaceholders(
  guide: BuyingGuide,
): EditorialPlaceholderResult {
  const issues:
    EditorialPlaceholderIssue[] =
    [];

  checkValue(
    issues,
    "Verdict title",
    guide.verdict.title,
  );

  checkValue(
    issues,
    "Verdict summary",
    guide.verdict.summary,
  );

  guide.verdict.points.forEach(
    (point, index) => {
      checkValue(
        issues,
        `Verdict point ${index + 1}`,
        point,
      );
    },
  );

  guide.summary.forEach(
    (item, index) => {
      checkValue(
        issues,
        `Summary item ${index + 1}`,
        item,
      );
    },
  );

  if (guide.blinlxOpinion) {
    checkValue(
      issues,
      "Blinlx opinion title",
      guide.blinlxOpinion.title,
    );

    checkValue(
      issues,
      "Blinlx opinion summary",
      guide.blinlxOpinion.summary,
    );

    checkValue(
      issues,
      "Blinlx opinion if it was our money",
      guide.blinlxOpinion
        .ifItWasOurMoney,
    );

    guide.blinlxOpinion.reasons.forEach(
      (reason, index) => {
        checkValue(
          issues,
          `Blinlx opinion reason ${index + 1}`,
          reason,
        );
      },
    );

   guide.blinlxOpinion.caveats?.forEach(
      (caveat, index) => {
        checkValue(
          issues,
          `Blinlx opinion caveat ${index + 1}`,
          caveat,
        );
      },
    );
  }

  guide.sections.forEach(
    (section) => {
      checkValue(
        issues,
        `Section "${section.heading}" introduction`,
        section.introduction,
      );

      section.blocks.forEach(
        (block) => {
          const prefix =
            `Section "${section.heading}", block "${block.id}"`;

          switch (block.type) {
            case "TEXT":
              checkValue(
                issues,
                `${prefix} heading`,
                block.heading,
              );

              block.paragraphs.forEach(
                (
                  paragraph,
                  index,
                ) => {
                  checkValue(
                    issues,
                    `${prefix} paragraph ${index + 1}`,
                    paragraph,
                  );
                },
              );

              break;

            case "IMAGE":
              checkValue(
                issues,
                `${prefix} alt text`,
                block.alt,
              );

              checkValue(
                issues,
                `${prefix} caption`,
                block.caption,
              );

              break;

            case "QUOTE":
              checkValue(
                issues,
                `${prefix} quote`,
                block.quote,
              );

              checkValue(
                issues,
                `${prefix} attribution`,
                block.attribution,
              );

              break;

            case "TIP":
            case "WARNING":
              checkValue(
                issues,
                `${prefix} title`,
                block.title,
              );

              checkValue(
                issues,
                `${prefix} text`,
                block.text,
              );

              break;

            case "TABLE":
              checkValue(
                issues,
                `${prefix} heading`,
                block.heading,
              );

              block.columns.forEach(
                (column) => {
                  checkValue(
                    issues,
                    `${prefix} column "${column.key}"`,
                    column.label,
                  );
                },
              );

              block.rows.forEach(
                (row) => {
                  Object.entries(
                    row.values,
                  ).forEach(
                    ([
                      key,
                      value,
                    ]) => {
                      checkValue(
                        issues,
                        `${prefix} row "${row.id}" value "${key}"`,
                        String(value),
                      );
                    },
                  );
                },
              );

              break;

            case "COMPARISON":
              checkValue(
                issues,
                `${prefix} heading`,
                block.heading,
              );

              block.items.forEach(
                (item) => {
                  checkValue(
                    issues,
                    `${prefix} item "${item.id}" name`,
                    item.name,
                  );

                  checkValue(
                    issues,
                    `${prefix} item "${item.id}" description`,
                    item.description,
                  );

                  checkValue(
                    issues,
                    `${prefix} item "${item.id}" verdict`,
                    item.verdict,
                  );

                  item.strengths?.forEach(
                    (
                      strength,
                      index,
                    ) => {
                      checkValue(
                        issues,
                        `${prefix} item "${item.id}" strength ${index + 1}`,
                        strength,
                      );
                    },
                  );

                  item.weaknesses?.forEach(
                    (
                      weakness,
                      index,
                    ) => {
                      checkValue(
                        issues,
                        `${prefix} item "${item.id}" weakness ${index + 1}`,
                        weakness,
                      );
                    },
                  );
                },
              );

              break;

            case "GALLERY":
              checkValue(
                issues,
                `${prefix} heading`,
                block.heading,
              );

              block.images.forEach(
                (image) => {
                  checkValue(
                    issues,
                    `${prefix} image "${image.id}" alt text`,
                    image.alt,
                  );

                  checkValue(
                    issues,
                    `${prefix} image "${image.id}" caption`,
                    image.caption,
                  );
                },
              );

              break;

            case "RECOMMENDATION":
              checkValue(
                issues,
                `${prefix} heading`,
                block.heading,
              );

              checkValue(
                issues,
                `${prefix} summary`,
                block.summary,
              );

              checkValue(
                issues,
                `${prefix} product name`,
                block.productName,
              );

              block.reasons.forEach(
                (
                  reason,
                  index,
                ) => {
                  checkValue(
                    issues,
                    `${prefix} reason ${index + 1}`,
                    reason,
                  );
                },
              );

              break;

            case "CTA":
              checkValue(
                issues,
                `${prefix} heading`,
                block.heading,
              );

              checkValue(
                issues,
                `${prefix} text`,
                block.text,
              );

              checkValue(
                issues,
                `${prefix} button label`,
                block.buttonLabel,
              );

              break;
          }
        },
      );
    },
  );

  guide.faqs.forEach(
    (faq, index) => {
      checkValue(
        issues,
        `FAQ ${index + 1} question`,
        faq.question,
      );

      checkValue(
        issues,
        `FAQ ${index + 1} answer`,
        faq.answer,
      );
    },
  );

  guide.recommendations?.forEach(
    (recommendation) => {
      checkValue(
        issues,
        `Recommendation "${recommendation.id}" title`,
        recommendation.title,
      );

      checkValue(
        issues,
        `Recommendation "${recommendation.id}" description`,
        recommendation.description,
      );

      checkValue(
        issues,
        `Recommendation "${recommendation.id}" badge`,
        recommendation.badge,
      );

      recommendation.reasons.forEach(
        (reason, index) => {
          checkValue(
            issues,
            `Recommendation "${recommendation.id}" reason ${index + 1}`,
            reason,
          );
        },
      );
    },
  );

  return {
    valid:
      issues.length === 0,

    issues,
  };
}