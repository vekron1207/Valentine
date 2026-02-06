"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ValentinePrompt from "@/components/ValentinePrompt";

interface Props {
  name: string;
  onComplete: () => void;
}

export default function ProposeDay({ name, onComplete }: Props) {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const sparkleIdRef = useRef(0);

  const createSparkle = () => {
    const newSparkle = {
      id: sparkleIdRef.current++,
      x: Math.random() * 100,
      y: Math.random() * 100,
    };
    setSparkles(prev => [...prev, newSparkle]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
    }, 2000);
  };

  // Create random sparkles periodically
  useEffect(() => {
    const interval = setInterval(createSparkle, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[420px] mx-auto relative">
      {/* Decorative header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <motion.span
            className="text-4xl"
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            💍
          </motion.span>
          <h2 className="text-3xl font-bold text-pink-600">Propose Day</h2>
          <motion.span
            className="text-4xl"
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.3 }}
          >
            💕
          </motion.span>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-pink-400 text-sm font-light"
        >
          The most important question of the week...
        </motion.p>
      </motion.div>

      {/* Floating emojis background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {sparkles.map(sparkle => (
            <motion.div
              key={sparkle.id}
              initial={{ opacity: 0, scale: 0, x: `${sparkle.x}%`, y: `${sparkle.y}%` }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.2, 1, 0.8],
                y: [`${sparkle.y}%`, `${sparkle.y - 20}%`],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 2 }}
              className="absolute text-2xl"
            >
              {['✨', '💖', '💝', '🌹', '💘'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main prompt */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <ValentinePrompt name={name} onYes={onComplete} />
      </motion.div>

      {/* Decorative footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-6 text-center"
      >
        <div className="flex items-center justify-center gap-2">
          {['💕', '💖', '💗', '💓', '💞'].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-2xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
