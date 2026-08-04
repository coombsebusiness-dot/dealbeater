import {
  registerRecommendationDataset,
} from "./RecommendationFactory";

import {
  beginnerCameraRecommendations,
} from "./photography/beginner-cameras";

let bootstrapped = false;

export function bootstrapRecommendationDatasets():
  void {
  if (bootstrapped) {
    return;
  }

  registerRecommendationDataset(
    beginnerCameraRecommendations,
  );

  bootstrapped = true;
}