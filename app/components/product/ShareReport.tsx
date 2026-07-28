"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/product";

type ShareReportProps = {
  product: Product;
};

type ShareStatus = "idle" | "copied" | "shared" | "error";

function getVerdict(product: Product) {
  const rawVerdict =
    product.verdictLabel ??
    product.verdict ??
    "View report";

  return String(rawVerdict)
    .replace(/_/g, " ")
    .trim()
    .toUpperCase();
}

function getScore(product: Product) {
  const score = product.blinlxScore;

  if (
    typeof score !== "number" ||
    !Number.isFinite(score)
  ) {
    return null;
  }

  return Math.max(
    0,
    Math.min(100, Math.round(score))
  );
}

function getShareUrl() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.href;
}

function createReportText({
  productName,
  verdict,
  score,
}: {
  productName: string;
  verdict: string;
  score: number | null;
}) {
  const lines = [
    "I checked this product on Blinlx.",
    "",
    "✓ VERIFIED BY BLINLX",
    "",
    productName,
    `Verdict: ${verdict}`,
  ];

  if (score !== null) {
    lines.push(`Blinlx score: ${score}/100`);
  }

  lines.push(
    "",
    "Before you spend a penny, ask Blinlx."
  );

  return lines.join("\n");
}

async function writeToClipboard(text: string) {
  if (
    navigator.clipboard &&
    window.isSecureContext
  ) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");

  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);
  textarea.select();

  const copied = document.execCommand("copy");

  document.body.removeChild(textarea);

  if (!copied) {
    throw new Error("Clipboard copy failed");
  }
}

export default function ShareReport({
  product,
}: ShareReportProps) {
  const [status, setStatus] =
    useState<ShareStatus>("idle");

  const [supportsNativeShare, setSupportsNativeShare] =
    useState(false);

  const verdict = useMemo(
    () => getVerdict(product),
    [
      product.verdict,
      product.verdictLabel,
    ]
  );

  const score = useMemo(
    () => getScore(product),
    [product.blinlxScore]
  );

  const reportSummary = useMemo(
    () =>
      createReportText({
        productName: product.name,
        verdict,
        score,
      }),
    [product.name, score, verdict]
  );

  useEffect(() => {
    setSupportsNativeShare(
      typeof navigator !== "undefined" &&
        typeof navigator.share === "function"
    );
  }, []);

  useEffect(() => {
    if (status === "idle") {
      return;
    }

    const timeout = window.setTimeout(() => {
      setStatus("idle");
    }, 2800);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [status]);

  async function copyReport() {
    const url = getShareUrl();
    const shareText = `${reportSummary}\n\n${url}`;

    try {
      await writeToClipboard(shareText);
      setStatus("copied");
    } catch (error) {
      console.error(
        "[ShareReport] Clipboard error:",
        error
      );

      setStatus("error");
    }
  }

  async function shareNative() {
    const url = getShareUrl();

    if (!navigator.share) {
      await copyReport();
      return;
    }

    try {
      await navigator.share({
        title: `${product.name} | Blinlx Report`,
        text: reportSummary,
        url,
      });

      setStatus("shared");
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      console.error(
        "[ShareReport] Native share error:",
        error
      );

      setStatus("error");
    }
  }

  function openShareWindow(url: string) {
    const shareWindow = window.open(
      url,
      "_blank",
      "noopener,noreferrer,width=720,height=640"
    );

    if (shareWindow) {
      shareWindow.opener = null;
    }
  }

  function shareToX() {
    const url = getShareUrl();

    openShareWindow(
      `https://x.com/intent/post?text=${encodeURIComponent(
        reportSummary
      )}&url=${encodeURIComponent(url)}`
    );
  }

  function shareToWhatsApp() {
    const url = getShareUrl();

    const text = [
      "I found this Blinlx buying report.",
      "",
      "✓ VERIFIED BY BLINLX",
      "",
      product.name,
      `Recommendation: ${verdict}`,
    ];

    if (score !== null) {
      text.push(`Blinlx score: ${score}/100`);
    }

    text.push(
      "",
      "Worth checking before spending your money.",
      "",
      url
    );

    openShareWindow(
      `https://wa.me/?text=${encodeURIComponent(
        text.join("\n")
      )}`
    );
  }

  function shareToFacebook() {
    const url = getShareUrl();

    openShareWindow(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`
    );
  }

  const statusMessage =
    status === "copied"
      ? "Blinlx report copied"
      : status === "shared"
        ? "Blinlx report shared"
        : status === "error"
          ? "We couldn’t share the report"
          : null;

  return (
    <section
      aria-labelledby="share-blinlx-report-title"
      className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-400/[0.07] blur-3xl"
      />

      <div className="relative p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
              Share the verdict
            </p>

            <h2
              id="share-blinlx-report-title"
              className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl"
            >
              Share this Blinlx Report
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Know someone thinking about buying this?
              Share the verified report before they spend
              their money.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.055] px-4 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/15 text-lg font-black text-emerald-300">
              ✓
            </span>

            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-300">
                Verified by Blinlx
              </p>

              <p className="mt-0.5 max-w-[220px] truncate text-sm font-bold text-white">
                {product.name}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <button
            type="button"
            onClick={shareToX}
            aria-label={`Share ${product.name} on X`}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/30 px-5 text-sm font-black text-white transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <span
              aria-hidden="true"
              className="mr-2 text-base"
            >
              𝕏
            </span>

            Share on X
          </button>

          <button
            type="button"
            onClick={shareToWhatsApp}
            aria-label={`Share ${product.name} on WhatsApp`}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/30 px-5 text-sm font-black text-white transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400/30 hover:bg-emerald-400/[0.07] focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <span
              aria-hidden="true"
              className="mr-2 text-base"
            >
              ◉
            </span>

            WhatsApp
          </button>

          <button
            type="button"
            onClick={shareToFacebook}
            aria-label={`Share ${product.name} on Facebook`}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/30 px-5 text-sm font-black text-white transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <span
              aria-hidden="true"
              className="mr-2 text-base"
            >
              f
            </span>

            Facebook
          </button>

          <button
            type="button"
            onClick={copyReport}
            aria-label={`Copy the Blinlx report for ${product.name}`}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-5 text-sm font-black text-emerald-300 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400/45 hover:bg-emerald-400/15 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <span
              aria-hidden="true"
              className="mr-2"
            >
              ⧉
            </span>

            Copy Blinlx Report
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {supportsNativeShare ? (
            <button
              type="button"
              onClick={shareNative}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] px-4 text-sm font-bold text-slate-300 transition hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              Share using another app
            </button>
          ) : null}

          <p className="text-xs leading-5 text-slate-500">
            Sharing opens the selected service. Blinlx
            never posts without your action.
          </p>
        </div>
      </div>

      {statusMessage ? (
        <div
          role="status"
          aria-live="polite"
          className={`absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full border px-5 py-3 text-sm font-black text-white shadow-2xl backdrop-blur-xl ${
            status === "error"
              ? "border-red-400/20 bg-[#241318]/95"
              : "border-emerald-400/20 bg-[#0d1922]/95"
          }`}
        >
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full ${
              status === "error"
                ? "bg-red-400/15 text-red-300"
                : "bg-emerald-400/15 text-emerald-300"
            }`}
          >
            {status === "error" ? "!" : "✓"}
          </span>

          {statusMessage}
        </div>
      ) : null}
    </section>
  );
}