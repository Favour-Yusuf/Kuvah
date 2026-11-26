import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Problem } from "@/components/home/Problem";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { Approach } from "@/components/home/Approach";
import { WhoWeWorkWith } from "@/components/home/WhoWeWorkWith";
import { Differentiation } from "@/components/home/Differentiation";
import { FinalCTA } from "@/components/home/FinalCTA";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/data/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} — Better systems for service businesses` },
  description: SITE_DESCRIPTION,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <WhatWeDo />
      <Approach />
      <WhoWeWorkWith />
      <Differentiation />
      <FinalCTA />
    </>
  );
}
