interface GuideChapterProps {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: string;
}

export function GuideChapter({
  eyebrow,
  title,
  description,
  icon,
}: GuideChapterProps) {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-slate-700/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-8 shadow-xl ring-1 ring-white/5 sm:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.1),transparent_45%)]" />

      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-400">
          {eyebrow}
        </p>

        <div className="mt-3 flex items-start gap-4">
          {icon && (
            <span
              aria-hidden="true"
              className="text-4xl"
            >
              {icon}
            </span>
          )}

          <div>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              {title}
            </h2>

            {description && (
              <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-300">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}