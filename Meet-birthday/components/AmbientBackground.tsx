// components/AmbientBackground.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AmbientBackground() {
  const [shootingStar, setShootingStar] = useState(false);

  useEffect(() => {
    let starTimeout: NodeJS.Timeout;
    let loopTimeout: NodeJS.Timeout;

    const triggerStar = () => {
      setShootingStar(true);
      starTimeout = setTimeout(() => setShootingStar(false), 2500);
      
      const nextInterval = Math.random() * (45000 - 30000) + 30000;
      loopTimeout = setTimeout(triggerStar, nextInterval);
    };

    const initialTimeout = setTimeout(triggerStar, 20000);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(starTimeout);
      clearTimeout(loopTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-graphite-900">
      {/* Ambient Radial Illumination */}
      <motion.div 
        animate={{ opacity: [0.12, 0.22, 0.12], scale: [1, 1.03, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-apple-blue/5 blur-[140px] rounded-full"
      />
      <motion.div 
        animate={{ opacity: [0.08, 0.16, 0.08], scale: [1, 1.06, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-[-15%] right-[-10%] w-[70%] h-[70%] bg-white/[0.02] blur-[160px] rounded-full"
      />

      {/* Deep Space Background Pattern */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '130px 130px'
        }}
      />

      {/* Hardware Accelerated Shooting Star */}
      <motion.div
        key={shootingStar ? "active" : "inactive"}
        initial={{ x: "105vw", y: "-5vh", opacity: 0, scale: 0.6 }}
        animate={shootingStar ? { x: "-15vw", y: "35vh", opacity: [0, 0.7, 0], scale: 1 } : {}}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute w-44 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent rotate-[35deg] blur-[0.5px]"
      />
    </div>
  );
}