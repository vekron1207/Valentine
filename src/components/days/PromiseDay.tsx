"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onComplete: () => void;
}

const promises = [
  "Always annoy you (lovingly) 😏",
  "Share my food with you 🍕",
  "Watch your favorite movies 🎬",
  "Be there when you need me 🤗",
  "Make you laugh every day 😂",
  "Be yours forever 💖",
];

export default function PromiseDay({ onComplete }: Props) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const togglePromise = (index: number) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const allChecked = checked.size === promises.length;

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8"
      >
        <div className="text-6xl mb-4">🤝</div>
        <h2 className="text-2xl font-bold text-pink-700 mb-2">Promise Day</h2>
        <p className="text-pink-500 text-sm mb-6">
          Check all the promises I make to you!
        </p>

        {/* Progress */}
        <div className="mb-6">
          <div className="text-2xl font-bold text-pink-600 mb-2">
            {checked.size} / {promises.length}
          </div>
        </div>

        {/* Promises list */}
        <div className="space-y-3 mb-6 text-left">
          {promises.map((promise, index) => (
            <motion.label
              key={index}
              className="flex items-start gap-3 cursor-pointer p-3 rounded-xl hover:bg-white/30 transition-colors"
              whileHover={{ x: 4 }}
            >
              <input
                type="checkbox"
                checked={checked.has(index)}
                onChange={() => togglePromise(index)}
                className="mt-0.5 w-5 h-5 text-pink-600 border-pink-300 rounded focus:ring-pink-500 cursor-pointer"
              />
              <span className={`text-sm ${checked.has(index) ? 'text-pink-700 font-medium' : 'text-pink-500'}`}>
                {promise}
              </span>
            </motion.label>
          ))}
        </div>

        {/* Complete button */}
        {allChecked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-pink-600 font-semibold mb-4">
              All promises made! 💕
            </p>
            <motion.button
              onClick={onComplete}
              className="btn-yes py-4 px-8 text-lg w-full"
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
