import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

import type {
  RelationshipScoreResult,
  RelationshipScoringOptions,
} from "./RelationshipTypes";

const GENERIC_KEYWORDS =
  new Set([
    "buying guide",
    "guide",
    "best",
    "2026",
    "blinlx",
  ]);

function normaliseText(
  value?: string | null,
): string {
  return (
    value
      ?.trim()
      .toLowerCase() ?? ""
  );
}

function normaliseKeyword(
  value: string,
): string {
  return normaliseText(value)
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/\s+/g, " ");
}

function getUsefulKeywords(
  guide: BuyingGuide,
): string[] {
  const keywords =
    guide.seo.keywords ?? [];

  return Array.from(
    new Set(
      keywords
        .map(normaliseKeyword)
        .filter(Boolean)
        .filter(
          (keyword) =>
            !GENERIC_KEYWORDS.has(
              keyword,
            ),
        ),
    ),
  );
}

function getTitleWords(
  title: string,
): Set<string> {
  const ignoredWords =
    new Set([
      "the",
      "a",
      "an",
      "and",
      "or",
      "vs",
      "which",
      "should",
      "you",
      "buy",
      "guide",
      "in",
      "for",
      "to",
      "of",
      "2026",
    ]);

  return new Set(
    normaliseText(title)
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .map((word) =>
        word.trim(),
      )
      .filter(
        (word) =>
          word.length >= 3 &&
          !ignoredWords.has(word),
      ),
  );
}

function countSharedValues(
  first: string[],
  second: string[],
): number {
  const secondValues =
    new Set(second);

  return first.filter(
    (value) =>
      secondValues.has(value),
  ).length;
}

function countSharedTitleWords(
  firstTitle: string,
  secondTitle: string,
): number {
  const firstWords =
    getTitleWords(firstTitle);

  const secondWords =
    getTitleWords(secondTitle);

  let sharedCount = 0;

  firstWords.forEach((word) => {
    if (
      secondWords.has(word)
    ) {
      sharedCount += 1;
    }
  });

  return sharedCount;
}

export function scoreGuideRelationship(
  currentGuide: BuyingGuide,
  candidateGuide: BuyingGuide,
  options:
    RelationshipScoringOptions = {},
): RelationshipScoreResult {
  const reasons:
    string[] = [];

  const currentCategory =
    normaliseText(
      currentGuide.category,
    );

  const candidateCategory =
    normaliseText(
      candidateGuide.category,
    );

  const currentTopic =
    normaliseText(
      currentGuide.topic,
    );

  const candidateTopic =
    normaliseText(
      candidateGuide.topic,
    );

  const sameCategory =
    currentCategory &&
    currentCategory ===
      candidateCategory
      ? 40
      : 0;

  if (sameCategory > 0) {
    reasons.push(
      "Same guide category.",
    );
  }

  const sameTopic =
    currentTopic &&
    candidateTopic &&
    currentTopic ===
      candidateTopic
      ? 30
      : 0;

  if (sameTopic > 0) {
    reasons.push(
      "Same guide topic.",
    );
  }

  const currentKeywords =
    getUsefulKeywords(
      currentGuide,
    );

  const candidateKeywords =
    getUsefulKeywords(
      candidateGuide,
    );

  const sharedKeywordCount =
    countSharedValues(
      currentKeywords,
      candidateKeywords,
    );

  const sharedKeywords =
    Math.min(
      sharedKeywordCount * 8,
      32,
    );

  if (
    sharedKeywordCount > 0
  ) {
    reasons.push(
      `Shared ${sharedKeywordCount} useful SEO keyword${
        sharedKeywordCount === 1
          ? ""
          : "s"
      }.`,
    );
  }

  const sharedTitleWordCount =
    countSharedTitleWords(
      currentGuide.title,
      candidateGuide.title,
    );

  const titleOverlap =
    Math.min(
      sharedTitleWordCount * 4,
      16,
    );

  if (
    sharedTitleWordCount > 0
  ) {
    reasons.push(
      `Shared ${sharedTitleWordCount} meaningful title word${
        sharedTitleWordCount === 1
          ? ""
          : "s"
      }.`,
    );
  }

  const manualBoost =
    Math.max(
      0,
      options.manualBoost ?? 0,
    );

  if (manualBoost > 0) {
    reasons.push(
      `Manual relationship boost: ${manualBoost}.`,
    );
  }

  const score =
    sameCategory +
    sameTopic +
    sharedKeywords +
    titleOverlap +
    manualBoost;

  return {
    score,

    reasons,

    breakdown: {
      sameCategory,
      sameTopic,
      sharedKeywords,
      titleOverlap,
      manualBoost,
    },
  };
}