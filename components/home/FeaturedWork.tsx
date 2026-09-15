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

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const Graphic = GRAPHICS[project.slug];
            return (
              <Reveal
                key={project.slug}
                className="group flex h-full flex-col border border-ink/10 transition-colors hover:border-topaz"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {Graphic && (
                    <Graphic className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm font-semibold text-ink-muted">{project.client}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                    {project.headline}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-muted">
                    {narrativeParagraphs(project)[0]}
                  </p>
                  <LinkButton href={`/work/${project.slug}`} variant="ghost" className="mt-auto pt-6">
                    {project.ctaLabel}
                  </LinkButton>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>

      <Container className="mt-12">
        <LinkButton href="/work" variant="secondary">
          See All Work
        </LinkButton>
      </Container>
    </section>
  );
}
