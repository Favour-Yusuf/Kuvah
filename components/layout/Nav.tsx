"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkButton } from "@/components/ui/Button";
import { CONTACT_HREF, PRIMARY_LINKS, isActivePath } from "@/lib/data/site";

// Active item: coral 2px underline; links Inter 500 15px (§13).
const LINK_CLASSES =
  "text-[15px] font-medium text-paper underline decoration-2 underline-offset-[6px] decoration-transparent transition-colors duration-150 hover:decoration-paper aria-[current=page]:decoration-coral";

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setOpen(false);
    toggleRef.current?.focus();
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && open) closeMenu();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-oxblood text-paper">
      <div className="page-container flex h-[72px] items-center justify-between gap-6">
        <Link href="/" aria-label="Kuvah home" className="shrink-0">
          <Image
            src="/logos/SVG/kuvah-logo-primary-reverse.svg"
            alt="Kuvah"
            width={106}
            height={26}
            priority
            unoptimized
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {PRIMARY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActivePath(pathname, link.href) ? "page" : undefined}
              className={LINK_CLASSES}
            >
              {link.label}
            </Link>
          ))}
          <LinkButton href={CONTACT_HREF} variant="secondary-inverse" className="min-h-11">
            Contact
          </LinkButton>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex min-h-11 items-center border-2 border-paper px-4 text-sm font-semibold text-paper md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "Close menu" : "Open menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Primary mobile" className="md:hidden">
          <ul className="page-container flex flex-col gap-1 py-6">
            {PRIMARY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActivePath(pathname, link.href) ? "page" : undefined}
                  className={`${LINK_CLASSES} flex min-h-11 items-center text-lg`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-4">
              <LinkButton
                href={CONTACT_HREF}
                variant="secondary-inverse"
                onClick={closeMenu}
                className="w-full"
              >
                Contact
              </LinkButton>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
