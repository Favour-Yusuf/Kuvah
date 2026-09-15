import type { ReactNode } from "react";

const WIDTHS = {
  wide: "max-w-[1320px]",
  narrow: "max-w-[760px]",
  prose: "max-w-[700px]",
  tight: "max-w-[560px]",
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
  return (
    <div className={`mx-auto w-full ${WIDTHS[width]} px-4 sm:px-6 lg:px-8 ${className ?? ""}`}>
      {children}
    </div>
  );
}
