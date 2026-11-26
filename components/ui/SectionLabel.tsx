import type { ReactNode } from "react";

// Label style (§07): Inter 600, 12px caps, +0.08em.
export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={`text-label font-semibold uppercase ${className ?? ""}`}>{children}</p>;
}
