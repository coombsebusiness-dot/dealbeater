interface TableColumn {
  key: string;

  label: string;
}

interface TableRow {
  id: string;

  values: Record<
    string,
    string | number | boolean
  >;
}

interface TableBlockProps {
  id: string;

  heading?: string;

  columns: TableColumn[];

  rows: TableRow[];
}

function formatValue(
  value:
    | string
    | number
    | boolean
    | undefined,
): string {
  if (typeof value === "boolean") {
    return value
      ? "Yes"
      : "No";
  }

  if (value === undefined) {
    return "—";
  }

  return String(value);
}

export function TableBlock({
  id,
  heading,
  columns,
  rows,
}: TableBlockProps) {
  if (
    columns.length === 0 ||
    rows.length === 0
  ) {
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

      <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900/70">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead className="bg-slate-800/80">
            <tr>
              {columns.map(
                (column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className="border-b border-slate-700 px-4 py-3 text-sm font-semibold text-white"
                  >
                    {column.label}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {rows.map(
              (row) => (
                <tr
                  key={row.id}
                  className="border-b border-slate-800 last:border-b-0"
                >
                  {columns.map(
                    (column) => (
                      <td
                        key={`${row.id}-${column.key}`}
                        className="px-4 py-4 align-top text-sm leading-6 text-slate-300"
                      >
                        {formatValue(
                          row.values[
                            column.key
                          ],
                        )}
                      </td>
                    ),
                  )}
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}