import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

import {
  EditorialGuideWriter,
} from "@/knowledge/guides/editorial-brain";

import type {
  EditorialSectionKind,
} from "@/knowledge/guides/editorial-brain/EditorialTypes";

import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import type {
  GeneratedGuideContentDraft,
} from "@/knowledge/guides/factory/content";

import {
  createKnowledgeContext,
} from "@/knowledge/guides/factory/knowledge";

import {
  EditorialAuthor,
  writeGuideDraft,
} from "@/knowledge/guides/factory/writer";

import type {
  EditorialGoal,
} from "@/knowledge/guides/factory/editorial/EditorialGoal";

import type {
  KnowledgeContext,
  ProductRecommendation,
} from "@/knowledge/guides/factory/knowledge/KnowledgeContext";

export interface CreateBuyingGuideArtifactInput {
  blueprint:
    GuideBlueprint;

  content:
    GeneratedGuideContentDraft;

  seo:
    BuyingGuide["seo"];

  heroImage:
    BuyingGuide["heroImage"];

  subtitle?:
    string;
}

interface AuthoredSection {
  heading:
    string;

  introduction:
    string;

  paragraphs:
    string[];
}

function createDate():
  string {
  return new Date()
    .toISOString()
    .slice(
      0,
      10,
    );
}

function clampConfidence(
  value: number,
): number {
  return Math.max(
    0,
    Math.min(
      1,
      value,
    ),
  );
}

function removeDraftPrefix(
  paragraph: string,
): string {
  return paragraph
    .replace(
      /^BLINLX GENERATED DRAFT:\s*/i,
      "",
    )
    .replace(
      /^EDITORIAL DRAFT:\s*/i,
      "",
    )
    .trim();
}

function createEditorialGoal(
  input: {
    purpose:
      string;

    audience:
      string;

    desiredOutcome:
      string;

    tone:
      string;

    includeTradeOffs:
      boolean;

    includeRecommendation:
      boolean;
  },
): EditorialGoal {
  return {
    purpose:
      input.purpose,

    audience:
      input.audience,

    desiredOutcome:
      input.desiredOutcome,

    tone:
      input.tone,

    maxParagraphs:
      3,

    includeTradeOffs:
      input.includeTradeOffs,

    includeRecommendation:
      input.includeRecommendation,
  };
}

function getPrimaryProduct(
  knowledge:
    KnowledgeContext,
): ProductRecommendation | undefined {
  return (
    knowledge.products.find(
      (product) =>
        product.verdict ===
        "BEST_OVERALL",
    ) ??
    knowledge.products.find(
      (product) =>
        product.verdict ===
        "BEST_VALUE",
    ) ??
    knowledge.products[0]
  );
}

function createVerdict(
  knowledge:
    KnowledgeContext,
): BuyingGuide["verdict"] {
  const primaryProduct =
    getPrimaryProduct(
      knowledge,
    );

  if (!primaryProduct) {
    return {
      title:
        "More verified product knowledge is required.",

      summary:
        "Blinlx has created the buying-guide structure, but there are not yet enough verified product recommendations to make a responsible final selection.",

      confidence:
        0.35,

      points: [
        "The guide structure and buying criteria are available.",
        "Verified product recommendations still need to be added.",
        "No unsupported product winner has been invented.",
      ],
    };
  }

  const confidence =
    clampConfidence(
      primaryProduct.confidence,
    );

  const strengths =
    primaryProduct.strengths ??
    [];

  const weaknesses =
    primaryProduct.weaknesses ??
    [];

  const points = [
    primaryProduct.reason,

    strengths[0],

    strengths[1],

    weaknesses[0]
      ? `The main limitation is that ${weaknesses[0]
          .charAt(
            0,
          )
          .toLowerCase()}${weaknesses[0].slice(
          1,
        )}`
      : undefined,
  ].filter(
    (
      point,
    ): point is string =>
      Boolean(
        point?.trim(),
      ),
  );

  return {
    title:
      `Blinlx recommends ${primaryProduct.name}`,

    summary:
      primaryProduct.buyingAdvice ??
      primaryProduct.reason,

    confidence,

    points:
      points.slice(
        0,
        4,
      ),
  };
}

function createBlinlxOpinion(
  knowledge:
    KnowledgeContext,
): NonNullable<
  BuyingGuide["blinlxOpinion"]
> {
  const primaryProduct =
    getPrimaryProduct(
      knowledge,
    );

  if (!primaryProduct) {
    return {
      title:
        "What Blinlx Thinks",

      summary:
        "The buying criteria are clear, but Blinlx does not yet have enough verified product evidence to name a responsible winner.",

      ifItWasOurMoney:
        "We would wait until the Product Brain contains enough verified choices rather than recommending a product without sufficient evidence.",

      reasons: [
        "A useful recommendation must be supported by verified product knowledge.",
        "The strongest option should match the buyer rather than merely having the longest specification list.",
        "Blinlx will not manufacture a recommendation to fill an empty section.",
      ],

      caveats: [
        "More products must be added to the Product Brain before this guide can offer a complete shortlist.",
      ],

      confidence:
        0.35,
    };
  }

  const reasons = [
    ...(primaryProduct.strengths ??
      []),

    primaryProduct.reason,
  ]
    .filter(
      (
        reason,
      ): reason is string =>
        Boolean(
          reason?.trim(),
        ),
    )
    .slice(
      0,
      3,
    );

  const caveats = [
    ...(primaryProduct.weaknesses ??
      []),

    ...(primaryProduct.avoidIf ??
      []),
  ]
    .filter(
      (
        caveat,
      ): caveat is string =>
        Boolean(
          caveat?.trim(),
        ),
    )
    .slice(
      0,
      2,
    );

  return {
    title:
      "What Blinlx Thinks",

    summary:
      `${primaryProduct.name} is the strongest current recommendation because ${primaryProduct.reason
        .charAt(
          0,
        )
        .toLowerCase()}${primaryProduct.reason.slice(
        1,
      )}`,

    ifItWasOurMoney:
      primaryProduct.buyingAdvice ??
      `If it were our money, we would choose ${primaryProduct.name}, provided its strengths match how the product will actually be used.`,

    reasons:
      reasons.length > 0
        ? reasons
        : [
            primaryProduct.reason,
          ],

    caveats:
      caveats.length > 0
        ? caveats
        : undefined,

    confidence:
      clampConfidence(
        primaryProduct.confidence,
      ),
  };
}

function createGuideSummary(
  knowledge:
    KnowledgeContext,
): string[] {
  const primaryProduct =
    getPrimaryProduct(
      knowledge,
    );

  const summary = [
    primaryProduct
      ? `${primaryProduct.name} is the leading recommendation for this guide.`
      : undefined,

    primaryProduct
      ?.buyingAdvice,

    knowledge.keyFacts[0]
      ?.explanation,

    knowledge.tradeOffs[0]
      ?.explanation,

    knowledge.commonMistakes[0]
      ?.explanation,
  ].filter(
    (
      item,
    ): item is string =>
      Boolean(
        item?.trim(),
      ),
  );

  if (
    summary.length >= 3
  ) {
    return summary.slice(
      0,
      3,
    );
  }

  return [
    ...summary,

    "Choose around real use, total ownership cost and the limitations that will matter in everyday use.",

    "Spending more only makes sense when the additional cost solves a limitation the buyer will genuinely notice.",

    "Compare the complete setup rather than judging value from the headline product price alone.",
  ].slice(
    0,
    3,
  );
}

function createFaqAnswer(
  question: string,
  purpose: string,
  knowledge:
    KnowledgeContext,
): string {
  const normalisedQuestion =
    question.toLowerCase();

  const primaryProduct =
    getPrimaryProduct(
      knowledge,
    );

  const strongestProduct =
    primaryProduct?.name ??
    "the strongest verified option";

  const firstStrength =
    primaryProduct
      ?.strengths?.[0];

  const firstWeakness =
    primaryProduct
      ?.weaknesses?.[0];

  const firstTradeOff =
    knowledge.tradeOffs[0]
      ?.explanation;

  const firstMistake =
    knowledge.commonMistakes[0]
      ?.explanation;

  if (
    normalisedQuestion.includes(
      "what should i expect",
    ) ||
    normalisedQuestion.includes(
      "realistic",
    )
  ) {
    return [
      `Buyers should expect a capable product that handles the important everyday requirements without necessarily including every premium feature.`,

      firstStrength
        ? `${strongestProduct} demonstrates the available capability: ${firstStrength}`
        : undefined,

      firstWeakness
        ? `The main limitation to account for is: ${firstWeakness}`
        : firstTradeOff,
    ]
      .filter(Boolean)
      .join(
        " ",
      );
  }

  if (
    normalisedQuestion.includes(
      "best value",
    )
  ) {
    return primaryProduct
      ? `${strongestProduct} currently represents the clearest value within this guide because ${primaryProduct.reason.charAt(
          0,
        ).toLowerCase()}${primaryProduct.reason.slice(
          1,
        )} Value still depends on the exact price, condition and included accessories.`
      : "The best value is the option that covers the buyer's important requirements reliably without charging heavily for features they are unlikely to use.";
  }

  if (
    normalisedQuestion.includes(
      "compromise",
    )
  ) {
    return [
      firstTradeOff ??
        "The sensible compromises are features that will rarely affect the intended use.",

      firstWeakness
        ? `For the leading recommendation, an important limitation is: ${firstWeakness}`
        : undefined,

      "Do not compromise on reliability, suitability or the features that will affect every use.",
    ]
      .filter(Boolean)
      .join(
        " ",
      );
  }

  if (
    normalisedQuestion.includes(
      "new or used",
    ) ||
    normalisedQuestion.includes(
      "buy new or used",
    )
  ) {
    return "Buying used can provide more capability for the same budget, but only when condition, seller protection, warranty cover and the cost of missing or worn accessories are considered. Buying new is the safer route when warranty protection, straightforward returns and fewer unknowns are worth more than the saving.";
  }

  if (
    normalisedQuestion.includes(
      "spend more",
    )
  ) {
    return "Spend more only when the extra cost removes a limitation you will genuinely notice, improves reliability or keeps the purchase useful for considerably longer. When the difference mainly exists on a specification sheet, saving the money is usually the smarter choice.";
  }

  if (
    normalisedQuestion.includes(
      "mistake",
    )
  ) {
    return firstMistake ??
      "Avoid choosing on headline specifications alone, forgetting the full cost of ownership or paying extra for features that do not solve a real need.";
  }

  if (primaryProduct) {
    return `${purpose} Based on the verified knowledge currently available, ${primaryProduct.name} is the leading option because ${primaryProduct.reason.charAt(
      0,
    ).toLowerCase()}${primaryProduct.reason.slice(
      1,
    )}`;
  }

  return `${purpose} The final decision should be based on verified product suitability, meaningful trade-offs and complete ownership cost rather than marketing claims alone.`;
}export function createBuyingGuideArtifact(
  input:
    CreateBuyingGuideArtifactInput,
): BuyingGuide {
  const today =
    createDate();

  const knowledgeContext =
    createKnowledgeContext(
      input.blueprint,
    );

    const editorialGuideWriter =
  new EditorialGuideWriter();

const editorialGuide =
  editorialGuideWriter.write({
    blueprint:
      input.blueprint,

    content:
      input.content,

    knowledge:
      knowledgeContext,
  });

  const editorialAuthor =
    new EditorialAuthor();

  const introductionSection =
    input.content.sections.find(
      (section) =>
        section.id ===
        "introduction",
    );
      const needSection =
    input.content.sections.find(
      (section) =>
        section.id ===
        "do-you-need-it",
    );

  const audienceSection =
    input.content.sections.find(
      (section) =>
        section.id ===
        "who-is-it-for",
    );

  const prioritiesSection =
    input.content.sections.find(
      (section) =>
        section.id ===
        "what-to-prioritise",
    );
     const budgetSection =
    input.content.sections.find(
      (section) =>
        section.id ===
        "budget",
    );

  const compromisesSection =
    input.content.sections.find(
      (section) =>
        section.id ===
        "what-to-compromise",
    );

  const bestValueSection =
    input.content.sections.find(
      (section) =>
        section.id ===
        "best-value",
    );

  const buyingUsedSection =
    input.content.sections.find(
      (section) =>
        section.id ===
        "new-vs-used",
    );

  const mistakesSection =
    input.content.sections.find(
      (section) =>
        section.id ===
        "mistakes",
    );

  const recommendationsSection =
    input.content.sections.find(
      (section) =>
        section.id ===
        "recommendations",
    );
      const alternativesSection =
    input.content.sections.find(
      (section) =>
        section.id ===
        "alternatives",
    );

  const checklistSection =
    input.content.sections.find(
      (section) =>
        section.id ===
        "before-you-buy",
    );

  const verdictSection =
    input.content.sections.find(
      (section) =>
        section.id ===
        "final-verdict",
    );

  const audience =
    input.blueprint.audience ??
    "Camera buyers";

   const needGoal =
    createEditorialGoal({
      purpose:
        "Help the reader decide whether buying now will solve a real limitation.",

      audience,

      desiredOutcome:
        "The reader knows whether to buy, wait or improve the current setup first.",

      tone:
        "Helpful, honest and practical.",

      includeTradeOffs:
        true,

      includeRecommendation:
        false,
    });

  const audienceGoal =
    createEditorialGoal({
      purpose:
        "Explain which buyers will genuinely benefit from this purchase.",

      audience,

      desiredOutcome:
        "The reader knows whether the product suits their experience, priorities and intended use.",

      tone:
        "Clear, inclusive and practical.",

      includeTradeOffs:
        true,

      includeRecommendation:
        false,
    });

  const budgetGoal =
    createEditorialGoal({
      purpose:
        "Explain how much the reader should realistically spend.",

      audience,

      desiredOutcome:
        "The reader understands where good value ends and diminishing returns begin.",

      tone:
        "Direct, realistic and money-conscious.",

      includeTradeOffs:
        true,

      includeRecommendation:
        true,
    });

  const alternativesGoal =
    createEditorialGoal({
      purpose:
        "Show when another product type, older model or cheaper route may be better.",

      audience,

      desiredOutcome:
        "The reader understands the strongest alternatives to the obvious purchase.",

      tone:
        "Open-minded, practical and honest.",

      includeTradeOffs:
        true,

      includeRecommendation:
        true,
    });

  const checklistGoal =
    createEditorialGoal({
      purpose:
        "Give the reader a final checklist before spending money.",

      audience,

      desiredOutcome:
        "The reader confirms suitability, complete cost and important limitations before buying.",

      tone:
        "Concise, practical and decisive.",

      includeTradeOffs:
        true,

      includeRecommendation:
        false,
    });

  const prioritiesGoal =
    createEditorialGoal({
      purpose:
        "Explain which features buyers should prioritise before comparing individual products.",

      audience,

      desiredOutcome:
        "The reader knows where to spend their budget first.",

      tone:
        "Experienced, honest and conversational.",

      includeTradeOffs:
        true,

      includeRecommendation:
        false,
    });

  const compromisesGoal =
    createEditorialGoal({
      purpose:
        "Explain which compromises are sensible and which limitations buyers should avoid.",

      audience,

      desiredOutcome:
        "The reader understands where they can safely save money without buying the wrong product.",

      tone:
        "Direct, practical and honest.",

      includeTradeOffs:
        true,

      includeRecommendation:
        false,
    });

  const bestValueGoal =
    createEditorialGoal({
      purpose:
        "Help the reader identify where their money delivers the greatest real-world value.",

      audience,

      desiredOutcome:
        "The reader understands which option offers the strongest balance of price, capability and long-term satisfaction.",

      tone:
        "Experienced, honest and conversational.",

      includeTradeOffs:
        true,

      includeRecommendation:
        true,
    });

  const buyingUsedGoal =
    createEditorialGoal({
      purpose:
        "Help the reader decide whether buying used or buying new offers better value.",

      audience,

      desiredOutcome:
        "The reader understands when buying used is smart and when paying more for new is worthwhile.",

      tone:
        "Experienced, honest and conversational.",

      includeTradeOffs:
        true,

      includeRecommendation:
        true,
    });

  const mistakesGoal =
    createEditorialGoal({
      purpose:
        "Warn buyers about the mistakes that waste money.",

      audience,

      desiredOutcome:
        "The reader avoids the most common buying mistakes.",

      tone:
        "Direct and practical.",

      includeTradeOffs:
        false,

      includeRecommendation:
        true,
    });

  const recommendationsGoal =
    createEditorialGoal({
      purpose:
        "Explain how Blinlx recommendations are chosen and which buyer each option should suit.",

      audience,

      desiredOutcome:
        "The reader understands why each recommended product deserves its place.",

      tone:
        "Clear, evidence-led and honest.",

      includeTradeOffs:
        true,

      includeRecommendation:
        true,
    });

  const verdictGoal =
    createEditorialGoal({
      purpose:
        "Turn the evidence into one clear final buying decision.",

      audience,

      desiredOutcome:
        "The reader knows what Blinlx would prioritise, when spending more is justified and when saving money is smarter.",

      tone:
        "Decisive, honest and conversational.",

      includeTradeOffs:
        true,

      includeRecommendation:
        true,
    });
const authoredSections =
    new Map<
      string,
      AuthoredSection
    >();

if (introductionSection) {
  authoredSections.set(
    "introduction",
    editorialAuthor
      .writeIntroduction(
        knowledgeContext,
        createEditorialGoal({
          purpose:
            "Introduce the buying decision clearly.",

          audience,

          desiredOutcome:
            "The reader understands what matters before comparing products.",

          tone:
            "Helpful, practical and conversational.",

          includeTradeOffs:
            true,

          includeRecommendation:
            false,
        }),
        {
          currentHeading:
            introductionSection.heading,

          nextHeading:
            input.content.sections[1]
              ?.heading,
        },
      ),
  );
}
  if (needSection) {
    authoredSections.set(
      "do-you-need-it",
      editorialAuthor
        .writeNeed(
          knowledgeContext,
          needGoal,
          {
            previousHeading:
              introductionSection
                ?.heading,

            currentHeading:
              needSection.heading,

            nextHeading:
              audienceSection
                ?.heading,
          },
        ),
    );
  }

  if (audienceSection) {
    authoredSections.set(
      "who-is-it-for",
      editorialAuthor
        .writeAudience(
          knowledgeContext,
          audienceGoal,
          {
            previousHeading:
              needSection
                ?.heading,

            currentHeading:
              audienceSection
                .heading,

            nextHeading:
              prioritiesSection
                ?.heading,
          },
        ),
    );
  }

  if (prioritiesSection) {
    authoredSections.set(
      "what-to-prioritise",
      editorialAuthor
        .writePriorities(
          knowledgeContext,
          prioritiesGoal,
          {
            previousHeading:
              introductionSection
                ?.heading,

            currentHeading:
              prioritiesSection
                .heading,

            nextHeading:
              compromisesSection
                ?.heading,
          },
        ),
    );
  }
    if (budgetSection) {
    authoredSections.set(
      "budget",
      editorialAuthor
        .writeBudget(
          knowledgeContext,
          budgetGoal,
          {
            previousHeading:
              prioritiesSection
                ?.heading,

            currentHeading:
              budgetSection.heading,

            nextHeading:
              compromisesSection
                ?.heading,
          },
        ),
    );
  }

  if (compromisesSection) {
    authoredSections.set(
      "what-to-compromise",
      editorialAuthor
        .writeCompromises(
          knowledgeContext,
          compromisesGoal,
          {
            previousHeading:
              prioritiesSection
                ?.heading,

            currentHeading:
              compromisesSection
                .heading,

            nextHeading:
              bestValueSection
                ?.heading,
          },
        ),
    );
  }

  if (bestValueSection) {
    authoredSections.set(
      "best-value",
      editorialAuthor
        .writeBestValue(
          knowledgeContext,
          bestValueGoal,
          {
            previousHeading:
              compromisesSection
                ?.heading,

            currentHeading:
              bestValueSection
                .heading,

            nextHeading:
              buyingUsedSection
                ?.heading,
          },
        ),
    );
  }

  if (buyingUsedSection) {
    authoredSections.set(
      "new-vs-used",
      editorialAuthor
        .writeBuyingUsed(
          knowledgeContext,
          buyingUsedGoal,
          {
            previousHeading:
              bestValueSection
                ?.heading,

            currentHeading:
              buyingUsedSection
                .heading,

            nextHeading:
              mistakesSection
                ?.heading,
          },
        ),
    );
  }

  if (mistakesSection) {
    authoredSections.set(
      "mistakes",
      editorialAuthor
        .writeMistakes(
          knowledgeContext,
          mistakesGoal,
          {
            previousHeading:
              buyingUsedSection
                ?.heading,

            currentHeading:
              mistakesSection
                .heading,

            nextHeading:
              recommendationsSection
                ?.heading,
          },
        ),
    );
  }

  if (
    recommendationsSection
  ) {
    authoredSections.set(
      "recommendations",
      editorialAuthor
        .writeRecommendations(
          knowledgeContext,
          recommendationsGoal,
          {
            previousHeading:
              mistakesSection
                ?.heading,

            currentHeading:
              recommendationsSection
                .heading,

            nextHeading:
              verdictSection
                ?.heading,
          },
        ),
    );
  }
    if (alternativesSection) {
    authoredSections.set(
      "alternatives",
      editorialAuthor
        .writeAlternatives(
          knowledgeContext,
          alternativesGoal,
          {
            previousHeading:
              recommendationsSection
                ?.heading,

            currentHeading:
              alternativesSection
                .heading,

            nextHeading:
              checklistSection
                ?.heading,
          },
        ),
    );
  }

  if (checklistSection) {
    authoredSections.set(
      "before-you-buy",
      editorialAuthor
        .writeChecklist(
          knowledgeContext,
          checklistGoal,
          {
            previousHeading:
              alternativesSection
                ?.heading,

            currentHeading:
              checklistSection
                .heading,

            nextHeading:
              verdictSection
                ?.heading,
          },
        ),
    );
  }

   if (verdictSection) {
    authoredSections.set(
      "final-verdict",
      editorialAuthor
        .writeVerdict(
          knowledgeContext,
          verdictGoal,
          {
            previousHeading:
              checklistSection
                ?.heading ??
              alternativesSection
                ?.heading ??
              recommendationsSection
                ?.heading,

            currentHeading:
              verdictSection
                .heading,
          },
        ),
    );
  }

  const writtenDraft =
    writeGuideDraft(
      input.blueprint,
    );

  const writtenSectionsById =
    new Map(
      writtenDraft.sections.map(
        (section) => [
          section.id,
          section,
        ],
      ),
    );

  const editorialSectionsByKind =
  new Map(
    editorialGuide.sections.map(
      (section) => [
        section.sectionKind,
        section,
      ],
    ),
  );

const sectionKindById:
  Record<
    string,
    EditorialSectionKind
  > = {
  introduction:
    "INTRODUCTION",

  "do-you-need-it":
    "NEED",

  "who-is-it-for":
    "AUDIENCE",

  "what-to-prioritise":
    "PRIORITIES",

  "what-to-look-for":
    "PRIORITIES",

  budget:
    "BUDGET",

  "what-to-compromise":
    "COMPROMISES",

  "best-value":
    "BEST_VALUE",

  "new-vs-used":
    "BUYING_USED",

  mistakes:
    "MISTAKES",

  "common-mistakes":
    "MISTAKES",

  recommendations:
    "RECOMMENDATIONS",

  alternatives:
    "ALTERNATIVES",

  "before-you-buy":
    "CHECKLIST",

  "final-verdict":
    "VERDICT",
};

const sections:
  BuyingGuide["sections"] =
  input.content.sections.map(
    (
      section,
    ): BuyingGuide[
      "sections"
    ][number] => {
      const sectionKind =
        sectionKindById[
          section.id
        ];

      const editorialSection =
        sectionKind
          ? editorialSectionsByKind.get(
              sectionKind,
            )
          : undefined;

      if (!editorialSection) {
        throw new Error(
          [
            `Missing Editorial Brain section: ${section.id}`,
            `Guide: ${input.content.slug}`,
            `Heading: ${section.heading}`,
          ].join(
            "\n",
          ),
        );
      }

      const introduction =
        editorialSection
          .introduction
          .trim();

      const paragraphs =
        editorialSection
          .paragraphs
          .map(
            (paragraph) =>
              paragraph.text.trim(),
          )
          .filter(
            Boolean,
          );

      if (
        !introduction ||
        paragraphs.length === 0
      ) {
        throw new Error(
          [
            `Incomplete Editorial Brain section: ${section.id}`,
            `Guide: ${input.content.slug}`,
            `Heading: ${section.heading}`,
          ].join(
            "\n",
          ),
        );
      }

       return {
        id:
          section.id,

        heading:
          editorialSection
            .heading,

        introduction,

        blocks: [
          {
            type:
              "TEXT",

            id:
              `${section.id}-editorial-brain`,

            heading:
              editorialSection
                .heading,

            paragraphs,
          },
        ],
      };
    },
  );

        
 const recommendations =
  editorialGuide.recommendations;

  const faqs:
    BuyingGuide["faqs"] =
    input.content.faqs.map(
      (faq) => ({
        question:
          faq.question,

        answer:
          createFaqAnswer(
            faq.question,
            faq.purpose,
            knowledgeContext,
          ),
      }),
    );

  return {
    slug:
      input.content.slug,

    title:
      input.content.title,

    subtitle:
      input.subtitle,

    category:
      input.content.category,

    topic:
      input.content.topic,

    publishedAt:
      today,

    updatedAt:
      today,

    author: {
      name:
        "Lee Coombs",

      role:
        "Photographer and Blinlx Founder",
    },

    heroImage:
      input.heroImage,

    seo:
      input.seo,

   verdict:
  editorialGuide.verdict,

  blinlxOpinion:
  editorialGuide.opinion,

   summary:
  editorialGuide.summary,

    recommendations,

    sections,

   faqs:
  editorialGuide.faqs,

    relatedGuides:
      [],

    askBlinlxPrompt:
      input.content
        .askBlinlxPrompt,
  };
}