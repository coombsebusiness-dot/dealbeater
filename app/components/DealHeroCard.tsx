"use client";

import { useState } from "react";

type DealVerdict =
  | "BUY"
  | "GOOD DEAL"
  | "CONSIDER"
  | "WAIT"
  | "AVOID";

interface DealHeroCardProps {
  productName: string;
  productImage?: string;
  retailerName: string;
  retailerUrl?: string;
  price: string;
  saving?: string;
  checkedAt?: string;
  score: number;
  confidence: number;
  verdict: DealVerdict;
  headline: string;
  summary: string;
  recommendation: string;
  marketPosition:
  | "BEST_PRICE"
  | "BELOW_AVERAGE"
  | "AVERAGE"
  | "ABOVE_AVERAGE";
}

export default function DealHeroCard({
  productName,
  productImage,
  retailerName,
  retailerUrl,
  price,
  saving,
  checkedAt,
  score,
  confidence,
  verdict,
  headline,
  summary,
  recommendation,
  marketPosition,
}: DealHeroCardProps) {
  const styles = getVerdictStyles(verdict);

  const canBuy =
    verdict === "BUY" ||
    verdict === "GOOD DEAL";

  const verdictLabel =
    verdict === "BUY"
      ? "BUY NOW"
      : verdict;

  const actionLabel =
    verdict === "AVOID"
      ? "View Better Alternatives"
      : verdict === "CONSIDER"
        ? "Compare Alternatives"
        : verdict === "WAIT"
          ? "Check Again Later"
          : "Buy Now";

  const scrollToAlternatives = () => {
    document
      .getElementById("better-alternatives")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };
const marketBadge = (() => {
  switch (marketPosition) {
    case "BEST_PRICE":
      return {
        label: "🏆 Best Price",
        colour: "#22c55e",
      };

    case "BELOW_AVERAGE":
      return {
        label: "💷 Below Market",
        colour: "#16a34a",
      };

    case "AVERAGE":
      return {
        label: "≈ Market Average",
        colour: "#f59e0b",
      };

    case "ABOVE_AVERAGE":
      return {
        label: "▲ Above Market",
        colour: "#ef4444",
      };

    default:
      return {
        label: "Price Unknown",
        colour: "#6b7280",
      };
  }
})();
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#101b26]">
      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_240px] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52ee7e]">
            ✓ AI verified deal
          </p>

          <div className="mt-4 flex items-start gap-4">
            <ProductThumbnail
              image={productImage}
              productName={productName}
            />

            <div className="min-w-0">
              <h3 className="text-xl font-black leading-tight sm:text-2xl lg:text-3xl">
                {productName}
              </h3>

              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#2ee866]/25 bg-[#2ee866]/10 px-3 py-1.5 text-xs font-bold text-[#68f18e]">
                <span>✓</span>
                Exact product match checked
              </div>
            </div>
          </div>

          <div
            className={`mt-5 inline-flex rounded-full border px-4 py-2 text-sm font-black ${styles.border} ${styles.background} ${styles.text}`}
          >
            {verdictLabel}
          </div>

          <p className="mt-4 text-lg font-black text-white">
            {headline}
          </p>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
            {summary}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.035] px-5 py-6">
          <div
            className={`flex h-32 w-32 items-center justify-center rounded-full border-[5px] bg-[#0b151e] shadow-xl ${styles.scoreBorder} ${styles.shadow}`}
          >
            <span className="text-5xl font-black">
              {score}
            </span>
          </div>

          <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-white/60">
            Deal score
          </p>

          <p className="mt-2 text-xs text-white/45">
            Confidence {confidence}%
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#16232d] p-5 sm:p-7">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#68f18e]">
                ✓ Verified best price
              </p>
<div
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 12px",
    borderRadius: 999,
    background: marketBadge.colour,
    color: "#fff",
    fontWeight: 700,
    fontSize: 12,
    marginTop: 8,
  }}
>
  {marketBadge.label}
</div>
              {checkedAt && (
                <span className="text-xs text-white/40">
                  Checked {checkedAt}
                </span>
              )}
            </div>

            <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-2">
              <p className="text-4xl font-black leading-none sm:text-5xl">
                {price}
              </p>

              <p className="pb-1 text-sm font-bold text-white/65">
                at {retailerName}
              </p>
            </div>

            {saving && (
              <p className="mt-3 text-sm font-bold text-[#68f18e]">
                💰 {saving}
              </p>
            )}
          </div>

          {canBuy && retailerUrl ? (
            <a
              href={retailerUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-[#20c95a] px-8 py-4 text-base font-black text-white shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:bg-[#2ee866] lg:w-auto"
            >
              Buy Now →
            </a>
          ) : (
            <button
              type="button"
              onClick={
                verdict === "AVOID" ||
                verdict === "CONSIDER"
                  ? scrollToAlternatives
                  : undefined
              }
              disabled={canBuy}
              className={`flex min-h-14 w-full items-center justify-center rounded-2xl px-8 py-4 text-base font-black transition lg:w-auto ${
                canBuy
                  ? "cursor-not-allowed bg-white/10 text-white/45"
                  : "border border-white/15 bg-white/5 text-white hover:border-[#2ee866]/50 hover:text-[#68f18e]"
              }`}
            >
              {canBuy
                ? "Retailer link unavailable"
                : actionLabel}
            </button>
          )}
        </div>

        <p className="mt-4 border-t border-white/10 pt-4 text-sm font-semibold leading-6 text-white/85">
          {recommendation}
        </p>
      </div>
    </div>
  );
}

function ProductThumbnail({
  image,
  productName,
}: {
  image?: string;
  productName: string;
}) {
  const [imageFailed, setImageFailed] =
    useState(false);

  if (!image || imageFailed) {
    return (
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl shadow-lg sm:h-28 sm:w-28">
        📦
      </div>
    );
  }

  return (
    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white p-2 shadow-lg sm:h-28 sm:w-28">
      <img
        src={image}
        alt={productName}
        onError={() => setImageFailed(true)}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

function getVerdictStyles(
  verdict: DealVerdict
) {
  switch (verdict) {
    case "BUY":
      return {
        text: "text-[#68f18e]",
        border: "border-[#2ee866]/40",
        background: "bg-[#2ee866]/10",
        scoreBorder: "border-[#2ee866]",
        shadow: "shadow-[#2ee866]/20",
      };

    case "GOOD DEAL":
      return {
        text: "text-lime-300",
        border: "border-lime-300/40",
        background: "bg-lime-300/10",
        scoreBorder: "border-lime-300",
        shadow: "shadow-lime-300/20",
      };

    case "CONSIDER":
      return {
        text: "text-amber-300",
        border: "border-amber-300/40",
        background: "bg-amber-300/10",
        scoreBorder: "border-amber-300",
        shadow: "shadow-amber-300/20",
      };

    case "WAIT":
      return {
        text: "text-orange-300",
        border: "border-orange-300/40",
        background: "bg-orange-300/10",
        scoreBorder: "border-orange-300",
        shadow: "shadow-orange-300/20",
      };

    case "AVOID":
      return {
        text: "text-red-300",
        border: "border-red-300/40",
        background: "bg-red-300/10",
        scoreBorder: "border-red-300",
        shadow: "shadow-red-300/20",
      };
  }
}