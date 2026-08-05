import type {
  ProductIntelligence,
} from "../types/ProductIntelligence";

export type IntelligenceCategory =
  | "camera"
  | "lens"
  | "laptop"
  | "phone"
  | "tablet"
  | "tv"
  | "monitor"
  | "drone"
  | "console"
  | "headphones"
  | "watch"
  | "accessory"
  | "unknown";

export interface ProductIntelligenceInput {
  productId:
    string;

  productName:
    string;

  category:
    string;

  brand?:
    string;

  model?:
    string;

  currentPrice?:
    number;

  fairPrice?:
    number;

  condition?:
    "NEW" |
    "USED" |
    "REFURBISHED" |
    "UNKNOWN";

  attributes?:
    Record<
      string,
      unknown
    >;
}

export interface ProductIntelligenceProvider {
  readonly category:
    IntelligenceCategory;

  supports(
    input:
      ProductIntelligenceInput,
  ): boolean;

  analyse(
    input:
      ProductIntelligenceInput,
  ): ProductIntelligence;
}

export interface ProductIntelligenceResult {
  productId:
    string;

  productName:
    string;

  category:
    IntelligenceCategory;

  matched:
    boolean;

  provider:
    string | null;

  intelligence:
    ProductIntelligence | null;

  warnings:
    string[];
}

function normaliseCategory(
  category: string,
): IntelligenceCategory {
  const value =
    category
      .trim()
      .toLowerCase()
      .replace(
        /[_\s]+/g,
        "-",
      );

  if (
    value.includes(
      "camera",
    )
  ) {
    return "camera";
  }

  if (
    value.includes(
      "lens",
    )
  ) {
    return "lens";
  }

  if (
    value.includes(
      "laptop",
    ) ||
    value.includes(
      "notebook",
    )
  ) {
    return "laptop";
  }

  if (
    value.includes(
      "phone",
    ) ||
    value.includes(
      "smartphone",
    )
  ) {
    return "phone";
  }

  if (
    value.includes(
      "tablet",
    )
  ) {
    return "tablet";
  }

  if (
    value.includes(
      "television",
    ) ||
    value === "tv"
  ) {
    return "tv";
  }

  if (
    value.includes(
      "monitor",
    )
  ) {
    return "monitor";
  }

  if (
    value.includes(
      "drone",
    )
  ) {
    return "drone";
  }

  if (
    value.includes(
      "console",
    )
  ) {
    return "console";
  }

  if (
    value.includes(
      "headphone",
    ) ||
    value.includes(
      "earbud",
    )
  ) {
    return "headphones";
  }

  if (
    value.includes(
      "watch",
    )
  ) {
    return "watch";
  }

  if (
    value.includes(
      "accessory",
    )
  ) {
    return "accessory";
  }

  return "unknown";
}

function validateInput(
  input:
    ProductIntelligenceInput,
): string[] {
  const warnings:
    string[] = [];

  if (
    !input.productId.trim()
  ) {
    warnings.push(
      "Product intelligence input is missing a product ID.",
    );
  }

  if (
    !input.productName.trim()
  ) {
    warnings.push(
      "Product intelligence input is missing a product name.",
    );
  }

  if (
    !input.category.trim()
  ) {
    warnings.push(
      "Product intelligence input is missing a category.",
    );
  }

  if (
    input.currentPrice !==
      undefined &&
    input.currentPrice < 0
  ) {
    warnings.push(
      "Current price cannot be negative.",
    );
  }

  if (
    input.fairPrice !==
      undefined &&
    input.fairPrice < 0
  ) {
    warnings.push(
      "Fair price cannot be negative.",
    );
  }

  return warnings;
}

export class ProductIntelligenceEngine {
  private readonly providers =
    new Map<
      IntelligenceCategory,
      ProductIntelligenceProvider[]
    >();

  register(
    provider:
      ProductIntelligenceProvider,
  ): void {
    const existingProviders =
      this.providers.get(
        provider.category,
      ) ??
      [];

    const duplicate =
      existingProviders.some(
        (existingProvider) =>
          existingProvider ===
          provider,
      );

    if (duplicate) {
      return;
    }

    this.providers.set(
      provider.category,
      [
        ...existingProviders,
        provider,
      ],
    );
  }

  registerMany(
    providers:
      ProductIntelligenceProvider[],
  ): void {
    providers.forEach(
      (provider) => {
        this.register(
          provider,
        );
      },
    );
  }

  analyse(
    input:
      ProductIntelligenceInput,
  ): ProductIntelligenceResult {
    const warnings =
      validateInput(
        input,
      );

    const category =
      normaliseCategory(
        input.category,
      );

    if (
      category ===
      "unknown"
    ) {
      return {
        productId:
          input.productId,

        productName:
          input.productName,

        category,

        matched:
          false,

        provider:
          null,

        intelligence:
          null,

        warnings: [
          ...warnings,

          `No supported intelligence category could be resolved from "${input.category}".`,
        ],
      };
    }

    const categoryProviders =
      this.providers.get(
        category,
      ) ??
      [];

    const provider =
      categoryProviders.find(
        (candidate) =>
          candidate.supports(
            input,
          ),
      );

    if (!provider) {
      return {
        productId:
          input.productId,

        productName:
          input.productName,

        category,

        matched:
          false,

        provider:
          null,

        intelligence:
          null,

        warnings: [
          ...warnings,

          `No intelligence provider currently supports ${input.productName}.`,
        ],
      };
    }

    try {
      const intelligence =
        provider.analyse(
          input,
        );

      return {
        productId:
          input.productId,

        productName:
          input.productName,

        category,

        matched:
          true,

        provider:
          provider.constructor.name,

        intelligence,

        warnings,
      };
    } catch (error) {
      return {
        productId:
          input.productId,

        productName:
          input.productName,

        category,

        matched:
          false,

        provider:
          provider.constructor.name,

        intelligence:
          null,

        warnings: [
          ...warnings,

          error instanceof Error
            ? `Product intelligence failed: ${error.message}`
            : `Product intelligence failed: ${String(
                error,
              )}`,
        ],
      };
    }
  }

  hasProvider(
    category:
      IntelligenceCategory,
  ): boolean {
    return (
      this.providers.get(
        category,
      )?.length ??
      0
    ) > 0;
  }

  getRegisteredCategories():
    IntelligenceCategory[] {
    return Array.from(
      this.providers.entries(),
    )
      .filter(
        (
          [
            ,
            providers,
          ],
        ) =>
          providers.length > 0,
      )
      .map(
        (
          [
            category,
          ],
        ) =>
          category,
      );
  }

  clearProviders():
    void {
    this.providers.clear();
  }
}

export const productIntelligenceEngine =
  new ProductIntelligenceEngine();