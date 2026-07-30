export type NikonCameraFamily =
  | "Z9"
  | "Z8"
  | "Zf"
  | "Z7"
  | "Z6"
  | "Z5"
  | "Z50"
  | "Z fc"
  | "Z30";

export type NikonCameraType =
  | "Mirrorless";

export type NikonSensorFormat =
  | "Full Frame"
  | "APS-C";

export type NikonCameraTier =
  | "Flagship"
  | "Professional"
  | "High Resolution"
  | "Hybrid"
  | "Enthusiast"
  | "Creator"
  | "Entry Level";

export interface NikonCameraKnowledge {

  brand: "nikon";

  productType: "camera";

  name: string;

  slug: string;

  family: NikonCameraFamily;

  cameraType: NikonCameraType;

  sensorFormat: NikonSensorFormat;

  tier: NikonCameraTier;

  generation: number;

  releaseYear: number;

  megapixels: number;

  lensMount: "Nikon Z";

  inBodyStabilisation: boolean;

  headlineVideo: string;

  autofocusSystem: string;

  summary: string;

}