import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { TagStrip } from "@/components/ui/TagStrip";

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
      <section className="relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-1/3 bg-topaz/20 [clip-path:polygon(40%_0,100%_0,100%_100%,0_100%)] sm:h-64 lg:h-80" />
        <Container width="narrow" className="relative">
          <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-6xl">
            We believe the work behind technology matters.
          </h1>
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-paper/70">
            <p>Kuvah Technologies was built around a simple belief:</p>
            <p className="text-xl font-medium text-paper">Technology should serve a purpose.</p>
            <p>
              There&apos;s no shortage of things being built — new apps, new websites, new
              platforms, new tools. But building something isn&apos;t the same as building
              something useful.
            </p>
            <p>
              We believe good technology starts before development begins — with paying
              attention, understanding what people need, seeing where something isn&apos;t
              working, and asking whether there&apos;s a better way.
            </p>
            <p>
              That&apos;s how we approach our work: we listen before we assume, ask questions
              before we prescribe solutions, and try to understand the bigger picture before
              focusing on the technology.
            </p>
            <p>
              Because technology is only part of the answer — the people using it, the business
              behind it, and the problem it exists to solve all matter too.
            </p>
          </div>
        </Container>
      </section>

      <TagStrip labels={VALUES.map((value) => value.name)} tone="topaz" />

      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-5xl">
            What guides our work
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {VALUES.map((value, index) => (
              <div key={value.name} className="border border-ink/15 bg-paper p-8">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-topaz font-display text-sm font-bold text-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{value.name}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-muted">{value.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-24 text-paper sm:py-32">
        <Container width="narrow">
          <h2 className="font-display text-4xl font-bold leading-[1.05] sm:text-6xl">
            Where we&apos;re going
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-paper/70">
            <p>
              We&apos;re building Kuvah into a technology company that creates useful products,
              supports ambitious businesses and continues to explore better ways of solving
              problems.
            </p>
            <p>
              We&apos;re still growing, still learning, still figuring things out — but
              we&apos;re serious about the work.
            </p>
            <p className="text-xl font-medium text-topaz">And we&apos;re just getting started.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
