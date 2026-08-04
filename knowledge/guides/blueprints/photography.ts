import type {
  GuideBlueprint,
} from "./GuideBlueprint";

import {
  createBlueprintsFromCatalogue,
} from "@/knowledge/guides/catalogues";

import {
  photographyCatalogue,
} from "@/knowledge/guides/catalogues/photographyCatalogue";

export const photographyBlueprints:
  GuideBlueprint[] =
  createBlueprintsFromCatalogue(
    photographyCatalogue,
  );