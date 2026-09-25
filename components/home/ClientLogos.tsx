import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { clientLogos } from "@/lib/data/clientLogos";
import { cloudinaryUrl } from "@/lib/cloudinary";

function LogoRow({ hidden }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-16 pr-16">
      {clientLogos.map((logo, index) => (
        <div key={hidden ? `${logo.alt}-${index}` : logo.alt} className="relative h-10 w-32 shrink-0 sm:h-12 sm:w-36">
          <Image
            src={cloudinaryUrl(logo.src, { width: 320 })}
            alt={logo.alt}
            fill
            sizes="144px"
            className="object-contain grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
          />
        </div>
      ))}
    </div>
  );
}

export function ClientLogos() {
  return (
    <section className="bg-mist py-14 sm:py-20">
      <Container>
        <Reveal>
          <p className="text-center text-sm font-semibold text-ink-muted">
            Some of the businesses we&apos;ve worked with.
          </p>
        </Reveal>
      </Container>
      <div className="mt-10 overflow-hidden">
        <div className="animate-marquee flex w-max">
          <LogoRow />
          <LogoRow hidden />
        </div>
      </div>
    </section>
  );
}
