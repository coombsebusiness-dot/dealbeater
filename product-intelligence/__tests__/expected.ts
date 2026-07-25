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
  storage?: string | null;
  memory?: string | null;
  colour?: string | null;
  megapixels?: string | null;

  screenSize?: string | null;
  resolution?: string | null;
  refreshRate?: string | null;
  panelType?: string | null;
  aspectRatio?: string | null;
  sensorSize?: string | null;
  mount?: string | null;
  videoResolution?: string | null;

  ddrGeneration?: string | null;
  memorySpeed?: string | null;
  moduleCount?: number | null;
  memoryFormFactor?: string | null;
  latency?: string | null;

  focalLength?: string | null;
maximumAperture?: string | null;
stabilisation?: string | null;

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