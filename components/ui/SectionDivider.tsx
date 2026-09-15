export function SectionDivider({
  from,
  to,
  flip = false,
}: {
  from: string;
  to: string;
  flip?: boolean;
}) {
  return (
    <div className={`relative h-12 overflow-hidden sm:h-20 ${from}`} aria-hidden="true">
      <div
        className={`absolute inset-0 ${to}`}
        style={{
          clipPath: flip
            ? "polygon(0 100%, 100% 0%, 100% 100%)"
            : "polygon(0 0%, 100% 100%, 0% 100%)",
        }}
      />
    </div>
  );
}
