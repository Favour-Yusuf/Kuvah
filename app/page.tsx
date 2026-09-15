import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Introduction } from "@/components/home/Introduction";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { Approach } from "@/components/home/Approach";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { WhoWeWorkWith } from "@/components/home/WhoWeWorkWith";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { FinalCTA } from "@/components/home/FinalCTA";
import { SITE_DESCRIPTION } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Kuvah Technologies — Websites, Digital Products & Systems",
  description: SITE_DESCRIPTION,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <ServicesIndex />
      <Approach />
      <FeaturedWork />
      <WhoWeWorkWith />
      <AboutTeaser />
      <FinalCTA />
    </>
  );
}
