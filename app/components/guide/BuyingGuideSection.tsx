import type {
  ReactNode,
} from "react";

interface BuyingGuideSectionProps {
  id: string;

  heading: string;

  introduction?: string;

  children: ReactNode;
}

export function BuyingGuideSection({
  id,
  heading,
  introduction,
  children,
}: BuyingGuideSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 space-y-6"
    >
      <div className="space-y-3">
        <h2
          id={`${id}-heading`}
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {heading}
        </h2>

        {introduction && (
          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            {introduction}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
}