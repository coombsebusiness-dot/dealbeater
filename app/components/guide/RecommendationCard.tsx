import Image from "next/image";
import Link from "next/link";

import type {
  Recommendation,
} from "@/types/buying-guide/Recommendation";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/80">
      {recommendation.image && (
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={recommendation.image}
            alt={recommendation.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="space-y-4 p-5 sm:p-6">
        {recommendation.badge && (
          <span className="inline-flex rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-300">
            {recommendation.badge}
          </span>
        )}

        <div>
          <h3 className="text-2xl font-bold text-white">
            {recommendation.title}
          </h3>

          <p className="mt-3 leading-7 text-slate-300">
            {recommendation.description}
          </p>
        </div>

        {recommendation.reasons.length > 0 && (
          <ul className="space-y-3">
            {recommendation.reasons.map(
              (reason) => (
                <li
                  key={reason}
                  className="flex gap-3 text-slate-200"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 text-green-400"
                  >
                    ✓
                  </span>

                  <span>
                    {reason}
                  </span>
                </li>
              ),
            )}
          </ul>
        )}

        {recommendation.href && (
          <Link
            href={recommendation.href}
            className="inline-flex items-center justify-center rounded-xl bg-green-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-green-400"
          >
            View recommendation
          </Link>
        )}
      </div>
    </article>
  );
}