import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    name: "Understand",
    question: "What's happening now?",
    body: "We learn about your business, your users and the problem you're trying to solve.",
  },
  {
    name: "Clarify",
    question: "What actually needs to change?",
    body: "We work through the priorities and define what should be built first.",
  },
  {
    name: "Build",
    question: "Turn the idea into something real.",
    body: "We design, develop and bring the solution to life.",
  },
  {
    name: "Improve",
    question: "The first version is rarely the final answer.",
    body: "We learn from the product, the people using it and the business around it to identify what comes next.",
  },
];

export function Approach() {
  return (
    <section className="bg-ink py-20 text-paper sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            We don&apos;t jump straight into development.
          </h2>
          <p className="mt-4 text-lg text-paper/70">
            Writing code is only one part of building something well. Before that, there are
            questions worth answering.
          </p>
        </Reveal>

        <ol className="mt-16 grid gap-10 sm:grid-cols-4 sm:gap-6">
          {STEPS.map((step, index) => (
            <Reveal key={step.name}>
              <li className="border-t border-paper/20 pt-6">
                <span className="font-display text-sm font-semibold text-topaz">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold">{step.name}</h3>
                <p className="mt-2 text-base font-medium text-paper/90">{step.question}</p>
                <p className="mt-2 text-base leading-relaxed text-paper/70">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-16 border-t border-paper/20 pt-8">
          <p className="max-w-xl font-display text-xl font-medium">
            Good work starts with understanding what needs to change.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
