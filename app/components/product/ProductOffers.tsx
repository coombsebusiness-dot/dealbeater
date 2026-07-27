import type {
  Product,
  ProductOffer,
} from "@/types/product";

type ProductOffersProps = {
  product: Product;
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

function cleanRetailerName(retailer: string): string {
  const trimmed = retailer.trim();

  if (trimmed.toLowerCase().startsWith("ebay -")) {
    return trimmed.replace(/^ebay\s*-\s*/i, "eBay seller: ");
  }

  return trimmed;
}

function getOfferSaving(
  offer: ProductOffer,
  highestPrice: number
): number {
  return Math.max(0, highestPrice - offer.price);
}

export default function ProductOffers({
  product,
}: ProductOffersProps) {
  const offers = [...(product.topOffers ?? [])]
    .filter(
      (offer) =>
        Number.isFinite(offer.price) &&
        offer.price > 0 &&
        Boolean(offer.url)
    )
    .sort((a, b) => a.price - b.price);

  const highestPrice =
    offers.length > 0
      ? Math.max(...offers.map((offer) => offer.price))
      : 0;

  return (
    <section
      id="best-prices"
      className="scroll-mt-24 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04]"
    >
      <div className="border-b border-white/10 p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
              Verified retailer offers
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Compare prices for {product.name}
            </h2>

            <p className="mt-4 max-w-3xl leading-8 text-slate-400">
              Blinlx compares verified offers for the exact product
              variant and places the lowest available price first.
            </p>
          </div>

          {offers.length > 0 ? (
            <div className="flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-slate-950/35 px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

              <span className="text-sm font-bold text-slate-300">
                {offers.length}{" "}
                {offers.length === 1 ? "offer" : "offers"} found
              </span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {offers.length > 0 ? (
          <div className="space-y-4">
            {offers.map((offer, index) => {
              const isBestOffer = index === 0;
              const saving = getOfferSaving(
                offer,
                highestPrice
              );

              return (
                <article
                  key={`${offer.retailer}-${offer.url}-${index}`}
                  className={`relative overflow-hidden rounded-2xl border transition ${
                    isBestOffer
                      ? "border-emerald-400/35 bg-emerald-400/[0.07] shadow-lg shadow-emerald-950/20"
                      : "border-white/10 bg-slate-950/30 hover:border-white/20 hover:bg-white/[0.045]"
                  }`}
                >
                  {isBestOffer ? (
                    <div className="absolute left-0 top-0 rounded-br-xl bg-emerald-400 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-slate-950">
                      Best price
                    </div>
                  ) : null}

                  <div className="grid gap-5 p-5 pt-14 sm:p-6 sm:pt-14 lg:grid-cols-[96px_minmax(0,1fr)_auto] lg:items-center lg:pt-6">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white">
                      {offer.image ? (
                        // A normal img avoids needing every retailer
                        // image domain in next.config.ts.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={offer.image}
                          alt={`${offer.title} at ${offer.retailer}`}
                          className="h-full w-full object-contain p-2"
                          loading="lazy"
                        />
                      ) : (
                        <span className="px-2 text-center text-xs font-black uppercase tracking-wide text-slate-500">
                          {offer.retailer}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-black text-white">
                          {cleanRetailerName(offer.retailer)}
                        </h3>

                        {isBestOffer ? (
                          <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-emerald-300">
                            Cheapest verified
                          </span>
                        ) : null}
                      </div>

                      <p className="mt-2 line-clamp-2 max-w-3xl text-sm font-medium leading-6 text-slate-400">
                        {offer.title}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-slate-300">
                          Exact variant checked
                        </span>

                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-slate-300">
                          Retailer link verified
                        </span>

                        {!isBestOffer && saving > 0 ? (
                          <span className="rounded-full border border-amber-400/20 bg-amber-400/[0.07] px-3 py-1.5 text-xs font-bold text-amber-300">
                            {formatPrice(saving)} more than best
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-white/10 pt-5 lg:min-w-52 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                          Price
                        </p>

                        <p className="mt-1 text-3xl font-black tracking-tight text-white">
                          {formatPrice(offer.price)}
                        </p>
                      </div>

                      <a
                        href={offer.url}
                        target="_blank"
                        rel="sponsored nofollow noopener noreferrer"
                        aria-label={`View ${product.name} deal at ${offer.retailer} for ${formatPrice(
                          offer.price
                        )}`}
                        className={`inline-flex min-h-12 items-center justify-center rounded-xl px-5 py-3 text-sm font-black transition ${
                          isBestOffer
                            ? "bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/10 hover:-translate-y-0.5 hover:bg-emerald-300"
                            : "border border-white/10 bg-white text-slate-950 hover:-translate-y-0.5 hover:bg-slate-200"
                        }`}
                      >
                        View deal
                        <span
                          className="ml-2"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </a>

                      <p className="text-center text-[11px] leading-4 text-slate-500">
                        Opens the retailer in a new tab
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.05] text-xl">
              £
            </div>

            <h3 className="mt-4 text-xl font-black text-white">
              No live offers available
            </h3>

            <p className="mx-auto mt-2 max-w-xl leading-7 text-slate-400">
              Blinlx has analysed this product, but there are
              currently no verified retailer offers available.
            </p>

            {product.primaryOfferUrl ? (
              <a
                href={product.primaryOfferUrl}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-400 px-6 py-3 font-black text-slate-950 transition hover:bg-emerald-300"
              >
                Check current availability →
              </a>
            ) : null}
          </div>
        )}
      </div>

      <div className="border-t border-white/10 bg-slate-950/20 px-6 py-5 sm:px-8">
        <div className="flex flex-col gap-3 text-sm leading-6 text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Prices and availability can change after leaving
            Blinlx.
          </p>

          <p>
            Some retailer links may earn Blinlx a commission at
            no extra cost to you.
          </p>
        </div>
      </div>
    </section>
  );
}