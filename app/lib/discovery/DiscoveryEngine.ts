import {
  AppDiscoveryProvider,
} from "./providers/AppDiscoveryProvider";

import {
  DealDiscoveryProvider,
} from "./providers/DealDiscoveryProvider";

import {
  GuideDiscoveryProvider,
} from "./providers/GuideDiscoveryProvider";

import {
  MerchantDiscoveryProvider,
} from "./providers/MerchantDiscoveryProvider";

import type {
  DiscoveryContext,
  DiscoveryItem,
} from "./DiscoveryModels";

export class DiscoveryEngine {
  private readonly appProvider =
    new AppDiscoveryProvider();

  private readonly merchantProvider =
    new MerchantDiscoveryProvider();

  private readonly guideProvider =
    new GuideDiscoveryProvider();

  private readonly dealProvider =
    new DealDiscoveryProvider();

  build(
    context: DiscoveryContext,
  ): DiscoveryItem[] {
    const items = [
      ...this.appProvider.getItems(
        context,
      ),

      ...this.merchantProvider.getItems(
        context,
      ),

      ...this.guideProvider.getItems(
        context,
      ),

      ...this.dealProvider.getItems(
        context,
      ),
    ];

    return items
      .filter(
        (item) =>
          item.visible !== false,
      )
      .filter(
        (item) =>
          !item.category ||
          item.category ===
            context.category,
      )
      .sort(
        (first, second) =>
          second.priority -
          first.priority,
      );
  }
}

export const discoveryEngine =
  new DiscoveryEngine();