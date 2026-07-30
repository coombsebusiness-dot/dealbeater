export type SonyCameraFamily =
  | "Alpha 1"
  | "Alpha 7"
  | "Alpha 7R"
  | "Alpha 7S"
  | "Alpha 9"
  | "Alpha 6000"
  | "Cinema Line"
  | "ZV";

export type SonyCameraType =
  | "Mirrorless"
  | "Cinema Camera"
  | "Vlogging Camera";

export type SonySensorFormat =
  | "Full Frame"
  | "APS-C";

export type SonyCameraTier =
  | "Flagship"
  | "Professional"
  | "Hybrid"
  | "High Resolution"
  | "Video Specialist"
  | "Enthusiast"
  | "Creator";

export interface SonyCameraKnowledge {
  id?: string;

  name: string;
  slug: string;

  brand: "sony";
  family: SonyCameraFamily;
  aliases?: string[];

  productType: "camera";
  category?: "Camera";

  cameraType: SonyCameraType;
  sensorFormat: SonySensorFormat;
  tier: SonyCameraTier;

  generation: number;
  releaseYear: number;
  megapixels: number;

  lensMount: "Sony E";
  inBodyStabilisation: boolean;
  headlineVideo: string;
  autofocusSystem: string;

  bestFor: string[];
  strengths?: string[];
  limitations?: string[];

  summary: string;
}