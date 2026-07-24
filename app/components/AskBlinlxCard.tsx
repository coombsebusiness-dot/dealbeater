"use client";

import { useState } from "react";

type AskBlinlxCardProps = {
  productName: string;
};

export default function AskBlinlxCard({
  productName,
}: AskBlinlxCardProps) {
  const [question, setQuestion] = useState("");

  return (
    <div className="rounded-3xl border border-white/10 bg-[#1d2a36] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52ee7e]">
        💬 Ask Blinlx
      </p>

      <h3 className="mt-2 text-xl font-black text-white">
        Still have a question?
      </h3>

      <p className="mt-2 text-sm leading-6 text-white/65">
        Ask anything about{" "}
        <span className="font-bold text-white">
          {productName}
        </span>
        .
      </p>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={3}
        placeholder="Should I wait until Black Friday?"
        className="mt-5 w-full resize-none rounded-2xl border border-white/10 bg-[#111b24] px-5 py-4 text-white placeholder:text-white/30 outline-none focus:border-[#2ee866]"
      />

      <button
        type="button"
        disabled
        className="mt-4 w-full rounded-2xl bg-[#20c95a] px-5 py-4 font-bold text-white opacity-60 cursor-not-allowed"
      >
        🚀 Coming Soon
      </button>

      <div className="mt-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
          Try asking...
        </p>

        <div className="flex flex-wrap gap-2">
          {[
            "Should I wait?",
            "Is refurbished worth it?",
            "Is there a better alternative?",
            "Is Amazon the best place to buy?",
            "Will the price drop soon?",
          ].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setQuestion(item)}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-[#2ee866] hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}