"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkButton } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

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
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Kuvah home">
          <Image src="/kuvah-lockup-black.png" alt="Kuvah" width={29} height={40} priority />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="relative text-sm font-medium text-ink after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-topaz after:transition-all after:duration-300 hover:after:w-full aria-[current=page]:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <LinkButton href="/start-a-project" className="hidden md:inline-flex">
          Start a Project
        </LinkButton>

        <button
          ref={toggleRef}
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
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="block text-base font-medium text-ink relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-topaz after:transition-all after:duration-300 hover:after:w-full aria-[current=page]:after:w-full"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <LinkButton href="/start-a-project" onClick={closeMenu} className="mt-2 w-full">
                Start a Project
              </LinkButton>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
