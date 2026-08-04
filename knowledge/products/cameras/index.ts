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
} from "./sony";

import {
  canonEOSR10,
  canonEOSR50,
  canonEOSR7,
} from "./canon";

import {
  nikonZ30,
  nikonZ50,
  nikonZ50II,
  nikonZfc,
} from "./nikon";


export {
  sonyA6000,
  sonyA6400,
  canonEOSR50,
  canonEOSR10,
  canonEOSR7,
  nikonZ30,
  nikonZ50,
  nikonZ50II,
  nikonZfc,
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

  // Canon
  canonEOSR50,
  canonEOSR10,
  canonEOSR7,

//   nikon //
    nikonZ30,
    nikonZ50,
    nikonZ50II,
     nikonZfc,
];