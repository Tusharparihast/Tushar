import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import projects from '../data/projectData.json';

export default function Projects() {
  const navigate = useNavigate();

  const featuredProject = projects[0];
  const gridProjects = projects.slice(1, 5);

  const handleNavigateAll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/projects');
  };

  return (
    <section id="projects" className="bg-[#F7F4EB] py-16 md:py-20 px-6 md:px-12 lg:px-20 text-[#1C1917]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-semibold tracking-widest text-[#8C827A] uppercase mb-1 block font-mono">
              SELECTED WORK
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1C1917]">
              My Projects
            </h2>
          </div>
          
          {/* Functional Desktop View All Button */}
          <button 
            onClick={handleNavigateAll}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#EDE8DC] hover:bg-[#E2DCCF] text-xs font-mono font-bold text-[#2B1D12] transition-all border border-[#2B1D12]/10"
          >
            View All ({projects.length}) <FiArrowRight size={14} />
          </button>
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* FEATURED LEFT CARD */}
          {featuredProject && (
            <motion.div
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate(`/projects/${featuredProject.id}`);
              }}
              className="lg:col-span-6 bg-[#2B1D12] text-[#F7F4EB] rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              {/* Edge-to-Edge Image Container */}
              <div className="relative w-full aspect-[16/8] bg-[#3B2A1E] overflow-hidden">
                {featuredProject.image ? (
                  <img
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-[#4A3728] flex items-center justify-center text-[#8C827A]">
                    No Preview Available
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  {/* Category Pill with high contrast */}
                  <span className="inline-block px-3.5 py-1 bg-[#3D2B1E] text-amber-200 border border-amber-500/20 text-xs font-mono font-semibold rounded-full mb-3 shadow-sm">
                    {featuredProject.domain || 'AI / Automation'}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-serif font-bold mb-2 leading-snug">
                    {featuredProject.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-xs leading-relaxed mb-4 line-clamp-2">
                    {featuredProject.shortDescription}
                  </p>

                  {/* Tech Stack Pills with high contrast */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {featuredProject.tech?.map((tech, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 bg-[#3D2B1E] text-amber-100/90 text-xs font-mono font-medium rounded-full border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <div>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#F7F4EB] text-[#2B1D12] rounded-full text-xs font-bold font-mono hover:bg-white transition-colors">
                    View Project <FiArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* SECONDARY 2x2 RIGHT GRID */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {gridProjects.map((project) => (
              <motion.div
                key={project.id}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  navigate(`/projects/${project.id}`);
                }}
                className="bg-[#EDE8DC]/80 hover:bg-[#EDE8DC] rounded-3xl overflow-hidden flex flex-col justify-between cursor-pointer group transition-colors duration-300 border border-[#2B1D12]/10 shadow-sm"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              >
                <div>
                  {/* Edge-to-Edge Image Preview with Distinct Floating Badge */}
                  <div className="relative w-full aspect-[16/7] overflow-hidden bg-[#DCD5C5]">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#8C827A] text-xs font-mono">
                        No Preview
                      </div>
                    )}

                    {/* Distinct Dark Floating Category Badge */}
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#1C1917]/90 backdrop-blur-md text-[#F7F4EB] text-[10px] font-mono font-semibold rounded-full shadow-md border border-white/10">
                      {project.domain || 'Computer Vision'}
                    </span>
                  </div>

                  {/* Text Body */}
                  <div className="p-3.5">
                    <h4 className="text-sm font-bold font-serif text-[#1C1917] mb-2 group-hover:text-[#2B1D12] transition-colors leading-snug line-clamp-1">
                      {project.title}
                    </h4>

                    {/* Distinct Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1">
                      {project.tech?.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-[#DCD5C5] text-[#2B1D12] text-[10px] font-mono font-medium rounded-full border border-[#2B1D12]/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Mobile View All Button */}
        <div className="mt-6 text-center sm:hidden">
          <button 
            onClick={handleNavigateAll}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2B1D12] text-[#F7F4EB] rounded-full text-xs font-mono font-bold"
          >
            View All Projects ({projects.length}) <FiArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}