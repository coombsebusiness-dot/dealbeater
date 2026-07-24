"use client";

import { useEffect, useState } from "react";

type AnalysisStep = {
  label: string;
  completeLabel: string;
};

const steps: AnalysisStep[] = [
  {
    label: "Understanding your request",
    completeLabel: "Request understood",
  },
  {
    label: "Identifying the product",
    completeLabel: "Product identified",
  },
  {
    label: "Comparing prices",
    completeLabel: "Prices compared",
  },
  {
    label: "Analysing reviews",
    completeLabel: "Reviews analysed",
  },
  {
    label: "Checking retailer trust",
    completeLabel: "Retailer checked",
  },
  {
    label: "Finding better alternatives",
    completeLabel: "Alternatives found",
  },
  {
    label: "Building your Blinlx report",
    completeLabel: "Report ready",
  },
];

export default function AnalysisTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStep((current) => {
        if (current >= steps.length - 1) {
          window.clearInterval(timer);
          return current;
        }

        return current + 1;
      });
    }, 850);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#1d2a36] shadow-xl shadow-black/20">
      <div className="border-b border-white/10 px-6 py-5 sm:px-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#52ee7e]">
          Blinlx AI
        </p>

        <h3 className="mt-2 text-xl font-black text-white">
          Analysing your request
        </h3>

        <p className="mt-2 text-sm leading-6 text-white/55">
          Blinlx is checking the product, price, reviews and available
          alternatives.
        </p>
      </div>

      <div className="space-y-3 p-6 sm:p-8">
        {steps.map((step, index) => {
          const isComplete = index < activeStep;
          const isActive = index === activeStep;
          const isPending = index > activeStep;

          return (
            <div
              key={step.label}
              className={`flex items-center gap-4 rounded-2xl border px-4 py-4 transition-all duration-500 ${
                isActive
                  ? "border-[#2ee866]/40 bg-[#2ee866]/10"
                  : isComplete
                    ? "border-white/10 bg-white/5"
                    : "border-white/5 bg-white/[0.02]"
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-black transition-all duration-500 ${
                  isComplete
                    ? "border-[#2ee866] bg-[#2ee866] text-[#102018]"
                    : isActive
                      ? "border-[#2ee866] text-[#68f18e]"
                      : "border-white/10 text-white/25"
                }`}
              >
                {isComplete ? (
                  "✓"
                ) : isActive ? (
                  <span className="h-3 w-3 animate-pulse rounded-full bg-[#2ee866]" />
                ) : (
                  index + 1
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className={`font-bold transition-colors ${
                    isPending ? "text-white/30" : "text-white"
                  }`}
                >
                  {isComplete ? step.completeLabel : step.label}
                </p>

                {isActive && (
                  <p className="mt-1 text-sm text-[#68f18e]">
                    Working on this now...
                  </p>
                )}
              </div>

              {isComplete && (
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#68f18e]">
                  Done
                </span>
              )}

              {isActive && (
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/45">
                  Analysing
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-white/10 px-6 py-4 sm:px-8">
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[#2ee866] transition-all duration-700"
            style={{
              width: `${Math.max(
                8,
                ((activeStep + 1) / steps.length) * 100
              )}%`,
            }}
          />
        </div>

        <p className="mt-3 text-center text-xs text-white/40">
          This usually takes a few seconds.
        </p>
      </div>
    </section>
  );
}