import type {
  ProductCondition,
  ProductType,
} from "../types";

export interface ExpectedFingerprint {
  brand?: string | null;
  family?: string | null;
  productType?: ProductType;

  model?: {
    base?: string | null;
    revision?: string | null;
    variant?: string | null;
    sku?: string | null;
  };

  specs?: {
    memory?: string | null;
    storage?: string | null;
    colour?: string | null;
    screenSize?: string | null;
    connectivity?: string[];
  };

  condition?: ProductCondition;

  bundle?: {
    isBundle?: boolean;
    items?: string[];
  };
}

export interface ProductTestCase {
  name: string;
  input: string;
  expected: ExpectedFingerprint;
}