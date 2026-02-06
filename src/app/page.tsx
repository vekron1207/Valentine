"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import NameGate from "@/components/NameGate";
import RejectScreen from "@/components/RejectScreen";
import FloatingHearts from "@/components/FloatingHearts";
import BackgroundMusic from "@/components/BackgroundMusic";

export default function Home() {
  const router = useRouter();
  const [showReject, setShowReject] = useState(false);

  return (
    <main className="mesh-bg relative min-h-dvh flex items-center justify-center overflow-hidden">
      <FloatingHearts />
      <BackgroundMusic />
      <div className="relative z-10 px-5 py-8">
        <AnimatePresence mode="wait">
          {!showReject ? (
            <NameGate
              key="name"
              onValid={(name) => router.push(`/calendar?name=${encodeURIComponent(name)}`)}
              onInvalid={() => setShowReject(true)}
            />
          ) : (
            <RejectScreen
              key="reject"
              onDone={() => setShowReject(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
