import { createProductFingerprintV3 } from "../index";

import type {
  ExpectedFingerprint,
  ProductTestCase,
} from "./expected";

import { laptopTests } from "./datasets/laptops";
import { phoneTests } from "./datasets/phones";
import { cameraTests } from "./datasets/cameras";
import { storageTests } from "./datasets/storage";
import { tabletTests } from "./datasets/tablets";
import { consoleTests } from "./datasets/consoles";
import { gpuTests } from "./datasets/gpus";
import { lensTests } from "./datasets/lenses";
import { watchTests } from "./datasets/watches";
import { headphoneTests } from "./datasets/headphones";
import { cpuTests } from "./datasets/cpus";
import { motherboardTests } from "./datasets/motherboards";

interface TestFailure {
  path: string;
  expected: unknown;
  received: unknown;
}

interface TestResult {
  test: ProductTestCase;
  passed: boolean;
  failures: TestFailure[];
  durationMs: number;
}

const testCases: ProductTestCase[] = [
  ...laptopTests,
  ...phoneTests,
  ...tabletTests,
  ...cameraTests,
  ...lensTests,
  ...consoleTests,
  ...gpuTests,
  ...cpuTests,
  ...motherboardTests,
  ...watchTests,
  ...headphoneTests,
  ...storageTests,
];

function isPlainObject(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function compareExpected(
  expected: unknown,
  received: unknown,
  path = ""
): TestFailure[] {
  const failures: TestFailure[] = [];

  if (Array.isArray(expected)) {
    if (!Array.isArray(received)) {
      return [
        {
          path,
          expected,
          received,
        },
      ];
    }

    const expectedSorted = [...expected].sort();
    const receivedSorted = [...received].sort();

    if (
      JSON.stringify(expectedSorted) !==
      JSON.stringify(receivedSorted)
    ) {
      failures.push({
        path,
        expected,
        received,
      });
    }

    return failures;
  }

  if (isPlainObject(expected)) {
    if (!isPlainObject(received)) {
      return [
        {
          path,
          expected,
          received,
        },
      ];
    }

    for (const [key, expectedValue] of Object.entries(
      expected
    )) {
      const nextPath = path
        ? `${path}.${key}`
        : key;

      failures.push(
        ...compareExpected(
          expectedValue,
          received[key],
          nextPath
        )
      );
    }

    return failures;
  }

  if (expected !== received) {
    failures.push({
      path,
      expected,
      received,
    });
  }

  return failures;
}

function runTest(
  test: ProductTestCase
): TestResult {
  const startedAt = performance.now();

  const fingerprint =
    createProductFingerprintV3(test.input);

  const durationMs =
    performance.now() - startedAt;

  const failures = compareExpected(
    test.expected satisfies ExpectedFingerprint,
    fingerprint
  );

  return {
    test,
    passed: failures.length === 0,
    failures,
    durationMs,
  };
}

function printFailure(
  failure: TestFailure
): void {
  console.log(`     Field:    ${failure.path}`);
  console.log(
    `     Expected: ${JSON.stringify(
      failure.expected
    )}`
  );
  console.log(
    `     Received: ${JSON.stringify(
      failure.received
    )}`
  );
}

function run(): void {
  console.log("");
  console.log(
    "============================================"
  );
  console.log(
    "   BLINLX PRODUCT INTELLIGENCE TEST LAB"
  );
  console.log(
    "============================================"
  );
  console.log("");

  if (testCases.length === 0) {
    console.log("No product tests were found.");
    process.exitCode = 1;
    return;
  }

  const startedAt = performance.now();

  const results = testCases.map(runTest);

  for (const result of results) {
    const status = result.passed ? "PASS" : "FAIL";

    console.log(
      `${result.passed ? "✅" : "❌"} ${status} — ${
        result.test.name
      } (${result.durationMs.toFixed(3)}ms)`
    );

    if (!result.passed) {
      console.log(`   Input: ${result.test.input}`);

      for (const failure of result.failures) {
        printFailure(failure);
      }

      console.log("");
    }
  }

  const totalDurationMs =
    performance.now() - startedAt;

  const passed = results.filter(
    result => result.passed
  ).length;

  const failed = results.length - passed;

  const accuracy =
    results.length > 0
      ? (passed / results.length) * 100
      : 0;

  const averageDurationMs =
    results.reduce(
      (total, result) =>
        total + result.durationMs,
      0
    ) / results.length;

  console.log("");
  console.log(
    "--------------------------------------------"
  );
  console.log(`Products tested: ${results.length}`);
  console.log(`Passed:          ${passed}`);
  console.log(`Failed:          ${failed}`);
  console.log(
    `Pass rate:       ${accuracy.toFixed(2)}%`
  );
  console.log(
    `Average time:    ${averageDurationMs.toFixed(
      3
    )}ms`
  );
  console.log(
    `Total time:      ${totalDurationMs.toFixed(
      3
    )}ms`
  );
  console.log(
    "--------------------------------------------"
  );
  console.log("");

  if (failed > 0) {
    process.exitCode = 1;
  }
}

run();