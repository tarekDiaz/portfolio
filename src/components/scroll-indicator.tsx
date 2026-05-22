"use client";

import { useSyncExternalStore } from "react";
import { Arrow } from "@/components/icons/Arrow";

interface ScrollIndicatorProps {
  width?: number;
  height?: number;
  angle?: number;
  className?: string;
}

function useScrollY() {
  return useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("scroll", onStoreChange, { passive: true });
      return () => window.removeEventListener("scroll", onStoreChange);
    },
    () => window.scrollY,
    () => 0
  );
}

export default function ScrollIndicator({
  width = 25,
  height = 25,
  angle = 180,
  className = "",
}: ScrollIndicatorProps) {
  const scrollY = useScrollY();
  const isVisible = scrollY <= 4;

  return (
    <div
      className={`transition-opacity duration-500 ease-out ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"} ${className}`}
      aria-hidden="true"
    >
      <Arrow width={width} height={height} angle={angle} />
    </div>
  );
}