"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
}

export default function RoseDay({ onComplete }: Props) {
  const [roses, setRoses] = useState(0);
  const [tappedPositions, setTappedPositions] = useState<{ id: number; x: number; y: number }[]>([]);
  const target = 20;

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (roses >= target) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRose = { id: Date.now(), x, y };
    setTappedPositions(prev => [...prev, newRose]);
    setRoses(prev => prev + 1);

    // Remove after animation
    setTimeout(() => {
      setTappedPositions(prev => prev.filter(r => r.id !== newRose.id));
    }, 1000);

    // Don't auto-complete
  };

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8"
      >
        <div className="text-6xl mb-4">🌹</div>
        <h2 className="text-2xl font-bold text-pink-700 mb-2">Rose Day</h2>
        <p className="text-pink-500 text-sm mb-6">
          Tap anywhere to give me roses!
        </p>

        {/* Progress */}
        <div className="mb-6">
          <div className="text-4xl font-bold text-rose-600 mb-2">
            {roses} / {target}
          </div>
          <div className="h-3 bg-white/40 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-400 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${(roses / target) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Tap area */}
        <motion.div
          onClick={handleTap}
          className="relative h-64 bg-gradient-to-br from-rose-50 to-pink-100 rounded-2xl cursor-pointer overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-rose-300 text-sm font-light">
            {roses < target ? "Tap me! 💕" : "Bouquet complete! 🌹✨"}
          </div>

          {/* Floating roses */}
          <AnimatePresence>
            {tappedPositions.map(pos => (
              <motion.div
                key={pos.id}
                initial={{ opacity: 1, scale: 0, x: pos.x, y: pos.y }}
                animate={{
                  opacity: [1, 1, 0],
                  scale: [0, 1.5, 1],
                  y: [pos.y, pos.y - 100],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute text-3xl pointer-events-none"
              >
                🌹
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {roses >= target && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <p className="text-pink-600 font-semibold mb-4">
              You gave me {target} beautiful roses! 💖
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
