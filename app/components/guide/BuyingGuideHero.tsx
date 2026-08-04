"use client";

import {
  useRef,
  type PointerEvent,
} from "react";

import Image from "next/image";

import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

import {
  BuyingGuideMeta,
} from "./BuyingGuideMeta";

import {
  GuideHeroGlow,
} from "./GuideHeroGlow";

interface BuyingGuideHeroProps {
  guide: BuyingGuide;
  readingTimeMinutes: number;
  wordCount: number;
}

export function BuyingGuideHero({
  guide,
  readingTimeMinutes,
  wordCount,
}: BuyingGuideHeroProps) {

  const glowRef =
    useRef<HTMLDivElement>(null);

  function handlePointerMove(
    event: PointerEvent<HTMLElement>,
  ) {
    const bounds =
      event.currentTarget.getBoundingClientRect();

    const x =
      event.clientX -
      bounds.left;

    const y =
      event.clientY -
      bounds.top;

    if (!glowRef.current) {
      return;
    }

    glowRef.current.style.opacity = "1";

    glowRef.current.style.transform =
      `translate3d(${x - 260}px, ${y - 210}px, 0)`;
  }

  function handlePointerLeave() {
    if (!glowRef.current) {
      return;
    }

    glowRef.current.style.opacity = "0";
  }

  return (
    <header
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative overflow-hidden rounded-[40px] border border-slate-700/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
    >

      <GuideHeroGlow ref={glowRef} />

      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.12),transparent_45%)]" />

      <div className="absolute right-6 top-12 z-10 hidden xl:block">
        <img
          src="/brand/blinlx-b.png"
          alt=""
          width={250}
          height={170}
          className="
            select-none
            drop-shadow-[0_0_45px_rgba(34,197,94,0.35)]
          "
        />
      </div>

      <div className="relative z-10 px-8 pt-6 pb-8 lg:px-12">

        <div className="space-y-5">

          <h1 className="max-w-5xl text-5xl font-black tracking-tight text-white md:text-6xl lg:text-7xl">
            {guide.title}
          </h1>

          {guide.subtitle && (
            <p className="max-w-3xl text-xl leading-9 text-slate-300">
              {guide.subtitle}
            </p>
          )}

          <div className="flex flex-wrap gap-3">

            <div className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">
              🧠 Independently Researched
            </div>

            <div className="rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-400">
              💚 Trust Before Profit
            </div>

            <div className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">
              🏆 Honest Recommendations
            </div>

            <div className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">
              📅 Updated Monthly
            </div>

          </div>

          <BuyingGuideMeta
            authorName={guide.author.name}
            authorRole={guide.author.role}
            publishedAt={guide.publishedAt}
            updatedAt={guide.updatedAt}
            readingTimeMinutes={readingTimeMinutes}
            wordCount={wordCount}
          />

        </div>

      </div>

      <figure className="relative overflow-hidden border-t border-slate-700">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={guide.heroImage.src}
            alt={guide.heroImage.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover transition duration-700 hover:scale-105"
          />
        </div>

        {guide.heroImage.caption && (
          <figcaption className="border-t border-slate-800 px-4 py-3 text-sm text-slate-400">
            {guide.heroImage.caption}
          </figcaption>
        )}

      </figure>

    </header>
  );
}