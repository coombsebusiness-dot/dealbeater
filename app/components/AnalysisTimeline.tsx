"use client";

import { useEffect, useMemo, useState } from "react";

const steps = [
  "Product identified",
  "Comparing prices",
  "Verifying offers",
  "Building recommendation",
];

export default function AnalysisTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    const stepTimer = window.setInterval(() => {
      setActiveStep((current) => {
        if (current >= steps.length - 1) {
          window.clearInterval(stepTimer);
          return current;
        }

        return current + 1;
      });
    }, 800);

    const progressTimer = window.setInterval(() => {
      setProgress((current) => {
       if (current >= 95) {
  window.clearInterval(progressTimer);
  return 95;
}

        const increase = Math.max(2, Math.floor(Math.random() * 8));
        return Math.min(95, current + increase);
      });
    }, 260);

    return () => {
      window.clearInterval(stepTimer);
      window.clearInterval(progressTimer);
    };
  }, []);

  const statusText = useMemo(() => {
    switch (activeStep) {
      case 0:
        return "Identifying the exact product";
      case 1:
        return "Checking available prices";
      case 2:
        return "Removing unsuitable listings";
      default:
  return "Building your Blinlx report...";
    }
  }, [activeStep]);

  return (
    <section
      aria-live="polite"
      aria-busy="true"
      className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#1d2a36] p-6 shadow-xl shadow-black/20 sm:p-8"
    >
      <div className="flex items-start gap-4">
        <div className="relative mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#2ee866]/35 bg-[#2ee866]/10">
          <span className="absolute h-3 w-3 animate-ping rounded-full bg-[#2ee866]/45" />
          <span className="relative h-3 w-3 rounded-full bg-[#2ee866]" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#68f18e]">
            Checking the market
          </p>

          <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
            Finding your best buying option
          </h3>

          <p className="mt-2 text-sm leading-6 text-white/55">
            {statusText}
          </p>
        </div>
      </div>

      <div className="mt-7">
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="text-sm font-bold text-white/75">
            Blinlx is working...
          </span>

          <span className="text-sm font-black text-[#68f18e]">
            {progress}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="relative h-full rounded-full bg-[#2ee866] transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-y-0 right-0 w-16 animate-pulse bg-white/20 blur-md" />
          </div>
        </div>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {steps.map((step, index) => {
          const isComplete = index < activeStep;
          const isActive = index === activeStep;
          const isPending = index > activeStep;

          return (
            <div
              key={step}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-300 ${
                isActive
                  ? "border-[#2ee866]/35 bg-[#2ee866]/10"
                  : isComplete
                    ? "border-white/10 bg-white/[0.04]"
                    : "border-white/5 bg-white/[0.02]"
              }`}
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-black ${
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
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#2ee866]" />
                ) : (
                  index + 1
                )}
              </div>

              <p
                className={`text-sm font-bold ${
                  isPending ? "text-white/30" : "text-white/85"
                }`}
              >
                {step}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs leading-5 text-white/40">
        Blinlx is checking retailers, prices and product intelligence...
      </p>
    </section>
  );
}