"use client";

import { motion } from "framer-motion";
import type { AlternativeData } from "../lib/ai/alternativeAgent";

interface Props {
  alternatives: AlternativeData[];
}

const medals = ["🥇", "🥈", "🥉"];

export default function BetterAlternativesCard({
  alternatives,
}: Props) {
  if (!alternatives.length) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
      }}
      className="rounded-2xl border border-[#2ee866]/20 bg-white/5 p-6"
    >
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#52ee7e]">
          Better Alternatives
        </p>

        <h3 className="mt-2 text-2xl font-black">
          Before you buy...
        </h3>

        <p className="mt-2 text-sm text-white/60">
          We found these alternatives that may offer
          better value, better features or stronger
          long-term ownership.
        </p>
      </div>

      <div className="space-y-4">
        {alternatives.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15,
            }}
            className="rounded-xl border border-white/10 bg-[#17252f] p-5"
          >
            <div className="flex items-start justify-between gap-4">

              <div>

                <div className="flex items-center gap-2">

                  <span className="text-xl">
                    {medals[index] ?? "⭐"}
                  </span>

                  <h4 className="text-lg font-bold">
                    {item.name}
                  </h4>

                </div>

                <p className="mt-3 text-sm leading-6 text-white/65">
                  {item.reason}
                </p>

                {item.verdict && (
                  <span className="mt-4 inline-flex rounded-full bg-[#2ee866]/15 px-3 py-1 text-xs font-bold text-[#68f18e]">
                    {item.verdict}
                  </span>
                )}

              </div>

              <div className="text-right">

                {item.price && (
                  <p className="text-2xl font-black">
                    {item.price}
                  </p>
                )}

                {item.rating && (
                  <p className="mt-2 text-sm text-amber-300">
                    {"★".repeat(Math.round(item.rating))}
                  </p>
                )}

                {item.saving && (
                  <p className="mt-3 text-xs text-[#68f18e]">
                    {item.saving}
                  </p>
                )}

              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}