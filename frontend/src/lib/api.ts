import axios from "axios";
import { API_BASE_URL } from "./constants";
import { useLoadingStore } from "@/src/store/loadingStore";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// Full-screen logo loader is only for actions (login, order, payment...).
// Normal page data (GET) never blocks the screen - pages show their own
// skeletons, so the website opens instantly.
const showsGlobalLoader = (config: any) =>
  !config?.skipLoader && (config?.method || "get").toLowerCase() !== "get";

// ================= REQUEST INTERCEPTOR =================
API.interceptors.request.use(
  (config) => {
    // Start Global Loader (skipped for silent background requests)
    if (showsGlobalLoader(config)) {
      useLoadingStore.getState().startLoading();
    }

    if (typeof window !== "undefined") {
      // User token OR Admin token
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("adminToken");

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    // Stop Loader if request fails
    useLoadingStore.getState().stopLoading();
    return Promise.reject(error);
  }
);

// ================= RESPONSE INTERCEPTOR =================
API.interceptors.response.use(
  (response) => {
    // Stop Global Loader
    if (showsGlobalLoader(response.config)) {
      useLoadingStore.getState().stopLoading();
    }

    return response;
  },
  (error) => {
    // Stop Global Loader
    if (showsGlobalLoader(error?.config)) {
      useLoadingStore.getState().stopLoading();
    }

    return Promise.reject(error);
  }
);

export default API;