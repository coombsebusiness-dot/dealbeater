import Image from "next/image";
import Link from "next/link";

import type {
  RelatedGuide,
} from "@/types/buying-guide/BuyingGuide";

interface RelatedGuidesProps {
  guides: RelatedGuide[];

  heading?: string;
}

export function RelatedGuides({
  guides,
  heading = "Related guides",
}: RelatedGuidesProps) {
  if (guides.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-guides-heading"
      className="space-y-5"
    >
      <h2
        id="related-guides-heading"
        className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
      >
        {heading}
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <article
            key={guide.slug}
            className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/70"
          >
            {guide.image && (
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={guide.image.src}
                  alt={guide.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            )}

            <div className="space-y-3 p-5">
              {guide.category && (
                <p className="text-xs font-semibold uppercase tracking-wide text-green-400">
                  {guide.category}
                </p>
              )}

              <h3 className="text-xl font-bold text-white">
                {guide.title}
              </h3>

              {guide.description && (
                <p className="leading-7 text-slate-300">
                  {guide.description}
                </p>
              )}

              <Link
                href={`/blog/${guide.slug}`}
                className="inline-flex font-semibold text-green-400 transition hover:text-green-300"
              >
                Read guide
                <span
                  aria-hidden="true"
                  className="ml-2"
                >
                  →
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}