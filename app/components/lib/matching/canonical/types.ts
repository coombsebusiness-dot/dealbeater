import type { ProductFingerprint } from "../productFingerprint";

export interface CanonicalProduct {
  key: string;

  brand: string | null;

  family: string | null;

  productType: string;

  displayName: string;

  fingerprint: ProductFingerprint;
}