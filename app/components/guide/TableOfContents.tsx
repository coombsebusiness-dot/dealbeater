"use client";

import {
  useEffect,
  useState,
} from "react";

import type {
  BuyingGuideTOCItem,
} from "@/app/components/buying-guide/createTOC";

interface TableOfContentsProps {
  items: BuyingGuideTOCItem[];
}

export function TableOfContents({
  items,
}: TableOfContentsProps) {
  const [activeId, setActiveId] =
    useState("");

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          const visibleEntry =
            entries.find(
              (entry) =>
                entry.isIntersecting,
            );

          if (visibleEntry) {
            setActiveId(
              visibleEntry.target.id,
            );
          }
        },
        {
          rootMargin:
            "-20% 0px -65% 0px",
        },
      );

    items.forEach((item) => {
      const element =
        document.getElementById(
          item.id,
        );

      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Guide contents"
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-slate-700/70
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-950
        p-6
        shadow-xl
        ring-1
        ring-white/5
        sm:p-8
      "
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.09),transparent_42%)]" />

      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-400">
          Your buying journey
        </p>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              In This Guide
            </h2>

            <p className="mt-2 max-w-2xl text-base leading-7 text-slate-400">
              Jump to the chapter that matters most, or work through the guide from the beginning.
            </p>
          </div>

          <span className="text-sm text-slate-500">
            {items.length} chapters
          </span>
        </div>

        <ol className="mt-8 grid gap-3 md:grid-cols-2">
          {items.map(
            (item, index) => {
              const active =
                activeId === item.id;

              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={
                      active
                        ? "location"
                        : undefined
                    }
                    className={[
                      "group flex min-h-24 items-center gap-4 rounded-2xl border px-5 py-4 transition duration-300",
                      "hover:-translate-y-0.5 hover:border-green-500/50 hover:bg-slate-800/80",
                      "hover:shadow-[0_14px_35px_rgba(0,0,0,0.28)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400",
                      active
                        ? "border-green-500/50 bg-green-500/10"
                        : "border-slate-700/70 bg-slate-900/55",
                    ].join(" ")}
                  >
                    <span
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-green-500/25
                        bg-green-500/10
                        text-sm
                        font-black
                        text-green-400
                      "
                    >
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <span className="min-w-0">
                      <span className="block text-base font-semibold leading-6 text-white transition group-hover:text-green-300">
                        {item.label}
                      </span>

                      <span className="mt-1 block text-sm text-slate-500">
                        Jump to chapter
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className="ml-auto text-xl text-slate-600 transition group-hover:translate-x-1 group-hover:text-green-400"
                    >
                      →
                    </span>
                  </a>
                </li>
              );
            },
          )}
        </ol>
      </div>
    </nav>
  );
}