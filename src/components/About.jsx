import { motion } from "framer-motion";

export default function About() {
  const tickerItems = [
    "MACHINE LEARNING",
    "COMPUTER VISION",
    "AUTOMATION",
    "SOFTWARE ENGINEERING",
    "AI UNDERGRADUATE",
    "PROBLEM SOLVER"
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex items-center justify-center bg-white text-slate-800"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: Organic Shape Background + Rounded Image + Handwritten Accent */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          
          {/* Soft Blue Asymmetrical Organic Blob */}
          <div className="absolute -top-6 -left-6 w-[110%] h-[110%] bg-blue-50/80 rounded-[40%_60%_70%_30%/50%_60%_40%_50%] -z-10 pointer-events-none" />

          {/* Rounded Portrait Card */}
          <div className="w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[26rem] rounded-3xl overflow-hidden shadow-xl border border-slate-100/80 relative bg-slate-200">
            <img
              src="/profile.png"
              alt="Tushar Parihast"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Editorial Content & Typography */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">

          {/* Name Header */}
          <h2 className="tracking-tight leading-tight mb-6">
            <span className="block text-xl sm:text-2xl md:text-3xl font-semibold text-slate-700 mb-1">
              Hi, I&apos;m
            </span>
            <span className="block text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900">
              Tushar Parihast.
            </span>
          </h2>

          {/* CONTINUOUS FRAMER-MOTION CAROUSEL TICKER */}
          <div className="w-full overflow-hidden pt-3 pb-4 mb-8 border-t border-slate-200 relative select-none">
            <motion.div
              className="flex w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 18,
                repeat: Infinity,
              }}
            >
              {/* First Track Loop */}
              <div className="flex items-center gap-6 pr-6">
                {tickerItems.map((item, idx) => (
                  <div key={`track1-${idx}`} className="flex items-center gap-6">
                    <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-slate-600 uppercase whitespace-nowrap">
                      {item}
                    </span>
                    <span className="text-orange-500 text-xs font-bold">•</span>
                  </div>
                ))}
              </div>

              {/* Seamless Duplicate Track Loop for Infinite Carousel */}
              <div className="flex items-center gap-6 pr-6" aria-hidden="true">
                {tickerItems.map((item, idx) => (
                  <div key={`track2-${idx}`} className="flex items-center gap-6">
                    <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-slate-600 uppercase whitespace-nowrap">
                      {item}
                    </span>
                    <span className="text-orange-500 text-xs font-bold">•</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bio Paragraphs */}
          <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-2xl mb-8">
            <p>
              I&apos;m a final-year AI undergraduate at Kathmandu University, interested in building intelligent systems that solve real-world problems.
            </p>
            <p>
              My work focuses on computer vision, machine learning, and automation. Through hands-on projects, hackathons, and student leadership, I bring together software engineering and AI to turn ideas into practical solutions.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}