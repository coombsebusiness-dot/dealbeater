import type {
  EditorialEvidence,
  EditorialParagraph,
  EditorialSectionKind,
} from "./EditorialTypes";

export interface EditorialQualityReport {
  publishable:
    boolean;

  score:
    number;

  issues:
    string[];
}

interface InspectEditorialSectionInput {
  sectionKind:
    EditorialSectionKind;

  introduction:
    string;

  paragraphs:
    EditorialParagraph[];

  takeaway:
    string;

  evidence:
    EditorialEvidence;
}

const forbiddenPatterns = [
  /\bexplain\b/i,
  /\bdescribe\b/i,
  /\bpresent\b/i,
  /\bdiscuss\b/i,
  /\bprovide a short\b/i,
  /\bkeep the explanation\b/i,
  /\bleave the reader\b/i,
  /\bthe guide should\b/i,
  /\bthis section should\b/i,
  /\buse this point\b/i,
  /\bfinish with\b/i,
  /\bopening goal\b/i,
  /\bdesired outcome\b/i,
  /\beditorial draft\b/i,
  /\bblinlx generated draft\b/i,
];

function normaliseText(
  value: string,
): string {
  return value
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

function getAllPublicText(
  introduction: string,
  paragraphs:
    EditorialParagraph[],
  takeaway: string,
): string[] {
  return [
    introduction,
    ...paragraphs.map(
      (paragraph) =>
        paragraph.text,
    ),
    takeaway,
  ]
    .map(
      (value) =>
        value.trim(),
    )
    .filter(
      Boolean,
    );
}

function findForbiddenText(
  publicText: string[],
): string[] {
  const issues:
    string[] = [];

  publicText.forEach(
    (
      text,
      index,
    ) => {
      forbiddenPatterns.forEach(
        (pattern) => {
          if (
            pattern.test(
              text,
            )
          ) {
            issues.push(
              [
                "Possible editorial instruction exposed",
                `at public text item ${index + 1}:`,
                `"${text.slice(
                  0,
                  140,
                )}"`,
              ].join(
                " ",
              ),
            );
          }
        },
      );
    },
  );

  return issues;
}

function findDuplicateText(
  publicText: string[],
): string[] {
  const issues:
    string[] = [];

  const seen =
    new Map<
      string,
      number
    >();

  publicText.forEach(
    (
      text,
      index,
    ) => {
      const normalised =
        normaliseText(
          text,
        );

      if (
        normalised.length < 40
      ) {
        return;
      }

      const previousIndex =
        seen.get(
          normalised,
        );

      if (
        previousIndex !==
        undefined
      ) {
        issues.push(
          [
            "Duplicate public text detected",
            `between items ${previousIndex + 1}`,
            `and ${index + 1}.`,
          ].join(
            " ",
          ),
        );

        return;
      }

      seen.set(
        normalised,
        index,
      );
    },
  );

  return issues;
}

function findRepeatedOpenings(
  paragraphs:
    EditorialParagraph[],
): string[] {
  const issues:
    string[] = [];

  const openings =
    new Map<
      string,
      number
    >();

  paragraphs.forEach(
    (
      paragraph,
      index,
    ) => {
      const opening =
        normaliseText(
          paragraph.text,
        )
          .split(
            " ",
          )
          .slice(
            0,
            8,
          )
          .join(
            " ",
          );

      if (
        opening.length < 20
      ) {
        return;
      }

      const previousIndex =
        openings.get(
          opening,
        );

      if (
        previousIndex !==
        undefined
      ) {
        issues.push(
          [
            "Paragraphs have the same opening",
            `at positions ${previousIndex + 1}`,
            `and ${index + 1}.`,
          ].join(
            " ",
          ),
        );

        return;
      }

      openings.set(
        opening,
        index,
      );
    },
  );

  return issues;
}

function validateStructure(
  sectionKind:
    EditorialSectionKind,
  introduction:
    string,
  paragraphs:
    EditorialParagraph[],
  takeaway:
    string,
): string[] {
  const issues:
    string[] = [];

  if (
    introduction.trim()
      .length < 60
  ) {
    issues.push(
      "Section introduction is too short.",
    );
  }

  if (
    paragraphs.length < 2
  ) {
    issues.push(
      "Section must contain at least two finished paragraphs.",
    );
  }

  paragraphs.forEach(
    (
      paragraph,
      index,
    ) => {
      if (
        paragraph.text.trim()
          .length < 80
      ) {
        issues.push(
          `Paragraph ${index + 1} is too short to provide useful buying advice.`,
        );
      }
    },
  );

  if (
    takeaway.trim()
      .length < 50
  ) {
    issues.push(
      "Section takeaway is too short.",
    );
  }

  if (
    sectionKind ===
      "RECOMMENDATIONS" &&
    !paragraphs.some(
      (paragraph) =>
        paragraph.role ===
        "RECOMMENDATION",
    )
  ) {
    issues.push(
      "Recommendation section contains no supported recommendation.",
    );
  }

  if (
    sectionKind ===
      "VERDICT" &&
    !paragraphs.some(
      (paragraph) =>
        paragraph.role ===
        "VERDICT",
    )
  ) {
    issues.push(
      "Verdict section contains no clear verdict.",
    );
  }

  return issues;
}

function validateEvidence(
  sectionKind:
    EditorialSectionKind,
  paragraphs:
    EditorialParagraph[],
  evidence:
    EditorialEvidence,
): string[] {
  const issues:
    string[] = [];

  const evidenceDrivenParagraphs =
    paragraphs.filter(
      (paragraph) =>
        paragraph.knowledgeUsed
          .length > 0,
    );

  if (
    evidenceDrivenParagraphs
      .length === 0 &&
    sectionKind !==
      "INTRODUCTION"
  ) {
    issues.push(
      "Section does not use any traceable Product Brain knowledge.",
    );
  }

  if (
    (
      sectionKind ===
        "RECOMMENDATIONS" ||
      sectionKind ===
        "VERDICT"
    ) &&
    evidence.products.length ===
      0
  ) {
    issues.push(
      "No topic-matched verified products are available for this section.",
    );
  }

  return issues;
}

function calculateScore(
  issueCount: number,
  paragraphs:
    EditorialParagraph[],
): number {
  const evidenceParagraphs =
    paragraphs.filter(
      (paragraph) =>
        paragraph.knowledgeUsed
          .length > 0,
    ).length;

  const evidenceBonus =
    Math.min(
      15,
      evidenceParagraphs * 3,
    );

  return Math.max(
    0,
    Math.min(
      100,
      100 -
        issueCount * 15 +
        evidenceBonus,
    ),
  );
}

export class QualityEngine {
  inspect({
    sectionKind,
    introduction,
    paragraphs,
    takeaway,
    evidence,
  }: InspectEditorialSectionInput):
    EditorialQualityReport {
    const publicText =
      getAllPublicText(
        introduction,
        paragraphs,
        takeaway,
      );

    const issues = [
      ...validateStructure(
        sectionKind,
        introduction,
        paragraphs,
        takeaway,
      ),

      ...findForbiddenText(
        publicText,
      ),

      ...findDuplicateText(
        publicText,
      ),

      ...findRepeatedOpenings(
        paragraphs,
      ),

      ...validateEvidence(
        sectionKind,
        paragraphs,
        evidence,
      ),
    ];

    const uniqueIssues =
      Array.from(
        new Set(
          issues,
        ),
      );

    const score =
      calculateScore(
        uniqueIssues.length,
        paragraphs,
      );

    return {
      publishable:
        uniqueIssues.length ===
          0 &&
        score >= 80,

      score,

      issues:
        uniqueIssues,
    };
  }
}