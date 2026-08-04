import type {
  KnowledgeProvider,
} from "./KnowledgeProvider";

import {
  CameraKnowledgeProvider,
} from "./CameraKnowledgeProvider";

export class KnowledgeProviderRegistry {

  private readonly providers =
    new Map<
      string,
      KnowledgeProvider
    >();

  constructor() {

    this.register(
      new CameraKnowledgeProvider(),
    );

  }

  register(
    provider: KnowledgeProvider,
  ) {

    this.providers.set(
      provider.category,
      provider,
    );

  }

  resolve(
    category: string,
  ): KnowledgeProvider | null {

    return (
      this.providers.get(
        category,
      ) ?? null
    );

  }

}