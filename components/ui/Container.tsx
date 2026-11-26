import type { ReactNode } from "react";

// "wide" is the brand web grid (§10): 1200px content inside a
// clamp(20px, 5vw, 64px) outer margin. The narrower widths keep a
// readable measure for long-form pages.
const WIDTHS = {
  wide: "page-container",
  narrow: "mx-auto w-full max-w-[760px] px-[clamp(20px,5vw,64px)]",
  prose: "mx-auto w-full max-w-[700px] px-[clamp(20px,5vw,64px)]",
  tight: "mx-auto w-full max-w-[560px] px-[clamp(20px,5vw,64px)]",
} as const;

export function Container({
  children,
  className,
  width = "wide",
}: {
  children: ReactNode;
  className?: string;
  width?: keyof typeof WIDTHS;
}) {
  return <div className={`${WIDTHS[width]} ${className ?? ""}`}>{children}</div>;
}
