"use client";

import { useLoadingStore } from "@/src/store/loadingStore";

export default function GlobalLoader() {
  const loading = useLoadingStore((state) => state.loading);

  if (!loading) return null;

  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center"
      style={{ background: "var(--background)" }}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      {/* Yarche logo only (no text) */}
      <img
        src="/logo5.png"
        alt="Yarche"
        width={160}
        height={160}
        decoding="async"
        className="yc-logo-loader w-32 h-32 sm:w-40 sm:h-40 object-contain select-none"
        draggable={false}
      />
    </div>
  );
}
