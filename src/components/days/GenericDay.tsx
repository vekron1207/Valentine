"use client";

import { motion } from "framer-motion";
import { DayData } from "@/lib/calendar";

interface Props {
  day: DayData;
  onComplete: () => void;
}

export default function GenericDay({ day, onComplete }: Props) {
  return (
    <div className="w-full max-w-md mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-10"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-7xl mb-4"
        >
          {day.emoji}
        </motion.div>

        <h2 className="text-2xl font-bold text-pink-700 mb-3">{day.title}</h2>
        <p className="text-pink-500 mb-6">{day.description}</p>

        <motion.button
          onClick={onComplete}
          className="btn-yes py-4 px-8 text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue 💖
        </motion.button>
      </motion.div>
    </div>
  );
}
