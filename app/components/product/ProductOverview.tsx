import type { Product } from "@/types/product";

type ProductOverviewProps = {
  product: Product;
};

function formatProductType(product: Product): string {
  if (product.family) {
    return product.family;
  }

  return product.category
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function ProductOverview({
  product,
}: ProductOverviewProps) {
  const highlights = product.highlights?.slice(0, 4) ?? [];
  const productType = formatProductType(product);

  return (
    <section
      id="product-overview"
      className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04]"
    >
      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
            Product overview
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
            What is the {product.name}?
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-300">
            {product.summary}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-bold text-slate-300">
              {product.brand}
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-bold text-slate-300">
              {productType}
            </span>

            {product.model?.base ? (
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-bold text-slate-300">
                Model {product.model.base}
              </span>
            ) : null}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">
            Why people consider it
          </p>

          {highlights.length > 0 ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {highlights.map((highlight, index) => (
                <article
                  key={`${highlight}-${index}`}
                  className="rounded-2xl border border-white/10 bg-slate-950/35 p-5"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 font-black text-emerald-300">
                      ✓
                    </span>

                    <p className="pt-1 text-sm font-bold leading-6 text-slate-200">
                      {highlight}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/35 p-6">
              <p className="leading-7 text-slate-400">
                Blinlx is still gathering detailed product highlights for this
                model.
              </p>
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-5">
            <p className="text-sm font-black text-emerald-300">
              Blinlx quick take
            </p>

            <p className="mt-2 leading-7 text-slate-300">
              This overview is based on the exact product variant analysed by
              Blinlx, including its model, available specifications and current
              market position.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}