import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

import {
  EditorialBrain,
} from "./EditorialBrain";

import type {
  EditorialGuideResult,
  EditorialGuideWriterInput,
} from "./EditorialGuideTypes";

import type {
  EditorialSectionKind,
  EditorialSectionResult,
} from "./EditorialTypes";

interface SectionKindMap {
  sectionId:
    string;

  sectionKind:
    EditorialSectionKind;
}

const sectionKinds:
  SectionKindMap[] = [
    {
      sectionId:
        "introduction",

      sectionKind:
        "INTRODUCTION",
    },

    {
      sectionId:
        "do-you-need-it",

      sectionKind:
        "NEED",
    },

    {
      sectionId:
        "who-is-it-for",

      sectionKind:
        "AUDIENCE",
    },

    {
      sectionId:
        "what-to-prioritise",

      sectionKind:
        "PRIORITIES",
    },

    {
      sectionId:
        "what-to-look-for",

      sectionKind:
        "PRIORITIES",
    },

    {
      sectionId:
        "budget",

      sectionKind:
        "BUDGET",
    },

    {
      sectionId:
        "what-to-compromise",

      sectionKind:
        "COMPROMISES",
    },

    {
      sectionId:
        "best-value",

      sectionKind:
        "BEST_VALUE",
    },

    {
      sectionId:
        "new-vs-used",

      sectionKind:
        "BUYING_USED",
    },

    {
      sectionId:
        "mistakes",

      sectionKind:
        "MISTAKES",
    },

    {
      sectionId:
        "common-mistakes",

      sectionKind:
        "MISTAKES",
    },

    {
      sectionId:
        "recommendations",

      sectionKind:
        "RECOMMENDATIONS",
    },

    {
      sectionId:
        "alternatives",

      sectionKind:
        "ALTERNATIVES",
    },

    {
      sectionId:
        "before-you-buy",

      sectionKind:
        "CHECKLIST",
    },

    {
      sectionId:
        "final-verdict",

      sectionKind:
        "VERDICT",
    },
  ];

  

function getSectionKind(
  sectionId:
    string,
): EditorialSectionKind | undefined {
  return sectionKinds.find(
    (entry) =>
      entry.sectionId ===
      sectionId,
  )?.sectionKind;
}

function removeDuplicateText(
  values:
    string[],
): string[] {
  const seen =
    new Set<string>();

  return values.filter(
    (value) => {
      const normalised =
        value
          .trim()
          .toLowerCase()
          .replace(
            /[^\p{L}\p{N}\s]/gu,
            "",
          )
          .replace(
            /\s+/g,
            " ",
          );

      if (
        !normalised ||
        seen.has(
          normalised,
        )
      ) {
        return false;
      }

      seen.add(
        normalised,
      );

      return true;
    },
  );
}

function createSummary(
  sections:
    EditorialSectionResult[],
): BuyingGuide["summary"] {
  const evidenceParagraphs =
    sections.flatMap(
      (section) =>
        section.paragraphs
          .filter(
            (paragraph) =>
              paragraph.role ===
                "EVIDENCE" ||
              paragraph.role ===
                "TRADE_OFF" ||
              paragraph.role ===
                "WARNING" ||
              paragraph.role ===
                "RECOMMENDATION" ||
              paragraph.role ===
                "VERDICT",
          )
          .map(
            (paragraph) =>
              paragraph.text,
          ),
    );

  return removeDuplicateText(
    evidenceParagraphs,
  ).slice(
    0,
    4,
  );
}

function createEmptyRecommendations():
  BuyingGuide["recommendations"] {
  return [];
}

function createEmptyVerdict():
  NonNullable<
    BuyingGuide[
      "verdict"
    ]
  > {
  return {
    title:
      "The Blinlx Verdict",

    summary:
      "Blinlx does not yet have enough verified, topic-matched evidence to give a responsible final recommendation.",

    confidence:
      0,

    points:
      [],
  };
}



function createEmptyOpinion():
  NonNullable<
    BuyingGuide[
      "blinlxOpinion"
    ]
  > {
  return {
    title:
      "What Blinlx Thinks",

    summary:
      "We would wait until stronger verified evidence is available before recommending a specific product.",

    ifItWasOurMoney:
      "If it were our money, we would not choose a product until the important requirements, trade-offs and ownership costs had been verified.",

    reasons:
      [],

    caveats: [
      "No topic-matched product recommendation is currently supported.",
    ],

    confidence:
      0,
  };
}

function createEmptyFaqs():
  BuyingGuide["faqs"] {
  return [];
}

function collectKnowledgeUsed(
  sections:
    EditorialSectionResult[],
): string[] {
  return Array.from(
    new Set(
      sections.flatMap(
        (section) =>
          section.knowledgeUsed,
      ),
    ),
  );
}

function collectQualityIssues(
  sections:
    EditorialSectionResult[],
): string[] {
  return Array.from(
    new Set(
      sections.flatMap(
        (section) =>
          section.qualityIssues.map(
            (issue) =>
              `${section.heading}: ${issue}`,
          ),
      ),
    ),
  );
}
function trimEnding(
  value: string,
): string {
  return value
    .trim()
    .replace(
      /[.!?]+$/g,
      "",
    );
}

function lowerFirst(
  value: string,
): string {
  if (!value) {
    return value;
  }

  return (
    value.charAt(0)
      .toLowerCase() +
    value.slice(1)
  );
}

function createOpinion(
  sections:
    EditorialSectionResult[],

  knowledge:
    EditorialGuideWriterInput[
      "knowledge"
    ],
): NonNullable<
  BuyingGuide[
    "blinlxOpinion"
  ]
> {
  const recommendationParagraphs =
    sections.flatMap(
      (section) =>
        section.paragraphs.filter(
          (paragraph) =>
            paragraph.role ===
              "RECOMMENDATION",
        ),
    );

  const verdictParagraph =
    sections
      .flatMap(
        (section) =>
          section.paragraphs,
      )
      .find(
        (paragraph) =>
          paragraph.role ===
          "VERDICT",
      );

  const strongestProduct =
    knowledge.products
      .filter(
        (product) =>
          recommendationParagraphs.some(
            (paragraph) =>
              paragraph.knowledgeUsed
                .includes(
                  product.name,
                ),
          ),
      )
      .sort(
        (
          productA,
          productB,
        ) =>
          productB.confidence -
          productA.confidence,
      )[0];

  if (!strongestProduct) {
    return createEmptyOpinion();
  }

  const reasons =
    removeDuplicateText(
      strongestProduct
        .strengths ??
      [],
    ).slice(
      0,
      4,
    );

  const caveats =
    removeDuplicateText([
      ...(
        strongestProduct
          .weaknesses ??
        []
      ),

      ...(
        strongestProduct
          .avoidIf ??
        []
      ),
    ]).slice(
      0,
      5,
    );

  const strongestReason =
    reasons[0] ??
    strongestProduct.reason;

  const biggestCaveat =
    caveats[0];

  return {
    title:
      "What Blinlx Thinks",

    summary:
      [
        `If we were buying today, ${strongestProduct.name} would be our current starting point`,

        strongestProduct.bestFor?.[0]
          ? `for ${lowerFirst(
              trimEnding(
                strongestProduct
                  .bestFor[0],
              ),
            )}`
          : "",

        `because ${lowerFirst(
          trimEnding(
            strongestReason,
          ),
        )}.`,
      ]
        .filter(
          Boolean,
        )
        .join(
          " ",
        ),

    ifItWasOurMoney:
      verdictParagraph
        ? verdictParagraph.text
        : [
            `If it were our money, we would start with ${strongestProduct.name} because ${lowerFirst(
              trimEnding(
                strongestReason,
              ),
            )}.`,

            biggestCaveat
              ? `We would choose differently if ${lowerFirst(
                  trimEnding(
                    biggestCaveat,
                  ),
                )} would interfere with the main use.`
              : "",

            "We would only spend more when the extra cost removes a limitation we would genuinely notice.",
          ]
            .filter(
              Boolean,
            )
            .join(
              " "),

    reasons,

    caveats,

    confidence:
      strongestProduct
        .confidence,
  };
}


 function createVerdict(
  sections:
    EditorialSectionResult[],

  opinion:
    NonNullable<
      BuyingGuide[
        "blinlxOpinion"
      ]
    >,
): NonNullable<
  BuyingGuide[
    "verdict"
  ]
> {
  const verdictParagraph =
    sections
      .flatMap(
        (section) =>
          section.paragraphs,
      )
      .find(
        (paragraph) =>
          paragraph.role ===
          "VERDICT",
      );

  const evidencePoints =
    removeDuplicateText(
      sections.flatMap(
        (section) =>
          section.paragraphs
            .filter(
              (paragraph) =>
                paragraph.role ===
                  "EVIDENCE" ||
                paragraph.role ===
                  "TRADE_OFF" ||
                paragraph.role ===
                  "WARNING" ||
                paragraph.role ===
                  "RECOMMENDATION",
            )
            .map(
              (paragraph) =>
                paragraph.text,
            ),
      ),
    ).slice(
      0,
      3,
    );

  const supportedOpinion =
    opinion.confidence > 0 &&
    opinion.reasons.length > 0;

  if (
    !verdictParagraph &&
    !supportedOpinion
  ) {
    return createEmptyVerdict();
  }

  const summary =
    verdictParagraph?.text ??
    opinion.ifItWasOurMoney;

  return {
    title:
      "The Blinlx Verdict",

    summary,

    confidence:
      supportedOpinion
        ? opinion.confidence
        : Math.max(
            0,
            ...sections.map(
              (section) =>
                section.confidence,
            ),
          ),

    points:
      evidencePoints.length > 0
        ? evidencePoints
        : opinion.reasons.slice(
            0,
            3,
          ),
  };
}

function normaliseProductSlug(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /&/g,
      "and",
    )
    .replace(
      /['’]/g,
      "",
    )
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );
}

function productMatchesGuideTopic(
  product:
    EditorialGuideWriterInput[
      "knowledge"
    ]["products"][number],

  blueprint:
    EditorialGuideWriterInput[
      "blueprint"
    ],
): boolean {
  const topic =
    blueprint.topic
      .trim()
      .toLowerCase();

  const productName =
    product.name
      .trim()
      .toLowerCase();

  const searchableText =
    [
      product.name,
      product.reason,
      product.buyingAdvice,
      ...(product.strengths ?? []),
      ...(product.weaknesses ?? []),
      ...(product.bestFor ?? []),
      ...(product.avoidIf ?? []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

  const looksLikeLens =
    /\b\d{1,3}(?:-\d{1,3})?mm\b/.test(
      productName,
    ) ||
    searchableText.includes(
      "prime lens",
    ) ||
    searchableText.includes(
      "zoom lens",
    ) ||
    searchableText.includes(
      "telephoto lens",
    ) ||
    searchableText.includes(
      "wide-angle lens",
    ) ||
    searchableText.includes(
      "macro lens",
    ) ||
    searchableText.includes(
      "camera lens",
    );

  if (
    topic.includes(
      "lens",
    )
  ) {
    return looksLikeLens;
  }

  if (
    topic.includes(
      "camera",
    )
  ) {
    return !looksLikeLens;
  }

  return true;
}

function getRecommendationBadge(
  verdict:
    EditorialGuideWriterInput[
      "knowledge"
    ]["products"][number][
      "verdict"
    ],
): string {
  switch (
  verdict
) {
  case "BEST_OVERALL":
    return "Best Overall";

  case "BEST_BEGINNER":
    return "Best for Beginners";

  case "BEST_VALUE":
    return "Best Value";

  case "BEST_BUDGET":
    return "Best Budget Choice";

  case "BEST_PRIME":
    return "Best Prime";

  case "BEST_ZOOM":
    return "Best Zoom";

  case "BEST_USED":
    return "Best Used";

  case "BEST_UPGRADE":
    return "Best Upgrade";

  case "BEST_TRAVEL":
    return "Best for Travel";

  case "BEST_STREET":
    return "Best for Street Photography";

  case "BEST_PORTRAIT":
    return "Best for Portraits";

  case "BEST_WILDLIFE":
    return "Best for Wildlife";

  case "BEST_SPORTS":
    return "Best for Sports";

  case "BEST_VIDEO":
    return "Best for Video";

  case "BEST_SPECIALIST":
  case "SPECIALIST":
    return "Best Specialist Choice";

  case "ALTERNATIVE":
    return "Alternative";

  case "CONSIDER":
  default:
    return "Worth Considering";
}
}

function createRecommendations(
  blueprint:
    EditorialGuideWriterInput[
      "blueprint"
    ],

  knowledge:
    EditorialGuideWriterInput[
      "knowledge"
    ],
): BuyingGuide["recommendations"] {
  return [
    ...knowledge.products,
  ]
    .filter(
      (product) =>
        productMatchesGuideTopic(
          product,
          blueprint,
        ),
    )
    .sort(
      (
        productA,
        productB,
      ) =>
        productB.confidence -
        productA.confidence,
    )
    .slice(
      0,
      5,
    )
    .map(
      (product) => {
        const slug =
          product.slug?.trim() ||
          normaliseProductSlug(
            product.name,
          );

        const reasons =
          removeDuplicateText([
            ...(product.strengths ??
              []),

            product.reason,
          ]).slice(
            0,
            3,
          );

        const mainWeakness =
          product.weaknesses?.[0];

        const description = [
          trimEnding(
            product.reason,
          ),

          mainWeakness
            ? `The main compromise is ${lowerFirst(
                trimEnding(
                  mainWeakness,
                ),
              )}.`
            : "",
        ]
          .filter(Boolean)
          .join(
            " ",
          );

        return {
          id:
            slug,

          title:
            product.name,

          description,

          reasons,

          href:
            `/products/${slug}`,

          badge:
            getRecommendationBadge(
              product.verdict,
            ),
        };
      },
    );
}

function getSectionAnswer(
  sections:
    EditorialSectionResult[],

  sectionKinds:
    EditorialSectionKind[],
): string | undefined {
  const section =
    sections.find(
      (candidate) =>
        sectionKinds.includes(
          candidate.sectionKind,
        ),
    );

  if (!section) {
    return undefined;
  }

  const usefulParagraphs =
    section.paragraphs
      .filter(
        (paragraph) =>
          paragraph.role !==
          "OPENING",
      )
      .map(
        (paragraph) =>
          trimEnding(
            paragraph.text,
          ),
      )
      .filter(
        Boolean,
      );

  const answer =
    usefulParagraphs[0] ??
    trimEnding(
      section.takeaway,
    ) ??
    trimEnding(
      section.introduction,
    );

  return answer
    ? `${answer}.`
    : undefined;
}

function createFaqs(
  content:
    EditorialGuideWriterInput[
      "content"
    ],

  sections:
    EditorialSectionResult[],

  recommendations:
    NonNullable<
      BuyingGuide[
        "recommendations"
      ]
    >,

  verdict:
    NonNullable<
      BuyingGuide[
        "verdict"
      ]
    >,
): NonNullable<
  BuyingGuide[
    "faqs"
  ]
> {
  const strongestRecommendation =
    recommendations[0];

  return content.faqs.map(
    (faq) => {
      const question =
        faq.question;

      const normalisedQuestion =
        question
          .trim()
          .toLowerCase();

      if (
        normalisedQuestion.includes(
          "best",
        ) ||
        normalisedQuestion.includes(
          "which",
        )
      ) {
        return {
          question,

          answer:
            strongestRecommendation
              ? [
                  `${strongestRecommendation.title} is the strongest currently supported option.`,

                  strongestRecommendation
                    .description,
                ].join(
                  " ",
                )
              : "Blinlx does not currently have enough verified, topic-matched product evidence to name a responsible winner.",
        };
      }

      if (
        normalisedQuestion.includes(
          "how much",
        ) ||
        normalisedQuestion.includes(
          "budget",
        ) ||
        normalisedQuestion.includes(
          "spend",
        )
      ) {
        return {
          question,

          answer:
            getSectionAnswer(
              sections,
              [
                "BUDGET",
                "BEST_VALUE",
              ],
            ) ??
            "Set the complete budget around the result you need, including any essential accessories, rather than spending everything on the headline product.",
        };
      }

      if (
        normalisedQuestion.includes(
          "look for",
        ) ||
        normalisedQuestion.includes(
          "feature",
        ) ||
        normalisedQuestion.includes(
          "important",
        )
      ) {
        return {
          question,

          answer:
            getSectionAnswer(
              sections,
              [
                "PRIORITIES",
              ],
            ) ??
            "Prioritise suitability, compatibility, reliability and the features you will notice during normal use.",
        };
      }

      if (
        normalisedQuestion.includes(
          "new or used",
        ) ||
        normalisedQuestion.includes(
          "buy used",
        )
      ) {
        return {
          question,

          answer:
            getSectionAnswer(
              sections,
              [
                "BUYING_USED",
              ],
            ) ??
            "Buying used can provide better capability for the money, but only when condition, warranty, included accessories and seller protection have been checked.",
        };
      }

      if (
        normalisedQuestion.includes(
          "mistake",
        ) ||
        normalisedQuestion.includes(
          "avoid",
        )
      ) {
        return {
          question,

          answer:
            getSectionAnswer(
              sections,
              [
                "MISTAKES",
                "CHECKLIST",
              ],
            ) ??
            "Avoid buying on popularity or headline specifications alone, and check compatibility and complete ownership cost before paying.",
        };
      }

      if (
        normalisedQuestion.includes(
          "worth",
        ) ||
        normalisedQuestion.includes(
          "spending more",
        )
      ) {
        return {
          question,

          answer:
            getSectionAnswer(
              sections,
              [
                "BEST_VALUE",
                "COMPROMISES",
                "VERDICT",
              ],
            ) ??
            "Spending more is worthwhile only when the additional cost removes a limitation you will genuinely notice.",
        };
      }

      return {
        question,

        answer:
          trimEnding(
            verdict.summary,
          ) + ".",
      };
    },
  );
}
function normaliseSentenceForComparison(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /[“”"'’]/g,
      "",
    )
    .replace(
      /[^a-z0-9£]+/g,
      " ",
    )
    .replace(
      /\s+/g,
      " ",
    )
    .trim();
}

function splitIntoSentences(
  value: string,
): string[] {
  return value
    .trim()
    .split(
      /(?<=[.!?])\s+/,
    )
    .map(
      (sentence) =>
        sentence.trim(),
    )
    .filter(
      Boolean,
    );
}

function removeUsedSentences(
  value: string,
  usedSentences:
    Set<string>,
): string {
  const uniqueSentences =
    splitIntoSentences(
      value,
    ).filter(
      (sentence) => {
        const key =
          normaliseSentenceForComparison(
            sentence,
          );

        if (!key) {
          return false;
        }

        if (
          usedSentences.has(
            key,
          )
        ) {
          return false;
        }

        usedSentences.add(
          key,
        );

        return true;
      },
    );

  return uniqueSentences.join(
    " ",
  );
}

function removeDuplicateGuideSentences(
  sections:
    EditorialSectionResult[],
): EditorialSectionResult[] {
  const usedSentences =
    new Set<string>();

  return sections.map(
    (section) => {
      const introduction =
        removeUsedSentences(
          section.introduction,
          usedSentences,
        );

      const paragraphs =
        section.paragraphs
          .map(
            (paragraph) => ({
              ...paragraph,

              text:
                removeUsedSentences(
                  paragraph.text,
                  usedSentences,
                ),
            }),
          )
          .filter(
            (paragraph) =>
              Boolean(
                paragraph.text.trim(),
              ),
          );

      const takeaway =
        removeUsedSentences(
          section.takeaway,
          usedSentences,
        );

      return {
        ...section,

        introduction,

        paragraphs,

        takeaway,
      };
    },
  );
}

export class EditorialGuideWriter {
  private readonly brain =
    new EditorialBrain();

  write({
    blueprint,
    content,
    knowledge,
  }: EditorialGuideWriterInput):
    EditorialGuideResult {
    const sections:
      EditorialSectionResult[] = [];

    content.sections.forEach(
      (
        section,
        index,
      ) => {
        const sectionKind =
          getSectionKind(
            section.id,
          );

        if (!sectionKind) {
          return;
        }

        const previousHeading =
          content.sections[
            index - 1
          ]?.heading;

        const nextHeading =
          content.sections[
            index + 1
          ]?.heading;

        const writtenSection =
          this.brain.writeSection({
            blueprint,

            knowledge,

            sectionKind,

            heading:
              section.heading,

            previousHeading,

            nextHeading,
          });

        sections.push(
          writtenSection,
        );
      },
    );

    const deduplicatedSections =
  removeDuplicateGuideSentences(
    sections,
  );

const qualityIssues =
  collectQualityIssues(
    deduplicatedSections,
  );

const publishable =
  deduplicatedSections.length >
    0 &&
  deduplicatedSections.every(
    (section) =>
      section.publishable,
  ) &&
  qualityIssues.length ===
    0;

        const opinion =
  createOpinion(
    sections,
    knowledge,
  );

  const verdict =
  createVerdict(
    sections,
    opinion,
  );

  const recommendations =
  createRecommendations(
    blueprint,
    knowledge,
  );

 const faqs =
  createFaqs(
    content,
    sections,
    recommendations ?? [],
    verdict,
  );
  

   return {
  sections:
  deduplicatedSections,

  recommendations,

  verdict,

  opinion,

  summary:
    createSummary(
      sections,
    ),

 faqs,

  publishable,

  qualityIssues,

  knowledgeUsed:
    collectKnowledgeUsed(
      sections,
    ),
};
  }
}
