import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const SLIDES = [
  { id: 1, title: 'eSewa Hackathon', img: '/images/TimeLine/june/Group.jpeg' },
  { id: 2, title: 'AI Conclave', img: '/images/TimeLine/ai-conclave/Group.JPG' },
  { id: 3, title: 'AAVISHKAR-25', img: '/images/TimeLine/aaviskar/group.jpeg' },
  { id: 4, title: 'Hack for Nepal - 2025', img: '/images/TimeLine/Hack4Nepal/group.jpg' },
];

const INFINITE_SLIDES = [...SLIDES, ...SLIDES];

export default function AutoRibbonCarousel() {
  return (
    <section id="gallery" className="w-full max-w-full py-24 bg-transparent border-t border-slate-200/60 overflow-hidden scroll-mt-12 relative">
      
      {/* Section Header Row */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-10 flex justify-between items-end">
        <div>
          <span className="font-mono text-xs tracking-widest text-blue-600 uppercase"></span>
          <h2 className="text-5xl font-black text-slate-900 mt-1">Snapshots</h2>
        </div>
        
        {/* Navigates cleanly to the top of the timeline page */}
        <Link 
          to="/archive-timeline" 
          className="inline-flex items-center gap-2 text-sm font-mono text-slate-500 hover:text-blue-600 transition-colors group"
        >
          <span>VIEW FULL TIMELINE</span>
          <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* INFINITE LOOP CONTAINER */}
      <div className="block w-full max-w-full overflow-hidden relative">
        {/* Edge Fade Gradients adjusted to fade from transparent parent */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white via-white/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/70 to-transparent z-10 pointer-events-none" />

        <div className="w-full max-w-full overflow-hidden py-8 flex items-center">
          <motion.div
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              ease: 'linear',
              duration: 25,
              repeat: Infinity,
            }}
            whileHover={{ animationPlayState: 'paused' }}
            className="flex items-center gap-6 md:gap-8 pr-6 md:pr-8 shrink-0"
          >
            {INFINITE_SLIDES.map((slide, idx) => (
              <Link
                key={`${slide.id}-${idx}`}
                to="/archive-timeline"
                state={{ scrollToId: `timeline-item-${slide.id}` }}
                className={`w-[220px] sm:w-[260px] md:w-[280px] aspect-[4/5] bg-slate-100 rounded-[28px] overflow-hidden border border-slate-200/80 flex-shrink-0 relative group/card shadow-sm hover:shadow-md transition-transform duration-300 ${
                  idx % 2 === 1 ? 'translate-y-5' : '-translate-y-3'
                }`}
              >
                <img src={slide.img} alt={slide.title} className="w-full h-full object-cover pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h4 className="text-white font-mono text-xs uppercase tracking-wide">{slide.title}</h4>
                </div>
              </Link>
            ))}
          </motion.div>

          <motion.div
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              ease: 'linear',
              duration: 25,
              repeat: Infinity,
            }}
            whileHover={{ animationPlayState: 'paused' }}
            aria-hidden="true"
            className="flex items-center gap-6 md:gap-8 pr-6 md:pr-8 shrink-0"
          >
            {INFINITE_SLIDES.map((slide, idx) => (
              <Link
                key={`${slide.id}-duplicate-${idx}`}
                to="/archive-timeline"
                state={{ scrollToId: `timeline-item-${slide.id}` }}
                className={`w-[220px] sm:w-[260px] md:w-[280px] aspect-[4/5] bg-slate-100 rounded-[28px] overflow-hidden border border-slate-200/80 flex-shrink-0 relative group/card shadow-sm hover:shadow-md transition-transform duration-300 ${
                  idx % 2 === 1 ? 'translate-y-5' : '-translate-y-3'
                }`}
              >
                <img src={slide.img} alt={slide.title} className="w-full h-full object-cover pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h4 className="text-white font-mono text-xs uppercase tracking-wide">{slide.title}</h4>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}