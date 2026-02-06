"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  onDone: () => void;
}

export default function RejectScreen({ onDone }: Props) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: 1,
        scale: [0.85, 1.04, 1],
        rotate: [0, -2, 2, -2, 2, 0],
      }}
      exit={{ opacity: 0, scale: 0.85, y: 40 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-[360px] mx-auto"
    >
      <motion.div
        className="rounded-[32px] p-10 text-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(239, 68, 68, 0.85), rgba(190, 24, 93, 0.85))",
          backdropFilter: "blur(28px)",
          border: "1.5px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 12px 40px rgba(239, 68, 68, 0.25)",
        }}
        animate={{
          boxShadow: [
            "0 12px 40px rgba(239, 68, 68, 0.25)",
            "0 12px 60px rgba(239, 68, 68, 0.45)",
            "0 12px 40px rgba(239, 68, 68, 0.25)",
          ],
        }}
        transition={{ duration: 0.8, repeat: 2 }}
      >
        <motion.div
          className="text-5xl mb-5"
          animate={{ scale: [1, 1.15, 1], rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5, repeat: 2 }}
        >
          😤
        </motion.div>
        <h1 className="text-[1.7rem] font-bold text-white mb-3">
          Go away wench!!!
        </h1>
        <p className="text-white/60 text-[0.9rem] font-light">
          You&apos;re not who I&apos;m looking for...
        </p>
      </motion.div>
    </motion.div>
  );
}
