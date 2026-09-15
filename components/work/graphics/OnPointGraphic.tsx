export function OnPointGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <rect x="0" y="0" width="400" height="400" fill="#F4F4F6" />
      <rect x="0" y="150" width="400" height="250" fill="#FFCB77" />
      <g transform="translate(150 70) rotate(24)">
        <path d="M0 46 L86 0 L150 64 L64 110 Z" fill="#1E1E2F" />
        <circle cx="26" cy="58" r="11" fill="#F4F4F6" />
      </g>
    </svg>
  );
}
