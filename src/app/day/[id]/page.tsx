"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { VALENTINE_DAYS, isDayUnlocked, markDayCompleted } from "@/lib/calendar";
import FloatingHearts from "@/components/FloatingHearts";
import BackgroundMusic from "@/components/BackgroundMusic";
import RoseDay from "@/components/days/RoseDay";
import ProposeDay from "@/components/days/ProposeDay";
import ChocolateDay from "@/components/days/ChocolateDay";
import TapDay from "@/components/days/TapDay";
import PromiseDay from "@/components/days/PromiseDay";
import Confirmation from "@/components/Confirmation";

export default function DayPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const dayId = parseInt(params.id as string);
  const name = searchParams.get("name") || "Aastha";
  const [mounted, setMounted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const day = VALENTINE_DAYS.find(d => d.id === dayId);

  useEffect(() => {
    setMounted(true);

    if (!day || !isDayUnlocked(day.date)) {
      router.replace(`/calendar?name=${encodeURIComponent(name)}`);
    }
  }, [day, name, router]);

  const handleComplete = () => {
    if (!day) return;

    // Play music for Propose Day (day 2)
    if (day.id === 2 && audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {});
    }

    // Celebrate!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff69b4", "#ff1493", "#c084fc"],
    });

    // Mark as completed
    markDayCompleted(day.id);
    setCompleted(true);
  };

  if (!mounted || !day) return null;

  // Day 8 (Valentine's Day) shows the full confirmation screen
  if (day.id === 8) {
    return (
      <main className="mesh-bg relative min-h-screen">
        <FloatingHearts />
        <BackgroundMusic />
        <div className="relative z-10 px-5 py-8">
          <Confirmation name={name} />
        </div>
      </main>
    );
  }

  return (
    <main className="mesh-bg relative min-h-screen flex items-center justify-center">
      <audio ref={audioRef} preload="auto">
        <source src="/letsgetitOn.mp3" type="audio/mpeg" />
      </audio>
      <FloatingHearts />
      <BackgroundMusic />

      <div className="relative z-10 px-5 py-8 w-full">
        {/* Back button */}
        <motion.button
          onClick={() => router.push(`/calendar?name=${encodeURIComponent(name)}`)}
          className="absolute top-4 left-4 glass-card px-4 py-2 text-sm text-pink-600 font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back
        </motion.button>

        {!completed ? (
          <>
            {day.id === 1 && <RoseDay onComplete={handleComplete} />}
            {day.id === 2 && <ProposeDay name={name} onComplete={handleComplete} />}
            {day.id === 3 && <ChocolateDay onComplete={handleComplete} />}
            {day.id === 4 && (
              <TapDay
                emoji="🧸"
                title="Teddy Day"
                description="Tap the teddy for hugs!"
                targetTaps={10}
                completionMessage="So many hugs! 🤗💕"
                onComplete={handleComplete}
              />
            )}
            {day.id === 5 && <PromiseDay onComplete={handleComplete} />}
            {day.id === 6 && (
              <TapDay
                emoji="🤗"
                title="Hug Day"
                description="Keep hugging!"
                targetTaps={10}
                completionMessage="Warmest hugs ever! 🤗💖"
                onComplete={handleComplete}
              />
            )}
            {day.id === 7 && (
              <TapDay
                emoji="😘"
                title="Kiss Day"
                description="Blow kisses!"
                targetTaps={10}
                completionMessage="So many kisses! 😘💋"
                onComplete={handleComplete}
              />
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md mx-auto text-center glass-card p-10"
          >
            <div className="text-6xl mb-4">
              {day.id === 2 ? "💍💖" : "✨"}
            </div>
            <h2 className="text-2xl font-bold text-pink-700 mb-2">
              {day.id === 2 ? "You Said YES! 🎉" : "Day Complete!"}
            </h2>
            <p className="text-pink-500 mb-4">
              {day.id === 2
                ? "I'm the happiest person right now! You made my day! 😊💕"
                : "Great job! Ready for the next day?"}
            </p>
            <motion.button
              onClick={() => router.push(`/calendar?name=${encodeURIComponent(name)}`)}
              className="btn-yes py-4 px-8 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Calendar 💖
            </motion.button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
