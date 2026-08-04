import type {
  KnowledgeContext,
} from "../knowledge/KnowledgeContext";

import {
  EditorialMemory,
  EditorialRulesEngine,
  KnowledgePreparationEngine,
  NarrativeEngine,
} from "../editorial";

import type {
  SectionContext,
} from "../editorial";

import type {
  EditorialGoal,
} from "../editorial/EditorialGoal";

import {
  composeIntroduction,
} from "../editorial/IntroductionComposer";

import {
  BuildConfidence,
  ExplainConcept,
  OpenWithEmpathy,
} from "../editorial/techniques";

import {
  KnowledgeSelector,
} from "../selector";

export interface EditorialSection {
  heading: string;

  introduction: string;

  paragraphs: string[];

  takeaway: string;

  knowledgeUsed:
    string[];

  selectedKnowledge: {
    facts:
      string[];

    tradeOffs:
      string[];
  };

  memory: {
    covered:
      string[];

    totalEntries:
      number;
  };

  rules: {
    passed:
      boolean;

    score:
      number;

    messages:
      string[];
  };
}
interface EditorialKnowledgeItem {
  title: string;

  explanation: string;
}

interface BuildEditorialSectionInput {
  sectionId: string;

  section:
    SectionContext;

  introduction: string;

  coreParagraphs:
    string[];

  takeaway: string;

  facts:
    EditorialKnowledgeItem[];

  tradeOffs:
    EditorialKnowledgeItem[];
}

export class EditorialAuthor {
  private readonly openWithEmpathy =
    new OpenWithEmpathy();

  private readonly explainConcept =
    new ExplainConcept();

  private readonly buildConfidence =
    new BuildConfidence();

  private readonly knowledgeSelector =
    new KnowledgeSelector();

  private readonly rulesEngine =
    new EditorialRulesEngine();

  private readonly narrative =
    new NarrativeEngine();

    private readonly knowledgePreparation =
  new KnowledgePreparationEngine();

  constructor(
    private readonly memory =
      new EditorialMemory(),
  ) {}
private buildEditorialSection({
  sectionId,
  section,
  introduction,
  coreParagraphs,
  takeaway,
  facts,
  tradeOffs,
}: BuildEditorialSectionInput):
  EditorialSection {
  const narrative =
    this.narrative.build({
      previousHeading:
        section.previousHeading,

      currentHeading:
        section.currentHeading,

      nextHeading:
        section.nextHeading,
    });

  const paragraphs = [
    ...(narrative.opening
      ? [
          narrative.opening,
        ]
      : []),

    ...coreParagraphs,

    takeaway,

    ...(narrative.closing
      ? [
          narrative.closing,
        ]
      : []),
  ];

  facts.forEach(
    (fact) => {
      this.memory.markFactCovered(
        fact.title,
        sectionId,
        fact.explanation,
      );
    },
  );

  tradeOffs.forEach(
    (tradeOff) => {
      this.memory
        .markTradeOffCovered(
          tradeOff.title,
          sectionId,
          tradeOff.explanation,
        );
    },
  );

  const rulesReport =
    this.rulesEngine.evaluate([
      {
        heading:
          section.currentHeading,

        introduction,

        paragraphs,

        takeaway,
      },
    ]);

  return {
    heading:
      section.currentHeading,

    introduction,

    paragraphs,

    takeaway,

    knowledgeUsed: [
      ...tradeOffs.map(
        (tradeOff) =>
          tradeOff.title,
      ),

      ...facts.map(
        (fact) =>
          fact.title,
      ),
    ],

    selectedKnowledge: {
      facts:
        facts.map(
          (fact) =>
            fact.title,
        ),

      tradeOffs:
        tradeOffs.map(
          (tradeOff) =>
            tradeOff.title,
        ),
    },

    memory: {
      covered:
        this.memory
          .getBySection(
            sectionId,
          )
          .map(
            (entry) =>
              entry.title,
          ),

      totalEntries:
        this.memory.size,
    },

    rules: {
      passed:
        rulesReport.passed,

      score:
        rulesReport.score,

      messages:
        rulesReport.results.map(
          (result) =>
            result.message,
        ),
    },
  };
}
  writeIntroduction(
    context: KnowledgeContext,
    goal: EditorialGoal,
    section: SectionContext,
  ): EditorialSection {
    const selectedFacts =
      this.memory.filterUncovered(
        this.knowledgeSelector
          .selectIntroductionFacts(
            context,
          ),
        "FACT",
        (fact) =>
          fact.title,
      );

    const selectedTradeOffs =
      this.memory.filterUncovered(
        this.knowledgeSelector
          .selectTradeOffs(
            context,
          ),
        "TRADE_OFF",
        (tradeOff) =>
          tradeOff.title,
      );

    const opening =
      this.openWithEmpathy.write(
        context,
        goal,
      );

    const concept =
      this.explainConcept.write(
        context,
        goal,
      );

    const confidence =
      this.buildConfidence.write(
        context,
        goal,
      );

    const preparedKnowledge =
  this.knowledgePreparation.prepare(
    selectedFacts,
    selectedTradeOffs,
    context.topic,
    goal.audience,
  );

    const composed =
      composeIntroduction({
        context,
        goal,
        opening,
        concept,
        confidence,
        selectedFacts,
        selectedTradeOffs,
        explainedFacts:
  preparedKnowledge
    .explainedFacts,
      });

    const narrative =
      this.narrative.build({
        previousHeading:
          section.previousHeading,

        currentHeading:
          section.currentHeading,

        nextHeading:
          section.nextHeading,
      });

    const paragraphs = [
      ...(narrative.opening
        ? [
            narrative.opening,
          ]
        : []),

      ...composed.paragraphs,

      ...(narrative.closing
        ? [
            narrative.closing,
          ]
        : []),
    ];

    selectedFacts.forEach(
      (fact) => {
        this.memory.markFactCovered(
          fact.title,
          "introduction",
          fact.explanation,
        );
      },
    );

    selectedTradeOffs.forEach(
      (tradeOff) => {
        this.memory
          .markTradeOffCovered(
            tradeOff.title,
            "introduction",
            tradeOff.explanation,
          );
      },
    );

    const rulesReport =
      this.rulesEngine.evaluate([
        {
          heading:
            section.currentHeading,

          introduction:
            composed.introduction,

          paragraphs,

          takeaway:
            composed.takeaway,
        },
      ]);

    return {
      heading:
        section.currentHeading,

      introduction:
        composed.introduction,

      paragraphs,

      takeaway:
        composed.takeaway,

      knowledgeUsed:
        composed.knowledgeUsed,

      selectedKnowledge: {
        facts:
          selectedFacts.map(
            (fact) =>
              fact.title,
          ),

        tradeOffs:
          selectedTradeOffs.map(
            (tradeOff) =>
              tradeOff.title,
          ),
      },

      memory: {
        covered:
          this.memory
            .getBySection(
              "introduction",
            )
            .map(
              (entry) =>
                entry.title,
            ),

        totalEntries:
          this.memory.size,
      },

      rules: {
        passed:
          rulesReport.passed,

        score:
          rulesReport.score,

        messages:
          rulesReport.results.map(
            (result) =>
              result.message,
          ),
      },
    };
  }

  writePriorities(
    context: KnowledgeContext,
    goal: EditorialGoal,
    section: SectionContext,
  ): EditorialSection {
    const selectedFacts =
      this.memory.filterUncovered(
        this.knowledgeSelector
          .selectPriorityFacts(
            context,
          ),
        "FACT",
        (fact) =>
          fact.title,
      );

 const preparedKnowledge =
  this.knowledgePreparation.prepare(
    selectedFacts,
    [],
    context.topic,
    goal.audience,
  );

    const narrative =
      this.narrative.build({
        previousHeading:
          section.previousHeading,

        currentHeading:
          section.currentHeading,

        nextHeading:
          section.nextHeading,
      });

    const usedFacts =
  selectedFacts.slice(
    0,
    goal.maxParagraphs,
  );

const coreParagraphs =
  usedFacts.map(
    (fact) =>
      preparedKnowledge
        .explainedFacts
        .find(
          (explained) =>
            explained.title ===
            fact.title,
        )?.paragraph ??
      fact.explanation,
  );

    const takeaway =
      "Prioritise the features that improve how the camera will actually be used. Anything else should justify its place in the budget before you pay extra for it.";

    return this.buildEditorialSection({
  sectionId:
    "what-to-prioritise",

  section,

  introduction:
    goal.purpose,

  coreParagraphs,

  takeaway,

  facts:
    selectedFacts,

  tradeOffs:
    [],
});
}

  writeCompromises(
    context: KnowledgeContext,
    goal: EditorialGoal,
    section: SectionContext,
  ): EditorialSection {
    const selectedFacts =
      this.memory.filterUncovered(
        this.knowledgeSelector
          .selectCompromiseFacts(
            context,
          ),
        "FACT",
        (fact) =>
          fact.title,

      );
      

    const selectedTradeOffs =
      this.memory.filterUncovered(
        this.knowledgeSelector
          .selectTradeOffs(
            context,
          ),
        "TRADE_OFF",
        (tradeOff) =>
          tradeOff.title,
      );



    const preparedKnowledge =
  this.knowledgePreparation.prepare(
    selectedFacts,
    selectedTradeOffs,
    context.topic,
    goal.audience,
    "Decide whether this compromise will affect the way you actually use the camera. If it will not, paying more to remove it may offer very little practical value.",
  );
   

    const usedTradeOffs =
  selectedTradeOffs.slice(
    0,
    Math.min(
      2,
      goal.maxParagraphs,
    ),
  );

const remainingSlots =
  Math.max(
    0,
    goal.maxParagraphs -
      usedTradeOffs.length,
  );

const usedFacts =
  selectedFacts.slice(
    0,
    remainingSlots,
  );

const coreParagraphs = [
  ...usedTradeOffs.map(
    (tradeOff) =>
      preparedKnowledge
        .explainedTradeOffs
        .find(
          (explained) =>
            explained.title ===
            tradeOff.title,
        )?.paragraph ??
      tradeOff.explanation,
  ),

  ...usedFacts.map(
    (fact) =>
      preparedKnowledge
        .explainedFacts
        .find(
          (explained) =>
            explained.title ===
            fact.title,
        )?.paragraph ??
      fact.explanation,
  ),
];
    

    const takeaway =
      "Compromise on specifications you are unlikely to notice. Do not compromise on the things that will affect every photograph or make the camera frustrating to use.";

    return this.buildEditorialSection({
  sectionId:
    "what-to-compromise",

  section,

  introduction:
    goal.purpose,

  coreParagraphs,

  takeaway,

  facts:
  usedFacts,

tradeOffs:
  usedTradeOffs,
});
}
  writeBestValue(
  context: KnowledgeContext,
  goal: EditorialGoal,
  section: SectionContext,
): EditorialSection {
  const selectedFacts =
    this.memory.filterUncovered(
      this.knowledgeSelector
        .selectBestValueFacts(
          context,
        ),
      "FACT",
      (fact) =>
        fact.title,
    );

  const selectedTradeOffs =
    this.memory.filterUncovered(
      this.knowledgeSelector
        .selectTradeOffs(
          context,
        ),
      "TRADE_OFF",
      (tradeOff) =>
        tradeOff.title,
    );

  const preparedKnowledge =
  this.knowledgePreparation.prepare(
    selectedFacts,
    selectedTradeOffs,
    context.topic,
    goal.audience,
    "Use this point to judge whether paying more creates a meaningful improvement or merely adds features that will rarely affect the buying experience.",
  );

  

  const usedFacts =
    selectedFacts.slice(
      0,
      goal.maxParagraphs,
    );

  const coreParagraphs =
    usedFacts.map(
      (fact) =>
        preparedKnowledge
  .explainedFacts
  .find(
          (explained) =>
            explained.title ===
            fact.title,
        )?.paragraph ??
        fact.explanation,
    );

  const primaryTradeOff =
    selectedTradeOffs[0] ??
    null;

  if (
    primaryTradeOff &&
    coreParagraphs.length <
      goal.maxParagraphs
  ) {
    coreParagraphs.push(
      primaryTradeOff
        .explanation,
    );
  }

  const takeaway =
    "The best-value option is not necessarily the cheapest. It is the one that covers the important needs reliably without charging heavily for improvements the buyer may never notice.";

 return this.buildEditorialSection({
  sectionId:
    "best-value",

  section,

  introduction:
    goal.purpose,

  coreParagraphs,

  takeaway,

  facts:
    usedFacts,

  tradeOffs:
    primaryTradeOff
      ? [
          primaryTradeOff,
        ]
      : [],
});
}
writeBuyingUsed(
  context: KnowledgeContext,
  goal: EditorialGoal,
  section: SectionContext,
): EditorialSection {
  const selectedFacts =
    this.memory.filterUncovered(
      this.knowledgeSelector
        .selectBuyingUsedFacts(
          context,
        ),
      "FACT",
      (fact) =>
        fact.title,
    );

  const selectedTradeOffs =
    this.memory.filterUncovered(
      this.knowledgeSelector
        .selectTradeOffs(
          context,
        ),
      "TRADE_OFF",
      (tradeOff) =>
        tradeOff.title,
    );

const preparedKnowledge =
  this.knowledgePreparation.prepare(
    selectedFacts,
    selectedTradeOffs,
    context.topic,
    goal.audience,
    "Use this point to decide whether the extra value of buying used is worth the added uncertainty around condition, warranty and seller protection.",
  );

  const usedFacts =
    selectedFacts.slice(
      0,
      Math.max(
        0,
        goal.maxParagraphs - 1,
      ),
    );

  const primaryTradeOff =
    selectedTradeOffs[0] ??
    null;

  const coreParagraphs = [
    "Buying used can put a more capable camera within reach, but the lower price only represents good value when condition, seller protection and the likely cost of replacing worn accessories are taken into account.",

    ...usedFacts.map(
      (fact) =>
        preparedKnowledge
  .explainedFacts
  .find(
          (explained) =>
            explained.title ===
            fact.title,
        )?.paragraph ??
        fact.explanation,
    ),

    ...(primaryTradeOff
      ? [
          primaryTradeOff
            .explanation,
        ]
      : []),
  ].slice(
    0,
    goal.maxParagraphs,
  );

  const takeaway =
    "Buy used when the saving gives you meaningfully better capability and the condition can be verified. Buy new when certainty, warranty protection and an uncomplicated return route are worth more than the performance difference.";

  return this.buildEditorialSection({
    sectionId:
      "new-vs-used",

    section,

    introduction:
      goal.purpose,

    coreParagraphs,

    takeaway,

    facts:
      usedFacts,

    tradeOffs:
      primaryTradeOff
        ? [
            primaryTradeOff,
          ]
        : [],
  });
}
writeMistakes(
  context: KnowledgeContext,
  goal: EditorialGoal,
  section: SectionContext,
): EditorialSection {
  const selectedFacts =
    this.memory.filterUncovered(
      this.knowledgeSelector
        .selectMistakeFacts(
          context,
        ),
      "FACT",
      (fact) =>
        fact.title,
    );

  const selectedMistakes =
    this.memory.filterUncovered(
      this.knowledgeSelector
        .selectMistakes(
          context,
        ),
      "MISTAKE",
      (mistake) =>
        mistake.title,
    );

 const preparedKnowledge =
  this.knowledgePreparation.prepare(
    selectedFacts,
    [],
    context.topic,
    goal.audience,
    "Use this as a warning sign. If a purchase ignores this point, it may look attractive initially but become poor value once the wider cost or limitation becomes clear.",
  );

  const usedMistakes =
    selectedMistakes.slice(
      0,
      Math.min(
        2,
        goal.maxParagraphs,
      ),
    );

  const remainingSlots =
    Math.max(
      0,
      goal.maxParagraphs -
        usedMistakes.length,
    );

  const usedFacts =
    selectedFacts.slice(
      0,
      remainingSlots,
    );

  const coreParagraphs = [
    ...usedMistakes.map(
      (mistake) =>
        `${mistake.title}. ${mistake.explanation}`,
    ),

    ...usedFacts.map(
      (fact) =>
        preparedKnowledge
  .explainedFacts
  .find(
          (explained) =>
            explained.title ===
            fact.title,
        )?.paragraph ??
        fact.explanation,
    ),
  ];

  const takeaway =
    "Most bad purchases are not caused by choosing a terrible camera. They happen when the buyer ignores total cost, chooses around marketing or pays for features that do not solve a real need.";

  const sectionResult =
    this.buildEditorialSection({
      sectionId:
        "mistakes",

      section,

      introduction:
        goal.purpose,

      coreParagraphs,

      takeaway,

      facts:
        usedFacts,

      tradeOffs:
        [],
    });

  usedMistakes.forEach(
    (mistake) => {
      this.memory.markMistakeCovered(
        mistake.title,
        "mistakes",
        mistake.explanation,
      );
    },
  );

  return {
    ...sectionResult,

    knowledgeUsed: [
      ...usedMistakes.map(
        (mistake) =>
          mistake.title,
      ),

      ...sectionResult
        .knowledgeUsed,
    ],

    memory: {
      covered:
        this.memory
          .getBySection(
            "mistakes",
          )
          .map(
            (entry) =>
              entry.title,
          ),

      totalEntries:
        this.memory.size,
    },
  };
}
writeRecommendations(
  context: KnowledgeContext,
  goal: EditorialGoal,
  section: SectionContext,
): EditorialSection {
  const selectedFacts =
    this.memory.filterUncovered(
      this.knowledgeSelector
        .selectRecommendationFacts(
          context,
        ),
      "FACT",
      (fact) =>
        fact.title,
    );

 const preparedKnowledge =
  this.knowledgePreparation.prepare(
    selectedFacts,
    [],
    context.topic,
    goal.audience,
    "Use this point to define who a recommendation should suit, what problem it should solve and which weakness must be accepted before a specific product can be recommended.",
  );

  const usedFacts =
    selectedFacts.slice(
      0,
      goal.maxParagraphs,
    );
    const recommendedProducts =
  context.products
    .slice(
      0,
      goal.maxParagraphs,
    );

 const productParagraphs =
  recommendedProducts.map(
    (product) =>
      `${product.name} is worth considering because ${product.reason}`,
  );

const factParagraphs =
  usedFacts.map(
    (fact) =>
      preparedKnowledge
        .explainedFacts
        .find(
          (explained) =>
            explained.title ===
            fact.title,
        )?.paragraph ??
      fact.explanation,
  );

const coreParagraphs = [
  ...productParagraphs,

  ...factParagraphs,
].slice(
  0,
  goal.maxParagraphs,
);

  const takeaway =
  recommendedProducts.length > 0
    ? "These recommendations are starting points rather than automatic winners. Choose the camera whose strengths match your photography and whose weaknesses you can accept."
    : "Do not recommend a camera simply because it is popular. Recommend it only when the evidence shows who it suits, why it offers value and which limitation the buyer must accept.";
  return this.buildEditorialSection({
    sectionId:
      "recommendations",

    section,

    introduction:
      goal.purpose,

    coreParagraphs,

    takeaway,

    facts:
      usedFacts,

    tradeOffs:
      [],
  });
}
writeVerdict(
  context: KnowledgeContext,
  goal: EditorialGoal,
  section: SectionContext,
): EditorialSection {
  const selectedFacts =
    this.memory.filterUncovered(
      this.knowledgeSelector
        .selectVerdictFacts(
          context,
        ),
      "FACT",
      (fact) =>
        fact.title,
    );

  const selectedTradeOffs =
    this.memory.filterUncovered(
      this.knowledgeSelector
        .selectTradeOffs(
          context,
        ),
      "TRADE_OFF",
      (tradeOff) =>
        tradeOff.title,
    );

 const preparedKnowledge =
  this.knowledgePreparation.prepare(
    selectedFacts,
    selectedTradeOffs,
    context.topic,
    goal.audience,
    "Use this point to support a clear final decision. The verdict should explain what the buyer should do, why that route offers the best value and which circumstances would justify choosing differently.",
  );

  const usedFacts =
    selectedFacts.slice(
      0,
      Math.max(
        0,
        goal.maxParagraphs - 1,
      ),
    );

  const primaryTradeOff =
    selectedTradeOffs[0] ??
    null;

  const coreParagraphs = [
    "The clearest buying decision is the one that satisfies the important needs without forcing the buyer to pay for improvements they are unlikely to notice.",

    ...usedFacts.map(
      (fact) =>
        preparedKnowledge
  .explainedFacts
  .find(
          (explained) =>
            explained.title ===
            fact.title,
        )?.paragraph ??
        fact.explanation,
    ),

    ...(primaryTradeOff
      ? [
          `The main trade-off is ${primaryTradeOff.explanation}`,
        ]
      : []),
  ].slice(
    0,
    goal.maxParagraphs,
  );

  const takeaway =
    "If it were our money, we would choose the option that delivers the strongest complete setup rather than spending the entire budget on the most impressive body. Spend more only when the extra cost solves a limitation you will genuinely notice.";

  return this.buildEditorialSection({
    sectionId:
      "final-verdict",

    section,

    introduction:
      goal.purpose,

    coreParagraphs,

    takeaway,

    facts:
      usedFacts,

    tradeOffs:
      primaryTradeOff
        ? [
            primaryTradeOff,
          ]
        : [],
  });
}
}