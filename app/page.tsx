import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ClientLogos } from "@/components/home/ClientLogos";
import { Introduction } from "@/components/home/Introduction";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { Approach } from "@/components/home/Approach";
import { Stats } from "@/components/home/Stats";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Testimonials } from "@/components/home/Testimonials";
import { WhoWeWorkWith } from "@/components/home/WhoWeWorkWith";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { FinalCTA } from "@/components/home/FinalCTA";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { TagStrip } from "@/components/ui/TagStrip";
import { SITE_DESCRIPTION } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Kuvah Technologies — Websites, Digital Products & Systems",
  description: SITE_DESCRIPTION,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <TagStrip
        labels={["Digital Experiences", "Digital Products", "Systems & Automation", "Build with Purpose"]}
        tone="topaz"
      />
      <Introduction />
      <TagStrip labels={["Understand", "Clarify", "Build", "Improve"]} tone="ink" />
      <ServicesIndex />
      <SectionDivider from="bg-mist" to="bg-ink" />
      <Approach />
      <Stats />
      <FeaturedWork />
      <TagStrip
        labels={["Ecommerce", "Mobile Development", "Automation", "Web Development", "Product Development"]}
        tone="ink"
      />
      <Testimonials />
      <TagStrip
        labels={["Fashion", "Ecommerce", "Web", "Mobile", "Product", "Software"]}
        tone="topaz"
      />
      <WhoWeWorkWith />
      <AboutTeaser />
      <FinalCTA />
    </>
  );
}
