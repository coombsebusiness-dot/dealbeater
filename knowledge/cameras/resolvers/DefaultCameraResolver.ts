import type {
  CameraKnowledgeResolver,
} from "./CameraKnowledgeResolver";

import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import type {
  CameraKnowledgeDatabase,
} from "../CameraKnowledgeDatabase";

export class DefaultCameraResolver
  implements CameraKnowledgeResolver {

  readonly id =
    "default";

  supports() {
    return true;
  }

  resolve(
    _blueprint: GuideBlueprint,
    database: CameraKnowledgeDatabase,
  ) {
    return {
      ...database.knowledge,
    };
  }

}