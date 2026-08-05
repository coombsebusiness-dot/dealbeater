import {
  bootstrapProductIntelligence,
  createCameraIntelligenceInput,
  productIntelligenceEngine,
} from "../knowledge/intelligence";

import {
  sonyA6400,
} from "../knowledge/products/cameras/sony/SonyA6400";

bootstrapProductIntelligence();

const input =
  createCameraIntelligenceInput(
    sonyA6400,
    {
      currentPrice:
        699,

      fairPrice:
        649,

      condition:
        "NEW",
    },
  );

const result =
  productIntelligenceEngine
    .analyse(
      input,
    );

console.dir(
  result,
  {
    depth:
      null,
  },
);