import {
  DiscoveryContext,
  DiscoveryItem,
} from "../DiscoveryModels";

export class MerchantDiscoveryProvider {
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
        id: "mpb",

        type: "merchant",

        priority: 100,

        title: "MPB",

        description:
          "Trusted used camera specialist.",

        href: "/go/mpb",

        image:
          "/images/promotions/mpb-banner.webp",

        badge:
          "Blinlx Approved",

        category:
          "photography",
      },
    ];
  }
}