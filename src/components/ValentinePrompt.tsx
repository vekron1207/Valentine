"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "Will you be my Valentine? 💕",
  "Are you sure? 🥺",
  "Really really sure?? 🥺🥺",
  "Pretty please with a cherry on top? 🍒",
  "I'll be so so sad... 😢",
  "You're breaking my heart 💔",
  "I'm literally on my knees 🧎",
  "I won't stop asking!! 😤",
  "PLEASE SAY YES 😭😭😭",
  "Okay I'll cry for real now 😭💀",
];

const yesTexts = [
  "Yes! 💘",
  "Yes! 💘",
  "Yes please! 💕",
  "Say Yes! 💗",
  "YESSS!! 💖",
  "Click Me!! 💝",
  "YESYESYES 💞",
  "JUST SAY YES 🥹",
  "CLICK HERE!! 💘💘",
  "YES YES YES!!! 💖💖💖",
];

const noTexts = [
  "No ❌",
  "No... 😢",
  "No..? 🥺",
  "You sure? 😰",
  "Think again 💭",
  "Reconsider? 🙏",
  "Last chance? 🥹",
  "no...",
  "...",
  "💔",
];

interface Props {
  name: string;
  onYes: () => void;
}

export default function ValentinePrompt({ name, onYes }: Props) {
  const [noCount, setNoCount] = useState(0);

  const msgIndex = Math.min(noCount, messages.length - 1);

  // YES button grows: padding and font size increase naturally in flow
  const yesPadY = 16 + noCount * 4;
  const yesFontSize = 1.05 + noCount * 0.08;

  // NO button shrinks
  const noOpacity = Math.max(0.4, 1 - noCount * 0.07);
  const noFontSize = Math.max(0.7, 1 - noCount * 0.04);
  const noPadY = Math.max(6, 12 - noCount * 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-[360px] mx-auto heart-glow"
    >
      <div className="glass-card p-10 text-center">
        {/* Pulsing heart */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          className="mb-5"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-100 to-rose-200/60">
            <span className="text-4xl">❤️</span>
          </div>
        </motion.div>

        {/* Name */}
        <h1 className="text-[1.5rem] font-bold text-pink-700 mb-2">
          Hey {name}!
        </h1>

        {/* Desperate message - always visible above buttons */}
        <div className="min-h-[3rem] flex items-center justify-center mb-7">
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-[1rem] text-pink-500 font-light"
            >
              {messages[msgIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          {/* YES - grows naturally via padding/font, stays in flow */}
          <motion.button
            onClick={onYes}
            className="btn-yes w-full"
            animate={{
              paddingTop: yesPadY,
              paddingBottom: yesPadY,
              fontSize: `${yesFontSize}rem`,
            }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
          >
            {yesTexts[msgIndex]}
          </motion.button>

          {/* NO - shrinks and fades, but always visible */}
          <motion.button
            onClick={() => setNoCount((c) => c + 1)}
            className="btn-no w-full"
            animate={{
              opacity: noOpacity,
              fontSize: `${noFontSize}rem`,
              paddingTop: noPadY,
              paddingBottom: noPadY,
            }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
          >
            {noTexts[msgIndex]}
          </motion.button>
        </div>

        {/* Cheeky hint */}
        <AnimatePresence>
          {noCount >= 3 && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 0.6, y: 0 }}
              className="text-[0.7rem] text-pink-300 mt-5 font-light"
            >
              {noCount >= 7
                ? "there's only one right answer here... 😏"
                : "psst... you know the answer already 😏"}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
