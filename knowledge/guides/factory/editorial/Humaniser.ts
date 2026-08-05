import {
  BLINLX_EDITORIAL_MARKER,
  containsForbiddenEditorialPhrase,
} from "@/knowledge/guides/factory/writer";

export interface HumaniseParagraphInput {
  value: string;

  previousParagraph?: string;

  preserveDraftMarker?: boolean;
}

export interface HumanisedParagraph {
  value: string;

  changes: string[];

  forbiddenPhrase:
    string | null;
}

const PHRASE_REPLACEMENTS: Array<
  [RegExp, string]
> = [
  [
    /\bit is important to note that\b/gi,
    "",
  ],
  [
    /\bit is worth noting that\b/gi,
    "",
  ],
  [
    /\bin order to\b/gi,
    "to",
  ],
  [
    /\bdue to the fact that\b/gi,
    "because",
  ],
  [
    /\ba wide range of\b/gi,
    "plenty of",
  ],
  [
    /\butilise\b/gi,
    "use",
  ],
  [
    /\bconsumers\b/gi,
    "buyers",
  ],
  [
    /\bindividuals\b/gi,
    "people",
  ],
  [
    /\bpurchase decision\b/gi,
    "buying decision",
  ],
  [
    /\bprior to\b/gi,
    "before",
  ],
];

const CONTRACTIONS: Array<
  [RegExp, string]
> = [
  [
    /\bdo not\b/gi,
    "don't",
  ],
  [
    /\bdoes not\b/gi,
    "doesn't",
  ],
  [
    /\bcannot\b/gi,
    "can't",
  ],
  [
    /\bwill not\b/gi,
    "won't",
  ],
  [
    /\byou are\b/gi,
    "you're",
  ],
  [
    /\bit is\b/gi,
    "it's",
  ],
];

const REPEATED_OPENING_TRANSITIONS = [
  "In practice",
  "More importantly",
  "For everyday use",
  "The other thing to consider",
  "That matters because",
] as const;

function extractDraftMarker(
  value: string,
): {
  marker: string;
  body: string;
} {
  const trimmed =
    value.trim();

  if (
    trimmed.startsWith(
      BLINLX_EDITORIAL_MARKER,
    )
  ) {
    return {
      marker:
        BLINLX_EDITORIAL_MARKER,

      body:
        trimmed
          .slice(
            BLINLX_EDITORIAL_MARKER
              .length,
          )
          .trim(),
    };
  }

  return {
    marker:
      "",

    body:
      trimmed,
  };
}

function applyPhraseReplacements(
  value: string,
  changes: string[],
): string {
  return PHRASE_REPLACEMENTS.reduce(
    (
      currentValue,
      [
        pattern,
        replacement,
      ],
    ) => {
      const updatedValue =
        currentValue.replace(
          pattern,
          replacement,
        );

      if (
        updatedValue ===
        currentValue
      ) {
        return currentValue;
      }

      changes.push(
        `Replaced robotic wording matching ${pattern}.`,
      );

      return updatedValue;
    },
    value,
  );
}

function rewriteRoboticOpening(
  value: string,
  changes: string[],
): string {
  let rewritten =
    value;

  rewritten =
    rewritten.replace(
      /^The important question with .*? is not which option has the longest specification list\.\s*Whether\s+/i,
      () => {
        changes.push(
          "Rewrote a mechanical specification-list opening.",
        );

        return "The real question is whether ";
      },
    );

  rewritten =
    rewritten.replace(
      /^The practical value of (.+?) depends on how well the available options match the buyer's normal use, not on which product produces the most impressive specification sheet\./i,
      (
        _match,
        topic: string,
      ) => {
        changes.push(
          "Rewrote a repeated practical-value opening.",
        );

        return `What matters is how well ${topic.trim()} fits the way you'll actually use it, not how impressive it looks on a specification sheet.`;
      },
    );

  rewritten =
    rewritten.replace(
      /^The important question is not which option has the longest specification list\.\s*/i,
      () => {
        changes.push(
          "Removed a generic specification-list opening.",
        );

        return "";
      },
    );

  rewritten =
    rewritten.replace(
      /^The decision becomes much easier once the buyer separates essential requirements from features that are merely attractive on paper\.\s*/i,
      () => {
        changes.push(
          "Removed a repeated decision-making phrase.",
        );

        return "";
      },
    );

  return rewritten;
}

function preserveReplacementCase(
  match: string,
  replacement: string,
): string {
  const beginsWithUppercase =
    match.charAt(0) ===
    match.charAt(0)
      .toUpperCase();

  if (
    !beginsWithUppercase
  ) {
    return replacement;
  }

  return (
    replacement.charAt(0)
      .toUpperCase() +
    replacement.slice(1)
  );
}

function applyNaturalContractions(
  value: string,
  changes: string[],
): string {
  return CONTRACTIONS.reduce(
    (
      currentValue,
      [
        pattern,
        replacement,
      ],
    ) => {
      let replacementMade =
        false;

      const updatedValue =
        currentValue.replace(
          pattern,
          (match) => {
            replacementMade =
              true;

            return preserveReplacementCase(
              match,
              replacement,
            );
          },
        );

      if (
        replacementMade
      ) {
        changes.push(
          `Used natural wording matching ${pattern}.`,
        );
      }

      return updatedValue;
    },
    value,
  );
}

function normaliseForComparison(
  value: string,
): string {
  return value
    .replace(
      BLINLX_EDITORIAL_MARKER,
      "",
    )
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
}

function getOpeningWords(
  value: string,
  count = 4,
): string {
  return normaliseForComparison(
    value,
  )
    .split(
      " ",
    )
    .slice(
      0,
      count,
    )
    .join(
      " ",
    );
}

function createStableIndex(
  value: string,
  length: number,
): number {
  let total =
    0;

  for (
    let index = 0;
    index < value.length;
    index += 1
  ) {
    total +=
      value.charCodeAt(
        index,
      );
  }

  return total %
    length;
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

function reduceRepeatedOpening(
  value: string,
  previousParagraph:
    string | undefined,
  changes: string[],
): string {
  if (
    !previousParagraph
  ) {
    return value;
  }

  const currentOpening =
    getOpeningWords(
      value,
    );

  const previousOpening =
    getOpeningWords(
      previousParagraph,
    );

  if (
    !currentOpening ||
    currentOpening !==
      previousOpening
  ) {
    return value;
  }

  const transitionIndex =
    createStableIndex(
      value,
      REPEATED_OPENING_TRANSITIONS
        .length,
    );

  const transition =
    REPEATED_OPENING_TRANSITIONS[
      transitionIndex
    ];

  changes.push(
    "Varied a repeated multi-word paragraph opening.",
  );

  return `${transition}, ${lowerFirst(
    value,
  )}`;
}

function removeRepeatedSentence(
  value: string,
  previousParagraph:
    string | undefined,
  changes: string[],
): string {
  if (
    !previousParagraph
  ) {
    return value;
  }

  const previousSentences =
    new Set(
      previousParagraph
        .split(
          /(?<=[.!?])\s+/,
        )
        .map(
          normaliseForComparison,
        )
        .filter(Boolean),
    );

  const sentences =
    value
      .split(
        /(?<=[.!?])\s+/,
      )
      .filter(
        (sentence) => {
          const normalised =
            normaliseForComparison(
              sentence,
            );

          return (
            normalised &&
            !previousSentences.has(
              normalised,
            )
          );
        },
      );

  if (
    sentences.length ===
    value
      .split(
        /(?<=[.!?])\s+/,
      )
      .length
  ) {
    return value;
  }

  changes.push(
    "Removed a sentence repeated from the previous paragraph.",
  );

  return sentences.join(
    " ",
  );
}

function cleanSpacing(
  value: string,
): string {
  return value
    .replace(
      /\s+/g,
      " ",
    )
    .replace(
      /\s+([,.!?;:])/g,
      "$1",
    )
    .replace(
      /([.!?])([A-Z])/g,
      "$1 $2",
    )
    .trim();
}

function ensureSentenceCase(
  value: string,
): string {
  if (!value) {
    return value;
  }

  return (
    value.charAt(0)
      .toUpperCase() +
    value.slice(1)
  );
}

export function humaniseParagraph({
  value,
  previousParagraph,
  preserveDraftMarker =
    true,
}: HumaniseParagraphInput):
  HumanisedParagraph {
  const changes:
    string[] = [];

  const {
    marker,
    body,
  } =
    extractDraftMarker(
      value,
    );

  let humanised =
    body;

  humanised =
    rewriteRoboticOpening(
      humanised,
      changes,
    );

  humanised =
    applyPhraseReplacements(
      humanised,
      changes,
    );

  humanised =
    applyNaturalContractions(
      humanised,
      changes,
    );

  humanised =
    removeRepeatedSentence(
      humanised,
      previousParagraph,
      changes,
    );

  humanised =
    reduceRepeatedOpening(
      humanised,
      previousParagraph,
      changes,
    );

  humanised =
    cleanSpacing(
      humanised,
    );

  humanised =
    ensureSentenceCase(
      humanised,
    );

  const forbiddenPhrase =
    containsForbiddenEditorialPhrase(
      humanised,
    );

  const outputMarker =
    preserveDraftMarker &&
    marker
      ? `${marker} `
      : "";

  return {
    value:
      `${outputMarker}${humanised}`,

    changes,

    forbiddenPhrase,
  };
}

export function humaniseParagraphs(
  paragraphs: string[],
): HumanisedParagraph[] {
  const results:
    HumanisedParagraph[] = [];

  paragraphs.forEach(
    (paragraph) => {
      const previousParagraph =
        results[
          results.length - 1
        ]?.value;

      results.push(
        humaniseParagraph({
          value:
            paragraph,

          previousParagraph,
        }),
      );
    },
  );

  return results;
}