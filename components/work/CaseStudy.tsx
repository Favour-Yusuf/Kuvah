import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import type { Project } from "@/lib/data/projects";

export function CaseStudy({ project }: { project: Project }) {
  const { client, headline, narrative, focusAreas } = project;

  return (
    <article>
      <Container className="py-16 sm:py-24">
        <p className="text-sm font-semibold text-ink-muted">{client}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold text-ink sm:text-5xl">
          {headline}
        </h1>
      </Container>

      <Container width="narrow" className="space-y-12 pb-24">
        {narrative.challenge && (
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">The challenge</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">{narrative.challenge}</p>
          </section>
        )}
        {narrative.approach && (
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">The approach</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">{narrative.approach}</p>
          </section>
        )}
        {narrative.whatWeBuilt && (
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">What we built</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">{narrative.whatWeBuilt}</p>
          </section>
        )}
        {narrative.outcome && (
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">The outcome</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">{narrative.outcome}</p>
          </section>
        )}
        {focusAreas.length > 0 && (
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">Focus areas</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <li key={area} className="rounded-full border border-ink/15 px-3 py-1 text-sm text-ink-muted">
                  {area}
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>

      <Container className="border-t border-ink/10 py-16">
        <p className="text-sm font-semibold text-ink-muted">More work</p>
        <LinkButton href="/work" variant="secondary" className="mt-4">
          See all work
        </LinkButton>
      </Container>
    </article>
  );
}
