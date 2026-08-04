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
      {
  id: "ask-blinlx-photography",

  type: "assistant",

  priority: 90,

  title:
    "Still unsure which camera to buy?",

  description:
    "Tell Blinlx what you want to photograph, your experience level and your budget. We’ll help you choose the right setup.",

  href:
    "/?q=Help me choose a beginner photography setup",

  badge:
    "Ask Blinlx",

  category:
    "photography",
},
    ];
  }
}