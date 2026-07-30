import type { ProductFingerprint } from "../productFingerprint";
import type {
  ResolvedCameraKnowledge,
} from "./engines/cameraEngine";
import type { BrainEntity } from "./entities/entity";

import {
  getKnowledgeForProduct,
} from "./registry/registry";

import {
  resolveCamera,
} from "./engines/cameraEngine";

import {
  createBrainGraph,
  type BrainGraph,
} from "./graph";

import { buildBrandEntity } from "./builders/brandBuilder";
import { buildProductEntity } from "./builders/productBuilder";

import {
  buildChipEntity,
  type AppleChipKnowledge,
} from "./builders/chipBuilder";

import { buildRelationships } from "./builders/relationshipBuilder";





export type BrainCategory =
  | "camera"
  | "chip"
  | "unknown";

export interface BrainKnowledgeResponse {
  category: BrainCategory;

  graph: BrainGraph;

  chip: AppleChipKnowledge | null;

  camera: ResolvedCameraKnowledge | null;

  matched: boolean;
}

export function getBrain(
  fingerprint: ProductFingerprint
): BrainKnowledgeResponse {
  const brand = buildBrandEntity(
    fingerprint
  );

  const product = buildProductEntity(
    fingerprint
  );

  const knowledge =
  getKnowledgeForProduct(
    fingerprint
  );

const chipKnowledge =
  knowledge.chip ?? null;

const cameraResult =
  fingerprint.productType === "camera"
    ? resolveCamera(fingerprint)
    : {
        camera: null,
        matched: false,
        provider: null,
      };

const cameraKnowledge =
  cameraResult.camera;

  const chip = buildChipEntity(
    chipKnowledge
  );

  const category: BrainCategory =
    cameraKnowledge !== null
      ? "camera"
      : chipKnowledge !== null
        ? "chip"
        : "unknown";

 const entities = [
  brand,
  product,
  chip,
].filter(
  (
    entity
  ): entity is NonNullable<typeof entity> =>
    entity !== null
);

  const relationships =
    buildRelationships({
      brand,
      product,
      chip,
    });

  const matched =
  chipKnowledge !== null ||
  cameraResult.matched;

  console.log(
    "🧠 BRAIN KNOWLEDGE RESOLVED:",
    {
      category,

      brand:
        fingerprint.brand,

      family:
        fingerprint.family,

      model:
        fingerprint.model,

      chip:
        chipKnowledge?.displayName ??
        null,

      camera:
        cameraKnowledge?.name ??
        null,

      matched,
    }
  );

  return {
    category,

    graph: createBrainGraph(
      entities,
      relationships
    ),

    chip: chipKnowledge,

    camera: cameraKnowledge,

    matched,
  };
}