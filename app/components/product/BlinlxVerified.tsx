"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/product";

type BlinlxVerifiedProps = {
  product: Product;
};

type VerificationCheck = {
  label: string;
  shortLabel: string;
  description: string;
  passed: boolean;
};

type ProductVerificationMetadata = {
  id?: string | number;
  slug?: string;
  verificationId?: string;
  verification_id?: string;
  verifiedAt?: string;
  verified_at?: string;
  lastCheckedAt?: string;
  last_checked_at?: string;
  updatedAt?: string;
  updated_at?: string;
  analysedAt?: string;
  analysed_at?: string;
};

function getRetailerCount(product: Product) {
  if (Array.isArray(product.topOffers)) {
    const retailers = new Set(
      product.topOffers
        .map((offer) => offer.retailer)
        .filter(Boolean)
    );

    return retailers.size;
  }

  return product.primaryOfferRetailer ? 1 : 0;
}

function createVerificationId(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  const identifier = (hash >>> 0)
    .toString(16)
    .toUpperCase()
    .padStart(8, "0");

  return `BLX-${identifier.slice(0, 4)}-${identifier.slice(4)}`;
}

function formatVerificationDate(value?: string) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getRelativeCheckedDate(value?: string) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const now = new Date();
  const difference = now.getTime() - date.getTime();
  const days = Math.floor(difference / 86_400_000);

  if (days <= 0) {
    return "Today";
  }

  if (days === 1) {
    return "Yesterday";
  }

  if (days < 7) {
    return `${days} days ago`;
  }

  return formatVerificationDate(value);
}

export default function BlinlxVerified({
  product,
}: BlinlxVerifiedProps) {
  const [isOpen, setIsOpen] = useState(false);

  const metadata =
    product as Product & ProductVerificationMetadata;

  const confidence = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        product.scoreContext?.confidence ??
          product.confidence ??
          product.blinlxScore ??
          0
      )
    )
  );

  const retailerCount = getRetailerCount(product);

  const hasSpecifications =
    product.specs &&
    typeof product.specs === "object" &&
    Object.keys(product.specs).some(
      (key) =>
        product.specs[key] !== null &&
        product.specs[key] !== undefined &&
        product.specs[key] !== ""
    );

  const hasAlternatives =
    Array.isArray(product.alternatives) &&
    product.alternatives.length > 0;

  const hasReviewAnalysis =
    typeof product.scoreBreakdown?.reviews === "number" &&
    product.scoreBreakdown.reviews > 0;

  const checks: VerificationCheck[] = [
    {
      label: "Product identity confirmed",
      shortLabel: "Product",
      description:
        "We checked the product name, model and available variant information.",
      passed: Boolean(product.name?.trim()),
    },
    {
      label: "Specifications verified",
      shortLabel: "Specifications",
      description:
        "Important product specifications were collected and reviewed.",
      passed: Boolean(hasSpecifications),
    },
    {
      label: "Price intelligence completed",
      shortLabel: "Pricing",
      description:
        "Current pricing was compared against available market and fair-value data.",
      passed:
        typeof product.currentPrice === "number" ||
        typeof product.fairPrice === "number" ||
        typeof product.lowestPrice === "number",
    },
    {
      label: "Retailers checked",
      shortLabel: "Retailers",
      description:
        retailerCount > 0
          ? `${retailerCount} retailer${
              retailerCount === 1 ? "" : "s"
            } checked for current availability and pricing.`
          : "Retailer availability and pricing were reviewed.",
      passed:
        retailerCount > 0 ||
        Boolean(product.primaryOfferRetailer),
    },
    {
      label: "Customer feedback analysed",
      shortLabel: "Reviews",
      description:
        "Available customer feedback and review sentiment were considered.",
      passed: hasReviewAnalysis,
    },
    {
      label: "Alternatives compared",
      shortLabel: "Alternatives",
      description:
        "Competing products were considered before reaching the final recommendation.",
      passed: hasAlternatives,
    },
  ];

  const completedChecks = checks.filter(
    (check) => check.passed
  ).length;

  const verificationPercentage = Math.round(
    (completedChecks / checks.length) * 100
  );

  const verificationId = useMemo(() => {
    const existingId =
      metadata.verificationId ??
      metadata.verification_id;

    if (existingId) {
      return existingId;
    }

    const identifierSource = [
      metadata.id,
      metadata.slug,
      product.name,
      product.brand,
      product.model,
    ]
      .filter(Boolean)
      .join("-")
      .toLowerCase();

    return createVerificationId(
      identifierSource || "blinlx-product"
    );
  }, [
    metadata.id,
    metadata.slug,
    metadata.verificationId,
    metadata.verification_id,
    product.brand,
    product.model,
    product.name,
  ]);

  const verifiedAt =
    metadata.verifiedAt ??
    metadata.verified_at ??
    metadata.analysedAt ??
    metadata.analysed_at ??
    metadata.updatedAt ??
    metadata.updated_at;

  const lastCheckedAt =
    metadata.lastCheckedAt ??
    metadata.last_checked_at ??
    metadata.updatedAt ??
    metadata.updated_at ??
    verifiedAt;

  const verifiedDate =
    formatVerificationDate(verifiedAt) ??
    "Current analysis";

  const lastCheckedDate =
    getRelativeCheckedDate(lastCheckedAt) ??
    "Latest available data";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen]);

  return (
    <>
      <section
        aria-labelledby="blinlx-verified-title"
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-[36px] border border-[#2ee866]/25 bg-[#0d1922]/95 shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#2ee866]/10 blur-[100px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -right-28 h-80 w-80 rounded-full bg-[#2ee866]/5 blur-[110px]"
          />

          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2ee866] to-transparent"
          />

          <div className="relative px-5 py-10 sm:px-10 sm:py-12 lg:px-14">
            {/* Certificate header */}
            <div className="text-center">
              <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[#2ee866]/40 bg-[#2ee866]/10 shadow-[0_0_70px_rgba(46,232,102,0.22)]">
                <div className="absolute inset-2 rounded-full border border-dashed border-[#2ee866]/30" />

                <span
                  aria-hidden="true"
                  className="relative animate-[blinlxSealIn_650ms_cubic-bezier(0.2,0.8,0.2,1)_both] text-6xl font-black leading-none text-[#2ee866]"
                >
                  ✓
                </span>
              </div>

              <p className="mt-7 text-xs font-black uppercase tracking-[0.28em] text-[#2ee866]">
                Blinlx trust standard
              </p>

              <h2
                id="blinlx-verified-title"
                className="mt-3 text-4xl font-black uppercase tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
              >
                Blinlx Verified
              </h2>

              <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-400 sm:text-base">
                Trusted buying recommendation
              </p>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                This product passed the Blinlx buying
                verification process before receiving its
                recommendation.
              </p>
            </div>

            {/* Certificate details */}
            <div className="mx-auto mt-9 grid max-w-4xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-5 text-center">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
                  Verification ID
                </p>

                <p className="mt-2 font-mono text-base font-black tracking-[0.08em] text-white">
                  {verificationId}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-5 text-center">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
                  Verified
                </p>

                <p className="mt-2 text-base font-black text-white">
                  {verifiedDate}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-5 text-center">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
                  Last checked
                </p>

                <p className="mt-2 text-base font-black text-white">
                  {lastCheckedDate}
                </p>
              </div>
            </div>

            {/* Verification timeline */}
            <div className="mx-auto mt-10 max-w-5xl">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2ee866]">
                    Verification report
                  </p>

                  <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
                    What Blinlx checked
                  </h3>
                </div>

                <p className="text-right text-sm font-bold text-slate-400">
                  {completedChecks} of {checks.length} checks
                  completed
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {checks.map((check, index) => (
                  <div
                    key={check.label}
                    className={`group relative overflow-hidden rounded-2xl border px-4 py-4 transition duration-300 ${
                      check.passed
                        ? "border-[#2ee866]/20 bg-[#2ee866]/[0.055]"
                        : "border-white/10 bg-white/[0.025]"
                    }`}
                    style={{
                      animationDelay: `${index * 80}ms`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                          check.passed
                            ? "bg-[#2ee866]/15 text-[#2ee866]"
                            : "bg-white/5 text-slate-500"
                        }`}
                      >
                        {check.passed ? "✓" : "—"}
                      </span>

                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                          Check {index + 1}
                        </p>

                        <p
                          className={`mt-0.5 text-sm font-bold ${
                            check.passed
                              ? "text-slate-100"
                              : "text-slate-500"
                          }`}
                        >
                          {check.shortLabel}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Confidence */}
            <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-white/10 bg-black/15 p-6 sm:p-7">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                    Verification completed
                  </p>

                  <p className="mt-1 text-2xl font-black text-white">
                    {verificationPercentage}%
                  </p>
                </div>

                {confidence > 0 ? (
                  <div className="text-right">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                      Recommendation confidence
                    </p>

                    <p className="mt-1 text-2xl font-black text-[#2ee866]">
                      {confidence}%
                    </p>
                  </div>
                ) : null}
              </div>

              <div
                className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-label="Blinlx verification completion"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={verificationPercentage}
              >
                <div
                  className="h-full rounded-full bg-[#2ee866] shadow-[0_0_20px_rgba(46,232,102,0.45)] transition-[width] duration-1000 ease-out"
                  style={{
                    width: `${verificationPercentage}%`,
                  }}
                />
              </div>
            </div>

            {/* Brand promise */}
            <div className="mx-auto mt-9 max-w-3xl border-y border-white/10 py-7 text-center">
              <p className="text-xl font-black text-white sm:text-2xl">
                Trust before profit.
              </p>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                We&apos;d rather lose a commission than
                recommend a poor purchase.
              </p>
            </div>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#2ee866]/35 bg-[#2ee866]/10 px-6 text-sm font-black text-[#2ee866] transition duration-200 hover:-translate-y-0.5 hover:border-[#2ee866]/55 hover:bg-[#2ee866]/15 focus:outline-none focus:ring-2 focus:ring-[#2ee866] focus:ring-offset-2 focus:ring-offset-[#0d1922]"
              >
                View verification report
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Verification report modal */}
      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="blinlx-verification-modal-title"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[32px] border border-[#2ee866]/20 bg-[#0d1922] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.65)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2ee866] to-transparent"
            />

            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2ee866]">
                  Verification report
                </p>

                <h2
                  id="blinlx-verification-modal-title"
                  className="mt-3 text-3xl font-black tracking-tight text-white"
                >
                  Why is this Blinlx Verified?
                </h2>

                <p className="mt-2 font-mono text-xs font-bold tracking-[0.08em] text-slate-500">
                  {verificationId}
                </p>
              </div>

              <button
                type="button"
                aria-label="Close verification report"
                onClick={() => setIsOpen(false)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#2ee866]"
              >
                ×
              </button>
            </div>

            <p className="mt-6 leading-7 text-slate-300">
              Before Blinlx reaches a recommendation, we
              examine the available product, pricing,
              retailer, review and comparison data.
            </p>

            <div className="relative mt-8 space-y-3">
              {checks.map((check, index) => (
                <div
                  key={check.label}
                  className={`relative flex items-start gap-4 rounded-2xl border p-5 ${
                    check.passed
                      ? "border-[#2ee866]/15 bg-[#2ee866]/[0.04]"
                      : "border-white/10 bg-white/[0.025]"
                  }`}
                >
                  <div className="relative">
                    <span
                      className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-black ${
                        check.passed
                          ? "bg-[#2ee866]/15 text-[#2ee866]"
                          : "bg-white/5 text-slate-500"
                      }`}
                    >
                      {check.passed ? "✓" : "—"}
                    </span>

                    {index < checks.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-9 h-[calc(100%+12px)] w-px -translate-x-1/2 bg-white/10"
                      />
                    ) : null}
                  </div>

                  <div>
                    <h3
                      className={`font-bold ${
                        check.passed
                          ? "text-white"
                          : "text-slate-500"
                      }`}
                    >
                      {check.label}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {check.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                  Result
                </p>

                <p className="mt-2 font-black text-[#2ee866]">
                  Blinlx Verified
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                  Completed
                </p>

                <p className="mt-2 font-black text-white">
                  {verificationPercentage}%
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                  Confidence
                </p>

                <p className="mt-2 font-black text-white">
                  {confidence > 0
                    ? `${confidence}%`
                    : "Analysed"}
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-[#2ee866]/20 bg-[#2ee866]/5 p-6 text-center">
              <p className="text-xl font-black text-white">
                Trust before profit.
              </p>

              <p className="mt-2 leading-6 text-slate-300">
                We&apos;d rather lose a commission than
                recommend a poor purchase.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-6 min-h-14 w-full rounded-2xl bg-[#2ee866] px-6 font-black text-[#07110b] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#2ee866] focus:ring-offset-2 focus:ring-offset-[#0d1922]"
            >
              Close verification report
            </button>
          </div>
        </div>
      ) : null}

      <style jsx>{`
        @keyframes blinlxSealIn {
          0% {
            opacity: 0;
            transform: scale(0.45) rotate(-12deg);
          }

          70% {
            transform: scale(1.08) rotate(2deg);
          }

          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          span {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}