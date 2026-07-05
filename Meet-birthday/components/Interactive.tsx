"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { siteConfig } from "../config";

const appleEase = [0.22, 1, 0.36, 1];

export function MessageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % siteConfig.messages.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + siteConfig.messages.length) % siteConfig.messages.length);
  }, []);

  // Structural Keyboard Navigation Hook
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  return (
    <div className="relative w-full max-w-3xl mx-auto h-[360px] md:h-[320px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, filter: prefersReducedMotion ? "none" : "blur(6px)", scale: prefersReducedMotion ? 1 : 0.98 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: prefersReducedMotion ? "none" : "blur(4px)", scale: prefersReducedMotion ? 1 : 1.01 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 md:p-12 glass-panel rounded-[32px]"
        >
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light mb-8 tracking-tight max-w-2xl">
            "{siteConfig.messages[currentIndex].text}"
          </p>
          <p className="text-[11px] text-apple-gray tracking-[0.25em] uppercase font-semibold">
            — {siteConfig.messages[currentIndex].sender}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute -bottom-20 flex gap-4">
        <button 
          onClick={prev} 
          aria-label="Previous message"
          className="p-4 rounded-full glass-panel text-white/40 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:ring-1 focus-visible:ring-apple-blue/50 focus-visible:outline-none"
        >
          <ChevronLeft size={16} strokeWidth={2} />
        </button>
        <button 
          onClick={next} 
          aria-label="Next message"
          className="p-4 rounded-full glass-panel text-white/40 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:ring-1 focus-visible:ring-apple-blue/50 focus-visible:outline-none"
        >
          <ChevronRight size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

export function EasterEgg() {
  const [flipped, setFlipped] = useState(false);
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    let visibilityTimeout: NodeJS.Timeout;
    
    const checkProbability = () => {
      if (Math.random() > 0.65 && !visible) {
        setVisible(true);
        visibilityTimeout = setTimeout(() => {
          setVisible(false);
          setFlipped(false);
        }, 40000);
      }
    };

    const runInterval = setInterval(checkProbability, 75000);
    return () => {
      clearInterval(runInterval);
      clearTimeout(visibilityTimeout);
    };
  }, [visible, prefersReducedMotion]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ x: "110vw", y: "20vh", rotate: 8, opacity: 0 }}
      animate={{ x: "-20vw", y: "80vh", rotate: -12, opacity: [0, 0.4, 0.4, 0] }}
      transition={{ duration: 42, ease: "linear" }}
      className="fixed z-40 cursor-pointer perspective-1000 select-none focus-visible:outline-none"
      onClick={() => setFlipped((prev) => !prev)}
      role="button"
      tabIndex={0}
      aria-label="Secret interaction card"
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setFlipped((prev) => !prev); }}
    >
      <motion.div 
        animate={{ scale: flipped ? 1.08 : 1 }}
        transition={{ duration: 0.5, ease: appleEase }}
        className="relative w-24 h-36 preserve-3d transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <div className="absolute inset-0 backface-hidden border border-white/10 rounded-xl bg-graphite-800 shadow-2xl flex items-center justify-center">
          <div className="w-20 h-32 border border-white/[0.04] rounded-lg flex items-center justify-center bg-white/[0.01]">
            <span className="text-white/10 text-xl font-light">♠</span>
          </div>
        </div>
        
        <div className="absolute inset-0 backface-hidden rounded-xl glass-panel p-3 flex items-center justify-center text-center rotate-y-180 bg-graphite-900 shadow-2xl">
          <p className="text-[10px] text-white/80 font-normal leading-relaxed tracking-wide">
            {siteConfig.easterEgg.quote}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}