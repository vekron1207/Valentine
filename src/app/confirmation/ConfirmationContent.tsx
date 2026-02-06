"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Confirmation from "@/components/Confirmation";
import FloatingHearts from "@/components/FloatingHearts";
import BackgroundMusic from "@/components/BackgroundMusic";

export default function ConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setMounted(true);
    if (!name) {
      router.replace("/");
    }
  }, [name, router]);

  // Play celebration music on mount if coming from YES button
  useEffect(() => {
    if (mounted && audioRef.current) {
      const shouldPlay = sessionStorage.getItem("playConfirmationMusic");
      if (shouldPlay === "true") {
        sessionStorage.removeItem("playConfirmationMusic");
        audioRef.current.volume = 0.6;
        audioRef.current.play().catch(() => {});
      }
    }
  }, [mounted]);

  if (!mounted || !name) return null;

  return (
    <main className="mesh-bg relative min-h-screen">
      <audio ref={audioRef} preload="auto">
        <source src="/letsgetitOn.mp3" type="audio/mpeg" />
      </audio>
      <FloatingHearts />
      <BackgroundMusic />
      <div className="relative z-10 px-5 py-8">
        <Confirmation name={name} />
      </div>
    </main>
  );
}
