export type CanonicalProductStatus =
  | "CURRENT"
  | "DISCONTINUED"
  | "UPCOMING"
  | "UNKNOWN";

export type CanonicalProductCondition =
  | "NEW"
  | "USED"
  | "REFURBISHED";

export interface CanonicalProductImage {
  url: string;

  alt: string;

  source?: string;

  isPrimary?: boolean;
}

export interface CanonicalProductPrice {
  currency: string;

  current?: number;

  typicalNew?: number;

  typicalUsed?: number;

  excellentDeal?: number;

  fairPrice?: number;

  overpricedAbove?: number;

  updatedAt?: string;

  confidence?: number;
}

export interface CanonicalProductRelationship {
  productId: string;

  reason?: string;

  confidence?: number;
}

export interface CanonicalProduct {
  id: string;

  slug: string;

  category: string;

  productType: string;

  brand: string;

  model: string;

  fullName: string;

  description: string;

  status:
    CanonicalProductStatus;

  releaseDate?: string;

  releaseYear?: number;

  identifiers?: {
    sku?: string;

    gtin?: string;

    ean?: string;

    mpn?: string;
  };

  images: {
    primary?: CanonicalProductImage;

    gallery:
      CanonicalProductImage[];
  };

  specifications:
    Record<
      string,
      string | number | boolean
    >;

  strengths:
    string[];

  weaknesses:
    string[];

  bestFor:
    string[];

  avoidIf:
    string[];

  buyingAdvice:
    string;

  prices?: {
    new?: CanonicalProductPrice;

    used?: CanonicalProductPrice;

    refurbished?: CanonicalProductPrice;
  };

  relationships: {
    alternatives:
      CanonicalProductRelationship[];

    upgrades:
      CanonicalProductRelationship[];

    accessories:
      CanonicalProductRelationship[];

    compatibleProducts:
      CanonicalProductRelationship[];
  };

  confidence:
    number;

  sources:
    string[];

  createdAt:
    string;

  updatedAt:
    string;
}