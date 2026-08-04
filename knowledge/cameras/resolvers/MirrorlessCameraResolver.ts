import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import type {
  ProductBrainKnowledge,
} from "@/knowledge/guides/factory/knowledge";

import type {
  CameraKnowledgeDatabase,
} from "../CameraKnowledgeDatabase";

import {
  BeginnerPack,
  BudgetUnder500Pack,
  KnowledgeModuleBuilder,
  MirrorlessPack,
} from "../packs/index.js";

import type {
  CameraKnowledgeResolver,
} from "./CameraKnowledgeResolver";

function mergeKnowledge(
  base:
    ProductBrainKnowledge,
  additional:
    ProductBrainKnowledge,
): ProductBrainKnowledge {
  return {
    products: [
      ...base.products,
      ...additional.products,
    ],

    keyFacts: [
      ...base.keyFacts,
      ...additional.keyFacts,
    ],

    tradeOffs: [
      ...base.tradeOffs,
      ...additional.tradeOffs,
    ],

    commonMistakes: [
      ...base.commonMistakes,
      ...additional.commonMistakes,
    ],

    terminology: [
      ...base.terminology,
      ...additional.terminology,
    ],

    buyerProfiles: [
      ...base.buyerProfiles,
      ...additional.buyerProfiles,
    ],
  };
}

function isUnderFiveHundred(
  blueprint:
    GuideBlueprint,
): boolean {
  const searchableText = [
    blueprint.title,
    blueprint.topic,
    blueprint.primaryKeyword,
    ...(
      blueprint.secondaryKeywords ??
      []
    ),
  ]
    .join(" ")
    .toLowerCase();

  return (
    searchableText.includes(
      "under £500",
    ) ||
    searchableText.includes(
      "under 500",
    ) ||
    searchableText.includes(
      "below £500",
    ) ||
    searchableText.includes(
      "below 500",
    )
  );
}

function isBeginnerGuide(
  blueprint:
    GuideBlueprint,
): boolean {
  const searchableText = [
    blueprint.title,
    blueprint.topic,
    blueprint.audience,
    blueprint.recommendationTopic,
    blueprint.primaryKeyword,
    ...(
      blueprint.secondaryKeywords ??
      []
    ),
  ]
    .filter(
      (
        value,
      ): value is string =>
        Boolean(
          value?.trim(),
        ),
    )
    .join(" ")
    .toLowerCase();

  return (
    searchableText.includes(
      "beginner",
    ) ||
    searchableText.includes(
      "first camera",
    ) ||
    searchableText.includes(
      "first-time",
    ) ||
    searchableText.includes(
      "entry-level",
    ) ||
    searchableText.includes(
      "budget-conscious",
    )
  );
}

export class MirrorlessCameraResolver
  implements CameraKnowledgeResolver {
  readonly id =
    "mirrorless";

  private readonly moduleBuilder =
    new KnowledgeModuleBuilder();

  supports(
    blueprint:
      GuideBlueprint,
  ): boolean {
    return (
      blueprint.topic
        .toLowerCase()
        .includes(
          "mirrorless",
        ) ||
      blueprint.primaryKeyword
        .toLowerCase()
        .includes(
          "mirrorless",
        )
    );
  }

  resolve(
    blueprint:
      GuideBlueprint,
    database:
      CameraKnowledgeDatabase,
  ): ProductBrainKnowledge {
    const packs = [
      new MirrorlessPack(),

      ...(isUnderFiveHundred(
        blueprint,
      )
        ? [
            new BudgetUnder500Pack(),
          ]
        : []),

      ...(isBeginnerGuide(
        blueprint,
      )
        ? [
            new BeginnerPack(),
          ]
        : []),
    ];

    const packedKnowledge =
      this.moduleBuilder.build(
        packs,
      );

    return mergeKnowledge(
      database.knowledge,
      packedKnowledge,
    );
  }
}