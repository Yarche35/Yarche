import API from "./api";

/**
 * One shared /products request for the whole site.
 * Home page sections (Top / Bestseller / New Arrivals) used to each call
 * /products separately - now they share a single request, and results are
 * reused for 60s when the user comes back to a page.
 */
const TTL = 60 * 1000;

let cached: { res: any; at: number } | null = null;
let pending: Promise<any> | null = null;

export const fetchAllProducts = (): Promise<any> => {
  if (cached && Date.now() - cached.at < TTL) {
    return Promise.resolve(cached.res);
  }

  if (pending) return pending;

  pending = API.get("/products")
    .then((res) => {
      cached = { res, at: Date.now() };
      return res;
    })
    .finally(() => {
      pending = null;
    });

  return pending;
};
