const UPLOAD_MARKER = "/upload/";

type CloudinaryOptions = {
  width?: number;
  quality?: "auto" | number;
};

/**
 * Inserts Cloudinary's f_auto/q_auto (and optional width) transform
 * segment right after `/upload/` so images negotiate format (avif/webp)
 * and quality automatically instead of always shipping the original file.
 */
export function cloudinaryUrl(url: string, options: CloudinaryOptions = {}): string {
  if (!url.includes("res.cloudinary.com")) return url;
  if (url.toLowerCase().endsWith(".svg")) return url;

  const markerIndex = url.indexOf(UPLOAD_MARKER);
  if (markerIndex === -1) return url;

  const { width, quality = "auto" } = options;
  const transforms = ["f_auto", `q_${quality}`];
  if (width) transforms.push(`w_${width}`);

  const insertAt = markerIndex + UPLOAD_MARKER.length;
  return `${url.slice(0, insertAt)}${transforms.join(",")}/${url.slice(insertAt)}`;
}
