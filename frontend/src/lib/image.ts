import { UPLOADS_BASE_URL } from "./constants";


export type ImageType = {
  url: string;
  public_id?: string;
};

// Cloudinary: serve a smaller, auto-compressed (webp/avif) image.
// Big speed boost on phones. Non-Cloudinary URLs are returned unchanged.
const optimizeCloudinary = (url: string, width?: number) => {
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }

  // already optimized
  if (/\/upload\/[^/]*(f_auto|q_auto)/.test(url)) return url;

  const t = `f_auto,q_auto${width ? `,w_${width},c_limit` : ""}`;
  return url.replace("/upload/", `/upload/${t}/`);
};

export const getImageUrl = (
  img?: string | ImageType | null,
  width?: number
) => {
  if (!img) return "/placeholder.png";

  // Cloudinary object
  if (typeof img === "object") {
    if (img.url) return optimizeCloudinary(img.url, width);

    return "/placeholder.png";
  }

  // Absolute URL
  if (img.startsWith("http")) {
    return optimizeCloudinary(img, width);
  }

  // Local upload
  const path = img.startsWith("/") ? img : `/${img}`;

  return `${UPLOADS_BASE_URL}${path}`;
};
