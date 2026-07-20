"use client";

import { motion } from "framer-motion";

interface Props {
  saving: string;
}

export default function MoneySavedCard({
  saving,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-[#2ee866]/30 bg-[#2ee866]/10 p-6"
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#52ee7e]">
        Potential Saving
      </p>

      <h2 className="mt-3 text-5xl font-black">
        {saving}
      </h2>

      <p className="mt-4 text-white/70 leading-6">
        Choosing our recommended alternative
        could save you this much while still
        meeting your needs.
      </p>
    </motion.div>
  );
}