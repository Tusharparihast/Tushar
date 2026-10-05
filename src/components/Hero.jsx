import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiArrowDown, FiArrowRight, FiExternalLink, FiFileText } from 'react-icons/fi';

export default function Hero() {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full max-w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-12 lg:px-24 overflow-hidden bg-transparent isolate">

      {/* Hero Background Image - Locked at z-0 (Bottom Layer) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full bg-cover bg-center bg-no-repeat pointer-events-none z-0"
        style={{ backgroundImage: "url('/hero.png')" }}
      />

      {/* Mobile Contrast Overlay - z-0 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/60 to-slate-950/80 md:bg-none pointer-events-none z-0" />

      {/* 
        NOTE: Place your floating bubble/element components right here!
        Give them `z-10` so they float ABOVE the background image (z-0) 
        and BEHIND the main text content (z-20).
      */}

      {/* Main Content - Raised to z-20 (Top Layer) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center py-16 sm:py-20">

        {/* HERO TYPOGRAPHY */}
        <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left">

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900/80 md:bg-slate-50/80 backdrop-blur border border-slate-700 md:border-slate-200 text-slate-200 md:text-slate-500 rounded-md font-mono text-[10px] sm:text-xs tracking-widest uppercase mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            [SYSTEM STATUS: RUNNING]
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-mellow text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.12] sm:leading-[1.05] md:leading-[0.95] mb-6 sm:mb-7 max-w-5xl text-white md:text-[#0B1220] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] md:drop-shadow-[0_2px_3px_rgba(255,255,255,0.35)]"
          >
            Teaching Machines
            <br />

            <span>
              to Understand
            </span>

            <br />

            <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)]">
              the Visual World
            </span>

            <span
              className={`inline-block ml-1 sm:ml-2 text-[#7DD3FC] transition-opacity duration-100 ${
                blink ? 'opacity-100' : 'opacity-0'
              }`}
            >
              _
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs sm:text-base md:text-lg text-slate-200 sm:text-white font-normal max-w-2xl leading-relaxed mb-8 drop-shadow-[0_2px_5px_rgba(0,0,0,0.85)]"
          >
            AI Undergraduate student building intelligent systems through
            Computer Vision, Machine Learning, and Intelligent Automation.
          </motion.p>

          {/* Sharp Modern Buttons Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
          >

            {/* Primary CTA: Vibrant Blue with Glow & Arrow */}
            <a
              href="#projects"
              className="w-full sm:w-auto px-6 py-3 bg-[#1A6CFF] hover:bg-blue-600 text-white font-bold rounded-lg text-sm shadow-[0_8px_20px_rgba(26,108,255,0.35)] text-center flex items-center justify-center gap-2 transition-all transform active:scale-95 hover:-translate-y-0.5"
            >
              <span>Explore Projects</span>
              <FiArrowRight size={16} />
            </a>

            {/* Secondary Buttons Row */}
            <div className="grid grid-cols-2 sm:flex items-center gap-3 w-full sm:w-auto">
              
              {/* Resume Button */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 bg-[#090D16]/90 hover:bg-[#0F1623] text-white border border-slate-700/70 font-semibold rounded-lg text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-all transform active:scale-95 hover:-translate-y-0.5 shadow-sm"
              >
                <FiFileText size={16} className="text-slate-200" />
                <span>Resume</span>
                <FiExternalLink size={14} className="text-slate-300" />
              </a>

              {/* Contact Button */}
              <a
                href="#contact"
                className="w-full sm:w-auto px-5 py-3 bg-[#090D16]/90 hover:bg-[#0F1623] text-white border border-slate-700/70 font-semibold rounded-lg text-xs sm:text-sm text-center flex items-center justify-center transition-all transform active:scale-95 hover:-translate-y-0.5 shadow-sm"
              >
                Let's Connect
              </a>

            </div>

          </motion.div>
        </div>
      </div>

      {/* Footer Indicator Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0], y: [0, 6, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1,
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 pointer-events-none z-20 hidden sm:block"
      >
        <FiArrowDown size={20} />
      </motion.div>

    </section>
  );
}