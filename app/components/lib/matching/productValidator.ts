import type {
  ProductFingerprint,
} from "./productFingerprint";

export interface ValidationResult {
  name: string;
  passed: boolean;
  required: boolean;
  confidence: number;
  reason: string;
}

export interface ProductValidation {
  accepted: boolean;
  confidence: number;
  reasons: string[];
  results: ValidationResult[];
}

export function validateProduct(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ProductValidation {
  const results = [
    validateProductType(original, candidate),
    validateBrand(original, candidate),
    validateFamily(original, candidate),
    validateModelBase(original, candidate),
    validateVariant(original, candidate),
    validateYear(original, candidate),
    validateMemory(original, candidate),
    validateStorage(original, candidate),
    validateScreenSize(original, candidate),
    validateColour(original, candidate),
    validateConnectivity(original, candidate),
    validateCondition(original, candidate),
    validateBundle(original, candidate),
  ];

  const requiredFailures = results.filter(
    (result) =>
      result.required &&
      !result.passed
  );

  const applicableResults = results.filter(
    (result) =>
      result.reason !== "Not specified"
  );

  const confidence =
    applicableResults.length > 0
      ? Math.round(
          applicableResults.reduce(
            (total, result) =>
              total + result.confidence,
            0
          ) / applicableResults.length
        )
      : 0;

  return {
    accepted:
      requiredFailures.length === 0 &&
      confidence >= 70,

    confidence,

    reasons: results.map(
      (result) => result.reason
    ),

    results,
  };
}

function validateProductType(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  if (
    !original.productType ||
    original.productType === "unknown"
  ) {
    return optional(
      "productType",
      "Not specified"
    );
  }

  if (
    !candidate.productType ||
    candidate.productType === "unknown"
  ) {
    return fail(
      "productType",
      true,
      "Product type could not be verified"
    );
  }

  if (
    original.productType !==
    candidate.productType
  ) {
    return fail(
      "productType",
      true,
      `Product type mismatch: expected "${original.productType}", found "${candidate.productType}"`
    );
  }

  return pass(
    "productType",
    true,
    "Product type matches"
  );
}

function validateBrand(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  if (!original.brand) {
    return optional(
      "brand",
      "Not specified"
    );
  }

  if (!candidate.brand) {
    return fail(
      "brand",
      true,
      "Brand could not be verified"
    );
  }

  if (original.brand !== candidate.brand) {
    return fail(
      "brand",
      true,
      `Brand mismatch: expected "${original.brand}", found "${candidate.brand}"`
    );
  }

  return pass(
    "brand",
    true,
    "Brand matches"
  );
}

function validateFamily(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  if (!original.family) {
    return optional(
      "family",
      "Not specified"
    );
  }

  if (!candidate.family) {
    return fail(
      "family",
      true,
      "Product family could not be verified"
    );
  }

  if (
    original.family ===
    candidate.family
  ) {
    return pass(
      "family",
      true,
      "Product family matches"
    );
  }

  const broadFamilyMatch =
    candidate.family.startsWith(
      `${original.family} `
    );

  if (broadFamilyMatch) {
    return pass(
      "family",
      true,
      `Candidate belongs to the requested "${original.family}" family`
    );
  }

  return fail(
    "family",
    true,
    `Product family mismatch: expected "${original.family}", found "${candidate.family}"`
  );
}

function validateModelBase(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  if (!original.model.base) {
    return optional(
      "modelBase",
      "Not specified"
    );
  }

  if (!candidate.model.base) {
    return fail(
      "modelBase",
      true,
      "Model could not be verified"
    );
  }

  if (
    original.model.base !==
    candidate.model.base
  ) {
    return fail(
      "modelBase",
      true,
      `Model mismatch: expected "${original.model.base}", found "${candidate.model.base}"`
    );
  }

  return pass(
    "modelBase",
    true,
    "Model matches"
  );
}

function validateVariant(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  if (!original.model.variant) {
    return optional(
      "variant",
      "Not specified"
    );
  }

  if (!candidate.model.variant) {
    return fail(
      "variant",
      true,
      "Variant could not be verified"
    );
  }

  if (
    original.model.variant !==
    candidate.model.variant
  ) {
    return fail(
      "variant",
      true,
      `Variant mismatch: expected "${original.model.variant}", found "${candidate.model.variant}"`
    );
  }

  return pass(
    "variant",
    true,
    "Variant matches"
  );
}

function validateYear(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  if (!original.year) {
    return optional(
      "year",
      "Not specified"
    );
  }

 if (!candidate.year) {
  return fail(
    "year",
    true,
    `Requested year "${original.year}" could not be verified`
  );
  }

  if (original.year !== candidate.year) {
    return fail(
      "year",
      true,
      `Year mismatch: expected "${original.year}", found "${candidate.year}"`
    );
  }

  return pass(
    "year",
    true,
    "Year matches"
  );
}

function validateMemory(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  if (!original.specs.memory) {
    return optional(
      "memory",
      "Not specified"
    );
  }

 if (!candidate.specs.memory) {
  return fail(
    "memory",
    true,
    `Requested memory "${original.specs.memory}" could not be verified`
  );
}

  if (
    original.specs.memory !==
    candidate.specs.memory
  ) {
    return fail(
      "memory",
      true,
      `Memory mismatch: expected "${original.specs.memory}", found "${candidate.specs.memory}"`
    );
  }

  return pass(
    "memory",
    true,
    "Memory matches"
  );
}

function validateStorage(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  if (!original.specs.storage) {
    return optional(
      "storage",
      "Not specified"
    );
  }

if (!candidate.specs.storage) {
  return fail(
    "storage",
    true,
    `Requested storage "${original.specs.storage}" could not be verified`
  );
}

  if (
    original.specs.storage !==
    candidate.specs.storage
  ) {
    return fail(
      "storage",
      true,
      `Storage mismatch: expected "${original.specs.storage}", found "${candidate.specs.storage}"`
    );
  }

  return pass(
    "storage",
    true,
    "Storage matches"
  );
}

function validateScreenSize(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  if (!original.specs.screenSize) {
    return optional(
      "screenSize",
      "Not specified"
    );
  }

if (!candidate.specs.screenSize) {
  return fail(
    "screenSize",
    true,
    `Requested screen size "${original.specs.screenSize}" could not be verified`
  );
}

  if (
    original.specs.screenSize !==
    candidate.specs.screenSize
  ) {
    return fail(
      "screenSize",
      true,
      `Screen size mismatch: expected "${original.specs.screenSize}", found "${candidate.specs.screenSize}"`
    );
  }

  return pass(
    "screenSize",
    true,
    "Screen size matches"
  );
}

function validateColour(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  if (!original.specs.colour) {
    return optional(
      "colour",
      "Not specified"
    );
  }

if (!candidate.specs.colour) {
  return fail(
    "colour",
    true,
    `Requested colour "${original.specs.colour}" could not be verified`
  );
}

  if (
    original.specs.colour !==
    candidate.specs.colour
  ) {
    return fail(
      "colour",
      true,
      `Colour mismatch: expected "${original.specs.colour}", found "${candidate.specs.colour}"`
    );
  }

  return pass(
    "colour",
    true,
    "Colour matches"
  );
}

function validateConnectivity(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  if (!original.specs.connectivity) {
    return optional(
      "connectivity",
      "Not specified"
    );
  }

if (!candidate.specs.connectivity) {
  return fail(
    "connectivity",
    true,
    `Requested connectivity "${original.specs.connectivity}" could not be verified`
  );
}
  if (
    original.specs.connectivity !==
    candidate.specs.connectivity
  ) {
    return fail(
      "connectivity",
      true,
      `Connectivity mismatch: expected "${original.specs.connectivity}", found "${candidate.specs.connectivity}"`
    );
  }

  return pass(
    "connectivity",
    true,
    "Connectivity matches"
  );
}

function validateCondition(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  if (
    original.condition ===
    "unknown"
  ) {
    return optional(
      "condition",
      "Not specified"
    );
  }

if (
  candidate.condition ===
  "unknown"
) {
  return fail(
    "condition",
    true,
    `Requested condition "${original.condition}" could not be verified`
  );
}

  if (
    original.condition !==
    candidate.condition
  ) {
    return fail(
      "condition",
      true,
      `Condition mismatch: expected "${original.condition}", found "${candidate.condition}"`
    );
  }

  return pass(
    "condition",
    true,
    "Condition matches"
  );
}

function validateBundle(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  if (
    original.bundle ===
    "unknown"
  ) {
    return optional(
      "bundle",
      "Not specified"
    );
  }

if (
  candidate.bundle ===
  "unknown"
) {
  return fail(
    "bundle",
    true,
    `Requested bundle "${original.bundle}" could not be verified`
  );
}

  if (
    original.bundle !==
    candidate.bundle
  ) {
    return fail(
      "bundle",
      true,
      `Bundle mismatch: expected "${original.bundle}", found "${candidate.bundle}"`
    );
  }

  return pass(
    "bundle",
    true,
    "Bundle matches"
  );
}

function pass(
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

function fail(
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



function optional(
  name: string,
  reason: string
): ValidationResult {
  return {
    name,
    passed: true,
    required: false,
    confidence: 100,
    reason,
  };
}