"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Fuse from "fuse.js";

const validNames = [
  "aastha",
  "aashta",
  "astha",
  "aasthaa",
  "aasttha",
  "asthaa",
  "aastah",
  "aashtha",
];

const fuse = new Fuse(validNames, {
  threshold: 0.4,
  includeScore: true,
});

interface Props {
  onValid: (name: string) => void;
  onInvalid: () => void;
}

export default function NameGate({ onValid, onInvalid }: Props) {
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    const normalized = input.toLowerCase().trim().replace(/\s+/g, "");
    if (!normalized) return;

    const results = fuse.search(normalized);
    if (results.length > 0 && results[0].score! < 0.4) {
      onValid(input.trim());
    } else {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        onInvalid();
      }, 500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: 0,
        x: shake ? [0, -12, 12, -12, 12, 0] : 0,
      }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-[360px] mx-auto heart-glow"
    >
      <div className="glass-card p-10 text-center">
        {/* Heart decoration */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 12 }}
          className="mb-6"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-100 to-pink-200/60">
            <span className="text-4xl">💕</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-[1.6rem] font-bold text-pink-700 mb-1"
        >
          Hey there!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-pink-400 mb-8 text-[0.9rem] font-light"
        >
          What&apos;s your name?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Type your name..."
            className="input-heart mb-5"
            autoFocus
          />
          <button onClick={handleSubmit} className="btn-soft w-full">
            Continue 💝
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
