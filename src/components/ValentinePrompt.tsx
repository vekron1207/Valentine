"use client";

import { useState, useEffect } from "react";
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

// Typewriter hook
function useTypewriter(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}

interface Props {
  name: string;
  onYes: () => void;
}

export default function ValentinePrompt({ name, onYes }: Props) {
  const [noCount, setNoCount] = useState(0);

  const msgIndex = Math.min(noCount, messages.length - 1);
  const typedMessage = useTypewriter(messages[msgIndex], 40);

  const yesPadY = 16 + noCount * 4;
  const yesFontSize = 1.05 + noCount * 0.08;

  const noOpacity = Math.max(0.4, 1 - noCount * 0.07);
  const noFontSize = Math.max(0.7, 1 - noCount * 0.04);
  const noPadY = Math.max(6, 12 - noCount * 1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
        opacity: { duration: 0.3 }
      }}
      className="w-full max-w-[360px] mx-auto heart-glow"
    >
      <div className="glass-card p-10 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{
            scale: [0, 1.1, 1],
            rotate: [-20, 5, 0]
          }}
          transition={{
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1],
            times: [0, 0.6, 1]
          }}
          className="mb-5"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-100 to-rose-200/60">
            <motion.span
              className="text-4xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
                delay: 0.7
              }}
            >
              ❤️
            </motion.span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-[1.5rem] font-bold text-pink-700 mb-2"
        >
          Hey {name}!
        </motion.h1>

        {/* Typewriter message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="min-h-[3rem] flex items-center justify-center mb-7"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[1rem] text-pink-500 font-light"
            >
              {typedMessage}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="text-pink-400"
              >
                |
              </motion.span>
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex flex-col gap-3"
        >
          <motion.button
            onClick={onYes}
            className="btn-yes w-full"
            style={{
              paddingTop: yesPadY,
              paddingBottom: yesPadY,
              fontSize: `${yesFontSize}rem`,
            }}
            animate={{
              scale: 1 + (noCount * 0.05)
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            whileHover={{ scale: 1.02 + (noCount * 0.05) }}
            whileTap={{ scale: 0.98 + (noCount * 0.05) }}
          >
            {yesTexts[msgIndex]}
          </motion.button>

          <motion.button
            onClick={() => setNoCount((c) => c + 1)}
            className="btn-no w-full"
            style={{
              opacity: noOpacity,
              fontSize: `${noFontSize}rem`,
              paddingTop: noPadY,
              paddingBottom: noPadY,
            }}
            animate={{
              scale: 1 - (noCount * 0.03)
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            whileHover={{ scale: 1.02 - (noCount * 0.03) }}
            whileTap={{ scale: 0.98 - (noCount * 0.03) }}
          >
            {noTexts[msgIndex]}
          </motion.button>
        </motion.div>

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
