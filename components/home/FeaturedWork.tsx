import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { projects, narrativeParagraphs } from "@/lib/data/projects";

export function FeaturedWork() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            A few things we&apos;ve worked on.
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Different businesses. Different challenges. Different ways of approaching the work.
          </p>
        </Reveal>

        <div className="mt-16 divide-y divide-ink/10 border-t border-ink/10">
          {projects.map((project) => (
            <Reveal key={project.slug} className="grid gap-6 py-12 sm:grid-cols-2 sm:gap-12">
              <div>
                <p className="text-sm font-semibold text-ink-muted">{project.client}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {project.headline}
                </h3>
              </div>
              <div>
                <div className="space-y-3 text-base leading-relaxed text-ink-muted">
                  {narrativeParagraphs(project).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <ul className="mt-4 flex flex-wrap gap-2 text-sm text-ink-muted">
                  {project.featuredTags.map((tag) => (
                    <li key={tag} className="rounded-full border border-ink/15 px-3 py-1">
                      {tag}
                    </li>
                  ))}
                </ul>
                <LinkButton href={`/work/${project.slug}`} variant="ghost" className="mt-6">
                  {project.ctaLabel}
                </LinkButton>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <LinkButton href="/work" variant="secondary">
            See All Work
          </LinkButton>
        </Reveal>
      </Container>
    </section>
  );
}
