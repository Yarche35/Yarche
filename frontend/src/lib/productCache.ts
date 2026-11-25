import axios from "axios";
import { API_BASE_URL } from "./constants";

/**
 * Tiny in-memory product cache.
 *
 * - ProductCard saves the product it already has into this cache.
 * - The product page reads from it, so it opens INSTANTLY (no waiting for API).
 * - A fresh copy is fetched silently in the background afterwards.
 */

export const slugify = (name: string = "") =>
  name
    .toString()
    .toLowerCase()
    .trim()
    .replace(/%/g, "percent")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const cache = new Map<string, any>();
const inflight = new Set<string>();

export const getCachedProduct = (slug?: string | null) => {
  if (!slug) return null;
  return cache.get(decodeURIComponent(slug)) ?? null;
};

export const setCachedProduct = (slug: string, product: any) => {
  if (!slug || !product) return;
  cache.set(slug, product);
};

/**
 * Warm the cache before the user even taps (hover / touchstart).
 * Uses plain axios (not the shared API instance) so it never shows the
 * global loader.
 */
export const prefetchProduct = (slug: string) => {
  if (!slug || cache.has(slug) || inflight.has(slug)) return;
  inflight.add(slug);

  axios
    .get(`${API_BASE_URL}/productbyname/${encodeURIComponent(slug)}`)
    .then((res) => {
      if (res.data?.response === "success") {
        cache.set(slug, res.data.data);
      }
    })
    .catch(() => {})
    .finally(() => inflight.delete(slug));
};
