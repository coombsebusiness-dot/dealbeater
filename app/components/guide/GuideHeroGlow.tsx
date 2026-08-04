"use client";

import {
  forwardRef,
} from "react";

export const GuideHeroGlow =
  forwardRef<HTMLDivElement>(
    function GuideHeroGlow(
      _props,
      ref,
    ) {
      return (
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-[2]
            hidden
            overflow-hidden
            lg:block
          "
        >
          <div
            ref={ref}
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              h-[420px]
              w-[520px]
              rounded-full
              bg-green-400/20
              opacity-0
              blur-[110px]
              transition-opacity
              duration-300
              will-change-transform
            "
          />
        </div>
      );
    },
  );

GuideHeroGlow.displayName =
  "GuideHeroGlow";