import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

// Brand buttons (§06, §13): 48px tall, 22px side padding, Inter 600,
// radius 0, transitions under 200ms. One primary button per view.
type Variant =
  | "primary" // coral fill, on light grounds
  | "primary-inverse" // coral fill, on oxblood grounds
  | "dark" // oxblood fill, on coral or sand grounds
  | "secondary" // 2px oxblood outline, on light grounds
  | "secondary-inverse" // 2px paper outline, on oxblood grounds
  | "invert" // paper fill, on oxblood grounds
  | "ghost"; // oxblood text, coral underline

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-coral text-oxblood hover:bg-oxblood hover:text-paper",
  "primary-inverse": "bg-coral text-oxblood hover:bg-paper",
  dark: "bg-oxblood text-paper hover:bg-paper hover:text-oxblood",
  secondary: "border-2 border-oxblood text-oxblood hover:bg-oxblood hover:text-paper",
  "secondary-inverse": "border-2 border-paper text-paper hover:bg-paper hover:text-oxblood",
  invert: "bg-paper text-oxblood hover:bg-coral",
  ghost:
    "text-oxblood underline decoration-coral decoration-2 underline-offset-[5px] hover:decoration-oxblood",
};

function buttonClasses(variant: Variant, className?: string) {
  const base =
    variant === "ghost"
      ? "inline-flex items-center gap-2 text-[15px] font-semibold transition-colors duration-150"
      : "inline-flex min-h-12 items-center justify-center gap-2 px-[22px] text-[15px] font-semibold transition-colors duration-150";
  return `${base} ${VARIANT_CLASSES[variant]} ${className ?? ""}`;
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  children: ReactNode;
};

export function LinkButton({
  href,
  variant = "primary",
  className,
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <Link href={href} className={buttonClasses(variant, className)} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, className)} {...rest}>
      {children}
    </button>
  );
}
