import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiArrowLeft } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import galleryData from '../data/galleryData.json';

const TIMELINE_DATA = galleryData.timeline;

export default function ArchiveTimeline() {
  const location = useLocation();
  const [highlightedId, setHighlightedId] = useState(null);

  useEffect(() => {
    const scrollToId = location.state?.scrollToId;
    const targetHighlightId = location.state?.highlightId || scrollToId;

    if (scrollToId) {
      const timer = setTimeout(() => {
        const targetElement = document.getElementById(scrollToId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setHighlightedId(targetHighlightId);
        }
      }, 100);

      const clearHighlightTimer = setTimeout(() => {
        setHighlightedId(null);
      }, 2500);

      return () => {
        clearTimeout(timer);
        clearTimeout(clearHighlightTimer);
      };
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.state]);

  return (
    <div className="min-h-screen w-full bg-slate-50/50 text-slate-800 py-24 px-6 md:px-12 lg:px-24 select-none">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-20">
          <Link 
            to="/" 
            state={{ scrollToId: 'gallery' }}
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-slate-900 mb-6 group transition-colors focus:outline-none"
          >
            <FiArrowLeft className="transform group-hover:-translate-x-1 transition-transform" /> 
            BACK TO PORTFOLIO
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-2">
            The Journey Beyond Projects
          </h1>
        </div>

        {/* Center Vertical Rule Axis */}
        <div className="relative border-l border-slate-200 ml-4 md:ml-0 md:left-1/2 md:border-r md:border-l-0 w-0 h-full" />

        <div className="space-y-24 relative">
          {TIMELINE_DATA.map((entry, idx) => {
            const isEven = idx % 2 === 0;
            const elementId = `timeline-item-${entry.id}`;
            const isHighlighted = highlightedId === elementId;

            return (
              <motion.div 
                key={entry.id}
                id={elementId}
                animate={
                  isHighlighted
                    ? {
                        scale: [1, 1.05, 1, 1.05, 1],
                      }
                    : { scale: 1 }
                }
                transition={{
                  duration: 1.2,
                  ease: 'easeInOut',
                  times: [0, 0.25, 0.5, 0.75, 1],
                }}
                className={`scroll-mt-28 flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center relative rounded-3xl p-4 transition-all duration-300 ${
                  isHighlighted ? 'border-2 border-blue-500 shadow-xl shadow-blue-500/20 bg-blue-50/30 ring-4 ring-blue-300/40 z-20' : ''
                } ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node Intersect Dot */}
                <div className="absolute left-[-21px] md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center z-10 shadow-sm">
                  <div className="w-3 h-3 rounded-full bg-blue-600" />
                </div>

                {/* Left/Right Text Descriptor Content */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col pl-8 md:pl-0 ${isEven ? 'md:text-right md:items-end' : 'md:text-left md:items-start'}`}
                >
                  <div className="flex items-center gap-2 font-mono text-xs text-blue-600 bg-blue-50/80 border border-blue-100 px-3 py-1 rounded-full mb-3">
                    <FiCalendar size={12} />
                    <span>{entry.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">{entry.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-md">{entry.desc}</p>
                </motion.div>

                {/* Structural Image Sub-Grids */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`w-full grid gap-3 ${
                    entry.images.length === 1 ? 'grid-cols-1' : entry.images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
                  } ${isEven ? 'md:order-last' : 'md:order-first'}`}
                >
                  {entry.images.map((imgUrl, imgIdx) => (
                    <div 
                      key={imgIdx} 
                      className={`rounded-2xl border border-slate-200/80 overflow-hidden bg-white shadow-sm hover:scale-[1.02] transition-transform duration-300 ${
                        entry.images.length === 3 && imgIdx === 0 ? 'col-span-3 aspect-[21/9]' : 'aspect-square'
                      }`}
                    >
                      <img src={imgUrl} alt="Log capture snapshot" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </motion.div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}