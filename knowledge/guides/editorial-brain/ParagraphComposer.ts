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

function ensureEnding(
  value: string,
): string {
  const trimmed =
    value.trim();

  if (!trimmed) {
    return "";
  }

  return /[.!?]$/.test(
    trimmed,
  )
    ? trimmed
    : `${trimmed}.`;
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

function createReaderTopic(
  blueprint:
    GuideBlueprint,
): string {
  const topic =
    blueprint.topic
      .trim()
      .toLowerCase();

  if (
    topic ===
    "first camera lens"
  ) {
    return "your first camera lens";
  }

  return topic;
}

function getFirstFact(
  evidence:
    EditorialEvidence,
) {
  return evidence.facts[0];
}

function getSecondFact(
  evidence:
    EditorialEvidence,
) {
  return evidence.facts[1];
}

function getFirstTradeOff(
  evidence:
    EditorialEvidence,
) {
  return evidence.tradeOffs[0];
}

function getSecondTradeOff(
  evidence:
    EditorialEvidence,
) {
  return evidence.tradeOffs[1];
}

function getFirstWarning(
  evidence:
    EditorialEvidence,
) {
  return evidence.warnings[0];
}
function getFactsByRole(
  evidence:
    EditorialEvidence,

  roles:
    EditorialEvidence["facts"][number]["role"][],

  limit:
    number,
): EditorialEvidence["facts"] {
  const seen =
    new Set<string>();

  return evidence.facts
    .filter(
      (fact) =>
        roles.includes(
          fact.role,
        ),
    )
    .filter(
      (fact) => {
        const meaning =
          [
            fact.title,
            fact.explanation,
          ]
            .join(
              " ",
            )
            .trim()
            .toLowerCase()
            .replace(
              /[^a-z0-9]+/g,
              " ",
            )
            .replace(
              /\s+/g,
              " ",
            );

        if (
          !meaning ||
          seen.has(
            meaning,
          )
        ) {
          return false;
        }

        seen.add(
          meaning,
        );

        return true;
      },
    )
    .slice(
      0,
      limit,
    );
}

function createEvidenceParagraph(
  id: string,
  explanation: string,
  title: string,
): EditorialParagraph {
  return createParagraph(
    id,

    ensureEnding(
      explanation,
    ),

    "EVIDENCE",

    [
      title,
    ],
  );
}

function createTradeOffParagraph(
  id: string,
  explanation: string,
  title: string,
): EditorialParagraph {
  return createParagraph(
    id,

    ensureEnding(
      explanation,
    ),

    "TRADE_OFF",

    [
      title,
    ],
  );
}

function createWarningParagraph(
  id: string,
  title: string,
  explanation: string,
  evidenceRole:
    EditorialEvidence["warnings"][number]["role"],
): EditorialParagraph {
  const text =
    evidenceRole ===
      "BUYING_ADVICE"
      ? ensureEnding(
          explanation,
        )
      : [
          ensureEnding(
            title,
          ),

          ensureEnding(
            explanation,
          ),
        ]
          .filter(
            Boolean,
          )
          .join(
            " ",
          );

  return createParagraph(
    id,

    text,

    "WARNING",

    [
      title,
    ],
  );
}

function createProductParagraph(
  product:
    ProductRecommendation,

  index:
    number,
): EditorialParagraph {
  const strength =
    product.strengths?.[0];

  const weakness =
    product.weaknesses?.[0];

  const idealBuyer =
    product.bestFor?.[0];

  const sentences = [
    `${product.name} deserves consideration because ${lowerFirst(
      trimEnding(
        product.reason,
      ),
    )}.`,

    idealBuyer
      ? `It is particularly well suited to ${lowerFirst(
          trimEnding(
            idealBuyer,
          ),
        )}.`
      : "",

    strength
      ? `Its biggest strength is ${lowerFirst(
          trimEnding(
            strength,
          ),
        )}.`
      : "",

    weakness
      ? `The main compromise is ${lowerFirst(
          trimEnding(
            weakness,
          ),
        )}.`
      : "",
  ];

  return createParagraph(
    `product-${index + 1}`,

    sentences
      .filter(Boolean)
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

function createOpening(
  blueprint:
    GuideBlueprint,

  sectionKind:
    EditorialSectionKind,
): EditorialParagraph {
  const topic =
    createReaderTopic(
      blueprint,
    );

  const openingBySection:
    Record<
      EditorialSectionKind,
      string
    > = {
    INTRODUCTION:
      `Choosing ${topic} can feel confusing because specifications, prices and competing recommendations quickly create more noise than clarity. Start with the result you want, then work backwards to the features that will genuinely help you achieve it.`,

    EXPLANATION:
      `Understanding ${topic} is useful only when the explanation connects the term to real use. Focus on what it changes, when it matters and how it should influence the buying decision.`,

    NEED:
      `Before spending any money, identify the limitation you are trying to solve. A new purchase is worthwhile when your current setup is regularly preventing you from getting the result you want.`,

    AUDIENCE:
      `The right choice depends on what you use it for, how experienced you are and which compromises you are willing to accept. A product that is ideal for one person can be unnecessarily expensive or frustrating for someone else.`,

    PRIORITIES:
      `Start with the features that affect normal use rather than the ones that look most impressive in a comparison table. Compatibility, reliability and suitability should remove products from the shortlist before price or prestige are considered.`,

    BUDGET:
      `Set the budget around the complete result you need, not only the headline product. Spending too little can create an immediate limitation, but spending more only makes sense when the improvement will be noticed regularly.`,

    COMPROMISES:
      `Every product involves compromises. The sensible ones save money without interfering with the main use; the wrong ones create frustration every time the product is used.`,

    BEST_VALUE:
      `The best value is rarely the cheapest option or the most expensive one. It is the point where the important requirements are covered and further spending produces smaller real-world gains.`,

    BUYING_USED:
      `Buying used can provide more capability for the same budget, but the saving must be weighed against condition, warranty, missing accessories and seller protection.`,

    MISTAKES:
      `Most poor buying decisions begin before the product is chosen. Buyers often focus on popularity, headline specifications or discounts before deciding what they actually need.`,

    PREVENTION:
      `Avoiding a buying mistake is easier when every concern becomes a practical check. Slow the decision down, confirm the intended use and reject any option that fails an essential requirement.`,

    RECOMMENDATIONS:
      `A responsible recommendation must match a real buyer, use case and budget. Every shortlisted product should have a clear reason to exist and an honest limitation.`,

    ALTERNATIVES:
      `The obvious purchase is not always the smartest route. An older model, a used option or a different type of product may solve the same problem for less money or with fewer complications.`,

    CHECKLIST:
      `Before paying, confirm the exact model, compatibility, total cost and most important limitation. A product can look like excellent value until an essential feature or accessory is missing.`,

    VERDICT:
      `The final decision should be simpler than the research that led to it. Choose the least expensive route that solves the real problem without introducing a limitation you will regularly notice.`,
  };

  return createParagraph(
    "opening",

    openingBySection[
      sectionKind
    ],

    "OPENING",
  );
}

function createNextStep(
  sectionKind:
    EditorialSectionKind,
): EditorialParagraph {
  const textBySection:
    Record<
      EditorialSectionKind,
      string
    > = {
    INTRODUCTION:
      "Define what you want the purchase to help you achieve before comparing individual products.",

    EXPLANATION:
      "Connect the technical meaning to the practical effect it will have before comparing products.",

    NEED:
      "Do not buy until you can describe the specific problem the new purchase will solve.",

    AUDIENCE:
      "Match the product to your normal use rather than choosing the option designed for the most demanding buyer.",

    PRIORITIES:
      "Write down the three requirements that matter most and remove any option that fails one of them.",

    BUDGET:
      "Include every essential accessory and supporting cost before deciding how much is available for the main product.",

    COMPROMISES:
      "Save money on features you will rarely use, but do not compromise on anything that affects the main reason for buying.",

    BEST_VALUE:
      "Stop increasing the budget when the additional cost no longer creates an improvement you will regularly notice.",

    BUYING_USED:
      "Only buy used when the saving still looks worthwhile after condition, protection and replacement costs are considered.",

    MISTAKES:
      "Before paying, check that the decision is based on your needs rather than popularity, urgency or a headline discount.",

    PREVENTION:
      "Turn every warning into a practical check and complete those checks before paying.",

    RECOMMENDATIONS:
      "Shortlist only the products whose strengths match your intended use and whose weaknesses you can comfortably accept.",

    ALTERNATIVES:
      "Compare the obvious purchase with at least one cheaper route and one genuinely different alternative.",

    CHECKLIST:
      "Confirm the exact variant, return protection and complete cost before spending any money.",

    VERDICT:
      "Choose the option that solves the problem cleanly rather than the one with the longest specification list.",
  };

  return createParagraph(
    "next-step",

    textBySection[
      sectionKind
    ],

    "NEXT_STEP",
  );
}

function createVerdict(
  evidence:
    EditorialEvidence,
): EditorialParagraph {
  const primaryProduct =
    evidence.products[0];

  if (!primaryProduct) {
    return createParagraph(
      "verdict",

      "Blinlx would wait until the Product Brain contains enough relevant, verified evidence to support a responsible recommendation. Naming a winner without suitable evidence would be less useful than being honest about what is still missing.",

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
        trimEnding(
          primaryProduct.reason,
        ),
      )}.`,

      limitation
        ? `We would choose differently if ${lowerFirst(
            trimEnding(
              limitation,
            ),
          )} would interfere with the main use.`
        : "",

      "We would only spend more when the additional cost removes a limitation we would genuinely notice.",
    ]
      .filter(Boolean)
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
    question: _question,
    evidence,
  }: ComposeParagraphsInput):
    EditorialParagraph[] {
    switch (
      sectionKind
    ) {
      case "INTRODUCTION":
        return this.composeIntroduction(
          blueprint,
          evidence,
        );

      case "EXPLANATION":
        return this.composeExplanation(
          blueprint,
          evidence,
        );

      case "PREVENTION":
        return this.composePrevention(
          blueprint,
          evidence,
        );

      case "NEED":
        return this.composeNeed(
          blueprint,
          evidence,
        );

      case "AUDIENCE":
        return this.composeAudience(
          blueprint,
          evidence,
        );

      case "PRIORITIES":
        return this.composePriorities(
          blueprint,
          evidence,
        );

      case "BUDGET":
        return this.composeBudget(
          blueprint,
          evidence,
        );

      case "COMPROMISES":
        return this.composeCompromises(
          blueprint,
          evidence,
        );

      case "BEST_VALUE":
        return this.composeBestValue(
          blueprint,
          evidence,
        );

      case "BUYING_USED":
        return this.composeBuyingUsed(
          blueprint,
          evidence,
        );

      case "MISTAKES":
        return this.composeMistakes(
          blueprint,
          evidence,
        );

      case "RECOMMENDATIONS":
        return this.composeRecommendations(
          blueprint,
          evidence,
        );

      case "ALTERNATIVES":
        return this.composeAlternatives(
          blueprint,
          evidence,
        );

      case "CHECKLIST":
        return this.composeChecklist(
          blueprint,
          evidence,
        );

      case "VERDICT":
        return this.composeVerdict(
          blueprint,
          evidence,
        );
    }
  }

  private composeExplanation(
    blueprint:
      GuideBlueprint,

    evidence:
      EditorialEvidence,
  ): EditorialParagraph[] {
    const paragraphs = [
      createOpening(
        blueprint,
        "EXPLANATION",
      ),
    ];

    const firstFact =
      getFirstFact(
        evidence,
      );

    const secondFact =
      getSecondFact(
        evidence,
      );

    if (firstFact) {
      paragraphs.push(
        createEvidenceParagraph(
          "explanation-meaning",

          firstFact.explanation,

          firstFact.title,
        ),
      );
    }

    if (secondFact) {
      paragraphs.push(
        createEvidenceParagraph(
          "explanation-practical-example",

          secondFact.explanation,

          secondFact.title,
        ),
      );
    }

    paragraphs.push(
      createParagraph(
        "explanation-practical-effect",

        [
          `In practical terms, ${createReaderTopic(
            blueprint,
          )} matters because it changes how equipment behaves and which option will suit the buyer.`,

          "The useful question is how the feature affects normal photography, rather than simply remembering the technical definition.",
        ].join(
          " ",
        ),

        "EVIDENCE",
      ),
    );

    paragraphs.push(
      createNextStep(
        "EXPLANATION",
      ),
    );

    return paragraphs;
  }

  private composePrevention(
    blueprint:
      GuideBlueprint,

    evidence:
      EditorialEvidence,
  ): EditorialParagraph[] {
    const paragraphs = [
      createOpening(
        blueprint,
        "PREVENTION",
      ),
    ];

    evidence.warnings
      .slice(
        0,
        2,
      )
      .forEach(
        (
          warning,
          index,
        ) => {
          paragraphs.push(
            createWarningParagraph(
              `prevention-warning-${index + 1}`,

              warning.title,

              warning.explanation,

              warning.role,
            ),
          );
        },
      );

    paragraphs.push(
      createParagraph(
        "prevention-action",

        [
          `To avoid mistakes when buying ${createReaderTopic(
            blueprint,
          )}, turn every concern into a check that can be completed before paying.`,

          "Confirm the intended use, essential requirements, acceptable compromises and complete cost, then reject any option that fails an essential requirement.",
        ].join(
          " ",
        ),

        "NEXT_STEP",
      ),
    );

    return paragraphs;
  }

  private composeIntroduction(
    blueprint:
      GuideBlueprint,

    evidence:
      EditorialEvidence,
  ): EditorialParagraph[] {
    const paragraphs = [
      createOpening(
        blueprint,
        "INTRODUCTION",
      ),
    ];

    const firstFact =
      getFirstFact(
        evidence,
      );

    const secondFact =
      getSecondFact(
        evidence,
      );

    const tradeOff =
      getFirstTradeOff(
        evidence,
      );

    if (firstFact) {
      paragraphs.push(
        createEvidenceParagraph(
          "introduction-context",

          firstFact.explanation,

          firstFact.title,
        ),
      );
    }

    if (secondFact) {
      paragraphs.push(
        createEvidenceParagraph(
          "introduction-cost",

          secondFact.explanation,

          secondFact.title,
        ),
      );
    }

    if (tradeOff) {
      paragraphs.push(
        createTradeOffParagraph(
          "introduction-trade-off",

          tradeOff.explanation,

          tradeOff.title,
        ),
      );
    }

    if (
      paragraphs.length ===
        1
    ) {
      paragraphs.push(
        createParagraph(
          "introduction-explanation",

          `Understanding ${createReaderTopic(
            blueprint,
          )} starts with knowing what it changes in practical use and how that should influence the buying decision.`,

          "EVIDENCE",
        ),
      );
    }

    paragraphs.push(
      createNextStep(
        "INTRODUCTION",
      ),
    );

    return paragraphs;
  }

  private composeNeed(
    blueprint:
      GuideBlueprint,

    evidence:
      EditorialEvidence,
  ): EditorialParagraph[] {
    const paragraphs = [
      createOpening(
        blueprint,
        "NEED",
      ),
    ];

    const firstFact =
      getFirstFact(
        evidence,
      );

    const tradeOff =
      getFirstTradeOff(
        evidence,
      );

    if (firstFact) {
      paragraphs.push(
        createEvidenceParagraph(
          "need-current-setup",

          firstFact.explanation,

          firstFact.title,
        ),
      );
    }

    if (tradeOff) {
      paragraphs.push(
        createTradeOffParagraph(
          "need-when-to-wait",

          [
            trimEnding(
              tradeOff.explanation,
            ),

            "If that limitation does not affect the way you normally use the product, keeping the current setup may be the better decision.",
          ].join(
            ". ",
          ),

          tradeOff.title,
        ),
      );
    }

    paragraphs.push(
      createNextStep(
        "NEED",
      ),
    );

    return paragraphs;
  }

  private composeAudience(
    blueprint:
      GuideBlueprint,

    evidence:
      EditorialEvidence,
  ): EditorialParagraph[] {
    const paragraphs = [
      createOpening(
        blueprint,
        "AUDIENCE",
      ),
    ];

    const audienceFacts =
  getFactsByRole(
    evidence,
    [
      "AUDIENCE",
      "GENERAL",
    ],
    2,
  );

audienceFacts.forEach(
  (
    fact,
    index,
  ) => {
    paragraphs.push(
      createEvidenceParagraph(
        index === 0
          ? "audience-best-fit"
          : "audience-different-needs",

        fact.explanation,

        fact.title,
      ),
    );
  },
);

    paragraphs.push(
      createNextStep(
        "AUDIENCE",
      ),
    );

    return paragraphs;
  }

  private composePriorities(
    blueprint:
      GuideBlueprint,

    evidence:
      EditorialEvidence,
  ): EditorialParagraph[] {
    const paragraphs = [
      createOpening(
        blueprint,
        "PRIORITIES",
      ),
    ];

   const priorityFacts =
  getFactsByRole(
    evidence,
    [
      "COMPATIBILITY",
      "GENERAL",
    ],
    3,
  );

priorityFacts.forEach(
        (
          fact,
          index,
        ) => {
          paragraphs.push(
            createEvidenceParagraph(
              `priority-${index + 1}`,

              fact.explanation,

              fact.title,
            ),
          );
        },
      );

    const tradeOff =
      getFirstTradeOff(
        evidence,
      );

    if (tradeOff) {
      paragraphs.push(
        createTradeOffParagraph(
          "priority-trade-off",

          tradeOff.explanation,

          tradeOff.title,
        ),
      );
    }

    paragraphs.push(
      createNextStep(
        "PRIORITIES",
      ),
    );

    return paragraphs;
  }

  private composeBudget(
    blueprint:
      GuideBlueprint,

    evidence:
      EditorialEvidence,
  ): EditorialParagraph[] {
    const paragraphs = [
      createOpening(
        blueprint,
        "BUDGET",
      ),
    ];

    const budgetFacts =
  getFactsByRole(
    evidence,
    [
      "VALUE",
      "ACCESSORY",
      "GENERAL",
    ],
    2,
  );

    const firstTradeOff =
      getFirstTradeOff(
        evidence,
      );

    const secondTradeOff =
      getSecondTradeOff(
        evidence,
      );

  budgetFacts.forEach(
  (
    fact,
    index,
  ) => {
    paragraphs.push(
      createEvidenceParagraph(
        index === 0
          ? "budget-complete-cost"
          : "budget-supporting-cost",

        fact.explanation,

        fact.title,
      ),
    );
  },
);

    if (firstTradeOff) {
      paragraphs.push(
        createTradeOffParagraph(
          "budget-value",

          firstTradeOff.explanation,

          firstTradeOff.title,
        ),
      );
    }

    if (secondTradeOff) {
      paragraphs.push(
        createTradeOffParagraph(
          "budget-diminishing-returns",

          secondTradeOff.explanation,

          secondTradeOff.title,
        ),
      );
    }

    paragraphs.push(
      createNextStep(
        "BUDGET",
      ),
    );

    return paragraphs;
  }

  private composeCompromises(
    blueprint:
      GuideBlueprint,

    evidence:
      EditorialEvidence,
  ): EditorialParagraph[] {
    const paragraphs = [
      createOpening(
        blueprint,
        "COMPROMISES",
      ),
    ];

    evidence.tradeOffs
      .slice(
        0,
        3,
      )
      .forEach(
        (
          tradeOff,
          index,
        ) => {
          paragraphs.push(
            createTradeOffParagraph(
              `compromise-${index + 1}`,

              tradeOff.explanation,

              tradeOff.title,
            ),
          );
        },
      );

    paragraphs.push(
      createNextStep(
        "COMPROMISES",
      ),
    );

    return paragraphs;
  }

  private composeBestValue(
    blueprint:
      GuideBlueprint,

    evidence:
      EditorialEvidence,
  ): EditorialParagraph[] {
    return [
      createOpening(
        blueprint,
        "BEST_VALUE",
      ),

      ...createRecommendationParagraphs(
        evidence,
      ),

      createNextStep(
        "BEST_VALUE",
      ),
    ];
  }

  private composeBuyingUsed(
    blueprint:
      GuideBlueprint,

    evidence:
      EditorialEvidence,
  ): EditorialParagraph[] {
    const paragraphs = [
      createOpening(
        blueprint,
        "BUYING_USED",
      ),
    ];

    const fact =
      getFirstFact(
        evidence,
      );

    const tradeOff =
      getFirstTradeOff(
        evidence,
      );

    if (fact) {
      paragraphs.push(
        createEvidenceParagraph(
          "used-value",

          fact.explanation,

          fact.title,
        ),
      );
    }

    if (tradeOff) {
      paragraphs.push(
        createTradeOffParagraph(
          "used-risk",

          tradeOff.explanation,

          tradeOff.title,
        ),
      );
    }

    paragraphs.push(
      createNextStep(
        "BUYING_USED",
      ),
    );

    return paragraphs;
  }

  private composeMistakes(
    blueprint:
      GuideBlueprint,

    evidence:
      EditorialEvidence,
  ): EditorialParagraph[] {
    const paragraphs = [
      createOpening(
        blueprint,
        "MISTAKES",
      ),
    ];

    const mistakeWarnings =
  [
    ...evidence.warnings.filter(
      (warning) =>
        warning.role ===
        "GENERAL",
    ),

    ...evidence.warnings.filter(
      (warning) =>
        warning.role ===
        "BUYING_ADVICE",
    ),
  ]
    .filter(
      (
        warning,
        index,
        warnings,
      ) =>
        warnings.findIndex(
          (candidate) =>
            candidate.explanation
              .trim()
              .toLowerCase() ===
            warning.explanation
              .trim()
              .toLowerCase(),
        ) === index,
    )
    .slice(
      0,
      4,
    );

mistakeWarnings
      .forEach(
        (
          warning,
          index,
        ) => {
          paragraphs.push(
           createWarningParagraph(
  `mistake-${index + 1}`,

  warning.title,

  warning.explanation,

  warning.role,
),
          );
        },
      );

    paragraphs.push(
      createNextStep(
        "MISTAKES",
      ),
    );

    return paragraphs;
  }

  private composeRecommendations(
    blueprint:
      GuideBlueprint,

    evidence:
      EditorialEvidence,
  ): EditorialParagraph[] {
    const recommendations =
      createRecommendationParagraphs(
        evidence,
      );

    return [
      createOpening(
        blueprint,
        "RECOMMENDATIONS",
      ),

      ...recommendations,

      createNextStep(
        "RECOMMENDATIONS",
      ),
    ];
  }

  private composeAlternatives(
    blueprint:
      GuideBlueprint,

    evidence:
      EditorialEvidence,
  ): EditorialParagraph[] {
    const paragraphs = [
      createOpening(
        blueprint,
        "ALTERNATIVES",
      ),
    ];

    const firstTradeOff =
      getFirstTradeOff(
        evidence,
      );

    const alternativeFacts =
  getFactsByRole(
    evidence,
    [
      "ALTERNATIVE",
      "UPGRADE",
    ],
    2,
  );

    if (firstTradeOff) {
      paragraphs.push(
        createTradeOffParagraph(
          "alternative-reason",

          firstTradeOff.explanation,

          firstTradeOff.title,
        ),
      );
    }

   alternativeFacts.forEach(
  (
    fact,
    index,
  ) => {
    paragraphs.push(
      createEvidenceParagraph(
        `alternative-option-${index + 1}`,

        fact.explanation,

        fact.title,
      ),
    );
  },
);

    paragraphs.push(
      createNextStep(
        "ALTERNATIVES",
      ),
    );

    return paragraphs;
  }

  private composeChecklist(
  blueprint:
    GuideBlueprint,

  evidence:
    EditorialEvidence,
): EditorialParagraph[] {
  const paragraphs = [
    createOpening(
      blueprint,
      "CHECKLIST",
    ),
  ];

  const checklistFacts =
    getFactsByRole(
      evidence,
      [
        "COMPATIBILITY",
        "ACCESSORY",
      ],
      2,
    );

  checklistFacts.forEach(
    (
      fact,
      index,
    ) => {
      paragraphs.push(
        createEvidenceParagraph(
          `check-fact-${index + 1}`,

          fact.explanation,

          fact.title,
        ),
      );
    },
  );

  evidence.warnings
    .filter(
      (warning) =>
        warning.role ===
          "BUYING_ADVICE" ||
        warning.role ===
          "GENERAL",
    )
    .slice(
      0,
      2,
    )
    .forEach(
      (
        warning,
        index,
      ) => {
        paragraphs.push(
          createWarningParagraph(
            `check-warning-${index + 1}`,

            warning.title,

            warning.explanation,

            warning.role,
          ),
        );
      },
    );
paragraphs.push(
  createParagraph(
    "checklist-prevention",

    [
      `To avoid the most common mistakes when buying ${createReaderTopic(
        blueprint,
      )}, turn each warning into a practical check before paying.`,

      `Confirm that the option suits the intended use, meets every essential requirement and stays within the complete budget for ${createReaderTopic(
        blueprint,
      )}.`,

      "A popular product or attractive discount is not enough reason to overlook a limitation that will affect normal use.",
    ].join(
      " ",
    ),

    "WARNING",
  ),
);
  paragraphs.push(
    createNextStep(
      "CHECKLIST",
    ),
  );

  return paragraphs;
}
  private composeVerdict(
    blueprint:
      GuideBlueprint,

    evidence:
      EditorialEvidence,
  ): EditorialParagraph[] {
    return [
      createOpening(
        blueprint,
        "VERDICT",
      ),

      createVerdict(
        evidence,
      ),
    ];
  }
}