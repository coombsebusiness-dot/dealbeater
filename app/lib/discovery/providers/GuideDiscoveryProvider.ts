import {
  DiscoveryContext,
  DiscoveryItem,
} from "../DiscoveryModels";

export class GuideDiscoveryProvider {
  getItems(
    context: DiscoveryContext,
  ): DiscoveryItem[] {
    if (
      context.category !==
      "photography"
    ) {
      return [];
    }

    return [
      {
        id: "mirrorless",

        type: "guide",

        priority: 80,

        title:
          "Mirrorless vs DSLR",

        description:
          "Understand the differences before buying.",

        href:
          "/guides/mirrorless-vs-dslr",

        category:
          "photography",
      },
    ];
  }
}