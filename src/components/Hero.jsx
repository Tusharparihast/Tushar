import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  FiArrowDown, 
  FiArrowRight, 
  FiExternalLink, 
  FiFileText, 
  FiMail,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiFacebook
} from 'react-icons/fi';

export default function Hero() {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="top" 
      className="relative min-h-screen w-full max-w-full flex flex-col items-start justify-center px-4 sm:px-8 md:px-12 lg:px-24 overflow-hidden bg-transparent isolate pt-12 md:pt-0"
    >

      {/* DESKTOP BACKGROUND IMAGE (Hidden on mobile) */}
      <div
        className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full bg-cover bg-center bg-no-repeat pointer-events-none z-0"
        style={{ backgroundImage: "url('/hero.png')" }}
      />

      {/* MAIN CONTAINER */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center py-4 md:py-20">

        {/* HERO CONTENT */}
        <div className="w-full flex flex-col items-start text-left">

          {/* MOBILE EXPANDED BANNER WITH OVERLAY TEXT */}
          <div className="relative w-full mb-5 md:mb-0">

            {/* Mobile Vertical-Stretched Image Card */}
            <div className="block md:hidden w-full min-h-[52vh] aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-slate-200/60 relative">
              <img 
                src="/hero.png" 
                alt="Hero Background" 
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>

            {/* TEXT LAYER (Fills vertically on Mobile, normal flex on Desktop) */}
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between items-start md:relative md:p-0 md:inset-auto">

              {/* System Status */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50/90 backdrop-blur border border-slate-200/80 text-slate-700 rounded-lg font-mono text-[10px] sm:text-xs tracking-widest mb-auto md:mb-6 shadow-sm"
              >
                AI Engineer • AI Automation • GenAI
              </motion.div>

              {/* Text Group (Headline + Description) */}
              <div className="w-full my-auto md:my-0">
                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-serif font-medium text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.12] sm:leading-[1.02] md:leading-[0.95] mb-3 md:mb-7 max-w-5xl text-[#0B1220] drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] md:drop-shadow-[0_2px_3px_rgba(255,255,255,0.35)]"
                >
                  Teaching Machines
                  <br />

                  <span>
                    to Understand
                  </span>

                  <br />

                  <span className="text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                    the Visual World
                  </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xs sm:text-base md:text-lg text-black font-medium md:font-normal max-w-2xl leading-relaxed mb-0 md:mb-8 drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)] md:drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]"
                >
                 Building practical AI systems, automation workflows, and intelligent applications.
                </motion.p>
              </div>

            </div>

          </div>

          {/* BUTTONS & SOCIAL ICONS GROUP */}
          <div className="flex flex-col gap-5 w-full sm:w-auto">
            
            {/* BUTTONS ROW */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
            >

              {/* Primary CTA (Royal Blue Ink) */}
              <motion.a
                href="#projects"
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="group relative overflow-hidden w-full sm:w-auto px-6 py-3.5 md:py-3 bg-[#1A6CFF] text-white font-bold rounded-xl md:rounded-lg text-sm shadow-[0_4px_14px_rgba(26,108,255,0.35)] text-center flex items-center justify-center gap-2"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500 transform -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Explore Projects</span>
                  <FiArrowRight size={16} className="transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                </span>
              </motion.a>

              {/* Secondary Buttons Row */}
              <div className="grid grid-cols-2 sm:flex items-center gap-3 w-full sm:w-auto">
                
                {/* Resume Button */}
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="group relative overflow-hidden w-full sm:w-auto px-5 py-3 bg-[#090D16]/90 text-slate-200 border border-slate-700/80 hover:border-slate-400 font-semibold rounded-xl md:rounded-lg text-xs sm:text-sm text-center flex items-center justify-center transition-colors duration-300 shadow-sm"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-slate-700 via-stone-700 to-slate-800 transform -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0" />

                  <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300">
                    <FiFileText size={16} className="text-slate-300 group-hover:text-white transition-colors duration-300" />
                    <span>Resume</span>
                    <FiExternalLink size={14} className="text-slate-400 group-hover:text-white transition-colors duration-300" />
                  </span>
                </motion.a>

                {/* Contact Button (Smoothed Vertical-Slide Hover Effect) */}
                <motion.a
                  href="#contact"
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="group relative overflow-hidden w-full sm:w-auto px-5 py-3 bg-[#090D16]/90 text-slate-200 border border-slate-700/80 hover:border-slate-400 font-semibold rounded-xl md:rounded-lg text-xs sm:text-sm text-center flex items-center justify-center transform-gpu transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-sm"
                >
                  {/* DEFAULT CONTENT */}
                  <div className="flex items-center justify-center gap-2 transform-gpu transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-10 group-hover:opacity-0 will-change-transform">
                    <span>Let&apos;s Connect</span>
                  </div>

                  {/* HOVER SWIPE CONTENT */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 transform-gpu translate-y-10 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100 bg-slate-800 text-white will-change-transform">
                    <FiMail size={16} className="transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110" />
                  </div>
                </motion.a>

              </div>

            </motion.div>

            {/* SOCIAL CONTACT ICONS ROW */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-4 pt-1"
            >
              <a 
                href="https://github.com/Tusharparihast" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-800 hover:text-blue-600 md:text-slate-700 md:hover:text-blue-500 transition-colors p-1" 
                title="GitHub"
              >
                <FiGithub size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/tushar-parihast-422107267/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-800 hover:text-blue-600 md:text-slate-700 md:hover:text-blue-500 transition-colors p-1" 
                title="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
              <a 
                href="https://www.facebook.com/tushar.parihast.7" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-800 hover:text-blue-600 md:text-slate-700 md:hover:text-blue-500 transition-colors p-1" 
                title="Facebook"
              >
                <FiFacebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/tus_rparihast/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-800 hover:text-blue-600 md:text-slate-700 md:hover:text-blue-500 transition-colors p-1" 
                title="Instagram"
              >
                <FiInstagram size={20} />
              </a>
            </motion.div>

          </div>

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
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-700 pointer-events-none z-20 hidden sm:block"
      >
        <FiArrowDown size={20} />
      </motion.div>

    </section>
  );
}