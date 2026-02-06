"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import LoveLetter from "./LoveLetter";
import PhotoCarousel from "./PhotoCarousel";
import Coupons from "./Coupons";

interface Props {
  name: string;
}

function fireCelebration() {
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 },
    colors: ["#ff69b4", "#ff1493", "#db7093", "#ffb6c1", "#c084fc", "#e879f9"],
  });

  const duration = 4000;
  const end = Date.now() + duration;
  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      return;
    }
    confetti({
      startVelocity: 25,
      spread: 360,
      ticks: 50,
      origin: { x: Math.random(), y: Math.random() * 0.3 },
      colors: ["#ff69b4", "#ff1493", "#c084fc", "#e879f9", "#fbbf24", "#fb7185"],
      particleCount: 20,
    });
  }, 300);
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.8 + i * 0.3,
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
    },
  }),
};

export default function Confirmation({ name }: Props) {
  useEffect(() => {
    fireCelebration();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto flex flex-col items-center gap-8 md:gap-12 pb-16 pt-8 md:pt-16"
    >
      {/* Section 1: Main confirmation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-[360px] md:max-w-[520px] mx-auto heart-glow"
      >
        <div className="glass-card p-10 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.1,
              type: "spring",
              stiffness: 200,
              damping: 10,
            }}
            className="mb-5"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-pink-100 to-rose-200/60">
              <motion.span
                className="text-5xl"
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                😏
              </motion.span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[1.8rem] font-bold text-pink-700 mb-3"
          >
            I knew it 😏🔥
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[1.1rem] text-pink-600 mb-1 font-medium"
          >
            You&apos;re stuck with me now 💖
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[0.95rem] text-pink-400 font-light"
          >
            Happy Valentine&apos;s Day, {name}!!!
          </motion.p>

          <motion.div
            className="mt-7 flex justify-center gap-3 text-[2rem]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            >
              😏
            </motion.span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              🔥
            </motion.span>
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, delay: 0.3 }}
            >
              😏
            </motion.span>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5, y: [0, 6, 0] }}
            transition={{
              opacity: { delay: 1.5 },
              y: { repeat: Infinity, duration: 1.5, delay: 1.5 },
            }}
            className="mt-8 text-pink-400 text-[0.75rem] font-light"
          >
            scroll down for more 💌
            <div className="text-lg mt-1">↓</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Section 2 & 3: Love Letter + Photo Carousel (side-by-side on desktop) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <motion.div
          custom={0}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <LoveLetter />
        </motion.div>

        <motion.div
          custom={1}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <PhotoCarousel />
        </motion.div>
      </div>

      {/* Section 4: Coupons */}
      <motion.div
        custom={2}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[800px]"
      >
        <Coupons />
      </motion.div>

      {/* Footer */}
      <motion.p
        custom={3}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="text-pink-400/50 text-[0.7rem] font-light text-center pb-4"
      >
        made with ❤️ just for you
      </motion.p>
    </motion.div>
  );
}
