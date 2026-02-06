"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Auto-detect photos from public/photos/
function useAutoPhotos() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // List of actual filenames found in the public/photos/ folder
    const photoFiles = [
      "20241103_132223.jpg",
      "20241110_135915.jpg",
      "20250310_161309.jpg",
      "20250420_160439.jpg",
    ];

    const found: string[] = [];
    let pending = photoFiles.length;

    if (pending === 0) {
      setLoaded(true);
      return;
    }

    photoFiles.forEach((filename) => {
      const src = `/photos/${filename}`;
      const img = new window.Image();
      img.onload = () => {
        found.push(src);
        pending--;
        if (pending === 0) {
          setPhotos(found);
          setLoaded(true);
        }
      };
      img.onerror = () => {
        pending--;
        if (pending === 0) {
          setPhotos(found);
          setLoaded(true);
        }
      };
      img.src = src;
    });
  }, []);

  return { photos, loaded };
}

export default function PhotoCarousel() {
  const { photos, loaded } = useAutoPhotos();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % photos.length);
  }, [photos.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (photos.length <= 1) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [photos.length, next]);

  if (!loaded || photos.length === 0) return null;

  return (
    <div className="w-full">
      <div className="glass-card p-6 text-center">
        <p className="text-pink-600 font-semibold text-[1rem] mb-4">
          Us 💕
        </p>

        {/* Photo display */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-pink-100/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={photos[current]}
                alt={`Our photo ${current + 1}`}
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 768px) 360px, 500px"
                quality={100}
                priority={current === 0}
                unoptimized
              />
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/60 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center text-pink-600 text-sm shadow-sm z-10"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/60 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center text-pink-600 text-sm shadow-sm z-10"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {photos.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-4">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-2 bg-pink-400"
                    : "w-2 h-2 bg-pink-200"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
