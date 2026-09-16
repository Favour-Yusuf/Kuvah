import type { Metadata } from "next";
import type { ComponentType } from "react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { TagStrip } from "@/components/ui/TagStrip";
import { projects } from "@/lib/data/projects";
import { OnPointGraphic } from "@/components/work/graphics/OnPointGraphic";
import { DillonGasGraphic } from "@/components/work/graphics/DillonGasGraphic";
import { WhatsAppGraphic } from "@/components/work/graphics/WhatsAppGraphic";

const GRAPHICS: Record<string, ComponentType<{ className?: string }>> = {
  "onpoint-clothing": OnPointGraphic,
  "dillon-gas": DillonGasGraphic,
  "whatsapp-automation-platform": WhatsAppGraphic,
};

export const metadata: Metadata = {
  title: "Work",
  description: "A look at some of the work Kuvah has helped bring to life.",
};

export default function WorkPage() {
  return (
    <>
      <section className="bg-paper py-20 sm:py-28">
        <Container width="narrow">
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-6xl">
            Work with a reason behind it.
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>
              Every project starts with a different situation — a business trying to sell online,
              a company trying to serve customers better, a team looking for a better way to
              manage communication.
            </p>
            <p>This is some of the work we&apos;ve helped bring to life.</p>
          </div>
        </Container>
      </section>

      <TagStrip labels={["Ecommerce", "Mobile Development", "Automation", "Web Development", "Product Development"]} tone="ink" />

      <section className="bg-paper py-24">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const Graphic = GRAPHICS[project.slug];
              return (
                <article
                  key={project.slug}
                  className="group flex h-full flex-col border border-ink/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-topaz hover:border-t-4 hover:border-t-topaz hover:shadow-[0_16px_40px_-12px_rgba(255,203,119,0.35)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {Graphic && (
                      <Graphic className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <ul className="flex flex-wrap gap-2 text-sm text-ink-muted">
                      {project.workTags.map((tag) => (
                        <li key={tag} className="rounded-full border border-ink/15 px-3 py-1">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
                      {project.client}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-ink-muted">
                      {project.workSummary}
                    </p>
                    <div className="mt-auto pt-6">
                      <LinkButton href={`/work/${project.slug}`} variant="secondary">
                        {project.ctaLabel}
                      </LinkButton>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
