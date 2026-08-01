import type {
  DiscoveryContext,
  DiscoveryItem,
} from "../DiscoveryModels";

export class DealDiscoveryProvider {
  getItems(
    _context: DiscoveryContext,
  ): DiscoveryItem[] {
    return [];
  }
}