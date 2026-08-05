import type {
  KnowledgeContext,
  KnowledgeFact,
  ProductIntelligenceContextEntry,
  ProductRecommendation,
} from "@/knowledge/guides/factory/knowledge/KnowledgeContext";

import type {
  EditorialEvidence,
  EditorialEvidenceItem,
  EditorialSectionKind,
} from "./EditorialTypes";

function normalise(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /\s+/g,
      " ",
    );
}

function normaliseId(
  value: string,
): string {
  return normalise(
    value,
  )
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
const GENERIC_TOPIC_WORDS =
  new Set([
    "a",
    "an",
    "and",
    "best",
    "buy",
    "buying",
    "choose",
    "choosing",
    "first",
    "for",
    "guide",
    "how",
    "of",
    "the",
    "to",
    "your",
  ]);

function getTopicKeywords(
  context:
    KnowledgeContext,
): string[] {
  return normalise(
    [
      context.topic,
      context.category,
    ].join(
      " ",
    ),
  )
    .split(
      /[^a-z0-9]+/,
    )
    .filter(
      (word) =>
        word.length > 2 &&
        !GENERIC_TOPIC_WORDS.has(
          word,
        ),
    );
}

function evidenceMatchesTopic(
  title: string,
  explanation: string,
  context:
    KnowledgeContext,
): boolean {
  const topic =
    normalise(
      context.topic,
    );

  const text =
    normalise(
      [
        title,
        explanation,
      ].join(
        " ",
      ),
    );

  const lensTerms = [
    "lens",
    "lenses",
    "focal length",
    "aperture",
    "prime",
    "zoom",
    "telephoto",
    "wide angle",
    "wide-angle",
    "macro",
    "mount",
    "crop factor",
  ];

  const cameraBodyTerms = [
    "camera body",
    "camera bodies",
    "megapixel",
    "sensor",
    "viewfinder",
    "grip",
    "body stabilisation",
    "in-body stabilisation",
    "ibis",
  ];

  if (
    topic.includes(
      "lens",
    )
  ) {
    const containsLensEvidence =
      lensTerms.some(
        (term) =>
          text.includes(
            term,
          ),
      );

    if (
      !containsLensEvidence
    ) {
      return false;
    }

    const onlyLooksLikeBodyEvidence =
      cameraBodyTerms.some(
        (term) =>
          text.includes(
            term,
          ),
      ) &&
      !text.includes(
        "lens",
      ) &&
      !text.includes(
        "mount",
      );

    return !onlyLooksLikeBodyEvidence;
  }

  const topicKeywords =
    getTopicKeywords(
      context,
    );

  if (
    topicKeywords.length ===
    0
  ) {
    return true;
  }

  return topicKeywords.some(
    (keyword) =>
      text.includes(
        keyword,
      ),
  );
}

function roleMatchesSection(
  role:
    EditorialEvidenceItem["role"],

  sectionKind:
    EditorialSectionKind,
): boolean {
  const allowedSections:
    Record<
      EditorialEvidenceItem["role"],
      EditorialSectionKind[]
    > = {
    GENERAL: [
      "INTRODUCTION",
      "NEED",
      "AUDIENCE",
      "PRIORITIES",
      "BUDGET",
      "COMPROMISES",
      "BEST_VALUE",
      "BUYING_USED",
      "MISTAKES",
      "RECOMMENDATIONS",
      "ALTERNATIVES",
      "CHECKLIST",
      "VERDICT",
    ],

    AUDIENCE: [
      "AUDIENCE",
      "RECOMMENDATIONS",
      "VERDICT",
    ],

    COMPATIBILITY: [
      "PRIORITIES",
      "CHECKLIST",
    ],

    UPGRADE: [
      "ALTERNATIVES",
      "BEST_VALUE",
      "VERDICT",
    ],

    ACCESSORY: [
      "BUDGET",
      "CHECKLIST",
    ],

    ALTERNATIVE: [
      "ALTERNATIVES",
      "RECOMMENDATIONS",
      "VERDICT",
    ],

    VALUE: [
      "BUDGET",
      "BEST_VALUE",
      "BUYING_USED",
      "RECOMMENDATIONS",
      "VERDICT",
    ],

    RECOMMENDATION: [
      "RECOMMENDATIONS",
      "VERDICT",
    ],

    BUYING_ADVICE: [
      "NEED",
      "MISTAKES",
      "CHECKLIST",
      "VERDICT",
    ],
  };

  return allowedSections[
    role
  ].includes(
    sectionKind,
  );
}

function evidenceMatchesSection(
  item:
    EditorialEvidenceItem,

  sectionKind:
    EditorialSectionKind,
): boolean {
  if (
    !roleMatchesSection(
      item.role,
      sectionKind,
    )
  ) {
    return false;
  }

  const text =
    normalise(
      [
        item.title,
        item.explanation,
      ].join(
        " ",
      ),
    );

  const keywordsBySection:
    Record<
      EditorialSectionKind,
      string[]
    > = {
    INTRODUCTION: [
      "lens",
      "mount",
      "system",
      "cost",
      "photography",
      "result",
    ],

    NEED: [
      "limitation",
      "kit lens",
      "low light",
      "background blur",
      "focal length",
      "current setup",
      "upgrade",
      "need",
    ],

    AUDIENCE: [
      "beginner",
      "portrait",
      "street",
      "travel",
      "wildlife",
      "landscape",
      "family",
      "best for",
      "suitable",
    ],

    PRIORITIES: [
      "focal length",
      "aperture",
      "mount",
      "compatibility",
      "stabilisation",
      "autofocus",
      "weight",
      "size",
      "prime",
      "zoom",
    ],

    BUDGET: [
      "cost",
      "price",
      "budget",
      "value",
      "used",
      "accessory",
      "ownership",
      "expensive",
      "spend",
    ],

    COMPROMISES: [
      "trade-off",
      "compromise",
      "sacrifice",
      "weight",
      "size",
      "aperture",
      "zoom",
      "prime",
    ],

    BEST_VALUE: [
      "value",
      "price",
      "cost",
      "budget",
      "worth",
    ],

    BUYING_USED: [
      "used",
      "condition",
      "warranty",
      "seller",
      "damage",
      "wear",
    ],

    MISTAKES: [
      "mistake",
      "wrong",
      "avoid",
      "compatibility",
      "mount",
      "overspend",
      "megapixel",
    ],

    RECOMMENDATIONS: [
      "best for",
      "recommend",
      "suitable",
      "strength",
      "weakness",
    ],

    ALTERNATIVES: [
      "alternative",
      "used",
      "older",
      "prime",
      "zoom",
      "kit lens",
      "different",
    ],

    CHECKLIST: [
      "check",
      "mount",
      "compatibility",
      "condition",
      "warranty",
      "cost",
      "accessory",
      "return",
    ],

    VERDICT: [
      "recommend",
      "best",
      "value",
      "worth",
    ],
  };

  const keywords =
    keywordsBySection[
      sectionKind
    ];

  return keywords.some(
    (keyword) =>
      text.includes(
        keyword,
      ),
  );
}

function createEvidenceId(
  source:
    EditorialEvidenceItem["source"],

  title:
    string,

  productId?:
    string,
): string {
  return [
    source.toLowerCase(),

    productId
      ? normaliseId(
          productId,
        )
      : undefined,

    normaliseId(
      title,
    ),
  ]
    .filter(
      Boolean,
    )
    .join(
      "-",
    );
}

function clampConfidence(
  value:
    number,
): number {
  const clamped =
    Math.max(
      0,
      Math.min(
        1,
        value,
      ),
    );

  return Math.round(
    clamped * 100,
  ) / 100;
}

function mapFact(
  fact:
    KnowledgeFact,

  source:
    "FACT" |
    "TRADE_OFF",
): EditorialEvidenceItem {
  return {
    id:
      createEvidenceId(
        source,
        fact.title,
      ),

    title:
      fact.title,

    explanation:
      fact.explanation,

    confidence:
      clampConfidence(
        fact.confidence,
      ),

    source,

    role:
      source ===
        "TRADE_OFF"
        ? "GENERAL"
        : "GENERAL",
  };
}

function productMatchesTopic(
  product:
    ProductRecommendation,

  context:
    KnowledgeContext,
): boolean {
  const topic =
    normalise(
      context.topic,
    );

  const category =
    normalise(
      context.category,
    );

  const searchableText =
    normalise(
      [
        product.name,
        product.reason,
        product.buyingAdvice,
        ...(product.bestFor ?? []),
        ...(product.strengths ?? []),
        ...(product.weaknesses ?? []),
      ]
        .filter(
          Boolean,
        )
        .join(
          " ",
        ),
    );

  const productName =
    normalise(
      product.name,
    );

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
    ) ||
    category.includes(
      "photography",
    )
  ) {
    return !looksLikeLens;
  }

  return true;
}

function intelligenceMatchesTopic(
  entry:
    ProductIntelligenceContextEntry,

  context:
    KnowledgeContext,
): boolean {
  const matchingProduct =
    context.products.find(
      (product) => {
        const entrySlug =
          entry.slug
            ? normaliseId(
                entry.slug,
              )
            : "";

        const productSlug =
          product.slug
            ? normaliseId(
                product.slug,
              )
            : "";

        return (
          productSlug ===
            entrySlug ||
          normaliseId(
            product.name,
          ) ===
            normaliseId(
              entry.productName,
            )
        );
      },
    );

  if (!matchingProduct) {
    return false;
  }

  return productMatchesTopic(
    matchingProduct,
    context,
  );
}

function getRelevantIntelligence(
  context:
    KnowledgeContext,
): ProductIntelligenceContextEntry[] {
  return context
    .productIntelligence
    .filter(
      (entry) =>
        intelligenceMatchesTopic(
          entry,
          context,
        ),
    )
    .sort(
      (
        entryA,
        entryB,
      ) =>
        entryB.confidence -
        entryA.confidence,
    );
}

function mapIntelligenceStrengths(
  entries:
    ProductIntelligenceContextEntry[],
): EditorialEvidenceItem[] {
  return entries.flatMap(
    (entry) =>
      entry.intelligence
        .strengths
        .map(
          (strength) => ({
            id:
              createEvidenceId(
                "FACT",
                strength.title,
                entry.productId,
              ),

            title:
              `${entry.productName}: ${strength.title}`,

            explanation:
              strength.explanation,

            confidence:
              clampConfidence(
                Math.min(
                  entry.confidence,
                  strength.importance,
                ),
              ),

            source:
              "FACT" as const,

              role:
  "GENERAL" as const,
          }),
        ),
  );
}

function mapOwnershipEvidence(
  entries:
    ProductIntelligenceContextEntry[],
): EditorialEvidenceItem[] {
  return entries.flatMap(
    (entry) => {
      const hiddenCosts =
        entry.intelligence
          .ownership
          .hiddenCosts
          .map(
            (
              explanation,
              index,
            ) => ({
              id:
                createEvidenceId(
                  "FACT",
                  `Ownership cost ${index + 1}`,
                  entry.productId,
                ),

              title:
                `${entry.productName}: ownership cost`,

              explanation,

              confidence:
                clampConfidence(
                  entry.confidence *
                    0.92,
                ),

              source:
                "FACT" as const,

                role:
  "VALUE" as const,

                
            }),
          );

      const ecosystemNotes =
        entry.intelligence
          .ownership
          .ecosystemNotes
          .map(
            (
              explanation,
              index,
            ) => ({
              id:
                createEvidenceId(
                  "FACT",
                  `Ecosystem note ${index + 1}`,
                  entry.productId,
                ),

              title:
                `${entry.productName}: ecosystem`,

              explanation,

              confidence:
                clampConfidence(
                  entry.confidence *
                    0.9,
                ),

              source:
                "FACT" as const,

                role:
  "COMPATIBILITY" as const,
            }),
          );

      const upgradePath =
        entry.intelligence
          .ownership
          .upgradePath
          .map(
            (
              explanation,
              index,
            ) => ({
              id:
                createEvidenceId(
                  "FACT",
                  `Upgrade path ${index + 1}`,
                  entry.productId,
                ),

              title:
                `${entry.productName}: upgrade path`,

              explanation,

              confidence:
                clampConfidence(
                  entry.confidence *
                    0.88,
                ),

              source:
                "FACT" as const,

                role:
  "UPGRADE" as const,
            }),
          );

      return [
        ...hiddenCosts,
        ...ecosystemNotes,
        ...upgradePath,
      ];
    },
  );
}
function mapRelationshipEvidence(
  entries:
    ProductIntelligenceContextEntry[],
): EditorialEvidenceItem[] {
  return entries.flatMap(
    (entry) => {
      const upgrades =
        entry.intelligence
          .upgrades.map(
            (
              relationship,
              index,
            ) => ({
              id:
                createEvidenceId(
                  "FACT",
                  `Upgrade ${index + 1}`,
                  entry.productId,
                ),

              title:
                `${entry.productName}: upgrade`,

              explanation:
                relationship.reason,

              confidence:
                clampConfidence(
                  entry.confidence *
                    0.95,
                ),

              source:
                "FACT" as const,

                

               role:
  "UPGRADE" as const,

                
            }),
          );

      const accessories =
        entry.intelligence
          .accessories.map(
            (
              relationship,
              index,
            ) => ({
              id:
                createEvidenceId(
                  "FACT",
                  `Accessory ${index + 1}`,
                  entry.productId,
                ),

              title:
                `${entry.productName}: accessory`,

              explanation:
                relationship.reason,

              confidence:
                clampConfidence(
                  entry.confidence *
                    0.93,
                ),

              source:
                "FACT" as const,
                role:
  "ACCESSORY" as const,
            }),
          );

      const compatibility =
        entry.intelligence
          .compatibleProducts.map(
            (
              relationship,
              index,
            ) => ({
              id:
                createEvidenceId(
                  "FACT",
                  `Compatibility ${index + 1}`,
                  entry.productId,
                ),

              title:
                `${entry.productName}: compatibility`,

              explanation:
                relationship.reason,

              confidence:
                clampConfidence(
                  entry.confidence *
                    0.94,
                ),

              source:
                "FACT" as const,
                role:
  "COMPATIBILITY" as const,
            }),
          );

      return [
        ...upgrades,
        ...accessories,
        ...compatibility,
      ];
    },
  );
}

function mapIntelligenceWeaknesses(
  entries:
    ProductIntelligenceContextEntry[],
): EditorialEvidenceItem[] {
  return entries.flatMap(
    (entry) =>
      entry.intelligence
        .weaknesses
        .map(
          (weakness) => ({
            id:
              createEvidenceId(
                "WARNING",
                weakness.title,
                entry.productId,
              ),

            title:
              `${entry.productName}: ${weakness.title}`,

            explanation:
              weakness.explanation,

            confidence:
              clampConfidence(
                Math.min(
                  entry.confidence,
                  weakness.importance,
                ),
              ),

            source:
              "WARNING" as const,
              role:
  "GENERAL" as const,
          }),
        ),
  );
}

function mapBuyingAdviceWarnings(
  entries:
    ProductIntelligenceContextEntry[],
): EditorialEvidenceItem[] {
  return entries.flatMap(
    (entry) =>
      entry.intelligence
        .buyingAdvice
        .avoidIf
        .map(
          (
            explanation,
            index,
          ) => ({
            id:
              createEvidenceId(
                "WARNING",
                `Avoid condition ${index + 1}`,
                entry.productId,
              ),

            title:
              `${entry.productName}: avoid if`,

            explanation,

            confidence:
              clampConfidence(
                entry.confidence *
                  0.94,
              ),

            source:
              "WARNING" as const,
              role:
  "BUYING_ADVICE" as const,
          }),
        ),
  );
}

function mapIntelligenceTradeOffs(
  entries:
    ProductIntelligenceContextEntry[],
): EditorialEvidenceItem[] {
  return entries.flatMap(
    (entry) =>
      entry.intelligence
        .tradeOffs
        .map(
          (
            tradeOff,
            index,
          ) => {
            const audienceText =
              tradeOff.worthItFor
                .length > 0
                ? ` This trade-off is most likely to make sense for ${tradeOff.worthItFor.join(
                    ", ",
                  )}.`
                : "";

            return {
              id:
                createEvidenceId(
                  "TRADE_OFF",
                  `Trade-off ${index + 1}`,
                  entry.productId,
                ),

              title:
                `${entry.productName}: ${tradeOff.gain}`,

              explanation:
                [
                  tradeOff.gain,

                  `The compromise is ${tradeOff.sacrifice
                    .charAt(
                      0,
                    )
                    .toLowerCase()}${tradeOff.sacrifice.slice(
                    1,
                  )}`,

                  audienceText,
                ]
                  .filter(
                    Boolean,
                  )
                  .join(
                    " ",
                  )
                  .trim(),

              confidence:
                clampConfidence(
                  entry.confidence *
                    0.95,
                ),

              source:
                "TRADE_OFF" as const,
                role:
  "GENERAL" as const,
            };
          },
        ),
  );
}

function removeDuplicateEvidence(
  items:
    EditorialEvidenceItem[],
): EditorialEvidenceItem[] {
  const itemsByMeaning =
    new Map<
      string,
      EditorialEvidenceItem
    >();

  items
    .sort(
      (
        itemA,
        itemB,
      ) =>
        itemB.confidence -
        itemA.confidence,
    )
    .forEach(
      (item) => {
        const meaning =
          normalise(
            [
              item.title,
              item.explanation,
            ].join(
              " ",
            ),
          )
            .replace(
              /\bin-body image stabilisation\b/g,
              "ibis",
            )
            .replace(
              /\bin-body stabilisation\b/g,
              "ibis",
            )
            .replace(
              /[^a-z0-9\s]/g,
              "",
            );

        const duplicate =
          Array.from(
            itemsByMeaning.keys(),
          ).some(
            (existingMeaning) =>
              existingMeaning.includes(
                meaning,
              ) ||
              meaning.includes(
                existingMeaning,
              ),
          );

        if (!duplicate) {
          itemsByMeaning.set(
            meaning,
            item,
          );
        }
      },
    );

  return Array.from(
    itemsByMeaning.values(),
  );
}

function selectProducts(
  context:
    KnowledgeContext,

  sectionKind:
    EditorialSectionKind,
): ProductRecommendation[] {
  if (
    sectionKind !==
      "RECOMMENDATIONS" &&
    sectionKind !==
      "VERDICT" &&
    sectionKind !==
      "BEST_VALUE"
  ) {
    return [];
  }

  return context.products
    .filter(
      (product) =>
        productMatchesTopic(
          product,
          context,
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
    );
}

function selectFactsForSection(
  sectionKind:
    EditorialSectionKind,

  intelligenceFacts:
    EditorialEvidenceItem[],

  fallbackFacts:
    EditorialEvidenceItem[],
): EditorialEvidenceItem[] {
  const combined =
    removeDuplicateEvidence([
      ...intelligenceFacts,
      ...fallbackFacts,
    ]);

  const sectionMatches =
    combined.filter(
      (item) =>
        evidenceMatchesSection(
          item,
          sectionKind,
        ),
    );

  return sectionMatches.slice(
    0,
    8,
  );
}

export class EvidenceEngine {
  select(
    context:
      KnowledgeContext,

    sectionKind:
      EditorialSectionKind,
  ): EditorialEvidence {
    const intelligenceEntries =
      getRelevantIntelligence(
        context,
      );

    const intelligenceFacts = [
  ...mapIntelligenceStrengths(
    intelligenceEntries,
  ),

  ...mapOwnershipEvidence(
    intelligenceEntries,
  ),

  ...mapRelationshipEvidence(
    intelligenceEntries,
  ),
];

    const intelligenceTradeOffs =
      mapIntelligenceTradeOffs(
        intelligenceEntries,
      );

    const intelligenceWarnings = [
      ...mapIntelligenceWeaknesses(
        intelligenceEntries,
      ),

      ...mapBuyingAdviceWarnings(
        intelligenceEntries,
      ),
    ];

    const fallbackFacts =
  context.keyFacts
    .filter(
      (fact) =>
        fact.confidence >=
          0.65 &&
        evidenceMatchesTopic(
          fact.title,
          fact.explanation,
          context,
        ),
    )
        .map(
          (fact) =>
            mapFact(
              fact,
              "FACT",
            ),
        );

   const fallbackTradeOffs =
  context.tradeOffs
    .filter(
      (tradeOff) =>
        tradeOff.confidence >=
          0.65 &&
        evidenceMatchesTopic(
          tradeOff.title,
          tradeOff.explanation,
          context,
        ),
    )
    .map(
      (tradeOff) =>
        mapFact(
          tradeOff,
          "TRADE_OFF",
        ),
    );

   const fallbackWarnings =
  context.commonMistakes
    .filter(
      (warning) =>
        evidenceMatchesTopic(
          warning.title,
          warning.explanation,
          context,
        ),
    )
    .map(
      (warning) => ({
        id:
          createEvidenceId(
            "WARNING",
            warning.title,
          ),

        title:
          warning.title,

        explanation:
          warning.explanation,

        confidence:
          0.85,

        source:
  "WARNING" as const,

role:
  "GENERAL" as const,
      }),
    );

    const facts =
      selectFactsForSection(
        sectionKind,
        intelligenceFacts,
        fallbackFacts,
      );

   const tradeOffs =
  removeDuplicateEvidence([
    ...intelligenceTradeOffs,
    ...fallbackTradeOffs,
  ])
    .filter(
      (item) =>
        evidenceMatchesSection(
          item,
          sectionKind,
        ),
    )
    .slice(
      0,
      8,
    );

   const warnings =
  removeDuplicateEvidence([
    ...intelligenceWarnings,
    ...fallbackWarnings,
  ])
    .filter(
      (item) =>
        evidenceMatchesSection(
          item,
          sectionKind,
        ),
    )
    .slice(
      0,
      8,
    );

    return {
      facts,

      tradeOffs,

      warnings,

      products:
        selectProducts(
          context,
          sectionKind,
        ),
    };
  }
}