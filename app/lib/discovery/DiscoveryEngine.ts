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

import {
  DiscoveryFilter,
} from "./DiscoveryFilter";

import {
  DiscoveryScorer,
} from "./DiscoveryScorer";

import {
  DiscoverySorter,
} from "./DiscoverySorter";

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

  private readonly filter =
    new DiscoveryFilter();

  private readonly scorer =
    new DiscoveryScorer();

  private readonly sorter =
    new DiscoverySorter();

  build(
    context: DiscoveryContext,
  ): DiscoveryItem[] {
    const providerItems = [
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

    const filteredItems =
      this.filter.apply(
        providerItems,
        context,
      );

    const scoredItems =
      this.scorer.score(
        filteredItems,
        context,
      );

    const sortedItems =
      this.sorter.sort(
        scoredItems,
      );

    return sortedItems.map(
      (scoredItem) =>
        scoredItem.item,
    );
  }
}

export const discoveryEngine =
  new DiscoveryEngine();