export function TagStrip({
  labels,
  tone = "topaz",
}: {
  labels: string[];
  tone?: "topaz" | "ink";
}) {
  const toneClasses = tone === "topaz" ? "bg-topaz text-ink" : "bg-ink text-paper";

  return (
    <div className={`${toneClasses} overflow-x-auto py-4`}>
      <ul className="flex w-max min-w-full items-center justify-center gap-3 px-4 sm:px-6 lg:px-8">
        {labels.map((label) => (
          <li
            key={label}
            className="whitespace-nowrap rounded-full border border-current/20 px-4 py-1.5 text-sm font-semibold"
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
