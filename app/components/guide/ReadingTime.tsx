interface ReadingTimeProps {
  minutes: number;

  wordCount?: number;
}

export function ReadingTime({
  minutes,
  wordCount,
}: ReadingTimeProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
      <span>
        {minutes} min read
      </span>

      {wordCount !== undefined && (
        <>
          <span aria-hidden="true">
            •
          </span>

          <span>
            {wordCount.toLocaleString()} words
          </span>
        </>
      )}
    </div>
  );
}