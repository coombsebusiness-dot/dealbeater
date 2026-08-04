import type {
  CanonicalProduct,
} from "../CanonicalProduct";

export interface CameraProduct
  extends CanonicalProduct {
  category:
    "CAMERAS";

  productType:
    | "MIRRORLESS"
    | "DSLR"
    | "COMPACT";

  releaseYear:
    number;

  camera: {
    sensor: {
      format:
        string;

      megapixels:
        number;

      type?:
        string;

      cropFactor?:
        number;
    };

    mount:
      string;

    autofocus: {
      rating:
        number;

      notes:
        string;

      phaseDetectionPoints?:
        number;

      contrastDetectionPoints?:
        number;

      eyeAutofocus?:
        boolean;

      animalEyeAutofocus?:
        boolean;

      birdEyeAutofocus?:
        boolean;

      subjectTracking?:
        boolean;
    };

    video: {
      rating:
        number;

      notes:
        string;

      maximumResolution?:
        string;

      maximum4KFrameRate?:
        number;

      microphoneInput?:
        boolean;

      headphoneOutput?:
        boolean;

      fullyArticulatingScreen?:
        boolean;

      recordingLimitMinutes?:
        number;

      logProfiles?:
        boolean;
    };

    stabilisation: {
      ibis:
        boolean;

      notes:
        string;

      stabilisedLensSupport?:
        boolean;
    };

    battery: {
      shots:
        number;

      model?:
        string;

      removable?:
        boolean;

      usbCharging?:
        boolean;

      usbPower?:
        boolean;
    };

    body?: {
      weightGrams?:
        number;

      viewfinder?:
        boolean;

      builtInFlash?:
        boolean;

      touchscreen?:
        boolean;
    };

    performance?: {
      maximumBurstRateFps?:
        number;

      silentBurstRateFps?:
        number;
    };

    connectivity?: {
      wifi?:
        boolean;

      bluetooth?:
        boolean;

      nfc?:
        boolean;
    };

    intelligence?: {
      beginnerScore?:
        number;

      travelScore?:
        number;

      familyScore?:
        number;

      streetScore?:
        number;

      portraitScore?:
        number;

      landscapeScore?:
        number;

      wildlifeScore?:
        number;

      sportsScore?:
        number;

      videoScore?:
        number;

      vloggingScore?:
        number;

      valueScore?:
        number;

      futureProofScore?:
        number;
    };

    weatherSealed:
      boolean;
  };

  alternatives:
    string[];

  upgradePath:
    string[];
}