import type { ProductFingerprint } from "../../productFingerprint";
import type { BrandEntity } from "../entities/brand";

export function buildBrandEntity(
  fingerprint: ProductFingerprint
): BrandEntity | null {
  const brand = fingerprint.brand?.trim();

  if (!brand) {
    return null;
  }

  return {
    id: normaliseEntityId(brand),
    name: formatEntityName(brand),
    type: "brand",
  };
}

function normaliseEntityId(
  value: string
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatEntityName(
  value: string
): string {
  return value
    .trim()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}