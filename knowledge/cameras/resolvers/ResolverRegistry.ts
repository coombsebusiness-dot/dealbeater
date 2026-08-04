import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import type {
  CameraKnowledgeResolver,
} from "./CameraKnowledgeResolver";

import {
  DefaultCameraResolver,
} from "./DefaultCameraResolver";

import {
  MirrorlessCameraResolver,
} from "./MirrorlessCameraResolver";

export class ResolverRegistry {
  private readonly resolvers:
    CameraKnowledgeResolver[] = [
      new MirrorlessCameraResolver(),

      new DefaultCameraResolver(),
    ];

  resolve(
    blueprint: GuideBlueprint,
  ): CameraKnowledgeResolver {
    const resolver =
      this.resolvers.find(
        (candidate) =>
          candidate.supports(
            blueprint,
          ),
      );

    if (!resolver) {
      throw new Error(
        `No camera knowledge resolver found for blueprint "${blueprint.slug}".`,
      );
    }

    return resolver;
  }
}