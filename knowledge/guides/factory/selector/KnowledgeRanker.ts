import type {
  BuyerWarning,
  KnowledgeFact,
} from "@/knowledge/guides/factory/knowledge";

export type KnowledgeSection =
  | "INTRODUCTION"
  | "PRIORITIES"
  | "TRADE_OFFS"
  | "MISTAKES"
  | "RECOMMENDATIONS"
  | "VERDICT";

export interface KnowledgeRankingContext {
  topic: string;

  audience?: string;

  section:
    KnowledgeSection;
}

export interface RankedKnowledge<T> {
  value: T;

  score: number;

  reasons: string[];
}

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
        .flatMap(
          (value) =>
            normalise(
              value,
            ).split(" "),
        )
        .filter(
          (token) =>
            token.length > 2,
        ),
    ),
  );
}

function scoreTokenMatches(
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

function scoreSectionTerms(
  value: string,
  section: KnowledgeSection,
): {
  score: number;

  reasons: string[];
} {
  const normalised =
    normalise(
      value,
    );

  const termsBySection:
    Record<
      KnowledgeSection,
      string[]
    > = {
    INTRODUCTION: [
      "budget",
      "beginner",
      "system",
      "lens",
      "cost",
      "handling",
      "value",
    ],

    PRIORITIES: [
      "important",
      "priority",
      "handling",
      "lens",
      "autofocus",
      "comfort",
      "reliability",
    ],

    TRADE_OFFS: [
      "trade off",
      "compromise",
      "versus",
      "vs",
      "battery",
      "size",
      "performance",
      "used",
      "new",
    ],

    MISTAKES: [
      "mistake",
      "ignore",
      "overspend",
      "assuming",
      "forget",
      "alone",
    ],

    RECOMMENDATIONS: [
      "value",
      "suitable",
      "buyer",
      "price",
      "budget",
      "upgrade",
      "recommend",
    ],

    VERDICT: [
      "value",
      "worth",
      "spend",
      "save",
      "choice",
      "decision",
    ],
  };

  const matches =
    termsBySection[
      section
    ].filter(
      (term) =>
        normalised.includes(
          term,
        ),
    );

  return {
    score:
      matches.length * 2,

    reasons:
      matches.map(
        (term) =>
          `Matches ${section.toLowerCase()} term "${term}".`,
      ),
  };
}

export class KnowledgeRanker {
  rankFact(
    fact: KnowledgeFact,
    context: KnowledgeRankingContext,
  ): RankedKnowledge<KnowledgeFact> {
    const reasons:
      string[] = [];

    let score =
      fact.confidence * 10;

    reasons.push(
      `Confidence contributed ${(fact.confidence * 10).toFixed(1)} points.`,
    );

    const topicTokens =
      createTokens([
        context.topic,
        context.audience,
      ]);

    const titleMatches =
      scoreTokenMatches(
        fact.title,
        topicTokens,
      );

    const explanationMatches =
      scoreTokenMatches(
        fact.explanation,
        topicTokens,
      );

    if (titleMatches > 0) {
      const contribution =
        titleMatches * 3;

      score +=
        contribution;

      reasons.push(
        `Title matched ${titleMatches} context token(s), adding ${contribution} points.`,
      );
    }

    if (
      explanationMatches > 0
    ) {
      score +=
        explanationMatches;

      reasons.push(
        `Explanation matched ${explanationMatches} context token(s).`,
      );
    }

    const sectionScore =
      scoreSectionTerms(
        `${fact.title} ${fact.explanation}`,
        context.section,
      );

    score +=
      sectionScore.score;

    reasons.push(
      ...sectionScore.reasons,
    );

    return {
      value:
        fact,

      score,

      reasons,
    };
  }

  rankWarning(
    warning: BuyerWarning,
    context: KnowledgeRankingContext,
  ): RankedKnowledge<BuyerWarning> {
    const reasons:
      string[] = [];

    let score = 0;

    const tokens =
      createTokens([
        context.topic,
        context.audience,
      ]);

    const titleMatches =
      scoreTokenMatches(
        warning.title,
        tokens,
      );

    const explanationMatches =
      scoreTokenMatches(
        warning.explanation,
        tokens,
      );

    score +=
      titleMatches * 3;

    score +=
      explanationMatches;

    if (titleMatches > 0) {
      reasons.push(
        `Warning title matched ${titleMatches} context token(s).`,
      );
    }

    if (
      explanationMatches > 0
    ) {
      reasons.push(
        `Warning explanation matched ${explanationMatches} context token(s).`,
      );
    }

    const sectionScore =
      scoreSectionTerms(
        `${warning.title} ${warning.explanation}`,
        context.section,
      );

    score +=
      sectionScore.score;

    reasons.push(
      ...sectionScore.reasons,
    );

    return {
      value:
        warning,

      score,

      reasons,
    };
  }

  rankFacts(
    facts: KnowledgeFact[],
    context: KnowledgeRankingContext,
  ): RankedKnowledge<KnowledgeFact>[] {
    return facts
      .map(
        (fact) =>
          this.rankFact(
            fact,
            context,
          ),
      )
      .sort(
        (a, b) =>
          b.score -
          a.score,
      );
  }

  rankWarnings(
    warnings: BuyerWarning[],
    context: KnowledgeRankingContext,
  ): RankedKnowledge<BuyerWarning>[] {
    return warnings
      .map(
        (warning) =>
          this.rankWarning(
            warning,
            context,
          ),
      )
      .sort(
        (a, b) =>
          b.score -
          a.score,
      );
  }
}