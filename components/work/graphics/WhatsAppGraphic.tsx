export function WhatsAppGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <rect x="0" y="0" width="400" height="400" fill="#1E1E2F" />
      <rect x="40" y="60" width="190" height="72" rx="20" fill="#5BC0EB" />
      <rect x="130" y="164" width="190" height="72" rx="20" fill="#FFCB77" />
      <rect x="60" y="268" width="190" height="72" rx="20" fill="#5BC0EB" opacity="0.55" />
      <circle cx="60" cy="96" r="6" fill="#1E1E2F" />
      <circle cx="220" cy="200" r="6" fill="#1E1E2F" />
      <line x1="140" y1="132" x2="165" y2="164" stroke="#F4F4F6" strokeWidth="3" />
      <line x1="230" y1="236" x2="200" y2="268" stroke="#F4F4F6" strokeWidth="3" />
    </svg>
  );
}
