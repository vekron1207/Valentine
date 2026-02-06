"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {!isOpen ? (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="glass-card w-full p-8 text-center"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{ y: [0, -4, 0], rotate: [0, 3, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="text-5xl mb-4"
          >
            💌
          </motion.div>
          <p className="text-pink-600 font-semibold text-[1.1rem]">
            Read my letter
          </p>
          <p className="text-pink-400 text-[0.8rem] font-light mt-1">
            tap to open
          </p>
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scaleY: 0, originY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="glass-card p-8 text-center"
          >
            <div className="text-4xl mb-5">💌</div>
            <div
              className="text-pink-700 text-[1.3rem] leading-relaxed"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Hello Babe,
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-4"
              >
                Just wanted to say that I love you and you&apos;re my world
                entire,
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-4"
              >
                You have bewitched me, body and soul, and I love… I love… I love
                you.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-4"
              >
                I never wish to be parted from you from this day on.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-6 text-pink-500 text-[1.1rem]"
              >
                Forever yours 💖
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
