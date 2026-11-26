import { LinkButton } from "@/components/ui/Button";
import { CONTACT_HREF } from "@/lib/data/site";

// Oxblood on coral is 5.75:1 (§06), so every text size here passes AA.
// On coral the primary action is the oxblood button, never coral-on-coral.
export function FinalCTA() {
  return (
    <section aria-labelledby="cta-heading" className="bg-coral text-oxblood">
      <div className="page-container grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:items-end lg:gap-6">
        <h2 id="cta-heading" className="font-display text-h1 font-semibold text-balance lg:col-span-7">
          What&apos;s slowing your business down?
        </h2>

        <div className="flex flex-col gap-6 lg:col-span-5">
          <p className="text-lead text-pretty">
            Maybe it&apos;s a process that takes too long, a system that doesn&apos;t work the way it
            should, or an idea you&apos;ve been meaning to turn into reality.
          </p>
          <p className="text-body font-semibold">
            Tell us what&apos;s happening. Let&apos;s explore how to make it better.
          </p>
          <div className="flex flex-col items-start gap-3">
            <LinkButton href={CONTACT_HREF} variant="dark">
              Let&apos;s talk about your business
            </LinkButton>
            <p className="text-caption">No pressure. Just a conversation about what you need.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
