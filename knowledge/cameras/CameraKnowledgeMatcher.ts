import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import type {
  BuyerWarning,
  KnowledgeFact,
  ProductBrainKnowledge,
} from "@/knowledge/guides/factory/knowledge";

import {
  getCameraKnowledgeDatabase,
} from "./CameraKnowledgeDatabase";

export interface CameraKnowledgeMatch {
  knowledge:
    ProductBrainKnowledge;

  matchedBuyerProfiles:
    string[];

  diagnostics: {
    topicTokens:
      string[];

    matchedFacts:
      number;

    matchedTradeOffs:
      number;

    matchedMistakes:
      number;

    matchedTerminology:
      number;
  };
}
interface ScoredValue<T> {
  value: T;

  score: number;
}

const STOP_WORDS =
  new Set([
    "a",
    "an",
    "and",
    "are",
    "at",
    "best",
    "buying",
    "camera",
    "cameras",
    "for",
    "guide",
    "how",
    "in",
    "is",
    "of",
    "or",
    "the",
    "to",
    "under",
    "vs",
    "what",
    "which",
    "with",
  ]);

function normalise(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9£]+/g, " ")
    .replace(/\s+/g, " ");
}

function createTokens(
  values: Array<
    string | undefined
  >,
): string[] {
  return Array.from(
    new Set(
      values
        .filter(
          (
            value,
          ): value is string =>
            Boolean(
              value?.trim(),
            ),
        )
        .flatMap((value) =>
          normalise(
            value,
          ).split(" "),
        )
        .filter(
          (token) =>
            token.length > 1 &&
            !STOP_WORDS.has(
              token,
            ),
        ),
    ),
  );
}

function scoreText(
  value: string,
  tokens: string[],
): number {
  const normalised =
    normalise(
      value,
    );

  return tokens.reduce(
    (
      score,
      token,
    ) =>
      normalised.includes(
        token,
      )
        ? score + 1
        : score,
    0,
  );
}

function scoreKnowledgeFact(
  fact: KnowledgeFact,
  tokens: string[],
): number {
  return (
    scoreText(
      fact.title,
      tokens,
    ) *
      3 +
    scoreText(
      fact.explanation,
      tokens,
    ) +
    fact.confidence
  );
}

function scoreBuyerWarning(
  warning: BuyerWarning,
  tokens: string[],
): number {
  return (
    scoreText(
      warning.title,
      tokens,
    ) *
      3 +
    scoreText(
      warning.explanation,
      tokens,
    )
  );
}

function takeBest<T>(
  values:
    ScoredValue<T>[],
  limit: number,
  minimumScore = 1,
): T[] {
  return values
    .filter(
      (item) =>
        item.score >=
        minimumScore,
    )
    .sort(
      (a, b) =>
        b.score -
        a.score,
    )
    .slice(
      0,
      limit,
    )
    .map(
      (item) =>
        item.value,
    );
}

function createFallbackFacts(
  facts:
    KnowledgeFact[],
  limit: number,
): KnowledgeFact[] {
  return [...facts]
    .sort(
      (a, b) =>
        b.confidence -
        a.confidence,
    )
    .slice(
      0,
      limit,
    );
}

function matchFacts(
  facts:
    KnowledgeFact[],
  tokens: string[],
  limit: number,
): KnowledgeFact[] {
  const matches =
    takeBest(
      facts.map(
        (fact) => ({
          value:
            fact,

          score:
            scoreKnowledgeFact(
              fact,
              tokens,
            ),
        }),
      ),
      limit,
    );

  return matches.length > 0
    ? matches
    : createFallbackFacts(
        facts,
        limit,
      );
}

function matchWarnings(
  warnings:
    BuyerWarning[],
  tokens: string[],
  limit: number,
): BuyerWarning[] {
  const matches =
    takeBest(
      warnings.map(
        (warning) => ({
          value:
            warning,

          score:
            scoreBuyerWarning(
              warning,
              tokens,
            ),
        }),
      ),
      limit,
    );

  return matches.length > 0
    ? matches
    : warnings.slice(
        0,
        limit,
      );
}

function matchTerminology(
  terminology:
    string[],
  tokens: string[],
  limit: number,
): string[] {
  const matches =
    takeBest(
      terminology.map(
        (term) => ({
          value:
            term,

          score:
            scoreText(
              term,
              tokens,
            ),
        }),
      ),
      limit,
    );

  return matches.length > 0
    ? matches
    : terminology.slice(
        0,
        limit,
      );
}

function matchBuyerProfiles(
  profiles:
    string[],
  tokens: string[],
  audience?: string,
): string[] {
  const audienceTokens =
    createTokens([
      audience,
    ]);

  const combinedTokens =
    Array.from(
      new Set([
        ...tokens,
        ...audienceTokens,
      ]),
    );

  const matches =
    takeBest(
      profiles.map(
        (profile) => ({
          value:
            profile,

          score:
            scoreText(
              profile,
              combinedTokens,
            ),
        }),
      ),
      4,
    );

  if (
    audience?.trim()
  ) {
    return Array.from(
      new Set([
        audience.trim(),
        ...matches,
      ]),
    );
  }

  return matches;
}

export function matchCameraKnowledge(
  blueprint: GuideBlueprint,
): CameraKnowledgeMatch {
  const database =
    getCameraKnowledgeDatabase();

  const tokens =
    createTokens([
      blueprint.title,
      blueprint.topic,
      blueprint.primaryKeyword,
      ...(
        blueprint.secondaryKeywords ??
        []
      ),
      blueprint.audience,
      blueprint.recommendationTopic,
      blueprint.type,
    ]);

const keyFacts =
  matchFacts(
    database.knowledge
      .keyFacts,
    tokens,
    12,
  );

const tradeOffs =
  matchFacts(
    database.knowledge
      .tradeOffs,
    tokens,
    8,
  );

const commonMistakes =
  matchWarnings(
    database.knowledge
      .commonMistakes,
    tokens,
    6,
  );

  const terminology =
    matchTerminology(
      database.knowledge
        .terminology,
      tokens,
      8,
    );

  const matchedBuyerProfiles =
  matchBuyerProfiles(
    database.knowledge
      .buyerProfiles,
    tokens,
    blueprint.audience,
  );

return {
  knowledge: {
    products: [
      ...database.knowledge
        .products,
    ],

    keyFacts,

    tradeOffs,

    commonMistakes,

    terminology,

    buyerProfiles: [
      ...matchedBuyerProfiles,
    ],
  },

  matchedBuyerProfiles,

  diagnostics: {
    topicTokens:
      tokens,

    matchedFacts:
      keyFacts.length,

    matchedTradeOffs:
      tradeOffs.length,

    matchedMistakes:
      commonMistakes.length,

    matchedTerminology:
      terminology.length,
  },
};
}