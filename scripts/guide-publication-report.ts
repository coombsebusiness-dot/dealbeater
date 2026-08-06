import {
  loadEnvConfig,
} from "@next/env";

async function main():
  Promise<void> {
  loadEnvConfig(
    process.cwd(),
  );

  const {
    bootstrapGuideBlueprints,
    getAllGuideBlueprints,
  } =
    await import(
      "../knowledge/guides/blueprints"
    );

  const {
    publishGuide,
  } =
    await import(
      "../knowledge/guides/publisher/GuidePublisher"
    );

  bootstrapGuideBlueprints();

  const blueprints =
    getAllGuideBlueprints();

  const reportByType =
    new Map<
      string,
      {
        total: number;
        publishable: number;
        blocked: number;
        failed: number;
      }
    >();

  const failures:
    Array<{
      slug: string;
      type: string;
      reason: string;
    }> = [];

  function getTypeReport(
    type: string,
  ) {
    const existing =
      reportByType.get(
        type,
      );

    if (existing) {
      return existing;
    }

    const created = {
      total: 0,
      publishable: 0,
      blocked: 0,
      failed: 0,
    };

    reportByType.set(
      type,
      created,
    );

    return created;
  }

  for (
    const blueprint of
      blueprints
  ) {
    const typeReport =
      getTypeReport(
        blueprint.type,
      );

    typeReport.total += 1;

    if (
      blueprint.type ===
      "COMPARISON"
    ) {
      typeReport.blocked += 1;

      failures.push({
        slug:
          blueprint.slug,

        type:
          blueprint.type,

        reason:
          "Handled by the dedicated comparison-page system.",
      });

      continue;
    }

    try {
      const published =
        publishGuide(
          blueprint,
          {
            subtitle:
              [
                "Independent Blinlx buying advice for",
                blueprint.topic
                  .toLowerCase(),
                "including the products, features, trade-offs and buying mistakes that matter.",
              ].join(
                " ",
              ),

            heroImage: {
              src:
                "/images/guides/photography/beginner-photography-buying-guide-hero.webp",

              alt:
                `${blueprint.title} hero image.`,
            },
          },
        );

      if (
        published.publishable
      ) {
        typeReport.publishable +=
          1;

        continue;
      }

      typeReport.blocked += 1;

      failures.push({
        slug:
          blueprint.slug,

        type:
          blueprint.type,

        reason:
          [
            `Publisher status: ${published.status}`,
            `Quality status: ${published.quality.status}`,
            `Quality score: ${published.quality.score}`,

            `Sections: ${published.quality.metrics.sectionCount}`,
            `Blocks: ${published.quality.metrics.blockCount}`,
            `FAQs: ${published.quality.metrics.faqCount}`,
            `Summary points: ${published.quality.metrics.summaryCount}`,
            `Keywords: ${published.quality.metrics.keywordCount}`,
            `Recommendations: ${published.quality.metrics.recommendationCount}`,
            `Estimated words: ${published.quality.metrics.estimatedWordCount}`,

            ...published.quality.errors.map(
              (error) =>
                `Error: ${error}`,
            ),

            ...published.quality.warnings.map(
              (warning) =>
                `Warning: ${warning}`,
            ),
          ].join(
            " | ",
          ),
      });
    } catch (error) {
      typeReport.failed += 1;

      failures.push({
        slug:
          blueprint.slug,

        type:
          blueprint.type,

        reason:
          error instanceof Error
            ? error.stack ??
                error.message
            : String(
                error,
              ),
      });
    }
  }

  console.log(
    "\nGuide Publication Report",
  );

  console.log(
    "────────────────────────",
  );

  reportByType.forEach(
    (
      result,
      type,
    ) => {
      console.log(
        [
          `${type}:`,
          `total=${result.total}`,
          `publishable=${result.publishable}`,
          `blocked=${result.blocked}`,
          `failed=${result.failed}`,
        ].join(
          " ",
        ),
      );
    },
  );

  console.log(
    "\nRejected or separately handled pages:",
  );

  failures.forEach(
    (failure) => {
      console.log(
        [
          `- ${failure.slug}`,
          `[${failure.type}]`,
          failure.reason,
        ].join(
          " ",
        ),
      );
    },
  );
}

main().catch(
  (error) => {
    console.error(
      error instanceof Error
        ? error.stack ??
            error.message
        : String(
            error,
          ),
    );

    process.exitCode = 1;
  },
);