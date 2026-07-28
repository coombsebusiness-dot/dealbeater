"use client";

import { useState } from "react";

type DealVerdict =
  | "BUY"
  | "GOOD DEAL"
  | "CONSIDER"
  | "WAIT"
  | "AVOID";

type MarketPosition =
  | "BEST_PRICE"
  | "BELOW_AVERAGE"
  | "AVERAGE"
  | "ABOVE_AVERAGE";

type TopOffer = {
  retailer: string;
  title: string;
  price: number;
  url?: string;
  image?: string;
};

interface DealHeroCardProps {
  productName: string;
  productImage?: string;
  retailerName: string;
  retailerUrl?: string;
  ctaUrl?: string;
  ctaLabel?: string;
  price: string;
  saving?: string;
  checkedAt?: string;
  score: number;
  confidence: number;
  verdict: DealVerdict;
  headline: string;
  summary: string;
  recommendation: string;
  topOffers: TopOffer[];
  marketPosition: MarketPosition;
}

export default function DealHeroCard({
  productName,
  productImage,
  retailerName,
  retailerUrl,
  ctaUrl,
  ctaLabel,
  price,
  saving,
  checkedAt,
  score,
  confidence,
  verdict,
  headline,
  summary,
  recommendation,
  topOffers,
  marketPosition,
}: DealHeroCardProps) {
  const verdictStyle = getVerdictStyles(verdict);
  const marketBadge = getMarketBadge(marketPosition);

  const bestDealUrl = retailerUrl || ctaUrl;

  const verdictLabel =
    verdict === "BUY"
      ? "BUY NOW"
      : verdict === "GOOD DEAL"
        ? "GOOD DEAL"
        : verdict;

  const buttonLabel =
    ctaLabel ||
    (verdict === "AVOID"
      ? "View Better Alternatives"
      : verdict === "WAIT"
        ? "Check Again Later"
        : verdict === "CONSIDER"
          ? "Compare Alternatives"
          : "View Best Deal");

  const scrollToPrices = () => {
    document.getElementById("compare-prices")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const visibleOffers = topOffers.slice(0, 3);

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#101b26] shadow-2xl shadow-black/30">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#2ee866]/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-[#2ee866]/5 blur-3xl" />
      </div>

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.025] px-5 py-4 sm:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#2ee866]/25 bg-[#2ee866]/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.15em] text-[#68f18e]">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#2ee866] text-[10px] text-[#102018]">
                ✓
              </span>
              AI verified deal
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-white/60">
              {confidence}% confidence
            </span>
          </div>

          {checkedAt && (
            <span className="text-xs font-medium text-white/40">
              Checked {checkedAt}
            </span>
          )}
        </div>

        <div className="grid gap-8 px-5 py-7 sm:px-8 sm:py-9 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center">
          <div className="min-w-0">
            <div className="flex items-start gap-4 sm:gap-6">
              <ProductThumbnail
                image={productImage}
                productName={productName}
              />

              <div className="min-w-0 flex-1">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#68f18e]">
                  Product verified
                </p>

                <h2 className="mt-2 text-2xl font-black leading-[1.08] tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {productName}
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/70">
                    <span className="text-[#68f18e]">✓</span>
                    Exact product match
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/70">
                    <span className="text-[#68f18e]">✓</span>
                    Trusted retailer
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-7">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black ${verdictStyle.border} ${verdictStyle.background} ${verdictStyle.text}`}
              >
                <span className={`h-2 w-2 rounded-full ${verdictStyle.dot}`} />
                {verdictLabel}
              </div>

              <h3 className="mt-4 text-xl font-black text-white sm:text-2xl">
                {headline}
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
                {summary}
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-[#2ee866]/20 bg-gradient-to-b from-[#1b3229] to-[#13231d] p-5 shadow-xl shadow-black/20 sm:p-6">
            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#2ee866]/15 blur-3xl" />

            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[11px] font-black uppercase tracking-[0.17em] text-[#68f18e]">
                  💚 Best verified deal today
                </p>

                <span
                  className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wide ${marketBadge.className}`}
                >
                  {marketBadge.label}
                </span>
              </div>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                  Best price
                </p>

                <p className="mt-2 text-5xl font-black leading-none tracking-tight text-white sm:text-6xl">
                  {price}
                </p>

                <p className="mt-3 text-sm font-bold text-white/65">
                  Sold by{" "}
                  <span className="text-white">
                    {retailerName}
                  </span>
                </p>
              </div>

              {saving && (
                <div className="mt-5 rounded-2xl border border-[#2ee866]/20 bg-[#2ee866]/10 px-4 py-3">
                  <p className="text-sm font-black text-[#68f18e]">
                    You save {saving}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/55">
                    Compared with today&apos;s average market price.
                  </p>
                </div>
              )}

              <div className="mt-5 grid grid-cols-2 gap-2">
                <MetricPill
                  value={`${score}/100`}
                  label="Deal score"
                />

                <MetricPill
                  value={`${confidence}%`}
                  label="Confidence"
                />
              </div>

              {bestDealUrl ? (
                <a
                  href={bestDealUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mt-5 flex min-h-14 w-full items-center justify-center rounded-2xl bg-[#2ee866] px-6 py-4 text-base font-black text-[#102018] shadow-lg shadow-[#2ee866]/15 transition duration-200 hover:-translate-y-0.5 hover:bg-[#68f18e]"
                >
                  {buttonLabel}
                  <span className="ml-2">→</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={scrollToPrices}
                  className="mt-5 flex min-h-14 w-full items-center justify-center rounded-2xl border border-[#2ee866]/30 bg-[#2ee866]/10 px-6 py-4 text-base font-black text-[#68f18e] transition hover:border-[#2ee866]/60 hover:bg-[#2ee866]/15"
                >
                  Compare Verified Prices
                  <span className="ml-2">↓</span>
                </button>
              )}

              <p className="mt-3 text-center text-[11px] leading-5 text-white/35">
                Retailer links may earn Blinlx a commission at no extra cost to
                you.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-[#16232d] px-5 py-5 sm:px-8">
          <div className="grid gap-3 sm:grid-cols-3">
            <TrustPoint
              icon="✓"
              title="Price checked today"
              text="Compared against live offers"
            />

            <TrustPoint
              icon="✓"
              title="Exact product verified"
              text="Variant and listing checked"
            />

            <TrustPoint
              icon="✓"
              title="Retailer assessed"
              text="Trust and buyer protection checked"
            />
          </div>

          <p className="mt-5 border-t border-white/10 pt-5 text-sm font-semibold leading-6 text-white/80">
            {recommendation}
          </p>
        </div>

        {visibleOffers.length > 0 && (
          <div
            id="compare-prices"
            className="scroll-mt-6 border-t border-white/10 bg-[#0c1720] px-5 py-7 sm:px-8"
          >
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.17em] text-[#68f18e]">
                  Compare prices
                </p>

                <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
                  Other verified offers
                </h3>

                <p className="mt-1 text-sm text-white/50">
                  Choose the retailer and price that suits you best.
                </p>
              </div>

              <span className="text-xs font-bold text-white/35">
                {visibleOffers.length} offers checked
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {visibleOffers.map((offer, index) => {
                const cheapestPrice =
                  visibleOffers[0]?.price ?? offer.price;

                const priceDifference =
                  offer.price - cheapestPrice;

                return (
                  <OfferRow
                    key={`${offer.retailer}-${offer.price}-${index}`}
                    offer={offer}
                    index={index}
                    difference={priceDifference}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductThumbnail({
  image,
  productName,
}: {
  image?: string;
  productName: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!image || imageFailed) {
    return (
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[24px] border border-white/10 bg-white/5 text-4xl shadow-xl shadow-black/20 sm:h-32 sm:w-32">
        📦
      </div>
    );
  }

  return (
    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-white p-3 shadow-xl shadow-black/20 sm:h-32 sm:w-32">
      <img
        src={image}
        alt={productName}
        onError={() => setImageFailed(true)}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

function MetricPill({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 px-3 py-3 text-center">
      <p className="text-base font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">
        {label}
      </p>
    </div>
  );
}

function TrustPoint({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2ee866]/15 text-sm font-black text-[#68f18e]">
        {icon}
      </span>

      <div>
        <p className="text-sm font-black text-white">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-white/45">
          {text}
        </p>
      </div>
    </div>
  );
}

function OfferRow({
  offer,
  index,
  difference,
}: {
  offer: TopOffer;
  index: number;
  difference: number;
}) {
  return (
    <div
      className={`grid gap-4 rounded-2xl border p-4 transition hover:-translate-y-0.5 ${
        index === 0
          ? "border-[#2ee866]/30 bg-[#2ee866]/[0.07]"
          : "border-white/10 bg-white/[0.03]"
      } sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center`}
    >
      <div className="flex min-w-0 items-center gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-lg ${
            index === 0
              ? "border-[#2ee866]/25 bg-[#2ee866]/10"
              : "border-white/10 bg-white/5"
          }`}
        >
          {index === 0 ? "🏆" : index + 1}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-black text-white">
              {offer.retailer}
            </p>

            {index === 0 && (
              <span className="rounded-full bg-[#2ee866]/15 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#68f18e]">
                Best price
              </span>
            )}
          </div>

          <p className="mt-1 line-clamp-1 text-xs text-white/40">
            {offer.title}
          </p>

          {difference > 0 && (
            <p className="mt-1 text-xs font-bold text-white/50">
              £{difference.toFixed(2)} more than the best price
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <p className="text-2xl font-black text-white">
          £{offer.price.toFixed(2)}
        </p>

        {offer.url ? (
          <a
            href={offer.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`flex min-h-11 items-center justify-center rounded-xl px-5 py-3 text-sm font-black transition hover:-translate-y-0.5 ${
              index === 0
                ? "bg-[#2ee866] text-[#102018] hover:bg-[#68f18e]"
                : "border border-white/15 bg-white/5 text-white hover:border-[#2ee866]/50 hover:text-[#68f18e]"
            }`}
          >
            View deal
            <span className="ml-1.5">→</span>
          </a>
        ) : (
          <span className="rounded-xl border border-white/10 px-4 py-3 text-xs font-bold text-white/30">
            Link unavailable
          </span>
        )}
      </div>
    </div>
  );
}

function getMarketBadge(marketPosition: MarketPosition) {
  switch (marketPosition) {
    case "BEST_PRICE":
      return {
        label: "🏆 Best price",
        className:
          "border-[#2ee866]/30 bg-[#2ee866]/15 text-[#68f18e]",
      };

    case "BELOW_AVERAGE":
      return {
        label: "↓ Below market",
        className:
          "border-emerald-400/30 bg-emerald-400/15 text-emerald-300",
      };

    case "AVERAGE":
      return {
        label: "≈ Market average",
        className:
          "border-amber-400/30 bg-amber-400/15 text-amber-300",
      };

    case "ABOVE_AVERAGE":
      return {
        label: "↑ Above market",
        className:
          "border-red-400/30 bg-red-400/15 text-red-300",
      };
  }
}

function getVerdictStyles(verdict: DealVerdict) {
  switch (verdict) {
    case "BUY":
      return {
        text: "text-[#68f18e]",
        border: "border-[#2ee866]/40",
        background: "bg-[#2ee866]/10",
        dot: "bg-[#2ee866]",
      };

    case "GOOD DEAL":
      return {
        text: "text-lime-300",
        border: "border-lime-300/40",
        background: "bg-lime-300/10",
        dot: "bg-lime-300",
      };

    case "CONSIDER":
      return {
        text: "text-amber-300",
        border: "border-amber-300/40",
        background: "bg-amber-300/10",
        dot: "bg-amber-300",
      };

    case "WAIT":
      return {
        text: "text-orange-300",
        border: "border-orange-300/40",
        background: "bg-orange-300/10",
        dot: "bg-orange-300",
      };

    case "AVOID":
      return {
        text: "text-red-300",
        border: "border-red-300/40",
        background: "bg-red-300/10",
        dot: "bg-red-300",
      };
  }
}