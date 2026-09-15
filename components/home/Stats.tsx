import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/lib/data/stats";

export function Stats() {
  if (stats.length === 0) return null;

  return (
    <section className="bg-topaz-deep py-20 text-paper sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            A few numbers behind the work.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {stats.map((stat) => (
            <Reveal key={stat.label}>
              <p className="font-display text-5xl font-bold text-topaz sm:text-6xl">
                {stat.value}
              </p>
              <p className="mt-2 text-base text-paper/90">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
