import Image from "next/image";
import Link from "next/link";
import { socialLinks } from "@/lib/data/social";
import { CONTACT_HREF, PRIMARY_LINKS, SITE_NAME, SITE_TAGLINE } from "@/lib/data/site";

const LINK_CLASSES =
  "text-[15px] font-medium text-paper underline decoration-coral decoration-2 underline-offset-[5px] transition-colors duration-150 hover:decoration-paper";

export function Footer() {
  const linkedIn = socialLinks.find((social) => social.name === "LinkedIn");

  return (
    <footer className="bg-oxblood text-paper">
      <div className="page-container grid gap-12 pb-12 pt-16 md:grid-cols-12 md:gap-6 md:pt-24">
        <div className="flex flex-col gap-6 md:col-span-7">
          <Link href="/" aria-label="Kuvah home" className="w-fit">
            <Image
              src="/logos/SVG/kuvah-logo-primary-reverse.svg"
              alt="Kuvah"
              width={146}
              height={36}
              unoptimized
            />
          </Link>
          <p className="font-display text-h2 font-semibold">
            {/* One sentence per line, so the phrase never breaks mid-way. */}
            {SITE_TAGLINE.split(". ").map((part, i, all) => (
              <span key={part} className="block">
                {i < all.length - 1 ? `${part}.` : part}
              </span>
            ))}
          </p>
          <p className="max-w-[44ch] text-body">
            We help service-based businesses solve operational problems through technology.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-4 md:col-start-9 md:self-end">
          <ul className="flex flex-wrap gap-x-8 gap-y-4">
            {PRIMARY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={LINK_CLASSES}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={CONTACT_HREF} className={LINK_CLASSES}>
                Contact
              </Link>
            </li>
            <li>
              {linkedIn?.href ? (
                <a href={linkedIn.href} className={LINK_CLASSES}>
                  LinkedIn
                </a>
              ) : (
                // No profile URL yet: shown as a label, not a dead link.
                <span className="text-[15px] font-medium text-paper">LinkedIn</span>
              )}
            </li>
          </ul>
        </nav>
      </div>

      <div className="page-container">
        <div className="border-t-2 border-paper py-6 text-caption">{SITE_NAME}</div>
      </div>
    </footer>
  );
}
