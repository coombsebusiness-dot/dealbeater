interface QuoteBlockProps {
  id: string;

  quote: string;

  attribution?: string;
}

export function QuoteBlock({
  id,
  quote,
  attribution,
}: QuoteBlockProps) {
  return (
    <figure
      id={id}
      className="scroll-mt-24 rounded-2xl border border-slate-700 bg-slate-900/70 p-5 sm:p-6"
    >
      <blockquote className="text-xl font-medium leading-8 text-white sm:text-2xl">
        “{quote}”
      </blockquote>

      {attribution && (
        <figcaption className="mt-4 text-sm text-slate-400">
          — {attribution}
        </figcaption>
      )}
    </figure>
  );
}