"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
}

export default function ChocolateDay({ onComplete }: Props) {
  const [collected, setCollected] = useState(0);
  const [chocolates, setChocolates] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const target = 10;

  const handleCollect = (id: number) => {
    setChocolates(prev => prev.filter(c => c !== id));
    setCollected(prev => prev + 1);

    // Don't auto-complete anymore
  };

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8"
      >
        <div className="text-6xl mb-4">🍫</div>
        <h2 className="text-2xl font-bold text-pink-700 mb-2">Chocolate Day</h2>
        <p className="text-pink-500 text-sm mb-6">
          Tap all the chocolates to collect them!
        </p>

        <div className="text-2xl font-bold text-amber-700 mb-4">
          {collected} / {target}
        </div>

        <div className="relative h-72 bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl flex items-center justify-center">
          <AnimatePresence>
            {chocolates.map((choc, idx) => {
              const row = Math.floor(idx / 5);
              const col = idx % 5;
              const offsetX = col * 50 - 100; // Center: -100, -50, 0, 50, 100
              const offsetY = row * 50 - 50; // Center: -50, 0, 50

              return (
                <motion.button
                  key={choc}
                  onClick={() => handleCollect(choc)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: offsetX,
                    y: offsetY,
                  }}
                  exit={{ opacity: 0, scale: 0, rotate: 360 }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute text-4xl cursor-pointer"
                >
                  🍫
                </motion.button>
              );
            })}
          </AnimatePresence>

          {collected === target && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-4xl">🎉</div>
            </motion.div>
          )}
        </div>

        {collected === target && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <p className="text-pink-600 font-semibold mb-4">
              Sweet! You collected all the chocolates! 🍫💖
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
