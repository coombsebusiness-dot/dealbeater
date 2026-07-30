export type CanonCameraFamily =
  | "EOS R1"
  | "EOS R3"
  | "EOS R5"
  | "EOS R6"
  | "EOS R8"
  | "EOS R7"
  | "EOS R10"
  | "EOS R50"
  | "EOS R100"
  | "Cinema EOS";

export type CanonCameraType =
  | "Mirrorless"
  | "Cinema Camera";

export type CanonSensorFormat =
  | "Full Frame"
  | "APS-C"
  | "Super 35";
  
export type CanonCameraTier =
  | "Flagship"
  | "Professional"
  | "Hybrid"
  | "High Resolution"
  | "Enthusiast"
  | "Creator"
  | "Entry Level";

export interface CanonCameraKnowledge {

  brand: "canon";

  productType: "camera";

  name: string;

  slug: string;

  family: CanonCameraFamily;

  cameraType: CanonCameraType;

  sensorFormat: CanonSensorFormat;

  tier: CanonCameraTier;

  generation: number;

  releaseYear: number;

  megapixels: number;

  lensMount: "Canon RF";

  inBodyStabilisation: boolean;

  headlineVideo: string;

  summary: string;

}