import {
  ReadingTime,
} from "./ReadingTime";

interface BuyingGuideMetaProps {
  authorName: string;

  authorRole?: string;

  publishedAt: string;

  updatedAt: string;

  readingTimeMinutes: number;

  wordCount?: number;
}

function formatDate(
  value: string,
): string {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  ).format(date);
}

export function BuyingGuideMeta({
  authorName,
  authorRole,
  publishedAt,
  updatedAt,
  readingTimeMinutes,
  wordCount,
}: BuyingGuideMetaProps) {
  const publishedDate =
    formatDate(publishedAt);

  const updatedDate =
    formatDate(updatedAt);

  return (
    <div className="flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:flex-wrap sm:items-center">
      <div>
        <span className="text-slate-500">
          Written by{" "}
        </span>

        <span className="font-medium text-slate-200">
          {authorName}
        </span>

        {authorRole && (
          <span className="text-slate-500">
            {" "}
            · {authorRole}
          </span>
        )}
      </div>

      <span
        aria-hidden="true"
        className="hidden text-slate-600 sm:inline"
      >
        •
      </span>

      <div>
        Published {publishedDate}
      </div>

      {updatedDate !== publishedDate && (
        <>
          <span
            aria-hidden="true"
            className="hidden text-slate-600 sm:inline"
          >
            •
          </span>

          <div>
            Updated {updatedDate}
          </div>
        </>
      )}

      <span
        aria-hidden="true"
        className="hidden text-slate-600 sm:inline"
      >
        •
      </span>

      <ReadingTime
        minutes={
          readingTimeMinutes
        }
        wordCount={
          wordCount
        }
      />
    </div>
  );
}