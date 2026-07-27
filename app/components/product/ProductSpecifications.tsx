import type { Product } from "@/types/product";

type ProductSpecificationsProps = {
  product: Product;
};

type SpecificationItem = {
  label: string;
  value: string;
};

const preferredSpecOrder = [
  "brand",
  "model",
  "productType",
  "screenSize",
  "processor",
  "cpu",
  "graphics",
  "gpu",
  "memory",
  "ram",
  "storage",
  "colour",
  "color",
  "connectivity",
  "operatingSystem",
  "battery",
  "weight",
  "dimensions",
  "condition",
];

function formatLabel(key: string): string {
  const customLabels: Record<string, string> = {
    productType: "Product type",
    screenSize: "Screen size",
    operatingSystem: "Operating system",
    cpu: "Processor",
    gpu: "Graphics",
    ram: "Memory",
    sku: "SKU",
  };

  if (customLabels[key]) {
    return customLabels[key];
  }

  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatValue(value: unknown): string | null {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return String(value);
  }

  if (Array.isArray(value)) {
    const items = value
      .map((item) => formatValue(item))
      .filter((item): item is string => Boolean(item));

    return items.length > 0 ? items.join(", ") : null;
  }

  return null;
}

function createSpecificationList(
  product: Product
): SpecificationItem[] {
  const rawSpecs: Record<string, unknown> = {
    brand: product.brand,
    model: product.model?.base,
    category: product.category,
    ...product.specs,
  };

  const entries = Object.entries(rawSpecs)
    .map(([key, value]) => ({
      key,
      value: formatValue(value),
    }))
    .filter(
      (
        item
      ): item is {
        key: string;
        value: string;
      } => Boolean(item.value)
    );

  const uniqueEntries = entries.filter(
    (entry, index, allEntries) =>
      allEntries.findIndex(
        (candidate) =>
          candidate.key.toLowerCase() ===
          entry.key.toLowerCase()
      ) === index
  );

  uniqueEntries.sort((a, b) => {
    const aIndex = preferredSpecOrder.indexOf(a.key);
    const bIndex = preferredSpecOrder.indexOf(b.key);

    if (aIndex === -1 && bIndex === -1) {
      return a.key.localeCompare(b.key);
    }

    if (aIndex === -1) {
      return 1;
    }

    if (bIndex === -1) {
      return -1;
    }

    return aIndex - bIndex;
  });

  return uniqueEntries.map(({ key, value }) => ({
    label: formatLabel(key),
    value,
  }));
}

export default function ProductSpecifications({
  product,
}: ProductSpecificationsProps) {
  const specifications = createSpecificationList(product);

  if (specifications.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04]">
      <div className="border-b border-white/10 p-6 sm:p-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
          Product details
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
          Specifications
        </h2>

        <p className="mt-4 max-w-3xl leading-8 text-slate-400">
          The key specifications Blinlx identified for this exact
          product variant.
        </p>
      </div>

      <div className="p-4 sm:p-6">
        <dl className="grid gap-3 md:grid-cols-2">
          {specifications.map((specification) => (
            <div
              key={`${specification.label}-${specification.value}`}
              className="group rounded-2xl border border-white/10 bg-slate-950/30 p-5 transition hover:border-white/20 hover:bg-white/[0.045]"
            >
              <dt className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                {specification.label}
              </dt>

              <dd className="mt-2 break-words text-base font-bold leading-7 text-white">
                {specification.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="border-t border-white/10 bg-slate-950/20 px-6 py-5 sm:px-8">
        <p className="text-sm leading-6 text-slate-500">
          Specifications are based on the product information
          available when this Blinlx report was generated. Always
          confirm important details with the retailer before
          purchasing.
        </p>
      </div>
    </section>
  );
}