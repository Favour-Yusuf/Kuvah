export function DillonGasGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <rect x="0" y="0" width="400" height="400" fill="#5BC0EB" />
      <rect x="130" y="40" width="140" height="320" rx="24" fill="#FFFFFF" />
      <rect x="130" y="40" width="140" height="320" rx="24" stroke="#164C63" strokeWidth="6" fill="none" />
      <rect x="154" y="104" width="92" height="14" rx="7" fill="#164C63" />
      <rect x="154" y="140" width="92" height="14" rx="7" fill="#164C63" opacity="0.5" />
      <rect x="154" y="176" width="58" height="14" rx="7" fill="#164C63" opacity="0.5" />
      <circle cx="200" cy="316" r="18" fill="#164C63" />
    </svg>
  );
}
