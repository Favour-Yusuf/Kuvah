import { describe, it, expect } from "vitest";
import { cloudinaryUrl } from "./cloudinary";

const PNG_URL =
  "https://res.cloudinary.com/dcuad6p9z/image/upload/v1790272754/Kuvah/Client%20Logo%27s/3line_bfswgl.png";
const SVG_URL =
  "https://res.cloudinary.com/dcuad6p9z/image/upload/v1790272137/Kuvah/Client%20Logo%27s/logo_magckk.svg";

describe("cloudinaryUrl", () => {
  it("inserts f_auto,q_auto right after /upload/ for a raster image", () => {
    expect(cloudinaryUrl(PNG_URL)).toBe(
      "https://res.cloudinary.com/dcuad6p9z/image/upload/f_auto,q_auto/v1790272754/Kuvah/Client%20Logo%27s/3line_bfswgl.png"
    );
  });

  it("adds a width transform when given one", () => {
    expect(cloudinaryUrl(PNG_URL, { width: 240 })).toBe(
      "https://res.cloudinary.com/dcuad6p9z/image/upload/f_auto,q_auto,w_240/v1790272754/Kuvah/Client%20Logo%27s/3line_bfswgl.png"
    );
  });

  it("leaves SVGs untouched — format/quality transforms don't apply to vectors", () => {
    expect(cloudinaryUrl(SVG_URL, { width: 240 })).toBe(SVG_URL);
  });

  it("returns non-Cloudinary URLs unchanged", () => {
    const other = "https://example.com/logo.png";
    expect(cloudinaryUrl(other, { width: 240 })).toBe(other);
  });

  it("returns a Cloudinary URL unchanged if it has no /upload/ segment", () => {
    const noUpload = "https://res.cloudinary.com/dcuad6p9z/image/fetch/https://x.com/a.png";
    expect(cloudinaryUrl(noUpload)).toBe(noUpload);
  });
});
