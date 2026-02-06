"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { VALENTINE_DAYS, isDayUnlocked, isDayCompleted } from "@/lib/calendar";
import FloatingHearts from "@/components/FloatingHearts";
import BackgroundMusic from "@/components/BackgroundMusic";

export default function CalendarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Aastha";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const completedCount = VALENTINE_DAYS.filter(day =>
    mounted && isDayCompleted(day.id)
  ).length;

  return (
    <main className="mesh-bg relative min-h-screen">
      <FloatingHearts />
      <BackgroundMusic />

      <div className="relative z-10 px-5 py-8 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-2">
            Valentine's Week Journey 💕
          </h1>
          <p className="text-pink-600 text-sm md:text-base mb-3 font-medium">
            Hey {name}! Each day unlocks a new surprise
          </p>

          {/* Progress bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-xs text-pink-700 font-semibold mb-1">
              <span>{completedCount} / {VALENTINE_DAYS.length} completed</span>
              <span>{Math.round((completedCount / VALENTINE_DAYS.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-400 to-rose-500"
                initial={{ width: 0 }}
                animate={{ width: `${(completedCount / VALENTINE_DAYS.length) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {VALENTINE_DAYS.map((day, index) => {
            const unlocked = isDayUnlocked(day.date);
            const completed = mounted && isDayCompleted(day.id);

            return (
              <motion.div
                key={day.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <motion.button
                  onClick={() => {
                    if (unlocked) {
                      router.push(`/day/${day.id}?name=${encodeURIComponent(name)}`);
                    }
                  }}
                  className={`
                    relative w-full glass-card p-6 text-center transition-all
                    ${unlocked ? "cursor-pointer" : "cursor-not-allowed"}
                    ${!unlocked && "blur-[2px] grayscale opacity-60"}
                  `}
                  whileHover={unlocked ? { scale: 1.05, y: -4 } : {}}
                  whileTap={unlocked ? { scale: 0.98 } : {}}
                >
                  {/* Lock icon for locked days */}
                  {!unlocked && (
                    <motion.div
                      className="absolute top-2 right-2"
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <span className="text-2xl">🔒</span>
                    </motion.div>
                  )}

                  {/* Completed checkmark */}
                  {completed && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute top-2 left-2 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      <span className="text-white text-sm">✓</span>
                    </motion.div>
                  )}

                  {/* Date badge */}
                  <div className="text-xs text-rose-600 font-bold mb-2 bg-white/50 inline-block px-2 py-0.5 rounded-full">
                    Feb {day.date}
                  </div>

                  {/* Emoji */}
                  <div className="text-5xl mb-3">
                    {day.emoji}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-pink-800 mb-1">
                    {day.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-pink-700 font-medium">
                    {unlocked ? day.description : `Unlocks Feb ${day.date}`}
                  </p>

                  {/* Gradient overlay for unlocked */}
                  {unlocked && !completed && (
                    <div
                      className={`absolute inset-0 opacity-0 hover:opacity-10 rounded-[32px] bg-gradient-to-br ${day.color} transition-opacity pointer-events-none`}
                    />
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-pink-600 text-xs mt-8 font-medium"
        >
          New day unlocks every day from Feb 7-14 💖
        </motion.p>
      </div>
    </main>
  );
}
