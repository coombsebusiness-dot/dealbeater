import type {
  Product,
} from "@/types/product";

import type {
  CanonicalProduct,
} from "./CanonicalProduct";

export interface ResolvedCanonicalProduct<
  TProduct extends CanonicalProduct =
    CanonicalProduct,
> {
  knowledge:
    TProduct;

  savedProduct:
    Product | null;

  image: {
    url:
      string | null;

    alt:
      string;
  };

  pricing: {
    current?:
      number;

    fair?:
      number;

    lowest?:
      number;
  };

  offers:
    NonNullable<
      Product["topOffers"]
    >;

  resolvedAt:
    string;
}