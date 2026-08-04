import type {
  CanonicalProduct,
} from "../CanonicalProduct";

export type LensType =
  | "PRIME"
  | "ZOOM";

export type LensFormat =
  | "APS_C"
  | "FULL_FRAME"
  | "MICRO_FOUR_THIRDS"
  | "MEDIUM_FORMAT";

export interface LensProduct
  extends CanonicalProduct {
  category:
    "LENSES";

  productType:
    "LENS";

  lens: {
    mount:
      string;

    format:
      LensFormat;

    type:
      LensType;

    focalLength: {
      minimumMm:
        number;

      maximumMm:
        number;
    };

    aperture: {
      maximumWide:
        number;

      maximumTelephoto:
        number;

      minimum?:
        number;
    };

    stabilised:
      boolean;

    autofocus:
      boolean;

    weatherSealed:
      boolean;

    minimumFocusDistanceMetres?:
      number;

    maximumMagnification?:
      number;

    filterThreadMm?:
      number;

    weightGrams?:
      number;
  };

  compatibleProducts:
    string[];
}