"use client";

import {
  useEffect,
  useState,
} from "react";

export function ReadingProgress() {
  const [progress, setProgress] =
    useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const documentHeight =
        document.documentElement
          .scrollHeight -
        window.innerHeight;

      if (documentHeight <= 0) {
        setProgress(0);
        return;
      }

      const nextProgress =
        (
          window.scrollY /
          documentHeight
        ) * 100;

      setProgress(
        Math.max(
          0,
          Math.min(
            100,
            nextProgress,
          ),
        ),
      );
    };

    updateProgress();

    window.addEventListener(
      "scroll",
      updateProgress,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      updateProgress,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateProgress,
      );

      window.removeEventListener(
        "resize",
        updateProgress,
      );
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-1 bg-slate-900/70"
    >
      <div
        className="h-full bg-green-500 transition-[width] duration-100"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}