import type { ProductFingerprint } from "../../productFingerprint";
import type { ProductEntity } from "../entities/product";

export function buildProductEntity(
  fingerprint: ProductFingerprint
): ProductEntity | null {
  const name = [
    fingerprint.brand,
    fingerprint.family,
    fingerprint.model.base,
    fingerprint.model.revision,
    fingerprint.model.variant,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (!name) {
    return null;
  }

  return {
    id: normaliseEntityId(name),
    name: formatEntityName(name),
    type: "product",
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