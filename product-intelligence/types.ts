export type ProductType =
  | "laptop"
  | "phone"
  | "tablet"
  | "camera"
  | "lens"
  | "monitor"
  | "tv"
  | "gpu"
  | "cpu"
  | "motherboard"
  | "memory"
  | "storage"
  | "console"
  | "watch"
  | "headphones"
  | "accessory"
  | "unknown";

export type ProductCondition =
  | "new"
  | "used"
  | "refurbished"
  | "open-box"
  | "unknown";

export interface ProductModelFingerprint {
  base: string | null;
  revision: string | null;
  variant: string | null;
  sku: string | null;
}

export interface ProductSpecsFingerprint {
  storage: string | null;
  memory: string | null;
  colour: string | null;

  screenSize: string | null;
  resolution: string | null;
  refreshRate: string | null;
  panelType: string | null;
  aspectRatio: string | null;
  focalLength: string | null;
  maximumAperture: string | null;
  stabilisation: string | null;

  ddrGeneration: string | null;
  memorySpeed: string | null;
  moduleCount: number | null;
  memoryFormFactor: string | null;
  latency: string | null;

  sensorSize: string | null;
mount: string | null;
megapixels: string | null;
videoResolution: string | null;

  connectivity: string[];
}

export interface ProductBundleFingerprint {
  isBundle: boolean;
  items: string[];
}

export interface ProductFingerprint {
  originalTitle: string;
  normalisedTitle: string;

  brand: string | null;
  family: string | null;
  productType: ProductType;

  model: ProductModelFingerprint;
  specs: ProductSpecsFingerprint;

  condition: ProductCondition;
  bundle: ProductBundleFingerprint;

  tokens: string[];
}

export interface FingerprintPatch {
  brand?: string | null;
  family?: string | null;
  productType?: ProductType;

  model?: Partial<ProductModelFingerprint>;
  specs?: Partial<ProductSpecsFingerprint>;

  condition?: ProductCondition;
  bundle?: ProductBundleFingerprint;

  tokens?: string[];
}