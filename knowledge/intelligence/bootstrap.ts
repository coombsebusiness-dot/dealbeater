import {
  CameraIntelligenceProvider,
} from "./camera";

import {
  LensIntelligenceProvider,
} from "./lens";

import {
  productIntelligenceEngine,
} from "./types/ProductIntelligenceEngine";

let bootstrapped =
  false;

export function bootstrapProductIntelligence():
  void {
  if (bootstrapped) {
    return;
  }

  productIntelligenceEngine
  .registerMany([
    new CameraIntelligenceProvider(),
    new LensIntelligenceProvider(),
  ]);

  bootstrapped =
    true;
}