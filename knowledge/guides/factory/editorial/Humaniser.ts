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
      if (
        !pattern.test(
          currentValue,
        )
      ) {
        return currentValue;
      }

      pattern.lastIndex = 0;

      changes.push(
        `Replaced robotic wording matching ${pattern}.`,
      );

      return currentValue.replace(
        pattern,
        replacement,
      );
    },
    value,
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
    .trim();
}

function applyNaturalContractions(
  value: string,
  changes: string[],
): string {
  const replacements: Array<
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

  return replacements.reduce(
    (
      currentValue,
      [
        pattern,
        replacement,
      ],
    ) => {
      if (
        !pattern.test(
          currentValue,
        )
      ) {
        return currentValue;
      }

      pattern.lastIndex = 0;

      changes.push(
        `Used a natural contraction matching ${pattern}.`,
      );

      return currentValue.replace(
        pattern,
        replacement,
      );
    },
    value,
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

  const currentFirstWord =
    value
      .split(/\s+/)[0]
      ?.toLowerCase();

  const previousFirstWord =
    previousParagraph
      .replace(
        BLINLX_EDITORIAL_MARKER,
        "",
      )
      .trim()
      .split(/\s+/)[0]
      ?.toLowerCase();

  if (
    !currentFirstWord ||
    currentFirstWord !==
      previousFirstWord
  ) {
    return value;
  }

  changes.push(
    "Varied a repeated paragraph opening.",
  );

  return `For most buyers, ${value
    .charAt(0)
    .toLowerCase()}${value.slice(
    1,
  )}`;
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
    reduceRepeatedOpening(
      humanised,
      previousParagraph,
      changes,
    );

  humanised =
    cleanSpacing(
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
  return paragraphs.map(
    (
      paragraph,
      index,
    ) =>
      humaniseParagraph({
        value:
          paragraph,

        previousParagraph:
          index > 0
            ? paragraphs[
                index - 1
              ]
            : undefined,
      }),
  );
}