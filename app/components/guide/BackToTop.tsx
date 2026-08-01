"use client";

import {
  useEffect,
  useState,
} from "react";

export function BackToTop() {
  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(
        window.scrollY > 700,
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-green-500/30 bg-slate-900/95 text-xl text-green-400 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      ↑
    </button>
  );
}