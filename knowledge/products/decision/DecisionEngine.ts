import type {
  DecisionProfile,
} from "./DecisionProfile";

import type {
  ProductIntelligence,
} from "../intelligence";

export interface DecisionResult {

  score:
    number;

  recommendation:
    "HIGHLY_RECOMMENDED"
    | "RECOMMENDED"
    | "CONSIDER"
    | "NOT_RECOMMENDED";

  reasons:
    string[];

  concerns:
    string[];

  confidence:
    number;
}

export class DecisionEngine {

  evaluate(
    profile:
      DecisionProfile,

    intelligence:
      ProductIntelligence,
  ): DecisionResult {

    let score = 0;

    const reasons:
      string[] = [];

    const concerns:
      string[] = [];

    //
    // Buyer suitability
    //

    profile.primaryUseCases.forEach(
      useCase => {

        if (
          intelligence
            .whoShouldBuy
            .some(
              value =>
                value
                  .toLowerCase()
                  .includes(
                    useCase.toLowerCase(),
                  ),
            )
        ) {

          score += 20;

          reasons.push(
            `Suitable for ${useCase}.`,
          );

        }

      },
    );

    //
    // Avoid list
    //

    intelligence
      .whoShouldAvoid
      .forEach(
        warning => {

          profile.primaryUseCases.forEach(
            useCase => {

              if (
                warning
                  .toLowerCase()
                  .includes(
                    useCase.toLowerCase(),
                  )
              ) {

                score -= 25;

                concerns.push(
                  warning,
                );

              }

            },
          );

        },
      );

    //
    // Buying verdict
    //

    switch (
      intelligence.buyingVerdict
    ) {

      case "BUY":

        score += 30;

        reasons.push(
          intelligence
            .verdictReason,
        );

        break;

      case "CONSIDER":

        score += 15;

        break;

      case "WAIT":

        score -= 15;

        concerns.push(
          intelligence
            .verdictReason,
        );

        break;

      case "AVOID":

        score -= 40;

        concerns.push(
          intelligence
            .verdictReason,
        );

        break;

    }

    //
    // Clamp
    //

    score =
      Math.max(
        0,
        Math.min(
          score,
          100,
        ),
      );

    const recommendation =
      score >= 80
        ? "HIGHLY_RECOMMENDED"
        : score >= 60
          ? "RECOMMENDED"
          : score >= 40
            ? "CONSIDER"
            : "NOT_RECOMMENDED";

    return {

      score,

      recommendation,

      reasons,

      concerns,

      confidence:
        intelligence.confidence,

    };

  }

}