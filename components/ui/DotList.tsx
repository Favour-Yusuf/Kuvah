// List markers are oxblood dots (§08); coral is reserved for the one
// thing that matters on a layout, so it is never a bullet.
export function DotList({
  items,
  className,
  itemClassName,
}: {
  items: readonly string[];
  className?: string;
  itemClassName?: string;
}) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item} className={`flex items-baseline gap-3 ${itemClassName ?? ""}`}>
          <span aria-hidden="true" className="size-2 shrink-0 -translate-y-px rounded-full bg-current" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
