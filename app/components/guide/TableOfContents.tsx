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
    <aside className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5>">
      <h2 className="text-lg font-semibold text-white">
        In this guide
      </h2>

      <nav
        aria-label="Table of contents"
        className="mt-4"
      >
        <ol className="space-y-1">
          {items.map((item) => {
            const active =
              activeId === item.id;

            return (
              <li
                key={`${item.level}-${item.id}`}
                className={
                  item.level === 3
                    ? "pl-4"
                    : undefined
                }
              >
                <a
                  href={`#${item.id}`}
                  aria-current={
                    active
                      ? "location"
                      : undefined
                  }
                  className={[
                    "block rounded-lg px-3 py-2 text-sm transition",
                    active
                      ? "bg-green-500/15 font-medium text-green-400"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}