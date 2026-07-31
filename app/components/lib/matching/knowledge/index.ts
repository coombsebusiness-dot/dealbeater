import type { ProductFingerprint } from "../productFingerprint";
import type { ProductBrainResult } from "./types";

import {
  resolveCpuKnowledge,
} from "./resolvers/cpuKnowledgeResolver";

export function resolveProductKnowledge(
  fingerprint: ProductFingerprint
): ProductBrainResult | null {
  const cpuKnowledge =
    resolveCpuKnowledge(fingerprint);

  if (cpuKnowledge) {
    return cpuKnowledge;
  }

  return null;
}