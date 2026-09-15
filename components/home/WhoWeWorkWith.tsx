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

        <div className="mt-16 divide-y divide-ink/15 border-t border-ink/15">
          {AUDIENCES.map((audience) => (
            <div key={audience.name} tabIndex={0} className="group py-8 sm:py-10">
              <Reveal>
                <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {audience.name}
                </h3>
                <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-within:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="mt-4 max-w-xl space-y-3 text-base leading-relaxed text-ink-muted">
                      {audience.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
