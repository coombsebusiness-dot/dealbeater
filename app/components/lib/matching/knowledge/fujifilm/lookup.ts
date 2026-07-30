import type {
  ProductFingerprint,
} from "../../productFingerprint";

import {
  fujifilmCameras,
} from "./cameras";

import type {
  FujifilmCameraKnowledge,
} from "./types";

function normalise(
  value: string | null | undefined
): string {
  return (
    value
      ?.toLowerCase()
      .replace(/\bfujifilm\b/g, "")
      .replace(/\bfujinon\b/g, "")
      .replace(/[^a-z0-9]+/g, "") ?? ""
  );
}

export function findFujifilmCamera(
  fingerprint: ProductFingerprint
): FujifilmCameraKnowledge | null {
  const values = [
    fingerprint.model.base,
    fingerprint.model.revision,
    fingerprint.model.variant,
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
    .map(normalise)
    .filter(Boolean);

  for (const camera of fujifilmCameras) {
    const searchableNames = [
      camera.name,
      camera.slug,
      ...camera.aliases,
    ]
      .map(normalise)
      .filter(Boolean);

    const matched = candidates.some(
      (candidate) =>
        searchableNames.some(
          (searchableName) =>
            candidate === searchableName
        )
    );

    if (matched) {
      return camera;
    }
  }

  return null;
}