import { describe, it, expect } from "vitest";
import { services } from "./services";

describe("services", () => {
  it("has exactly the three approved service categories, in order", () => {
    expect(services.map((service) => service.slug)).toEqual([
      "digital-experiences",
      "digital-products",
      "systems-automation",
    ]);
  });

  it("numbers each service 01/02/03 to match the source copy", () => {
    expect(services.map((service) => service.number)).toEqual(["01", "02", "03"]);
  });

  it("gives every service both homepage and full-page content", () => {
    for (const service of services) {
      expect(service.homeIntro.length).toBeGreaterThan(0);
      expect(service.homeCapabilities.length).toBeGreaterThan(0);
      expect(service.pageIntro.length).toBeGreaterThan(0);
      expect(service.pageCapabilities.length).toBeGreaterThan(0);
    }
  });
});
