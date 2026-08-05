import type {
  CameraProduct,
} from "@/knowledge/products";

type GeneratedCameraProductField =
  | "id"
  | "slug"
  | "category"
  | "productType"
  | "status"
  | "images"
  | "confidence"
  | "createdAt"
  | "updatedAt"
  | "alternatives"
  | "upgradePath";

export interface CreateCameraProductInput
  extends Omit<
    CameraProduct,
    GeneratedCameraProductField
  > {
  id?:
    string;

  slug?:
    string;

  productType?:
    CameraProduct["productType"];

  status?:
    CameraProduct["status"];

  images?:
    CameraProduct["images"];

  confidence?:
    number;

  createdAt?:
    string;

  updatedAt?:
    string;
}

function createSlug(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /&/g,
      "and",
    )
    .replace(
      /['’]/g,
      "",
    )
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );
}

function createDateStamp():
  string {
  return new Date()
    .toISOString()
    .slice(
      0,
      10,
    );
}

function createUniqueProductIds(
  relationships: Array<{
    productId:
      string;
  }>,
): string[] {
  return Array.from(
    new Set(
      relationships
        .map(
          (relationship) =>
            relationship.productId
              .trim(),
        )
        .filter(Boolean),
    ),
  );
}

function clampConfidence(
  confidence:
    number,
): number {
  if (
    !Number.isFinite(
      confidence,
    )
  ) {
    return 0.99;
  }

  return Math.max(
    0,
    Math.min(
      1,
      confidence,
    ),
  );
}

export function createCameraProduct(
  input:
    CreateCameraProductInput,
): CameraProduct {
  const generatedSlug =
    createSlug(
      `${input.brand} ${input.model}`,
    );

  const slug =
    input.slug?.trim()
      ? createSlug(
          input.slug,
        )
      : generatedSlug;

  const id =
    input.id?.trim()
      ? createSlug(
          input.id,
        )
      : slug;

  if (
    !id ||
    !slug
  ) {
    throw new Error(
      "Camera product requires a valid id and slug.",
    );
  }

  const dateStamp =
    createDateStamp();

  const alternatives =
    createUniqueProductIds(
      input.relationships
        .alternatives,
    );

  const upgradePath =
    createUniqueProductIds(
      input.relationships
        .upgrades,
    );

  return {
    ...input,

    id,

    slug,

    category:
      "CAMERAS",

    productType:
      input.productType ??
      "MIRRORLESS",

    status:
      input.status ??
      "CURRENT",

    images:
      input.images ?? {
        gallery:
          [],
      },

    confidence:
      clampConfidence(
        input.confidence ??
          0.99,
      ),

    createdAt:
      input.createdAt ??
      dateStamp,

    updatedAt:
      input.updatedAt ??
      input.createdAt ??
      dateStamp,

    alternatives,

    upgradePath,
  };
}