import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const AUDIENCES = [
  {
    name: "Businesses growing beyond their current setup",
    body: [
      "You may have outgrown your current website, need a better customer experience or have a process that is becoming difficult to manage.",
      "We help you identify what needs to change and build around it.",
    ],
  },
  {
    name: "Founders turning an opportunity into a product",
    body: [
      "You see something that could exist and want to bring it to life.",
      "We help you think through the first version and focus on what matters before trying to build everything.",
    ],
  },
  {
    name: "Teams trying to work better",
    body: [
      "Your team has a process that takes too much time, involves too many steps or simply isn't working as well as it should.",
      "We explore whether a better system or automation can help.",
    ],
  },
];

export function WhoWeWorkWith() {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            You don&apos;t need to fit into a box to work with us.
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            But most of the people we work with are trying to move something forward.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {AUDIENCES.map((audience) => (
            <Reveal key={audience.name} className="border-t border-ink/15 pt-6">
              <h3 className="font-display text-xl font-semibold text-ink">{audience.name}</h3>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-ink-muted">
                {audience.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
