import {
  DiscoveryContext,
  DiscoveryItem,
} from "../DiscoveryModels";

export class AppDiscoveryProvider {
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
        id: "frame",

        type: "app",

        priority: 120,

        title: "Frame",

        description:
          "The creative community for photographers.",

        href:
          "https://frameapp.uk",

        image:
          "/images/promotions/frame-guide-banner.webp",

        badge:
          "Our App",

        category:
          "photography",
      },
    ];
  }
}