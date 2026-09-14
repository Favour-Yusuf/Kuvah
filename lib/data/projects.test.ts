import { describe, it, expect } from "vitest";
import { projects, getProjectBySlug, narrativeParagraphs } from "./projects";

describe("projects", () => {
  it("has the three approved projects with unique slugs", () => {
    const slugs = projects.map((project) => project.slug);
    expect(slugs).toEqual(["onpoint-clothing", "dillon-gas", "whatsapp-automation-platform"]);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("looks up a project by slug", () => {
    expect(getProjectBySlug("dillon-gas")?.client).toBe("Dillon Gas");
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });

  it("does not fabricate an outcome for any project — the source copy gives none", () => {
    for (const project of projects) {
      expect(project.narrative.outcome).toBeUndefined();
    }
  });

  it("keeps OnPoint's three-part narrative in reading order", () => {
    const onpoint = getProjectBySlug("onpoint-clothing")!;
    expect(narrativeParagraphs(onpoint)).toEqual([
      "OnPoint needed more than a catalogue of products online.",
      "The goal was to create a digital experience that could present the brand, its collections and its work in a way that felt considered while also giving customers a straightforward way to shop.",
      "Kuvah designed and developed an ecommerce platform around that experience.",
    ]);
  });

  it("omits the approach section for projects that don't have one", () => {
    const dillon = getProjectBySlug("dillon-gas")!;
    expect(dillon.narrative.approach).toBeUndefined();
    expect(narrativeParagraphs(dillon)).toHaveLength(2);
  });
});
