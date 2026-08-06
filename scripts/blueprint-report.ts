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

  bootstrapGuideBlueprints();

  const blueprints =
    getAllGuideBlueprints();

  const countsByType =
    blueprints.reduce<
      Record<
        string,
        number
      >
    >(
      (
        counts,
        blueprint,
      ) => ({
        ...counts,

        [blueprint.type]:
          (
            counts[
              blueprint.type
            ] ??
            0
          ) + 1,
      }),
      {},
    );

  console.log(
    JSON.stringify(
      {
        total:
          blueprints.length,

        ready:
          blueprints.filter(
            (blueprint) =>
              blueprint.status ===
              "READY",
          ).length,

        published:
          blueprints.filter(
            (blueprint) =>
              blueprint.status ===
              "PUBLISHED",
          ).length,

        countsByType,
      },
      null,
      2,
    ),
  );
}

main().catch(
  (error) => {
    console.error(
      error,
    );

    process.exitCode = 1;
  },
);