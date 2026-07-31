import type {
  ProductFingerprint,
} from "../../productFingerprint";

import type {
  ProductBrainResult,
} from "../types";

import {
  findRegistryMatch,
} from "../registry/helpers";

import {
  processorKnowledgeRegistry,
} from "../registry/registry";

function buildSearchableValues(
  fingerprint: ProductFingerprint
): Array<string | null> {
  const combinedModel =
    fingerprint.model.base &&
    fingerprint.model.variant
      ? `${fingerprint.model.base}-${fingerprint.model.variant}`
      : null;

  return [
    combinedModel,
    fingerprint.model.base,
    fingerprint.model.revision,
    fingerprint.model.variant,
    fingerprint.family,
  ];
}

export function resolveCpuKnowledge(
  fingerprint: ProductFingerprint
): ProductBrainResult | null {
  const match = findRegistryMatch(
    buildSearchableValues(fingerprint),
    processorKnowledgeRegistry
  );

  if (!match) {
    return null;
  }

  return {
    product: match.entry,

    confidence: match.confidence,

    matchedBy: match.matchedBy,

    provider:
      "blinlx-processor-registry",
  };
}