import type { ProductFingerprint }
  from "../../productFingerprint";

import type { AppleChipKnowledge }
  from "../apple/chips";

  import type {
    SamsungPhoneKnowledge
} from "../samsung/types";

import type {
  FujifilmCameraKnowledge,
} from "../fujifilm/types";

import type {
  PanasonicCameraKnowledge,
} from "../panasonic/types";

import type { CanonCameraKnowledge } from "../canon/types";

import type { SonyCameraKnowledge } from "../sony/types";

import type { NikonCameraKnowledge } from "../nikon/types";

export interface ProductKnowledge {

 chip?: AppleChipKnowledge | null;

  cpu?: unknown;

  gpu?: unknown;

  lens?: unknown;

  display?: unknown;

  battery?: unknown;

  storage?: unknown;

  connectivity?: unknown;

  phone?: SamsungPhoneKnowledge | null;

  camera?:
  | SonyCameraKnowledge
  | CanonCameraKnowledge
  | NikonCameraKnowledge
  | FujifilmCameraKnowledge
  | PanasonicCameraKnowledge
  | null;

}

export interface ProductKnowledgeProvider {

  id: string;

  supports(
    fingerprint: ProductFingerprint
  ): boolean;

  getKnowledge(
    fingerprint: ProductFingerprint
  ): Partial<ProductKnowledge>;

}