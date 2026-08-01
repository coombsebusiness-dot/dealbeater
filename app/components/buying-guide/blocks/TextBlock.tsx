interface TextBlockProps {
  id: string;

  heading?: string;

  paragraphs: string[];
}

export function TextBlock({
  id,
  heading,
  paragraphs,
}: TextBlockProps) {
  if (paragraphs.length === 0) {
    return null;
  }

  return (
    <div
      id={id}
      className="scroll-mt-24 space-y-4"
    >
      {heading && (
        <h3 className="text-2xl font-semibold tracking-tight text-white">
          {heading}
        </h3>
      )}

      <div className="space-y-4">
        {paragraphs.map(
          (paragraph, index) => (
            <p
              key={`${id}-${index}`}
              className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg"
            >
              {paragraph}
            </p>
          ),
        )}
      </div>
    </div>
  );
}