"use client";

import { useEffect, useMemo, useState } from "react";

interface ScoreBreakdown {
  price: number;
  reviews: number;
  retailer: number;
  warranty: number;
  value: number;
}

interface BlinlxIntelligenceScoreProps {
  score: number;
  confidence?: number;
  breakdown: ScoreBreakdown;
  explanation?: string;
}

interface Metric {
  key: keyof ScoreBreakdown;
  label: string;
  icon: string;
  description: string;
}

const metrics: Metric[] = [
  {
    key: "price",
    label: "Price Value",
    icon: "£",
    description: "How competitive the current price appears.",
  },
  {
    key: "reviews",
    label: "Customer Reviews",
    icon: "★",
    description: "The strength and consistency of buyer feedback.",
  },
  {
    key: "retailer",
    label: "Retailer Trust",
    icon: "✓",
    description: "The quality and reliability of the seller.",
  },
  {
    key: "warranty",
    label: "Warranty Support",
    icon: "◆",
    description: "The level of protection included with the purchase.",
  },
  {
    key: "value",
    label: "Product Value",
    icon: "●",
    description: "Overall quality and usefulness for the money.",
  },
];

function clamp(value: number) {
  return Math.min(100, Math.max(0, value));
}

function normaliseMetric(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  /*
   * Existing saved scores appear to be weighted values rather than
   * independent percentages. Convert smaller weighted values into
   * a useful visual percentage while preserving genuine 0–100 values.
   */
  if (value <= 30) {
    return clamp(Math.round((value / 30) * 100));
  }

  return clamp(Math.round(value));
}

function getMetricStatus(value: number) {
  if (value >= 85) return "Excellent";
  if (value >= 70) return "Strong";
  if (value >= 55) return "Fair";
  return "Needs attention";
}

export default function BlinlxIntelligenceScore({
  score,
  confidence = 0,
  breakdown,
  explanation,
}: BlinlxIntelligenceScoreProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 250);

    return () => window.clearTimeout(timer);
  }, []);

  const preparedMetrics = useMemo(
    () =>
      metrics.map((metric) => ({
        ...metric,
        value: normaliseMetric(breakdown[metric.key]),
      })),
    [breakdown]
  );

  return (
    <>
      <style>{`
        @keyframes blinlxMetricReveal {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <section
        aria-label="Blinlx score breakdown"
        style={{
          border: "1px solid rgba(148, 163, 184, 0.2)",
          borderRadius: "24px",
          padding: "28px",
          background:
            "linear-gradient(145deg, rgba(17, 32, 44, 0.97), rgba(8, 22, 31, 0.98))",
          boxShadow:
            "0 24px 60px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.025)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <span
              style={{
                color: "#45ef83",
                fontSize: "11px",
                fontWeight: 850,
                letterSpacing: "0.17em",
                textTransform: "uppercase",
              }}
            >
              Score breakdown
            </span>

            <h2
              style={{
                margin: "8px 0 0",
                color: "#ffffff",
                fontSize: "25px",
                fontWeight: 850,
                letterSpacing: "-0.03em",
              }}
            >
              Why Blinlx scored it {Math.round(score)}
            </h2>

            <p
              style={{
                maxWidth: "650px",
                margin: "9px 0 0",
                color: "#8194a9",
                fontSize: "14px",
                lineHeight: 1.65,
              }}
            >
              Each part of the score considers a different area of the
              buying decision, from the current price to retailer
              reliability and after-sales protection.
            </p>
          </div>

          <div
            style={{
              minWidth: "130px",
              padding: "12px 15px",
              borderRadius: "14px",
              border: "1px solid rgba(46, 232, 102, 0.2)",
              background: "rgba(46, 232, 102, 0.06)",
            }}
          >
            <div
              style={{
                color: "#8295a8",
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Confidence
            </div>

            <div
              style={{
                marginTop: "4px",
                color: "#ffffff",
                fontSize: "22px",
                fontWeight: 850,
              }}
            >
              {Math.round(confidence)}%
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "14px",
            marginTop: "24px",
          }}
        >
          {preparedMetrics.map((metric, index) => (
            <article
              key={metric.key}
              style={{
                padding: "18px",
                borderRadius: "18px",
                border: "1px solid rgba(148, 163, 184, 0.17)",
                background: "rgba(8, 21, 30, 0.63)",
                opacity: visible ? 1 : 0,
                animation: visible
                  ? `blinlxMetricReveal 550ms ease ${
                      index * 90
                    }ms both`
                  : "none",
                transition:
                  "border-color 180ms ease, transform 180ms ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "32px",
                      height: "32px",
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "10px",
                      border:
                        "1px solid rgba(46, 232, 102, 0.24)",
                      background: "rgba(46, 232, 102, 0.08)",
                      color: "#45ef83",
                      fontSize: "14px",
                      fontWeight: 900,
                    }}
                  >
                    {metric.icon}
                  </span>

                  <span
                    style={{
                      color: "#dce5ee",
                      fontSize: "13px",
                      fontWeight: 800,
                    }}
                  >
                    {metric.label}
                  </span>
                </div>

                <span
                  style={{
                    color: "#ffffff",
                    fontSize: "18px",
                    fontWeight: 850,
                  }}
                >
                  {metric.value}
                </span>
              </div>

              <div
                style={{
                  height: "7px",
                  marginTop: "15px",
                  overflow: "hidden",
                  borderRadius: "999px",
                  background: "rgba(148, 163, 184, 0.18)",
                }}
              >
                <div
                  style={{
                    width: visible ? `${metric.value}%` : "0%",
                    height: "100%",
                    borderRadius: "inherit",
                    background:
                      "linear-gradient(90deg, #2ee866, #8affbc)",
                    boxShadow:
                      "0 0 12px rgba(46, 232, 102, 0.25)",
                    transition: `width 900ms cubic-bezier(0.22, 1, 0.36, 1) ${
                      index * 80
                    }ms`,
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12px",
                  marginTop: "11px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "#71859a",
                    fontSize: "11px",
                    lineHeight: 1.5,
                  }}
                >
                  {metric.description}
                </p>

                <span
                  style={{
                    flexShrink: 0,
                    color: "#45ef83",
                    fontSize: "10px",
                    fontWeight: 800,
                  }}
                >
                  {getMetricStatus(metric.value)}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div
          style={{
            marginTop: "20px",
            padding: "18px 20px",
            borderRadius: "17px",
            border: "1px solid rgba(46, 232, 102, 0.16)",
            background:
              "linear-gradient(90deg, rgba(46, 232, 102, 0.06), rgba(46, 232, 102, 0.015))",
          }}
        >
          <div
            style={{
              color: "#45ef83",
              fontSize: "11px",
              fontWeight: 850,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
            }}
          >
            Blinlx explanation
          </div>

          <p
            style={{
              margin: "8px 0 0",
              color: "#becbd8",
              fontSize: "14px",
              lineHeight: 1.7,
            }}
          >
            {explanation ||
              "This score reflects the balance between price, product quality, retailer confidence, buyer feedback and warranty support. A stronger score means the available evidence gives us more confidence in recommending the purchase."}
          </p>
        </div>
      </section>
    </>
  );
}