import type {
  ScoredDiscoveryItem,
} from "./DiscoveryScorer";

export class DiscoverySorter {
  sort(
    items: ScoredDiscoveryItem[],
  ): ScoredDiscoveryItem[] {
    return [...items].sort(
      (first, second) => {
        if (
          second.score !==
          first.score
        ) {
          return (
            second.score -
            first.score
          );
        }

        return (
          second.item.priority -
          first.item.priority
        );
      },
    );
  }
}