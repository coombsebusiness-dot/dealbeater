import type {
  CameraProduct,
} from "./CameraProduct";

export type {
  CameraProduct,
} from "./CameraProduct";

import {
  sonyA6000,
  sonyA6100,
  sonyA6400,
  sonyA6600,
  sonyA6300,
  sonyA6700,
  sonyA6500,
  sonyA7III,
  sonyA7IV,
  sonyA7CII,
  sonyA7RV,
  sonyA1II,
} from "./sony";


import {
    panasonicLumixS5II,
     panasonicLumixS5IIX,
     panasonicLumixS9,
     panasonicLumixGH7,
     panasonicLumixG9II,

} from"./panasonic";

import {
    fujifilmXT5,
    fujifilmXH2,
    fujifilmXH2S,
    fujifilmXS20,
    fujifilmXM5,
    fujifilmX100VI,
} from "./fujifilm";

import {
  canonEOSR10,
  canonEOSR50,
  canonEOSR7,
  canonEOSR8,
  canonEOSR6MarkII,
  canonEOSR5MarkII,
  canonEOSR1,
  canonEOSRP,
  canonEOSR,
  canonEOSR6,
  canonEOSR5,
  canonEOSR3,
  canonEOSR100,
} from "./canon";

import {
  nikonZ30,
  nikonZ50,
  nikonZ50II,
  nikonZfc,
  nikonZ6III,
  nikonZ6II,
  nikonZ8,
  nikonZ9,
  nikonZ5II,
} from "./nikon";


export {
  sonyA6000,
  sonyA6400,
  sonyA7III,
  canonEOSR50,
  canonEOSR10,
  canonEOSR7,
  canonEOSR8,
  canonEOSR6MarkII,
  canonEOSR5MarkII,
  canonEOSR1,
  canonEOSRP,
  canonEOSR,
  canonEOSR6,
  canonEOSR5,
  canonEOSR3,
  canonEOSR100,
  nikonZ30,
  nikonZ50,
  nikonZ50II,
  nikonZfc,
  nikonZ6III,
  nikonZ6II,
  nikonZ8,
  nikonZ9,
  nikonZ5II,
  sonyA7IV,
  sonyA7CII,
  sonyA7RV,
  sonyA1II,
  fujifilmXT5,
  fujifilmXH2,
  fujifilmXH2S,
  fujifilmXS20,
  fujifilmXM5,
  fujifilmX100VI,
  panasonicLumixS5II,
   panasonicLumixS5IIX,
   panasonicLumixS9,
   panasonicLumixGH7,
   panasonicLumixG9II,
};

export const cameraProducts = [
  // Sony
  sonyA6000,
  sonyA6100,
  sonyA6300,
  sonyA6400,
  sonyA6500,
  sonyA6600,
  sonyA6700,
  sonyA7III,
  sonyA7IV,
  sonyA7CII,
  sonyA7RV,
  sonyA1II,

  // Canon
  canonEOSR50,
  canonEOSR10,
  canonEOSR7,
  canonEOSR8,
  canonEOSR6MarkII,
  canonEOSR5MarkII,
  canonEOSR1,
  canonEOSRP,
  canonEOSR,
  canonEOSR6,
  canonEOSR5,
  canonEOSR3,
  canonEOSR100,
//   nikon //
    nikonZ30,
    nikonZ50,
    nikonZ50II,
     nikonZfc,
     nikonZ6III,
     nikonZ6II,
     nikonZ8,
     nikonZ9,
     nikonZ5II,

    //    fujifilm //
    fujifilmXT5,
    fujifilmXH2,
    fujifilmXH2S,
    fujifilmXS20,
    fujifilmXM5,
    fujifilmX100VI,

    // panasonic //

    panasonicLumixS5II,
     panasonicLumixS5IIX,
     panasonicLumixS9,
     panasonicLumixGH7,
     panasonicLumixG9II,
];
function normaliseProductLookup(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /&/g,
      "and",
    )
    .replace(
      /['’]/g,
      "",
    )
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );
}

export function getCameraProductById(
  value: string,
): CameraProduct | undefined {
  const normalisedValue =
    normaliseProductLookup(
      value,
    );

  return cameraProducts.find(
    (product) =>
      normaliseProductLookup(
        product.id,
      ) === normalisedValue ||
      normaliseProductLookup(
        product.slug,
      ) === normalisedValue ||
      normaliseProductLookup(
        product.fullName,
      ) === normalisedValue,
  );
}