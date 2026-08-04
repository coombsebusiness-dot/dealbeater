import type {
  DiscoveryContext,
  DiscoveryItem,
} from "./DiscoveryModels";

export class DiscoveryFilter {
  apply(
    items: DiscoveryItem[],
    context: DiscoveryContext,
  ): DiscoveryItem[] {
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
      .filter(
        (item) =>
          !item.tags ||
          item.tags.length === 0 ||
          this.matchesContext(
            item,
            context,
          ),
      );
  }

  private matchesContext(
    item: DiscoveryItem,
    context: DiscoveryContext,
  ): boolean {
    const contextValues = [
      context.category,
      context.guideSlug,
      context.productType,
      context.brand,
    ]
      .filter(
        (
          value,
        ): value is string =>
          Boolean(value),
      )
      .map((value) =>
        value.toLowerCase(),
      );

    return (
      item.tags?.some((tag) =>
        contextValues.some(
          (contextValue) =>
            contextValue.includes(
              tag.toLowerCase(),
            ) ||
            tag
              .toLowerCase()
              .includes(
                contextValue,
              ),
        ),
      ) ?? true
    );
  }
}