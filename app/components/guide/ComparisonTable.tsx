import Image from "next/image";

import type {
  BuyingGuideComparisonItem,
} from "@/types/buying-guide/BuyingGuideSection";

interface ComparisonTableProps {
  id: string;

  heading?: string;

  items: BuyingGuideComparisonItem[];
}

export function ComparisonTable({
  id,
  heading,
  items,
}: ComparisonTableProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div
      id={id}
      className="scroll-mt-24 space-y-4"
    >
      {heading && (
        <h3 className="text-2xl font-semibold tracking-tight text-white">
          {heading}
        </h3>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/70"
          >
            {item.image && (
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            )}

            <div className="space-y-5 p-5 sm:p-6">
              <div>
                <h4 className="text-2xl font-bold text-white">
                  {item.name}
                </h4>

                {item.description && (
                  <p className="mt-3 leading-7 text-slate-300">
                    {item.description}
                  </p>
                )}
              </div>

              {item.strengths &&
                item.strengths.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-green-300">
                      Strengths
                    </h5>

                    <ul className="mt-3 space-y-2">
                      {item.strengths.map(
                        (strength) => (
                          <li
                            key={strength}
                            className="flex gap-3 text-slate-200"
                          >
                            <span
                              aria-hidden="true"
                              className="text-green-400"
                            >
                              ✓
                            </span>

                            <span>
                              {strength}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}

              {item.weaknesses &&
                item.weaknesses.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-rose-300">
                      Weaknesses
                    </h5>

                    <ul className="mt-3 space-y-2">
                      {item.weaknesses.map(
                        (weakness) => (
                          <li
                            key={weakness}
                            className="flex gap-3 text-slate-200"
                          >
                            <span
                              aria-hidden="true"
                              className="text-rose-400"
                            >
                              ×
                            </span>

                            <span>
                              {weakness}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}

              {item.verdict && (
                <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-green-400">
                    Blinlx verdict
                  </p>

                  <p className="mt-2 leading-7 text-slate-200">
                    {item.verdict}
                  </p>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}