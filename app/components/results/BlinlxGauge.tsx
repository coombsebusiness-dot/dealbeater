"use client";

import { useEffect, useMemo, useState } from "react";

interface BlinlxGaugeProps {
  score: number;
  confidence?: number;
}

function clamp(value: number, minimum = 0, maximum = 100) {
  return Math.min(maximum, Math.max(minimum, value));
}

function getVerdict(score: number) {
  if (score >= 90) {
    return {
      label: "Exceptional Buy",
      description: "An outstanding buying opportunity",
    };
  }

  if (score >= 80) {
    return {
      label: "Strong Buy",
      description: "One of the strongest options available",
    };
  }

  if (score >= 70) {
    return {
      label: "Good Buy",
      description: "A strong buying opportunity",
    };
  }

  if (score >= 60) {
    return {
      label: "Worth Considering",
      description: "A reasonable choice with some compromises",
    };
  }

  if (score >= 40) {
    return {
      label: "Think Twice",
      description: "Check the concerns before buying",
    };
  }

  return {
    label: "Avoid",
    description: "The evidence does not currently support buying",
  };
}

export default function BlinlxGauge({
  score,
  confidence = 0,
}: BlinlxGaugeProps) {
  const safeScore = clamp(Number.isFinite(score) ? score : 0);
  const safeConfidence = clamp(
    Number.isFinite(confidence) ? confidence : 0
  );

  const [displayScore, setDisplayScore] = useState(0);
  const [displayConfidence, setDisplayConfidence] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const verdict = useMemo(() => getVerdict(safeScore), [safeScore]);

  useEffect(() => {
    setIsVisible(true);

    const duration = 1200;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayScore(Math.round(safeScore * easedProgress));
      setDisplayConfidence(
        Math.round(safeConfidence * easedProgress)
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [safeScore, safeConfidence]);

  const radius = 92;
  const circumference = 2 * Math.PI * radius;
  const progressOffset =
    circumference - (safeScore / 100) * circumference;

  return (
    <>
      <style>{`
        @keyframes blinlxGaugePulse {
          0%, 100% {
            opacity: 0.45;
            transform: scale(0.97);
          }

          50% {
            opacity: 0.9;
            transform: scale(1.04);
          }
        }

        @keyframes blinlxFadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blinlxBadgePulse {
          0%, 100% {
            box-shadow: 0 0 0 rgba(46, 232, 102, 0);
          }

          50% {
            box-shadow: 0 0 18px rgba(46, 232, 102, 0.24);
          }
        }
      `}</style>

      <section
        aria-label="Blinlx intelligence score"
        style={{
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(148, 163, 184, 0.22)",
          borderRadius: "24px",
          padding: "38px 24px 28px",
          background:
            "radial-gradient(circle at 50% 35%, rgba(46, 232, 102, 0.09), transparent 34%), linear-gradient(145deg, rgba(18, 33, 45, 0.98), rgba(10, 24, 35, 0.98))",
          boxShadow:
            "0 28px 70px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.025)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 500ms ease",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "15%",
            left: "50%",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(46, 232, 102, 0.17), transparent 68%)",
            filter: "blur(26px)",
            transform: "translateX(-50%)",
            animation: "blinlxGaugePulse 3.4s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              minHeight: "30px",
              padding: "6px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(46, 232, 102, 0.36)",
              background: "rgba(13, 94, 49, 0.42)",
              color: "#44f284",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              animation: "blinlxBadgePulse 3s ease-in-out infinite",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#44f284",
                boxShadow: "0 0 12px rgba(68, 242, 132, 0.9)",
              }}
            />

            Blinlx Intelligence
          </div>

          <div
            style={{
              position: "relative",
              width: "250px",
              height: "250px",
              marginTop: "22px",
              display: "grid",
              placeItems: "center",
            }}
          >
            <svg
              width="250"
              height="250"
              viewBox="0 0 250 250"
              role="img"
              aria-label={`Blinlx intelligence score ${safeScore} out of 100`}
              style={{
                position: "absolute",
                inset: 0,
                transform: "rotate(-90deg)",
                overflow: "visible",
              }}
            >
              <defs>
                <linearGradient
                  id="blinlxGaugeGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#9affc3" />
                  <stop offset="45%" stopColor="#45f183" />
                  <stop offset="100%" stopColor="#18d760" />
                </linearGradient>

                <filter
                  id="blinlxGaugeGlow"
                  x="-60%"
                  y="-60%"
                  width="220%"
                  height="220%"
                >
                  <feGaussianBlur
                    stdDeviation="6"
                    result="blur"
                  />

                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <circle
                cx="125"
                cy="125"
                r={radius}
                fill="none"
                stroke="rgba(148, 163, 184, 0.19)"
                strokeWidth="14"
              />

              <circle
                cx="125"
                cy="125"
                r={radius}
                fill="none"
                stroke="url(#blinlxGaugeGradient)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={progressOffset}
                filter="url(#blinlxGaugeGlow)"
                style={{
                  transition:
                    "stroke-dashoffset 1200ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            </svg>

            <div
              style={{
                width: "172px",
                height: "172px",
                borderRadius: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                background:
                  "radial-gradient(circle at 50% 32%, rgba(255, 255, 255, 0.07), rgba(7, 22, 30, 0.86) 70%)",
                boxShadow:
                  "inset 0 1px 18px rgba(255, 255, 255, 0.035), 0 18px 42px rgba(0, 0, 0, 0.28)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  lineHeight: 1,
                }}
              >
                <span
                  style={{
                    color: "#ffffff",
                    fontSize: "58px",
                    fontWeight: 850,
                    letterSpacing: "-0.055em",
                  }}
                >
                  {displayScore}
                </span>

                <span
                  style={{
                    marginTop: "10px",
                    marginLeft: "3px",
                    color: "#44f284",
                    fontSize: "15px",
                    fontWeight: 800,
                  }}
                >
                  /100
                </span>
              </div>

              <span
                style={{
                  marginTop: "10px",
                  color: "#8294a8",
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                Intelligence Score
              </span>
            </div>
          </div>

          <div
            style={{
              animation: "blinlxFadeUp 650ms ease 500ms both",
            }}
          >
            <h2
              style={{
                margin: "2px 0 0",
                color: "#ffffff",
                fontSize: "25px",
                fontWeight: 850,
                letterSpacing: "-0.025em",
              }}
            >
              {verdict.label}
            </h2>

            <p
              style={{
                margin: "8px 0 0",
                color: "#8fa2b8",
                fontSize: "14px",
                lineHeight: 1.5,
              }}
            >
              {verdict.description}
            </p>
          </div>

          <div
            style={{
              width: "100%",
              maxWidth: "340px",
              marginTop: "26px",
              padding: "17px 18px",
              borderRadius: "17px",
              border: "1px solid rgba(148, 163, 184, 0.22)",
              background: "rgba(8, 20, 29, 0.62)",
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.025)",
              animation: "blinlxFadeUp 650ms ease 700ms both",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <span
                style={{
                  color: "#c4cfdb",
                  fontSize: "13px",
                  fontWeight: 750,
                }}
              >
                Analysis confidence
              </span>

              <span
                style={{
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 800,
                }}
              >
                {displayConfidence}%
              </span>
            </div>

            <div
              style={{
                width: "100%",
                height: "8px",
                marginTop: "11px",
                overflow: "hidden",
                borderRadius: "999px",
                background: "rgba(148, 163, 184, 0.22)",
              }}
            >
              <div
                style={{
                  width: `${safeConfidence}%`,
                  height: "100%",
                  borderRadius: "inherit",
                  background:
                    "linear-gradient(90deg, #2ee866, #8affbc)",
                  boxShadow: "0 0 12px rgba(46, 232, 102, 0.36)",
                  transition:
                    "width 1200ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            </div>

            <p
              style={{
                margin: "11px 0 0",
                color: "#64788e",
                fontSize: "11px",
                lineHeight: 1.55,
              }}
            >
              Based on the quantity and quality of evidence available
              during analysis.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}