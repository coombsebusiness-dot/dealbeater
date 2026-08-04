import {
  cameraProducts,
} from "./cameras";

import {
  batteryProducts,
} from "./batteries";

import {
  ProductBrain,
} from "./ProductBrain";
import {
  lensProducts,
} from "./lenses";

export const defaultProductBrain =
  new ProductBrain();

defaultProductBrain.registerMany([
  ...cameraProducts,
  ...batteryProducts,
   ...lensProducts,
]);