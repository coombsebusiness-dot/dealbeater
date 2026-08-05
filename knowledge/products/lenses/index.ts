import type {
  LensProduct,
} from "./LensProduct";

import {
  sonyE18135OSS,
  sonyE35F18OSS,
  sonyE55210OSS,
  sonyE70350GOSS,
  sonyEPZ1650OSS,
} from "./sony";

import {
  canonRF50F18STM,
  canonRF100400ISUSM,
  canonRF100500LISUSM,
  canonRFS18150ISSTM,
  canonRFS1845ISSTM,
  canonRFS55210ISSTM,
} from "./canon";

import {
  nikkorZDX1650VR,
  nikkorZDX18140VR,
  nikkorZDX24F17,
  nikkorZDX50250VR,
} from "./nikon";




export {
  sonyE18135OSS,
  sonyE35F18OSS,
  sonyE55210OSS,
  sonyE70350GOSS,
  sonyEPZ1650OSS,
  canonRFS18150ISSTM,
  canonRFS1845ISSTM,
  canonRFS55210ISSTM,
  canonRF50F18STM,
  canonRF100400ISUSM,
  canonRF100500LISUSM,
  nikkorZDX1650VR,
  nikkorZDX50250VR,
  nikkorZDX18140VR,
  nikkorZDX24F17,
};

export const lensProducts:
  LensProduct[] = [
  sonyEPZ1650OSS,
  sonyE18135OSS,
  sonyE55210OSS,
  sonyE35F18OSS,
  sonyE70350GOSS,

//   Canon//
    canonRFS1845ISSTM,
    canonRFS18150ISSTM,
    canonRFS55210ISSTM,
    canonRF50F18STM,
    canonRF100400ISUSM,
    canonRF100500LISUSM,

    //   Nikkon //
    nikkorZDX1650VR,
    nikkorZDX50250VR,
    nikkorZDX18140VR,
    nikkorZDX24F17,
];

function normaliseLensLookup(
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

export function getLensProductById(
  value: string,
): LensProduct | undefined {
  const lookupValue =
    normaliseLensLookup(
      value,
    );

  return lensProducts.find(
    (product) =>
      normaliseLensLookup(
        product.id,
      ) === lookupValue ||
      normaliseLensLookup(
        product.slug,
      ) === lookupValue ||
      normaliseLensLookup(
        product.fullName,
      ) === lookupValue,
  );
}