import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <Container width="tight" className="text-center">
        <p className="text-sm font-semibold text-ink-muted">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          The page you&apos;re looking for may have moved or no longer exists.
        </p>
        <LinkButton href="/" className="mt-8">
          Back to homepage
        </LinkButton>
      </Container>
    </section>
  );
}
