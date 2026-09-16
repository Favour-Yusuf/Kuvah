function Pills({ labels, hidden }: { labels: string[]; hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-3 px-4 sm:px-6 lg:px-8"
    >
      {labels.map((label, index) => (
        <li
          key={hidden ? `${label}-${index}` : label}
          className="whitespace-nowrap rounded-full border border-current/20 px-4 py-1.5 text-sm font-semibold"
        >
          {label}
        </li>
      ))}
    </ul>
  );
}

export function TagStrip({
  labels,
  tone = "topaz",
}: {
  labels: string[];
  tone?: "topaz" | "ink";
}) {
  const toneClasses = tone === "topaz" ? "bg-topaz text-ink" : "bg-ink text-paper";

  return (
    <div className={`${toneClasses} overflow-hidden py-4`}>
      <div className="animate-marquee flex w-max">
        <Pills labels={labels} />
        <Pills labels={labels} hidden />
      </div>
    </div>
  );
}
