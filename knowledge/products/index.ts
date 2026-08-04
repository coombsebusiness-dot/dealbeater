export type {
  CanonicalProduct,
  CanonicalProductCondition,
  CanonicalProductImage,
  CanonicalProductPrice,
  CanonicalProductRelationship,
  CanonicalProductStatus,
} from "./CanonicalProduct";

import {
  cameraProducts,
} from "./cameras";

import {
  
  sonyNPFZ100,
} from "./batteries";

export type {
  CameraProduct,
} from "./cameras";

export {
  resolveCanonicalProduct,
} from "./resolveCanonicalProduct";

export type {
  ResolvedCanonicalProduct,
} from "./ResolvedCanonicalProduct";

export {
  ProductRegistry,
} from "./registry";

export {
  ProductBrain,
} from "./ProductBrain";

export {
  defaultProductBrain,
} from "./defaultProductBrain";

export {
  toProductRecommendation,
} from "./toProductRecommendation";

export type {
  LensFormat,
  LensProduct,
  LensType,
} from "./lenses/LensProduct";



export {
  ProductIntelligenceEngine,
} from "./intelligence";

export type {
  ProductBuyingVerdict,
  ProductIntelligence,
  ProductValueAnalysis,
  ProductValueVerdict,
} from "./intelligence";

export {
  cameraProducts,
  sonyA6000,
  sonyA6400,
  canonEOSR50,
} from "./cameras";

export const batteryProducts = [
  
  sonyNPFZ100,
];

export const allProducts = [
  ...cameraProducts,
  ...batteryProducts,
];