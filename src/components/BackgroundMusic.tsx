"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

export default function BackgroundMusic() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = useCallback(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        // Blocked by browser, nothing we can do
      });
    }
  }, [playing]);

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/romantic.mp3" type="audio/mpeg" />
      </audio>
      <motion.button
        onClick={toggle}
        className="fixed top-5 right-5 z-50 glass-card rounded-full w-12 h-12 flex items-center justify-center text-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        animate={
          playing
            ? { rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }
            : {}
        }
        transition={
          playing
            ? { repeat: Infinity, duration: 2, ease: "easeInOut" }
            : {}
        }
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? "🎵" : "🔇"}
      </motion.button>
    </>
  );
}
