import type {
  ProductFingerprint,
} from "../../productFingerprint";

import type {
  PanasonicCameraKnowledge,
} from "../panasonic/types";

import type {
  SonyCameraKnowledge,
} from "../sony/types";
import type {
  FujifilmCameraKnowledge,
} from "../fujifilm/types";

import type {
  CanonCameraKnowledge,
} from "../canon/types";

import type {
  NikonCameraKnowledge,
} from "../nikon/types";

import type {
  ProductKnowledgeProvider,
} from "../registry/provider";

import {
  sonyProvider,
} from "../registry/sonyProvider";

import {
  canonProvider,
} from "../registry/canonProvider";

import {
  nikonProvider,
} from "../registry/nikonProvider";

import {
  fujifilmProvider,
} from "../registry/fujifilmProvider";

import {
  panasonicProvider,
} from "../registry/panasonicProvider";

export type ResolvedCameraKnowledge =
  | SonyCameraKnowledge
  | CanonCameraKnowledge
  | NikonCameraKnowledge
  | FujifilmCameraKnowledge
  | PanasonicCameraKnowledge;

const cameraProviders:
  ProductKnowledgeProvider[] = [
  sonyProvider,
  canonProvider,
  nikonProvider,
  fujifilmProvider,
  panasonicProvider,
];

export interface CameraEngineResult {
  camera: ResolvedCameraKnowledge | null;
  matched: boolean;
  provider: string | null;
}

export function resolveCamera(
  fingerprint: ProductFingerprint
): CameraEngineResult {
  console.log(
    "📷 CAMERA_ENGINE_CALLED",
    {
      brand: fingerprint.brand,
      family: fingerprint.family,
      model: fingerprint.model,
    }
  );

  for (
    const provider of cameraProviders
  ) {
    console.log(
      "📷 CAMERA_ENGINE_CHECKING_PROVIDER",
      provider.id
    );

    if (
      !provider.supports(
        fingerprint
      )
    ) {
      continue;
    }

    console.log(
      "📷 CAMERA_ENGINE_MATCHED_PROVIDER",
      provider.id
    );

    const knowledge =
      provider.getKnowledge(
        fingerprint
      );

    const camera =
      knowledge.camera ?? null;

    if (!camera) {
      console.log(
        "📷 CAMERA_PROVIDER_RETURNED_NO_MATCH",
        provider.id
      );

      continue;
    }

    console.log(
      "✅ CAMERA_ENGINE_RESOLVED",
      {
        provider: provider.id,
        camera: camera.name,
      }
    );

    return {
      camera,
      matched: true,
      provider: provider.id,
    };
  }

  console.log(
    "⚠️ CAMERA_ENGINE_NO_MATCH"
  );

  return {
    camera: null,
    matched: false,
    provider: null,
  };
}