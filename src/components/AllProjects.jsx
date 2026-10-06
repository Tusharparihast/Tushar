import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCode } from 'react-icons/fi';
import projects from '../data/projectData.json';

export default function AllProjects() {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState('All');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const domains = ['All', ...new Set(projects.map(p => p.domain).filter(Boolean))];

  const filteredProjects = selectedDomain === 'All' 
    ? projects 
    : projects.filter(p => p.domain === selectedDomain);

  const handleBackToProjects = () => {
    navigate('/', { state: { scrollToId: 'projects' } });
  };

  const goToDetail = (id) => {
    navigate(`/projects/${id}`);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-16 px-6 md:px-12 lg:px-24 text-slate-900 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Navigation */}
        <div className="mb-10">
          <button
            onClick={handleBackToProjects}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-blue-600 hover:text-blue-700 transition-colors mb-8"
          >
            <span className="text-sm">←</span> BACK TO DASHBOARD
          </button>

          {/* Clean Light-Theme Header */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-600 block">
              PORTFOLIO ARCHIVE / ALL WORKS
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              All Projects
            </h1>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-wider pt-1">
              TOTAL COMPLETED: {projects.length} PROJECTS
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-slate-200 pb-6">
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-4 py-1.5 rounded-md text-xs font-mono font-semibold transition-all ${
                selectedDomain === domain
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              onClick={() => goToDetail(project.id)}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <div>
                {/* Image Container */}
                <div className="relative w-full aspect-[16/9] bg-slate-100 overflow-hidden border-b border-slate-100">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-mono">
                      No Image Available
                    </div>
                  )}

                  {/* Clean Category Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md text-blue-600 text-[11px] font-mono font-bold tracking-wider uppercase rounded-md shadow-sm border border-slate-200/50">
                    {project.domain || 'SYSTEM'}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  {/* Category Subhead */}
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-600 block mb-1">
                    {project.domain || 'AUTOMATION'}
                  </span>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p className="text-slate-600 text-xs leading-relaxed mb-6 line-clamp-3">
                    {project.shortDescription || project.description}
                  </p>

                  {/* Tech Stack Deployed Block */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60 mb-6">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block mb-2.5">
                      TECH STACK DEPLOYED
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech?.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="px-2.5 py-1 bg-white text-slate-700 text-[11px] font-mono font-medium rounded-md border border-slate-200 shadow-2xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}