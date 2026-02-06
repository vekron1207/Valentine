"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const emojis = ["❤️", "💕", "💗", "🩷", "✨", "💖"];

interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  emoji: string;
  drift: number;
}

function generateParticles(): Particle[] {
  return Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 12 + Math.random() * 16,
    size: 12 + Math.random() * 16,
    opacity: 0.06 + Math.random() * 0.14,
    emoji: emojis[i % emojis.length],
    drift: -20 + Math.random() * 40,
  }));
}

export default function FloatingHearts() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateParticles());
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            fontSize: p.size,
            opacity: p.opacity,
          }}
          initial={{ y: "110vh", x: 0, rotate: 0 }}
          animate={{
            y: "-10vh",
            x: [0, p.drift, 0],
            rotate: [0, 12, -12, 0],
          }}
          transition={{
            y: {
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            },
            x: {
              duration: p.duration * 0.6,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            },
            rotate: {
              duration: 5,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            },
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}
