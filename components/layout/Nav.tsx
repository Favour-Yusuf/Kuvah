"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Kuvah home">
          <Image src="/Kuvah Icon black.png" alt="" width={28} height={32} priority />
          <span className="font-display text-lg font-semibold text-ink">Kuvah</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink transition hover:text-ink/70"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/start-a-project"
          className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-topaz hover:text-ink md:inline-flex"
        >
          Start a Project
        </Link>

        <button
          type="button"
          className="inline-flex items-center rounded-full border border-ink/20 px-3 py-2 text-sm font-medium text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "Close menu" : "Open menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-ink/10 bg-paper px-4 py-6 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-base font-medium text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/start-a-project"
                className="mt-2 block rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-paper"
                onClick={() => setOpen(false)}
              >
                Start a Project
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
