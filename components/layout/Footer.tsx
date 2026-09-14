import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { socialLinks } from "@/lib/data/social";

const FOOTER_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Start a Project", href: "/start-a-project" },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-mist">
      <Container className="grid gap-12 py-16 sm:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2" aria-label="Kuvah home">
            <Image src="/Kuvah Icon black.png" alt="" width={28} height={28} />
            <span className="font-display text-lg font-semibold text-ink">Kuvah Technologies</span>
          </Link>
          <p className="mt-4 max-w-xs text-base text-ink-muted">
            Websites, digital products and systems for businesses and founders.
          </p>
          <p className="mt-8 text-sm font-medium text-ink-muted">Build with light.</p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-ink hover:text-ink/70">
              {link.label}
            </Link>
          ))}
        </nav>

        <ul className="flex flex-col gap-3">
          {socialLinks.map((social) => (
            <li key={social.name}>
              {social.href ? (
                <a href={social.href} className="text-sm font-medium text-ink hover:text-ink/70">
                  {social.name}
                </a>
              ) : (
                <span className="text-sm font-medium text-ink-muted">{social.name}</span>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
