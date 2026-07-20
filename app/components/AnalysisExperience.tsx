"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type AnalysisExperienceProps = {
  onComplete: () => void;
};

type AnalysisStep = {
  icon: string;
  label: string;
  detail: string;
  completedDetail: string;
};

const steps: AnalysisStep[] = [
  {
    icon: "🔍",
    label: "Identifying the product",
    detail: "Understanding exactly what you are considering",
    completedDetail: "Product identified",
  },
  {
    icon: "🏪",
    label: "Checking the retailer",
    detail: "Reviewing retailer and seller reputation",
    completedDetail: "Retailer checked",
  },
  {
    icon: "💷",
    label: "Comparing current prices",
    detail: "Checking available offers and typical pricing",
    completedDetail: "Prices compared",
  },
  {
    icon: "⭐",
    label: "Reading customer feedback",
    detail: "Looking for common praise and recurring complaints",
    completedDetail: "Customer feedback analysed",
  },
  {
    icon: "🛡️",
    label: "Verifying warranty protection",
    detail: "Checking the warranty and available buyer protection",
    completedDetail: "Warranty checked",
  },
  {
    icon: "📦",
    label: "Checking delivery and returns",
    detail: "Reviewing delivery terms and return options",
    completedDetail: "Delivery and returns checked",
  },
  {
    icon: "🛒",
    label: "Looking for better alternatives",
    detail: "Searching for stronger overall value elsewhere",
    completedDetail: "Alternatives reviewed",
  },
  {
    icon: "🧠",
    label: "Building your recommendation",
    detail: "Weighing the evidence and calculating confidence",
    completedDetail: "Recommendation calculated",
  },
  {
    icon: "📄",
    label: "Writing your report",
    detail: "Turning the evidence into a clear buying decision",
    completedDetail: "Report completed",
  },
];

export default function AnalysisExperience({
  onComplete,
}: AnalysisExperienceProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const progress = useMemo(() => {
    if (isComplete) {
      return 100;
    }

    return Math.round(
      ((activeStep + 1) / steps.length) * 100
    );
  }, [activeStep, isComplete]);

  useEffect(() => {
    if (activeStep < steps.length - 1) {
      const stepTimer = window.setTimeout(() => {
        setActiveStep((current) => current + 1);
      }, 850);

      return () => {
        window.clearTimeout(stepTimer);
      };
    }

    const completeTimer = window.setTimeout(() => {
      setIsComplete(true);
    }, 700);

    const revealTimer = window.setTimeout(() => {
      onCompleteRef.current();
    }, 1450);

    return () => {
      window.clearTimeout(completeTimer);
      window.clearTimeout(revealTimer);
    };
  }, [activeStep]);

  const currentStep = steps[activeStep];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
        scale: 0.985,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -16,
        scale: 0.99,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative mt-6 overflow-hidden rounded-2xl border border-[#2ee866]/25 bg-[#14222d] p-5 shadow-2xl shadow-black/20 sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            opacity: [0.12, 0.25, 0.12],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-8 h-56 w-56 -translate-x-1/2 rounded-full bg-[#2ee866]/10 blur-3xl"
        />
      </div>

      <div className="relative flex flex-col items-center text-center">
        <div className="relative flex h-28 w-28 items-center justify-center">
          {!isComplete && (
            <>
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-full border border-[#2ee866]/40"
              />

              <motion.div
                animate={{
                  scale: [1, 1.16, 1],
                  opacity: [0.35, 0.08, 0.35],
                }}
                transition={{
                  duration: 2.2,
                  delay: 0.35,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-3 rounded-full bg-[#2ee866]/10"
              />
            </>
          )}

          <motion.div
            animate={
              isComplete
                ? {
                    scale: [1, 1.18, 1.08],
                  }
                : {
                    scale: [1, 1.05, 1],
                  }
            }
            transition={
              isComplete
                ? {
                    duration: 0.5,
                  }
                : {
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#2ee866] bg-[#101b26] shadow-[0_0_40px_rgba(46,232,102,0.35)]"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={
                  isComplete
                    ? "complete"
                    : currentStep.icon
                }
                initial={{
                  opacity: 0,
                  scale: 0.6,
                  rotate: -10,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.6,
                  rotate: 10,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="text-2xl"
              >
                {isComplete ? "✓" : currentStep.icon}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>

        <p className="mt-2 text-xs font-black uppercase tracking-[0.24em] text-[#52ee7e]">
          DBI
        </p>

        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
          Deal Beater Intelligence
        </p>

        <div className="mt-4 min-h-[76px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={
                isComplete
                  ? "analysis-complete"
                  : currentStep.label
              }
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <h3 className="text-xl font-black sm:text-2xl">
                {isComplete
                  ? "Analysis complete"
                  : currentStep.label}
              </h3>

              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-white/60">
                {isComplete
                  ? "Your personalised Deal Beater report is ready."
                  : currentStep.detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative mt-6">
        <div className="flex items-center justify-between text-xs font-semibold text-white/50">
          <span>
            {isComplete
              ? "Report ready"
              : "Analysing your deal"}
          </span>

          <motion.span
            key={progress}
            initial={{
              opacity: 0.4,
              y: 3,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            {progress}%
          </motion.span>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 0.65,
              ease: "easeOut",
            }}
            className="relative h-full rounded-full bg-[#2ee866]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </motion.div>
        </div>
      </div>

      <div className="relative mt-6 space-y-3">
        {steps.map((step, index) => {
          const completed =
            index < activeStep || isComplete;

          const active =
            index === activeStep && !isComplete;

          return (
            <motion.div
              key={step.label}
              layout
              animate={{
                opacity:
                  completed || active ? 1 : 0.45,
                scale: active ? 1.015 : 1,
              }}
              transition={{
                duration: 0.35,
              }}
              className={`flex items-start gap-3 rounded-xl border px-4 py-3 transition-colors duration-500 ${
                completed
                  ? "border-[#2ee866]/25 bg-[#2ee866]/[0.08]"
                  : active
                    ? "border-[#2ee866]/40 bg-white/[0.06]"
                    : "border-transparent bg-white/[0.025]"
              }`}
            >
              <motion.div
                animate={
                  active
                    ? {
                        scale: [1, 1.14, 1],
                      }
                    : {
                        scale: 1,
                      }
                }
                transition={{
                  duration: 1.2,
                  repeat: active ? Infinity : 0,
                }}
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-black ${
                  completed
                    ? "border-[#2ee866] bg-[#2ee866] text-[#07110b]"
                    : active
                      ? "border-[#2ee866] text-[#2ee866]"
                      : "border-white/15 text-white/25"
                }`}
              >
                {completed
                  ? "✓"
                  : active
                    ? step.icon
                    : index + 1}
              </motion.div>

              <div className="min-w-0">
                <p
                  className={`text-sm font-bold ${
                    completed || active
                      ? "text-white"
                      : "text-white/40"
                  }`}
                >
                  {step.label}
                </p>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={
                      completed
                        ? "completed"
                        : active
                          ? "active"
                          : "waiting"
                    }
                    initial={{
                      opacity: 0,
                      y: 3,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -3,
                    }}
                    className={`mt-1 text-xs leading-5 ${
                      completed
                        ? "text-[#68f18e]/75"
                        : active
                          ? "text-white/60"
                          : "text-white/25"
                    }`}
                  >
                    {completed
                      ? step.completedDetail
                      : active
                        ? step.detail
                        : "Waiting to begin"}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{
              opacity: 0,
              y: 14,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mt-5 rounded-xl border border-[#2ee866]/30 bg-[#2ee866]/10 px-4 py-4 text-center"
          >
            <p className="text-sm font-black text-[#68f18e]">
              ✓ Your Deal Beater report is ready
            </p>

            <p className="mt-1 text-xs text-white/50">
              Revealing your recommendation...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}