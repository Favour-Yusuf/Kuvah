import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "secondary-inverse" | "ghost" | "invert";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-topaz hover:text-ink",
  secondary: "bg-transparent text-ink border border-ink/20 hover:border-ink",
  "secondary-inverse": "bg-transparent text-paper border border-paper/30 hover:border-paper",
  ghost: "bg-transparent text-ink underline underline-offset-4 decoration-topaz decoration-2 px-0 py-0",
  invert: "bg-paper text-ink hover:bg-ink hover:text-paper",
};

function buttonClasses(variant: Variant, className?: string) {
  const base =
    variant === "ghost"
      ? "inline-flex items-center text-sm font-semibold transition"
      : "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-200 ease-out hover:scale-[1.03] active:scale-[0.98]";
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
