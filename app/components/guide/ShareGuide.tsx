"use client";

import {
  useState,
} from "react";

interface ShareGuideProps {
  title: string;
  path: string;
}

export function ShareGuide({
  title,
  path,
}: ShareGuideProps) {
  const [copied, setCopied] =
    useState(false);

  const siteUrl =
    "https://blinlx.com";

  const url =
    `${siteUrl}${path}`;

  const encodedUrl =
    encodeURIComponent(url);

  const encodedTitle =
    encodeURIComponent(title);

  async function handleNativeShare() {
    if (!navigator.share) {
      return;
    }

    await navigator.share({
      title,
      url,
    });
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(
      url,
    );

    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1800);
  }

  return (
    <section
      aria-label="Share this guide"
      className="
        rounded-3xl
        border
        border-slate-700/70
        bg-slate-900/60
        p-5
        shadow-lg
        ring-1
        ring-white/5
      "
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">
            Found this guide useful?
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Share it with someone making the same buying decision.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleNativeShare}
            className="
              rounded-xl
              border
              border-green-500/30
              bg-green-500/10
              px-4
              py-2
              text-sm
              font-semibold
              text-green-400
              transition
              hover:bg-green-500/20
            "
          >
            Share
          </button>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
            className="
              rounded-xl
              border
              border-slate-700
              px-4
              py-2
              text-sm
              font-medium
              text-slate-300
              transition
              hover:border-slate-500
              hover:text-white
            "
          >
            X
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
            className="
              rounded-xl
              border
              border-slate-700
              px-4
              py-2
              text-sm
              font-medium
              text-slate-300
              transition
              hover:border-slate-500
              hover:text-white
            "
          >
            Facebook
          </a>

          <a
            href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
            className="
              rounded-xl
              border
              border-slate-700
              px-4
              py-2
              text-sm
              font-medium
              text-slate-300
              transition
              hover:border-slate-500
              hover:text-white
            "
          >
            WhatsApp
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="
              rounded-xl
              border
              border-slate-700
              px-4
              py-2
              text-sm
              font-medium
              text-slate-300
              transition
              hover:border-slate-500
              hover:text-white
            "
          >
            {copied
              ? "Copied"
              : "Copy link"}
          </button>
        </div>
      </div>
    </section>
  );
}