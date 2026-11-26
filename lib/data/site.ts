export const SITE_NAME = "Kuvah Technologies";

export const SITE_TAGLINE = "Better systems. Better businesses.";

export const SITE_DESCRIPTION =
  "Kuvah helps service-based businesses simplify operations, eliminate inefficiencies and build better ways of working through technology.";

// Until a dedicated /contact page exists, "Contact" routes to the
// existing enquiry form.
export const CONTACT_HREF = "/start-a-project";

export const PRIMARY_LINKS = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
] as const;

export function isActivePath(pathname: string | null, href: string) {
  return pathname === href || Boolean(pathname?.startsWith(`${href}/`));
}
