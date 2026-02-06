"use client";

import { Suspense } from "react";
import ConfirmationContent from "./ConfirmationContent";

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="mesh-bg min-h-screen" />}>
      <ConfirmationContent />
    </Suspense>
  );
}
