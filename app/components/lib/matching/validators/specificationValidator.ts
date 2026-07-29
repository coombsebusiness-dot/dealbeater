import type { ProductFingerprint } from "../productFingerprint";
import type { ValidationResult } from "./types";

import {
  fail,
  optional,
  pass,
} from "./helpers";

export function validateMemory(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  const expected = original.specs.memory;
  const found = candidate.specs.memory;

  if (!expected) {
    return optional(
      "memory",
      "Memory was not specified"
    );
  }

  if (!found) {
    return fail(
      "memory",
      true,
      `Requested memory "${expected}" could not be verified`
    );
  }

  if (expected !== found) {
    return fail(
      "memory",
      true,
      `Memory mismatch: expected "${expected}", found "${found}"`
    );
  }

  return pass(
    "memory",
    true,
    "Memory matches"
  );
}

export function validateStorage(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  const expected = original.specs.storage;
  const found = candidate.specs.storage;

  if (!expected) {
    return optional(
      "storage",
      "Storage was not specified"
    );
  }

  if (!found) {
    return fail(
      "storage",
      true,
      `Requested storage "${expected}" could not be verified`
    );
  }

  if (expected !== found) {
    return fail(
      "storage",
      true,
      `Storage mismatch: expected "${expected}", found "${found}"`
    );
  }

  return pass(
    "storage",
    true,
    "Storage matches"
  );
}

export function validateScreenSize(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  const expected = original.specs.screenSize;
  const found = candidate.specs.screenSize;

  if (!expected) {
    return optional(
      "screenSize",
      "Screen size was not specified"
    );
  }

  if (!found) {
    return fail(
      "screenSize",
      true,
      `Requested screen size "${expected}" could not be verified`
    );
  }

  if (expected !== found) {
    return fail(
      "screenSize",
      true,
      `Screen-size mismatch: expected "${expected}", found "${found}"`
    );
  }

  return pass(
    "screenSize",
    true,
    "Screen size matches"
  );
}

export function validateColour(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  const expected = original.specs.colour;
  const found = candidate.specs.colour;

  if (!expected) {
    return optional(
      "colour",
      "Colour was not specified"
    );
  }

  if (!found) {
    return fail(
      "colour",
      true,
      `Requested colour "${expected}" could not be verified`
    );
  }

  if (expected !== found) {
    return fail(
      "colour",
      true,
      `Colour mismatch: expected "${expected}", found "${found}"`
    );
  }

  return pass(
    "colour",
    true,
    "Colour matches"
  );
}

export function validateConnectivity(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
 const expected =
    original.specs.connectivity;
  const found =
    candidate.specs.connectivity;

 if (!expected) {
    return optional(
        "connectivity",
        "Not specified"
    );
}

if (!found) {
    return fail(
        "connectivity",
        true,
        `Requested connectivity "${expected}" could not be verified`
    );
}

if (expected !== found) {
    return fail(
        "connectivity",
        true,
        `Connectivity mismatch: expected "${expected}", found "${found}"`
    );
}

return pass(
    "connectivity",
    true,
    "Connectivity matches"
);

 

  
}