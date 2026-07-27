import type { Product } from "@/types/product";

type ProductPriceIntelligenceProps = {
  product: Product;
};

function formatPrice(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "—";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProductPriceIntelligence({
  product,
}: ProductPriceIntelligenceProps) {
  const current = product.currentPrice;
  const fair = product.fairPrice;
  const lowest = product.lowestPrice;

  const saving =
    typeof current === "number" &&
    typeof fair === "number"
      ? Math.max(0, fair - current)
      : null;

  return (
    <section className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04]">
      <div className="border-b border-white/10 p-6 sm:p-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
          Price Intelligence
        </p>

        <h2 className="mt-3 text-4xl font-black tracking-tight text-white">
          Is today's price worth paying?
        </h2>

        <p className="mt-4 max-w-3xl leading-8 text-slate-400">
          Blinlx compares today's price with our fair value estimate and the
          lowest verified price we've seen.
        </p>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-6">
          <p className="text-sm uppercase tracking-widest text-slate-400">
            Current Price
          </p>

          <p className="mt-3 text-4xl font-black text-white">
            {formatPrice(current)}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-6">
          <p className="text-sm uppercase tracking-widest text-slate-400">
            Fair Price
          </p>

          <p className="mt-3 text-4xl font-black text-white">
            {formatPrice(fair)}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-6">
          <p className="text-sm uppercase tracking-widest text-slate-400">
            Lowest Seen
          </p>

          <p className="mt-3 text-4xl font-black text-white">
            {formatPrice(lowest)}
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-6">
          <p className="text-sm uppercase tracking-widest text-emerald-300">
            Potential Saving
          </p>

          <p className="mt-3 text-4xl font-black text-emerald-300">
            {saving !== null ? formatPrice(saving) : "—"}
          </p>
        </div>

      </div>

      <div className="border-t border-white/10 p-6 sm:p-8">

        <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-black uppercase tracking-widest text-slate-400">
                Price Status
              </p>

              <h3 className="mt-2 text-3xl font-black text-white">
                {product.priceStatus ?? "Analysed"}
              </h3>

            </div>

            <div className="rounded-full bg-emerald-400 px-5 py-2 font-black text-slate-950">
              Blinlx AI
            </div>

          </div>

          <p className="mt-5 leading-8 text-slate-300">
            {saving && saving > 0
              ? `Today's price is approximately ${formatPrice(
                  saving
                )} below our estimated fair market value, making it one of the stronger buying opportunities we've analysed.`
              : "Today's price sits close to our estimated market value."}
          </p>

        </div>

      </div>
    </section>
  );
}