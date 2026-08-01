import {
  DiscoveryItem,
} from "./DiscoveryModels";

export class DiscoveryRegistry {
  private items: DiscoveryItem[] =
    [];

  register(
    item: DiscoveryItem,
  ) {
    this.items.push(item);
  }

  all() {
    return [...this.items];
  }

  clear() {
    this.items = [];
  }
}

export const discoveryRegistry =
  new DiscoveryRegistry();