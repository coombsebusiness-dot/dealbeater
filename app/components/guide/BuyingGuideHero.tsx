import Image from "next/image";

import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

import {
  BuyingGuideMeta,
} from "./BuyingGuideMeta";

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
  return (
    <header className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-400">
          {guide.category}
        </p>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {guide.title}
        </h1>

        {guide.subtitle && (
          <p className="max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            {guide.subtitle}
          </p>
        )}

        <BuyingGuideMeta
          authorName={
            guide.author.name
          }
          authorRole={
            guide.author.role
          }
          publishedAt={
            guide.publishedAt
          }
          updatedAt={
            guide.updatedAt
          }
          readingTimeMinutes={
            readingTimeMinutes
          }
          wordCount={
            wordCount
          }
        />
      </div>

      <figure className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-900">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={
              guide.heroImage.src
            }
            alt={
              guide.heroImage.alt
            }
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />
        </div>

        {guide.heroImage.caption && (
          <figcaption className="border-t border-slate-800 px-4 py-3 text-sm text-slate-400">
            {
              guide.heroImage
                .caption
            }
          </figcaption>
        )}
      </figure>
    </header>
  );
}