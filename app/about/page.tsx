import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "About",
  description: "What Kuvah believes, how it works, and the kind of company it's becoming.",
};

const VALUES = [
  {
    name: "Stay curious",
    body: "The first answer isn't always the right one. We ask questions and keep learning.",
  },
  {
    name: "Be clear",
    body: "Complexity isn't always a sign of intelligence. We value clear thinking and straightforward communication.",
  },
  {
    name: "Care about the work",
    body: "Details matter. We take responsibility for building things well.",
  },
  {
    name: "Build with purpose",
    body: "Not everything needs to exist. We want the things we build to be useful.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-paper py-20 sm:py-28">
        <Container className="max-w-[760px]">
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
            We believe the work behind technology matters.
          </h1>
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>Kuvah Technologies was built around a simple belief:</p>
            <p className="font-medium text-ink">Technology should serve a purpose.</p>
            <p>There is no shortage of things being built.</p>
            <p>New apps. New websites. New platforms. New tools.</p>
            <p>But building something is not the same as building something useful.</p>
            <p>We believe good technology starts before development begins.</p>
            <p>It starts with paying attention.</p>
            <p>Understanding what people need.</p>
            <p>Seeing where something isn&apos;t working.</p>
            <p>And asking whether there&apos;s a better way.</p>
            <p>That&apos;s how we approach our work.</p>
            <p>We listen before we assume.</p>
            <p>We ask questions before we prescribe solutions.</p>
            <p>And we try to understand the bigger picture before focusing on the technology.</p>
            <p>Because technology is only part of the answer.</p>
            <p>The people using it matter.</p>
            <p>The business behind it matters.</p>
            <p>And the problem it exists to solve matters.</p>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            What guides our work
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {VALUES.map((value) => (
              <div key={value.name}>
                <h3 className="font-display text-xl font-semibold text-ink">{value.name}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-muted">{value.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-20 text-paper sm:py-28">
        <Container className="max-w-[760px]">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Where we&apos;re going</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-paper/70">
            <p>
              We&apos;re building Kuvah into a technology company that creates useful products,
              supports ambitious businesses and continues to explore better ways of solving
              problems.
            </p>
            <p>We&apos;re still growing.</p>
            <p>Still learning.</p>
            <p>Still figuring things out.</p>
            <p>But we&apos;re serious about the work.</p>
            <p className="font-medium text-paper">And we&apos;re just getting started.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
