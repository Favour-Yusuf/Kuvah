import type { ComponentType } from "react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { projects, narrativeParagraphs } from "@/lib/data/projects";
import { OnPointGraphic } from "@/components/work/graphics/OnPointGraphic";
import { DillonGasGraphic } from "@/components/work/graphics/DillonGasGraphic";
import { WhatsAppGraphic } from "@/components/work/graphics/WhatsAppGraphic";

const GRAPHICS: Record<string, ComponentType<{ className?: string }>> = {
  "onpoint-clothing": OnPointGraphic,
  "dillon-gas": DillonGasGraphic,
  "whatsapp-automation-platform": WhatsAppGraphic,
};

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
      </Container>

      <div className="mt-16">
        {projects.map((project, index) => {
          const Graphic = GRAPHICS[project.slug];
          const reversed = index % 2 === 1;
          return (
            <Reveal key={project.slug} className="border-t border-ink/10 py-14 sm:py-20">
              <Container>
                <div
                  className={`grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}
                >
                  <div className="group relative aspect-[4/3] overflow-hidden">
                    {Graphic && (
                      <Graphic className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-muted">{project.client}</p>
                    <h3 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
                      {project.headline}
                    </h3>
                    <div className="mt-5 space-y-3 text-base leading-relaxed text-ink-muted">
                      {narrativeParagraphs(project).map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    <ul className="mt-5 flex flex-wrap gap-2 text-sm text-ink-muted">
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
                </div>
              </Container>
            </Reveal>
          );
        })}
      </div>

      <Container className="mt-12">
        <LinkButton href="/work" variant="secondary">
          See All Work
        </LinkButton>
      </Container>
    </section>
  );
}
