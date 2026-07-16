"use client";

import { Suspense, lazy } from "react";

const HeroCanvas = lazy(() => import("./wavy-sphere"));

function HeroCanvasFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-3xl border border-text/10 bg-text/3 animate-pulse">
      <div className="h-24 w-24 rounded-full border border-text/10 bg-background/40" />
    </div>
  );
}

export default function HeroCanvasSuspense() {
  return (
    <Suspense fallback={<HeroCanvasFallback />}>
      <HeroCanvas />
    </Suspense>
  );
}