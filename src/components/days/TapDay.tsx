"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  emoji: string;
  title: string;
  description: string;
  targetTaps: number;
  completionMessage: string;
  onComplete: () => void;
}

export default function TapDay({
  emoji,
  title,
  description,
  targetTaps,
  completionMessage,
  onComplete,
}: Props) {
  const [taps, setTaps] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);

  const handleTap = () => {
    if (taps >= targetTaps) return;

    setTaps(prev => prev + 1);
    setShowEmoji(true);
    setTimeout(() => setShowEmoji(false), 600);
  };

  const isComplete = taps >= targetTaps;

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8"
      >
        <div className="text-6xl mb-4">{emoji}</div>
        <h2 className="text-2xl font-bold text-pink-700 mb-2">{title}</h2>
        <p className="text-pink-500 text-sm mb-6">{description}</p>

        {/* Progress */}
        <div className="mb-6">
          <div className="text-4xl font-bold text-pink-600 mb-2">
            {taps} / {targetTaps}
          </div>
          <div className="h-3 bg-white/40 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 to-rose-500"
              initial={{ width: 0 }}
              animate={{ width: `${(taps / targetTaps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Tap button */}
        {!isComplete ? (
          <motion.button
            onClick={handleTap}
            className="relative w-full h-32 bg-gradient-to-br from-pink-50 to-rose-100 rounded-2xl flex items-center justify-center text-6xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            {emoji}
            <AnimatePresence>
              {showEmoji && (
                <motion.div
                  initial={{ opacity: 1, scale: 0, y: 0 }}
                  animate={{ opacity: 0, scale: 2, y: -50 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute text-5xl pointer-events-none"
                >
                  {emoji}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-pink-600 font-semibold text-lg mb-4">
              {completionMessage}
            </p>
            <motion.button
              onClick={onComplete}
              className="btn-yes py-4 px-8 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue 💖
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
