import type { Metadata } from "next";
import type { ComponentType } from "react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
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
            <p>Every project starts with a different situation.</p>
            <p>A business trying to sell online.</p>
            <p>A company trying to serve customers better.</p>
            <p>A team looking for a better way to manage communication.</p>
            <p>This is some of the work we&apos;ve helped bring to life.</p>
          </div>
        </Container>
      </section>

      <section className="bg-paper pb-24">
        {projects.map((project, index) => {
          const Graphic = GRAPHICS[project.slug];
          return (
            <article key={project.slug} className={index > 0 ? "border-t border-ink/10" : ""}>
              <Container className="grid gap-8 py-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 sm:py-20">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Graphic className="h-full w-full object-cover" />
                </div>
                <div>
                  <ul className="flex flex-wrap gap-2 text-sm text-ink-muted">
                    {project.workTags.map((tag) => (
                      <li key={tag} className="rounded-full border border-ink/15 px-3 py-1">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
                    {project.client}
                  </h2>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-muted">
                    {project.workSummary}
                  </p>
                  <LinkButton href={`/work/${project.slug}`} variant="secondary" className="mt-6">
                    {project.ctaLabel}
                  </LinkButton>
                </div>
              </Container>
            </article>
          );
        })}
      </section>
    </>
  );
}
