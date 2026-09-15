import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "A look at some of the work Kuvah has helped bring to life.",
};

export default function WorkPage() {
  return (
    <>
      <section className="bg-paper py-20 sm:py-28">
        <Container width="narrow">
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
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
        <Container>
          <div className="divide-y divide-ink/10 border-t border-ink/10">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="grid gap-4 py-12 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
              >
                <div>
                  <ul className="flex flex-wrap gap-2 text-sm text-ink-muted">
                    {project.workTags.map((tag) => (
                      <li key={tag} className="rounded-full border border-ink/15 px-3 py-1">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <h2 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
                    {project.client}
                  </h2>
                  <p className="mt-2 max-w-xl text-base leading-relaxed text-ink-muted">
                    {project.workSummary}
                  </p>
                </div>
                <LinkButton href={`/work/${project.slug}`} variant="secondary">
                  {project.ctaLabel}
                </LinkButton>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
