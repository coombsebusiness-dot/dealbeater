export type RelationshipType =
  | "ALTERNATIVE"
  | "UPGRADE"
  | "DOWNGRADE"
  | "ACCESSORY"
  | "COMPATIBLE"
  | "SUCCESSOR"
  | "PREDECESSOR"
  | "SAME_FAMILY";

export interface ProductRelationship {

  from: string;

  to: string;

  type: RelationshipType;

  confidence: number;

  reason?: string;
}

export class ProductRelationshipGraph {

  private readonly relationships =
    new Map<
      string,
      ProductRelationship[]
    >();

  add(
    relationship:
      ProductRelationship,
  ): void {

    const existing =
      this.relationships.get(
        relationship.from,
      ) ?? [];

    existing.push(
      relationship,
    );

    this.relationships.set(
      relationship.from,
      existing,
    );

  }

  get(
    productId: string,
  ): ProductRelationship[] {

    return (
      this.relationships.get(
        productId,
      ) ?? []
    );

  }

  getByType(
    productId: string,

    type: RelationshipType,
  ): ProductRelationship[] {

    return this.get(
      productId,
    ).filter(
      relationship =>
        relationship.type ===
        type,
    );

  }

  count(): number {

    return Array.from(
      this.relationships.values(),
    ).reduce(
      (
        total,
        relationships,
      ) =>
        total +
        relationships.length,

      0,
    );

  }

}