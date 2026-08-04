import type {
  DiscoveryContext,
  DiscoveryItem,
} from "./DiscoveryModels";

export interface ScoredDiscoveryItem {
  item: DiscoveryItem;

  score: number;

  reasons: string[];
}

export class DiscoveryScorer {
  score(
    items: DiscoveryItem[],
    context: DiscoveryContext,
  ): ScoredDiscoveryItem[] {
    return items.map((item) =>
      this.scoreItem(
        item,
        context,
      ),
    );
  }

  private scoreItem(
    item: DiscoveryItem,
    context: DiscoveryContext,
  ): ScoredDiscoveryItem {
    let score =
      item.priority;

    const reasons: string[] = [
      `Base priority: ${item.priority}`,
    ];

    if (
      item.category &&
      item.category ===
        context.category
    ) {
      score += 20;

      reasons.push(
        "Matches the current category.",
      );
    }

    if (
      context.guideSlug &&
      item.tags?.some((tag) =>
        this.matchesValue(
          tag,
          context.guideSlug!,
        ),
      )
    ) {
      score += 15;

      reasons.push(
        "Matches the current guide.",
      );
    }

    if (
      context.productType &&
      item.tags?.some((tag) =>
        this.matchesValue(
          tag,
          context.productType!,
        ),
      )
    ) {
      score += 12;

      reasons.push(
        "Matches the current product type.",
      );
    }

    if (
      context.brand &&
      item.tags?.some((tag) =>
        this.matchesValue(
          tag,
          context.brand!,
        ),
      )
    ) {
      score += 10;

      reasons.push(
        "Matches the current brand.",
      );
    }

    return {
      item,

      score,

      reasons,
    };
  }

  private matchesValue(
    first: string,
    second: string,
  ): boolean {
    const normalisedFirst =
      first
        .trim()
        .toLowerCase();

    const normalisedSecond =
      second
        .trim()
        .toLowerCase();

    return (
      normalisedFirst ===
        normalisedSecond ||
      normalisedFirst.includes(
        normalisedSecond,
      ) ||
      normalisedSecond.includes(
        normalisedFirst,
      )
    );
  }
}