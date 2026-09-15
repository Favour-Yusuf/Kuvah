import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { OnPointGraphic } from "./OnPointGraphic";
import { DillonGasGraphic } from "./DillonGasGraphic";
import { WhatsAppGraphic } from "./WhatsAppGraphic";

describe.each([
  ["OnPointGraphic", OnPointGraphic],
  ["DillonGasGraphic", DillonGasGraphic],
  ["WhatsAppGraphic", WhatsAppGraphic],
])("%s", (_name, Graphic) => {
  it("renders a decorative svg hidden from assistive tech", () => {
    const { container } = render(<Graphic />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("accepts a className for sizing by its caller", () => {
    const { container } = render(<Graphic className="h-full w-full" />);
    expect(container.querySelector("svg")).toHaveClass("h-full", "w-full");
  });
});
