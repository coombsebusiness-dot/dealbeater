import type {
  ValidationResult,
} from "./types";

export function pass(
  name: string,
  required: boolean,
  reason: string
): ValidationResult {
  return {
    name,
    passed: true,
    required,
    confidence: 100,
    reason,
  };
}

export function fail(
  name: string,
  required: boolean,
  reason: string
): ValidationResult {
  return {
    name,
    passed: false,
    required,
    confidence: 0,
    reason,
  };
}

export function optional(
  name: string,
  reason = "Not specified"
): ValidationResult {
  return {
    name,
    passed: true,
    required: false,
    confidence: 100,
    reason,
  };
}

export function normaliseComparableValue(
  value: string | null | undefined
): string | null {
  if (!value) {
    return null;
  }

  return value
    .toLowerCase()
    .replace(/[_/()-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function valuesMatch(
  first: string | null | undefined,
  second: string | null | undefined
): boolean {
  const normalisedFirst =
    normaliseComparableValue(first);

  const normalisedSecond =
    normaliseComparableValue(second);

  return (
    normalisedFirst !== null &&
    normalisedSecond !== null &&
    normalisedFirst === normalisedSecond
  );
}

export function arraysContainSameValues(
  expected: string[],
  actual: string[]
): boolean {
  const normalisedExpected = new Set(
    expected
      .map(normaliseComparableValue)
      .filter(
        (value): value is string =>
          value !== null
      )
  );

  const normalisedActual = new Set(
    actual
      .map(normaliseComparableValue)
      .filter(
        (value): value is string =>
          value !== null
      )
  );

  return [...normalisedExpected].every(
    (value) => normalisedActual.has(value)
  );
}