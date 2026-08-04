import {
  getProductBySlug,
} from "@/app/components/lib/products/getProductBySlug";

import type {
  CanonicalProduct,
} from "./CanonicalProduct";

import {
  ProductRelationshipGraph,
} from "./graph";

import type {
  ProductRelationship,
  RelationshipType,
} from "./graph";

import {
  ProductIntelligenceEngine,
} from "./intelligence";

import type {
  ResolvedCanonicalProduct,
} from "./ResolvedCanonicalProduct";

import {
  resolveCanonicalProduct,
} from "./resolveCanonicalProduct";

import {
  ProductRegistry,
} from "./registry";

export class ProductBrain {
  constructor(
    private readonly registry =
      new ProductRegistry(),
     
      private readonly intelligence =
  new ProductIntelligenceEngine(),

  private readonly graph =
  new ProductRelationshipGraph(),

      
  ) {}

  register(
    product: CanonicalProduct,
  ): void {
    this.registry.register(
      product,
    );
    product.relationships.alternatives.forEach(
  (relationship) => {
    this.graph.add({
      from:
        product.id,

      to:
        relationship.productId,

      type:
        "ALTERNATIVE",

      confidence:
        relationship.confidence ??
        product.confidence,

      reason:
        relationship.reason,
    });
  },
);

product.relationships.upgrades.forEach(
  (relationship) => {
    this.graph.add({
      from:
        product.id,

      to:
        relationship.productId,

      type:
        "UPGRADE",

      confidence:
        relationship.confidence ??
        product.confidence,

      reason:
        relationship.reason,
    });
  },
);

product.relationships.accessories.forEach(
  (relationship) => {
    this.graph.add({
      from:
        product.id,

      to:
        relationship.productId,

      type:
        "ACCESSORY",

      confidence:
        relationship.confidence ??
        product.confidence,

      reason:
        relationship.reason,
    });
  },
);

product.relationships.compatibleProducts.forEach(
  (relationship) => {
    this.graph.add({
      from:
        product.id,

      to:
        relationship.productId,

      type:
        "COMPATIBLE",

      confidence:
        relationship.confidence ??
        product.confidence,

      reason:
        relationship.reason,
    });
  },
);
  }
  

  registerMany(
    products:
      CanonicalProduct[],
  ): void {
    products.forEach(
      (product) => {
        this.register(
          product,
        );
      },
    );
  }

  findKnowledge(
    slug: string,
  ): CanonicalProduct | null {
    return this.registry
      .findBySlug(
        slug,
      );
  }

  addRelationship(
  relationship: ProductRelationship,
): void {
  this.graph.add(
    relationship,
  );
}

relationshipsFor(
  productId: string,
) {
  return this.graph.get(
    productId,
  );
}

relationshipsByType(
  productId: string,
  type: RelationshipType,
) {
  return this.graph.getByType(
    productId,
    type,
  );
}

  async analyse(
  slug: string,
) {
  const product =
    await this.get(
      slug,
    );

  if (!product) {
    return null;
  }

  return this.intelligence
    .analyse(
      product,
    );
}

  async get(
    slug: string,
  ): Promise<
    ResolvedCanonicalProduct | null
  > {
    const knowledge =
      this.findKnowledge(
        slug,
      );

    if (!knowledge) {
      return null;
    }

    return resolveCanonicalProduct(
      knowledge,
    );
  }

  async getSavedProduct(
    slug: string,
  ) {
    return getProductBySlug(
      slug,
    );
  }

  has(
    slug: string,
  ): boolean {
    return this.registry.has(
      slug,
    );
  }

  getAllKnowledge():
    CanonicalProduct[] {
    return this.registry
      .getAll();
  }

  count(): number {
    return this.registry.count();
  }
}