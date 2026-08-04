export interface EditorialRuleResult {
  passed: boolean;

  message: string;
}

export interface EditorialRulesReport {
  passed: boolean;

  score: number;

  results: EditorialRuleResult[];
}

export interface EditorialSectionSummary {
  heading: string;

  introduction: string;

  paragraphs: string[];

  takeaway: string;
}

function normalise(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export class EditorialRulesEngine {

  evaluate(
    sections:
      EditorialSectionSummary[],
  ): EditorialRulesReport {

    const results:
      EditorialRuleResult[] = [];

    const openings =
      new Set<string>();

    const endings =
      new Set<string>();

    let score = 100;

    for (const section of sections) {

      const intro =
        normalise(
          section.introduction,
        );

      if (openings.has(intro)) {

        results.push({
          passed: false,

          message:
            `${section.heading} repeats an introduction.`,
        });

        score -= 5;

      } else {

        openings.add(intro);

      }

      const ending =
        normalise(
          section.takeaway,
        );

      if (endings.has(ending)) {

        results.push({
          passed: false,

          message:
            `${section.heading} repeats a takeaway.`,
        });

        score -= 5;

      } else {

        endings.add(ending);

      }

      if (
        section.paragraphs.length <
        3
      ) {

        results.push({
          passed: false,

          message:
            `${section.heading} needs more editorial depth.`,
        });

        score -= 5;

      } else {

        results.push({
          passed: true,

          message:
            `${section.heading} has sufficient depth.`,
        });

      }

    }

    return {

      passed:
        score >= 90,

      score,

      results,

    };

  }

}