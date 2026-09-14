import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { StartProjectForm } from "@/components/contact/StartProjectForm";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Tell Kuvah what you're working on, where you're stuck, or what you're hoping to build.",
};

export default function StartAProjectPage() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container className="grid gap-16 lg:grid-cols-2">
        <div className="max-w-[560px]">
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
            Tell us what&apos;s going on.
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>Maybe you need a new website.</p>
            <p>Maybe you&apos;re sitting on an idea for a product.</p>
            <p>
              Maybe your business is growing and your current systems are starting to show their
              limits.
            </p>
            <p>
              Or maybe you simply know something needs to change but aren&apos;t sure what the
              answer is yet.
            </p>
            <p>That&apos;s okay.</p>
            <p className="font-medium text-ink">Tell us where you are. We&apos;ll take it from there.</p>
          </div>
        </div>

        <StartProjectForm />
      </Container>
    </section>
  );
}
