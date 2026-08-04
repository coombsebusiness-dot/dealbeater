import type {
  CanonicalProduct,
} from "../CanonicalProduct";

export class ProductRegistry {

  private readonly products =
    new Map<
      string,
      CanonicalProduct
    >();

  register(
    product: CanonicalProduct,
  ): void {

    this.products.set(
      product.slug,
      product,
    );

  }

  findBySlug(
    slug: string,
  ): CanonicalProduct | null {

    return (
      this.products.get(
        slug.toLowerCase(),
      ) ?? null
    );

  }

  getAll():
    CanonicalProduct[] {

    return Array.from(
      this.products.values(),
    );

  }

  has(
    slug: string,
  ): boolean {

    return this.products.has(
      slug.toLowerCase(),
    );

  }

  count(): number {

    return this.products.size;

  }

}