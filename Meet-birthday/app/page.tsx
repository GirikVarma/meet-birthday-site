// app/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useReducedMotion } from "framer-motion";
import AmbientBackground from "@/components/AmbientBackground";
import { MessageSlider, EasterEgg } from "@/components/Interactive";
import { siteConfig } from "@/config";
import Image from "next/image";

const appleEase = [0.22, 1, 0.36, 1];

export default function Home() {
  const [loadStage, setLoadStage] = useState<"name" | "bar" | "greet" | "complete">("name");
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const hasFiredConfetti = useRef(false);
  
  const smoothScrollY = useSpring(scrollY, { stiffness: 90, damping: 25, restDelta: 0.001 });
  
  const headerOpacity = useTransform(smoothScrollY, [80, 260], [0, 1]);
  const headerY = useTransform(smoothScrollY, [80, 260], [-15, 0]);
  
  const heroOpacity = useTransform(smoothScrollY, [0, 450], [1, 0]);
  const heroY = useTransform(smoothScrollY, [0, 450], [0, 50]);

  // Framer Motion Modern API Cleanup Integration Loop
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest > 50 && !scrolled) setScrolled(true);
    });
    return () => unsubscribe();
  }, [scrollY, scrolled]);

  useEffect(() => {
    const p1 = setTimeout(() => setLoadStage("bar"), 600);
    const p2 = setTimeout(() => setLoadStage("greet"), 1800);
    const p3 = setTimeout(() => {
      setLoadStage("complete");
      setLoadingComplete(true);
    }, 3200);

    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
    };
  }, []);

  const executeConfettiBurst = async () => {
    if (hasFiredConfetti.current || prefersReducedMotion) return;
    hasFiredConfetti.current = true;
    
    try {
      const confettiModule = await import("canvas-confetti");
      const fire = confettiModule.default;
      
      fire({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.65 },
        colors: ["#2997ff", "#ffffff", "#86868b", "#ffd700"],
        disableForReducedMotion: true
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <AnimatePresence onExitComplete={executeConfettiBurst}>
        {!loadingComplete && (
          <motion.div 
            key="loading-viewport"
            exit={{ opacity: 0, filter: "blur(12px)" }}
            transition={{ duration: 0.8, ease: appleEase }}
            className="fixed inset-0 z-[100] bg-graphite-900 flex flex-col items-center justify-center select-none"
          >
            <div className="relative w-[240px] flex flex-col items-center">
              <AnimatePresence mode="wait">
                {loadStage === "name" && (
                  <motion.p
                    key="stage-url"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-white text-xs tracking-[0.35em] font-light uppercase text-center"
                  >
                    meetkeswani.com
                  </motion.p>
                )}

                {loadStage === "bar" && (
                  <motion.div
                    key="stage-bar"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-[1px] bg-white/10 rounded-full overflow-hidden"
                  >
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
                      className="h-full bg-white/40"
                    />
                  </motion.div>
                )}

                {loadStage === "greet" && (
                  <motion.h2
                    key="stage-greeting"
                    initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                    animate={{ opacity: 0.9, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, ease: appleEase }}
                    className="text-lg font-light tracking-wide text-white text-center"
                  >
                    Happy Birthday.
                  </motion.h2>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative min-h-screen bg-graphite-900 text-white selection:bg-apple-blue/20 overflow-hidden">
        <AmbientBackground />
        <EasterEgg />

        <motion.nav
          style={{ opacity: headerOpacity, y: headerY }}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-50 glass-panel px-6 py-2.5 rounded-full pointer-events-none"
        >
          <span className="text-[10px] font-semibold tracking-[0.25em] text-white/70 uppercase">
            {siteConfig.hero.name}
          </span>
        </motion.nav>

        <section className="relative h-screen flex flex-col items-center justify-center px-6 z-10 select-none">
          <motion.div style={prefersReducedMotion ? {} : { opacity: heroOpacity, y: heroY }} className="text-center w-full">
            <motion.h1 
              initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
              animate={loadingComplete ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.1, duration: 1.2, ease: appleEase }}
              className="text-fluid-h1 font-semibold tracking-tighter text-white mb-6"
            >
              {siteConfig.hero.name}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={loadingComplete ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 1.2, ease: appleEase }}
              className="text-base md:text-lg text-apple-gray font-light max-w-md mx-auto mb-20 tracking-wide"
            >
              {siteConfig.hero.subtitle}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              {[siteConfig.hero.stat1, siteConfig.hero.stat2].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={loadingComplete ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + (idx * 0.1), duration: 0.8, ease: appleEase }}
                  className="glass-panel rounded-2xl p-6 w-52 flex flex-col items-center group cursor-default"
                >
                  <div className="text-3xl font-medium text-white/90 mb-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                    {stat.value}
                  </div>
                  <div className="text-[9px] uppercase tracking-[0.2em] text-apple-gray font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <AnimatePresence>
            {!scrolled && loadingComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
              >
                <motion.div 
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-3 rounded-full bg-white"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="relative py-28 px-6 z-10 flex flex-col items-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: appleEase }}
            className="w-full text-center mb-16"
          >
            <h2 className="text-xs uppercase tracking-[0.3em] text-apple-gray font-semibold mb-2">Chapters</h2>
            <p className="text-2xl font-normal text-white/90 tracking-tight">Birthday Wishes</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: appleEase }}
            className="w-full"
          >
            <MessageSlider />
          </motion.div>
        </section>

        <section className="relative py-36 px-6 z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: appleEase }}
            className="w-full text-center mb-20"
          >
            <h2 className="text-xs uppercase tracking-[0.3em] text-apple-gray font-semibold mb-2">Retrospective</h2>
            <p className="text-2xl font-normal text-white/90 tracking-tight">Memories</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteConfig.gallery.map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : Math.min(idx * 0.08, 0.3), ease: appleEase }}
                className="relative aspect-[4/5] rounded-[28px] overflow-hidden glass-panel group shadow-xl"
              >
                <Image
                  src={src}
                  alt={`Memory visualization frame ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover rounded-[28px] transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="relative h-[80vh] flex flex-col items-center justify-center px-6 z-10 select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: appleEase }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex -space-x-2.5 mb-10">
              {siteConfig.footer.friends.map((friend, idx) => (
                <div 
                  key={idx} 
                  className="w-12 h-12 rounded-full border-2 border-graphite-900 flex items-center justify-center overflow-hidden z-10 hover:z-20 hover:-translate-y-1.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-md shadow-lg"
                >
                  <span className="text-[10px] text-white/50 font-bold tracking-wider uppercase">{friend.initial}</span>
                </div>
              ))}
            </div>
            
            <p className="text-apple-gray text-[10px] tracking-[0.2em] uppercase mb-12 font-medium">
              Made with ❤️ by {siteConfig.footer.friends.map(f => f.name).join(', ')}
            </p>

            <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter text-white/90 whitespace-pre-line leading-[1.1]">
              {siteConfig.footer.closing}
            </h2>
          </motion.div>
        </section>
      </main>
    </>
  );
}