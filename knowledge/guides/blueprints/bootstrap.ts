import {
  registerGuideBlueprints,
} from "./GuideBlueprintRegistry";

import {
  photographyBlueprints,
} from "./photography";

let bootstrapped = false;

export function bootstrapGuideBlueprints():
  void {
  if (bootstrapped) {
    return;
  }

  registerGuideBlueprints(
    photographyBlueprints,
  );

  bootstrapped = true;
}