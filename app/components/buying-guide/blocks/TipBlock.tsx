interface TipBlockProps {
  id: string;

  title?: string;

  text: string;
}

export function TipBlock({
  id,
  title = "Blinlx tip",
  text,
}: TipBlockProps) {
  return (
    <aside
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 rounded-2xl border border-green-500/30 bg-green-500/10 p-5 sm:p-6"
    >
      <div className="flex gap-4">
        <div
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/15 text-xl"
        >
          💡
        </div>

        <div>
          <h3
            id={`${id}-heading`}
            className="text-lg font-semibold text-green-300"
          >
            {title}
          </h3>

          <p className="mt-2 leading-7 text-slate-200">
            {text}
          </p>
        </div>
      </div>
    </aside>
  );
}