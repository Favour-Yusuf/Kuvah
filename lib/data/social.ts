export type SocialLink = {
  name: "LinkedIn" | "Instagram" | "X" | "YouTube";
  href: string | null;
};

// No real profile URLs exist yet. Fill in `href` once they do — the
// Footer already renders a plain (non-clickable) label whenever it's null.
export const socialLinks: SocialLink[] = [
  { name: "LinkedIn", href: null },
  { name: "Instagram", href: null },
  { name: "X", href: null },
  { name: "YouTube", href: null },
];
