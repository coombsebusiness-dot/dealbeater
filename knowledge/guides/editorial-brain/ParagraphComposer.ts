import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import type {
  ProductRecommendation,
} from "@/knowledge/guides/factory/knowledge/KnowledgeContext";

import type {
  EditorialEvidence,
  EditorialParagraph,
  EditorialSectionKind,
  ReaderQuestion,
} from "./EditorialTypes";

interface ComposeParagraphsInput {
  blueprint:
    GuideBlueprint;

  sectionKind:
    EditorialSectionKind;

  question:
    ReaderQuestion;

  evidence:
    EditorialEvidence;
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

function createParagraph(
  id: string,
  text: string,
  role:
    EditorialParagraph["role"],
  knowledgeUsed:
    string[] = [],
): EditorialParagraph {
  return {
    id,
    text:
      text.trim(),
    role,
    knowledgeUsed,
  };
}

function createOpening(
  blueprint:
    GuideBlueprint,

  question:
    ReaderQuestion,
): EditorialParagraph {
  const topic =
    lowerFirst(
      blueprint.topic.trim(),
    );

  return createParagraph(
    "opening",

    [
      `The important question with ${topic} is not which option has the longest specification list.`,

      question.buyerDecision,

      `The decision becomes much easier once the buyer separates essential requirements from features that are merely attractive on paper.`,
    ].join(
      " ",
    ),

    "OPENING",
  );
}

function createFactParagraphs(
  evidence:
    EditorialEvidence,

  maximum:
    number,
): EditorialParagraph[] {
  return evidence.facts
    .slice(
      0,
      maximum,
    )
    .map(
      (
        fact,
        index,
      ) =>
        createParagraph(
          `fact-${index + 1}`,

          fact.explanation,

          "EVIDENCE",

          [
            fact.title,
          ],
        ),
    );
}

function createTradeOffParagraphs(
  evidence:
    EditorialEvidence,

  maximum:
    number,
): EditorialParagraph[] {
  return evidence.tradeOffs
    .slice(
      0,
      maximum,
    )
    .map(
      (
        tradeOff,
        index,
      ) =>
        createParagraph(
          `trade-off-${index + 1}`,

          [
            tradeOff.explanation,

            "The important test is whether that compromise will affect normal use often enough to justify paying more to remove it.",
          ].join(
            " ",
          ),

          "TRADE_OFF",

          [
            tradeOff.title,
          ],
        ),
    );
}

function createWarningParagraphs(
  evidence:
    EditorialEvidence,

  maximum:
    number,
): EditorialParagraph[] {
  return evidence.warnings
    .slice(
      0,
      maximum,
    )
    .map(
      (
        warning,
        index,
      ) =>
        createParagraph(
          `warning-${index + 1}`,

          `${warning.title}. ${warning.explanation}`,

          "WARNING",

          [
            warning.title,
          ],
        ),
    );
}

function createProductParagraph(
  product:
    ProductRecommendation,

  index:
    number,
): EditorialParagraph {
  const strengths =
    product.strengths ??
    [];

  const weaknesses =
    product.weaknesses ??
    [];

  const bestFor =
    product.bestFor ??
    [];

  const opening =
    product.reason.trim();

 const idealBuyer =
  bestFor[0]
    ? `It makes the most sense for ${lowerFirst(
        trimEnding(
          bestFor[0],
        ),
      )}.`
    : "";
  const strength =
  strengths[0]
    ? `Its strongest advantage is ${lowerFirst(
        trimEnding(
          strengths[0],
        ),
      )}.`
    : "";

const weakness =
  weaknesses[0]
    ? `The main compromise is ${lowerFirst(
        trimEnding(
          weaknesses[0],
        ),
      )}.`
    : "";

  return createParagraph(
    `product-${index + 1}`,

    [
      `${product.name} deserves consideration because ${lowerFirst(
        opening,
      )}`,

      idealBuyer,

      strength,

      weakness,
    ]
      .filter(
        Boolean,
      )
      .join(
        " ",

      ),

    "RECOMMENDATION",

    [
      product.name,
    ],
  );
}

function createRecommendationParagraphs(
  evidence:
    EditorialEvidence,
): EditorialParagraph[] {
  return evidence.products
    .slice(
      0,
      3,
    )
    .map(
      createProductParagraph,
    );
}

function createNextStep(
  sectionKind:
    EditorialSectionKind,

  question:
    ReaderQuestion,
): EditorialParagraph {
  const textBySection:
    Record<
      EditorialSectionKind,
      string
    > = {
    INTRODUCTION:
      "Start by defining the result you need from the purchase before comparing individual products.",

    NEED:
      "Buy only when the current setup creates a specific limitation that the new purchase will genuinely solve.",

    AUDIENCE:
      "Match the purchase to experience, intended use and willingness to accept complexity rather than assuming the most advanced option is automatically better.",

    PRIORITIES:
      "Rank the essential features first and remove anything that fails them before comparing price or optional extras.",

    BUDGET:
      "Set a complete budget that includes any accessories or supporting equipment needed from the first day.",

    COMPROMISES:
      "Accept limitations that will rarely affect normal use, but avoid compromises that interfere with the main reason for buying.",

    BEST_VALUE:
      "Compare the improvement delivered by each extra pound and stop spending when the gains become difficult to notice.",

    BUYING_USED:
      "Only buy used when the saving remains worthwhile after condition, warranty, missing accessories and seller protection are considered.",

    MISTAKES:
      "Before paying, check that the decision is based on real needs rather than popularity, headline specifications or fear of missing out.",

    RECOMMENDATIONS:
      "Only shortlist products whose strengths directly match the intended use and whose weaknesses are acceptable.",

    ALTERNATIVES:
      "Compare the obvious purchase with an older model, a used option and a different product type before committing.",

    CHECKLIST:
      "Confirm the exact model, compatibility, complete cost, return protection and most important limitation before spending any money.",

    VERDICT:
      "Choose the least expensive route that solves the real problem without creating a limitation you will regularly notice.",
  };

  return createParagraph(
    "next-step",

    [
      textBySection[
        sectionKind
      ],

      question.desiredOutcome,
    ].join(
      " ",
    ),

    "NEXT_STEP",
  );
}

function createVerdict(
  evidence:
    EditorialEvidence,

  question:
    ReaderQuestion,
): EditorialParagraph {
  const primaryProduct =
    evidence.products[0];

  if (!primaryProduct) {
    return createParagraph(
      "verdict",

      [
        question.desiredOutcome,

        "Blinlx would not name a winner until the Product Brain contains enough relevant, verified evidence to support the recommendation responsibly.",
      ].join(
        " ",
      ),

      "VERDICT",
    );
  }

  const limitation =
    primaryProduct
      .weaknesses?.[0];

  return createParagraph(
    "verdict",

    [
      `If it were our money, ${primaryProduct.name} would be the current starting point because ${lowerFirst(
        primaryProduct.reason,
      )}`,

     limitation
  ? `We would choose differently if ${lowerFirst(
      trimEnding(
        limitation,
      ),
    )} would interfere with the buyer's main use.`
  : "",

      "Spending more only makes sense when the additional cost solves a limitation the buyer will genuinely notice.",
    ]
      .filter(
        Boolean,
      )
      .join(
        " ",
      ),

    "VERDICT",

    [
      primaryProduct.name,
    ],
  );
}

export class ParagraphComposer {
  compose({
    blueprint,
    sectionKind,
    question,
    evidence,
  }: ComposeParagraphsInput):
    EditorialParagraph[] {
    const opening =
      createOpening(
        blueprint,
        question,
      );

    switch (sectionKind) {
      case "INTRODUCTION":
        return [
          opening,

          ...createFactParagraphs(
            evidence,
            2,
          ),

          ...createTradeOffParagraphs(
            evidence,
            1,
          ),

          createNextStep(
  sectionKind,
  question,
),
        ];

      case "NEED":
        return [
          opening,

          ...createFactParagraphs(
            evidence,
            2,
          ),

          ...createTradeOffParagraphs(
            evidence,
            1,
          ),

          createNextStep(
  sectionKind,
  question,
),
        ];

      case "AUDIENCE":
        return [
          opening,

          ...createFactParagraphs(
            evidence,
            2,
          ),

          ...createTradeOffParagraphs(
            evidence,
            1,
          ),

         createNextStep(
  sectionKind,
  question,
),
        ];

      case "PRIORITIES":
        return [
          opening,

          ...createFactParagraphs(
            evidence,
            3,
          ),

          ...createTradeOffParagraphs(
            evidence,
            1,
          ),

         createNextStep(
  sectionKind,
  question,
),
        ];

      case "BUDGET":
        return [
          opening,

          ...createFactParagraphs(
            evidence,
            2,
          ),

          ...createTradeOffParagraphs(
            evidence,
            2,
          ),

         createNextStep(
  sectionKind,
  question,
),
        ];

      case "COMPROMISES":
        return [
          opening,

          ...createTradeOffParagraphs(
            evidence,
            3,
          ),

          ...createFactParagraphs(
            evidence,
            1,
          ),

          createNextStep(
  sectionKind,
  question,
),
        ];

      case "BEST_VALUE":
        return [
          opening,

          ...createFactParagraphs(
            evidence,
            2,
          ),

          ...createTradeOffParagraphs(
            evidence,
            2,
          ),

          ...createRecommendationParagraphs(
            evidence,
          ),

         createNextStep(
  sectionKind,
  question,
),
        ];

      case "BUYING_USED":
        return [
          opening,

          ...createFactParagraphs(
            evidence,
            2,
          ),

          ...createTradeOffParagraphs(
            evidence,
            2,
          ),

          createNextStep(
  sectionKind,
  question,
),
        ];

      case "MISTAKES":
        return [
          opening,

          ...createWarningParagraphs(
            evidence,
            4,
          ),

          ...createTradeOffParagraphs(
            evidence,
            1,
          ),

         createNextStep(
  sectionKind,
  question,
),
        ];

      case "RECOMMENDATIONS":
        return [
          opening,

          ...createRecommendationParagraphs(
            evidence,
          ),

          ...createTradeOffParagraphs(
            evidence,
            1,
          ),

          createNextStep(
  sectionKind,
  question,
),
        ];

      case "ALTERNATIVES":
        return [
          opening,

          ...createTradeOffParagraphs(
            evidence,
            2,
          ),

          ...createFactParagraphs(
            evidence,
            2,
          ),
createNextStep(
  sectionKind,
  question,
),
        ];

      case "CHECKLIST":
        return [
          opening,

          ...createWarningParagraphs(
            evidence,
            2,
          ),

          ...createFactParagraphs(
            evidence,
            2,
          ),

         createNextStep(
  sectionKind,
  question,
),
        ];

      case "VERDICT":
        return [
          opening,

          createVerdict(
            evidence,
            question,
          ),
        ];
    }
  }
}