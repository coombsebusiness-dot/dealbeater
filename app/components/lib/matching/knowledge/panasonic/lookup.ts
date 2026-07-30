import type {
  ProductFingerprint,
} from "../../productFingerprint";

import {
  PANASONIC_CAMERAS,
} from "./cameras";

import type {
  PanasonicCameraKnowledge,
} from "./types";

export function findPanasonicCamera(
  fingerprint: ProductFingerprint
): PanasonicCameraKnowledge | null {
  const candidates =
    buildCandidateValues(fingerprint);

  for (const camera of PANASONIC_CAMERAS) {
    if (
      matchesPanasonicCamera(
        candidates,
        camera
      )
    ) {
      return camera;
    }
  }

  return null;
}

function matchesPanasonicCamera(
  candidates: string[],
  camera: PanasonicCameraKnowledge
): boolean {
  const searchableValues = [
    camera.name,
    camera.slug,
    ...camera.aliases,
  ]
    .map(normaliseCameraValue)
    .filter(Boolean);

  return candidates.some((candidate) =>
    searchableValues.some(
      (searchableValue) =>
        candidate === searchableValue
    )
  );
}

function buildCandidateValues(
  fingerprint: ProductFingerprint
): string[] {
  const values = [
    fingerprint.model.base,
    fingerprint.model.sku,
    fingerprint.family,
  ];

  const candidates = values
    .filter(
      (
        value
      ): value is string =>
        Boolean(value)
    )
    .map(normaliseCameraValue)
    .filter(Boolean);

  return Array.from(
    new Set(candidates)
  );
}

function normaliseCameraValue(
  value: string
): string {
  return value
    .toLowerCase()
    .replace(/\bpanasonic\b/g, " ")
    .replace(/\blumix\b/g, " ")
    .replace(/\bdc[-\s]?/g, " ")
    .replace(/\bmark\b/g, " ")
    .replace(/\bmk\b/g, " ")
    .replace(/\biii\b/g, "3")
    .replace(/\bii\b/g, "2")
    .replace(/\biv\b/g, "4")
    .replace(/\bix\b/g, "9")
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}