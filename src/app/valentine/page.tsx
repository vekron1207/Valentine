"use client";

import { Suspense } from "react";
import ValentineContent from "./ValentineContent";

export default function ValentinePage() {
  return (
    <Suspense fallback={<div className="mesh-bg min-h-dvh" />}>
      <ValentineContent />
    </Suspense>
  );
}
