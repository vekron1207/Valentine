"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const coupons = [
  { emoji: "🤗", title: "1 Free Hug", desc: "Redeemable anytime, anywhere" },
  { emoji: "🎬", title: "Movie Night", desc: "Your pick, no complaints" },
  { emoji: "☕", title: "Breakfast in Bed", desc: "Wake up to pancakes & love" },
  { emoji: "💆", title: "1 Hour Massage", desc: "Full spa treatment, no timer" },
  { emoji: "👨‍🍳", title: "Your Fav Meal", desc: "I cook whatever you crave" },
  { emoji: "📵", title: "No Phone Night", desc: "Just us, zero distractions" },
  { emoji: "🍦", title: "Late Night Ice Cream", desc: "Midnight run, no excuses" },
  { emoji: "😇", title: "1 Free 'You Were Right'", desc: "No arguments, guaranteed" },
];

export default function Coupons() {
  const [redeemed, setRedeemed] = useState<Set<number>>(new Set());
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("redeemed-coupons");
    if (stored) {
      try {
        const arr = JSON.parse(stored);
        setRedeemed(new Set(arr));
      } catch (e) {
        // ignore
      }
    }
    setMounted(true);
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("redeemed-coupons", JSON.stringify([...redeemed]));
    }
  }, [redeemed, mounted]);

  const toggleRedeem = (index: number) => {
    setRedeemed((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="w-full">
      <div className="glass-card p-7 text-center">
        <div className="text-3xl mb-3">🎟️</div>
        <p className="text-pink-600 font-semibold text-[1.1rem] mb-1">
          Valentine&apos;s Coupons
        </p>
        <p className="text-pink-400 text-[0.75rem] font-light mb-5">
          tap a coupon to redeem it
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
          {coupons.map((coupon, i) => {
            const isRedeemed = redeemed.has(i);
            return (
              <motion.button
                key={i}
                onClick={() => toggleRedeem(i)}
                className="relative rounded-2xl p-3.5 text-left transition-colors"
                style={{
                  background: isRedeemed
                    ? "rgba(236, 72, 153, 0.08)"
                    : "rgba(255, 255, 255, 0.5)",
                  border: isRedeemed
                    ? "1.5px dashed rgba(236, 72, 153, 0.3)"
                    : "1.5px solid rgba(236, 72, 153, 0.1)",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="text-2xl mb-1.5">{coupon.emoji}</div>
                <p
                  className={`text-[0.8rem] font-semibold leading-tight ${
                    isRedeemed
                      ? "text-pink-400 line-through"
                      : "text-pink-700"
                  }`}
                >
                  {coupon.title}
                </p>
                <p className="text-[0.65rem] text-pink-400 font-light mt-0.5 leading-tight">
                  {coupon.desc}
                </p>

                {/* Redeemed stamp */}
                <AnimatePresence>
                  {isRedeemed && (
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: -12 }}
                      exit={{ scale: 0, rotate: 20 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <span
                        className="text-[0.65rem] font-bold text-pink-500 px-2 py-0.5 rounded-full border-2 border-pink-400 bg-white/80 uppercase tracking-wider"
                      >
                        Redeemed
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
