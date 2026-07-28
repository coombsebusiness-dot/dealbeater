import { supabaseAdmin } from "@/app/components/lib/supabase/admin";

type CanonicalFingerprint = {
  category?: string | null;
  brand?: string | null;
  family?: string | null;

  model?: {
    base?: string | null;
    revision?: string | null;
    variant?: string | null;
    sku?: string | null;
  } | null;
};

type StoredProduct = {
  id: string;
  slug: string;
  name: string | null;
  category: string | null;
  brand: string | null;
  family: string | null;
  model: string | null;
};

export type CanonicalProductMatch =
  | {
      found: true;
      productId: string;
      slug: string;
      name: string | null;
      confidence: number;
      matchedFields: string[];
    }
  | {
      found: false;
    };

function normaliseValue(
  value?: string | null
): string {
  return (value ?? "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function valuesMatch(
  first?: string | null,
  second?: string | null
): boolean {
  const normalisedFirst =
    normaliseValue(first);

  const normalisedSecond =
    normaliseValue(second);

  if (
    !normalisedFirst ||
    !normalisedSecond
  ) {
    return false;
  }

  return (
    normalisedFirst ===
      normalisedSecond ||
    normalisedFirst.includes(
      normalisedSecond
    ) ||
    normalisedSecond.includes(
      normalisedFirst
    )
  );
}

function calculateMatch(
  fingerprint: CanonicalFingerprint,
  product: StoredProduct
): {
  confidence: number;
  matchedFields: string[];
} {
  let score = 0;
  let possibleScore = 0;

  const matchedFields: string[] = [];

  const checks = [
    {
      field: "brand",
      weight: 35,
      incoming: fingerprint.brand,
      stored: product.brand,
    },
    {
      field: "category",
      weight: 15,
      incoming: fingerprint.category,
      stored: product.category,
    },
    {
      field: "family",
      weight: 25,
      incoming: fingerprint.family,
      stored: product.family,
    },
    {
      field: "model",
      weight: 25,
      incoming:
        fingerprint.model?.base,
      stored: product.model,
    },
  ];

  for (const check of checks) {
    if (
      !normaliseValue(check.incoming) ||
      !normaliseValue(check.stored)
    ) {
      continue;
    }

    possibleScore += check.weight;

    if (
      valuesMatch(
        check.incoming,
        check.stored
      )
    ) {
      score += check.weight;
      matchedFields.push(check.field);
    }
  }

  if (possibleScore === 0) {
    return {
      confidence: 0,
      matchedFields: [],
    };
  }

  return {
    confidence: Math.round(
      (score / possibleScore) * 100
    ),
    matchedFields,
  };
}

export async function findCanonicalProduct(
  fingerprint: CanonicalFingerprint
): Promise<CanonicalProductMatch> {
  const brand =
    normaliseValue(fingerprint.brand);

  const model =
    normaliseValue(
      fingerprint.model?.base
    );

  if (!brand || !model) {
    console.log(
      "CANONICAL_MATCH_SKIPPED:",
      {
        reason:
          "Missing brand or model",
        brand:
          fingerprint.brand ?? null,
        model:
          fingerprint.model?.base ??
          null,
      }
    );

    return {
      found: false,
    };
  }

  const { data, error } =
    await supabaseAdmin
      .from("products")
      .select(
        "id, slug, name, category, brand, family, model"
      )
      .ilike(
        "brand",
        fingerprint.brand!.trim()
      )
      .limit(50);

  if (error) {
    console.error(
      "CANONICAL_PRODUCT_LOOKUP_ERROR:",
      error
    );

    return {
      found: false,
    };
  }

  const products =
    (data ?? []) as StoredProduct[];

  let bestMatch:
    | {
        product: StoredProduct;
        confidence: number;
        matchedFields: string[];
      }
    | undefined;

  for (const product of products) {
    const match = calculateMatch(
      fingerprint,
      product
    );

    if (
      !bestMatch ||
      match.confidence >
        bestMatch.confidence
    ) {
      bestMatch = {
        product,
        ...match,
      };
    }
  }

  /*
   * V1 requires:
   *
   * - matching brand
   * - matching model
   * - at least 70% overall confidence
   *
   * This keeps the first version
   * deliberately cautious.
   */
  const isStrongMatch =
    bestMatch &&
    bestMatch.confidence >= 70 &&
    bestMatch.matchedFields.includes(
      "brand"
    ) &&
    bestMatch.matchedFields.includes(
      "model"
    );

  if (!bestMatch || !isStrongMatch) {
    console.log(
      "CANONICAL_PRODUCT_NOT_FOUND:",
      {
        brand:
          fingerprint.brand ?? null,
        family:
          fingerprint.family ?? null,
        model:
          fingerprint.model?.base ??
          null,
        bestConfidence:
          bestMatch?.confidence ?? 0,
      }
    );

    return {
      found: false,
    };
  }

  console.log(
    "CANONICAL_PRODUCT_FOUND:",
    {
      productId:
        bestMatch.product.id,
      slug:
        bestMatch.product.slug,
      name:
        bestMatch.product.name,
      confidence:
        bestMatch.confidence,
      matchedFields:
        bestMatch.matchedFields,
    }
  );

  return {
    found: true,
    productId:
      bestMatch.product.id,
    slug:
      bestMatch.product.slug,
    name:
      bestMatch.product.name,
    confidence:
      bestMatch.confidence,
    matchedFields:
      bestMatch.matchedFields,
  };
}