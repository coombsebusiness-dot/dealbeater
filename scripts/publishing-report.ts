import {
  loadEnvConfig,
} from "@next/env";

async function main():
  Promise<void> {
  loadEnvConfig(
    process.cwd(),
  );

  const {
    publishingRunner,
  } =
    await import(
      "../knowledge/publishing"
    );

  const result =
    publishingRunner.run();

  console.log(
    publishingRunner.createReport(
      result,
    ),
  );

  if (
    result.failed.length >
    0
  ) {
    process.exitCode = 1;
  }
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