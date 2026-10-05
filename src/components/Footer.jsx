import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiGithub, 
  FiLinkedin, 
  FiMail, 
  FiArrowUp, 
  FiInstagram, 
  FiFacebook, 
  FiX, 
  FiCheckCircle,
  FiPhone,
  FiMapPin
} from 'react-icons/fi';

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState({});

  // 🚀 BACKGROUND SCROLL LOCK PIPELINE
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();

    // 🛠 Custom inline evaluation layer
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!message) newErrors.message = "Message cannot be empty";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSending(true);

    try {
      const response = await fetch('https://formspree.io/f/mwvdewab', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSending(false);
        setIsSent(true);
        e.target.reset();
        
        setTimeout(() => {
          setIsSent(false);
          setIsOpen(false);
        }, 2000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setIsSending(false);
      alert('Oops! There was a problem submitting your form. Please try again.');
    }
  };

  const handleInputChange = (field) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  return (
    <footer id="contact" className="bg-[#0b1021] text-slate-300 pt-20 pb-10 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* MAIN SECTION: 2-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-20">
          
          {/* LEFT COLUMN: CALL TO ACTION */}
          <motion.div 
            className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 font-semibold mb-6">
              Get in Touch
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.15] mb-6">
              Let&apos;s Build Something Intelligent.
            </h2>

            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md mb-8">
              Have a project in mind, collaboration idea, or just want to say hello? I&apos;d love to hear from you.
            </p>

            {/* HIGH-PERFORMANCE HARDWARE-ACCELERATED BUTTON */}
            <button 
              onClick={() => setIsOpen(true)}
              className="relative group overflow-hidden px-7 py-3.5 bg-blue-600 text-white font-medium text-sm rounded-xl shadow-lg shadow-blue-600/20 active:scale-95 transform-gpu transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            >
              {/* DEFAULT CONTENT */}
              <div className="flex items-center gap-2.5 transform-gpu transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-12 group-hover:opacity-0 will-change-transform">
                <FiMail size={18} />
                <span>Get in touch</span>
              </div>

              {/* HOVER SWIPE CONTENT */}
              <div className="absolute inset-0 flex items-center justify-center transform-gpu translate-y-12 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100 bg-blue-600 text-white will-change-transform">
                <FiMail size={22} className="transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110" />
              </div>
            </button>
          </motion.div>

          {/* RIGHT COLUMN: CONTACT & LOCATION CARDS */}
          <motion.div 
            className="lg:col-span-6 flex flex-col gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Card 1: Email */}
            <a 
              href="mailto:parihasttushar@gmail.com" 
              className="group bg-[#11182e]/80 hover:bg-[#16203d] border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-4 md:p-5 transition-all duration-300 ease-out flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-900/30 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 ease-out">
                <FiMail size={20} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-slate-400 font-medium mb-0.5">Email</span>
                <span className="text-sm md:text-base text-slate-200 font-medium truncate group-hover:text-white">
                  parihastushar@gmail.com
                </span>
              </div>
            </a>

            {/* Card 2: Phone Number */}
            <a 
              href="tel:+9779840036059" 
              className="group bg-[#11182e]/80 hover:bg-[#16203d] border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-4 md:p-5 transition-all duration-300 ease-out flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-900/30 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 ease-out">
                <FiPhone size={20} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-slate-400 font-medium mb-0.5">Phone</span>
                <span className="text-sm md:text-base text-slate-200 font-medium truncate group-hover:text-white">
                  +977 98XXXXXXXX
                </span>
              </div>
            </a>

            {/* Card 3: Location */}
            <a 
              href="https://maps.google.com/?q=Kathmandu,+Nepal" 
              target="_blank" 
              rel="noreferrer"
              className="group bg-[#11182e]/80 hover:bg-[#16203d] border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-4 md:p-5 transition-all duration-300 ease-out flex items-center gap-4 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-900/30 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 ease-out">
                <FiMapPin size={20} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-slate-400 font-medium mb-0.5">Location</span>
                <span className="text-sm md:text-base text-slate-200 font-medium truncate group-hover:text-white">
                  Kathmandu, Nepal
                </span>
              </div>
            </a>

            {/* Italic Tagline */}
            <p className="text-slate-400 text-sm italic mt-2">
              Let&apos;s create something great together.
            </p>
          </motion.div>

        </div>

        {/* BOTTOM BRANDING & NAVIGATION BAR */}
        <div className="w-full border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Copyright Text */}
          <div className="text-xs font-mono tracking-wider text-slate-500 order-2 sm:order-1">
            © {new Date().getFullYear()} TUSHAR PARIHAST. ALL RIGHTS RESERVED.
          </div>

          {/* Social Links & Scroll Button */}
          <div className="flex items-center gap-5 order-1 sm:order-2">
            <a href="https://www.instagram.com/tus_rparihast/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors p-1" title="Instagram">
              <FiInstagram size={18} />
            </a>
            <a href="https://www.facebook.com/tushar.parihast.7" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors p-1" title="Facebook">
              <FiFacebook size={18} />
            </a>
            <a href="https://github.com/Tusharparihast" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors p-1" title="GitHub">
              <FiGithub size={18} />
            </a>
            <a href="https://www.linkedin.com/in/tushar-parihast-422107267/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors p-1" title="LinkedIn">
              <FiLinkedin size={18} />
            </a>
            
            {/* Scroll to Top */}
            <button 
              onClick={scrollToTop}
              className="p-2.5 ml-2 bg-[#11182e] hover:bg-[#16203d] text-slate-400 hover:text-white rounded-xl transition-all duration-200 border border-slate-800/80"
              aria-label="Scroll to top"
            >
              <FiArrowUp size={16} />
            </button>
          </div>

        </div>

      </div>

      {/* POPUP MODAL OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            
            {/* Backdrop Dim Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSending && setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#0f172a] border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl relative p-6 md:p-8 overflow-hidden text-slate-100 z-10"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                disabled={isSending}
              >
                <FiX size={18} />
              </button>

              {isSent ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <FiCheckCircle size={44} className="text-emerald-500 mb-4" />
                  <h3 className="text-lg font-bold text-white tracking-tight">Message Dispatched!</h3>
                  <p className="text-xs text-slate-400 mt-1">Thanks for reaching out, I&apos;ll check it soon.</p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white tracking-tight">Send a Message</h3>
                  </div>

                  <form onSubmit={handleFormSubmit} noValidate className="space-y-4 font-sans text-left">
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase text-slate-400 mb-1.5">Your Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        disabled={isSending}
                        onChange={() => handleInputChange('name')}
                        className={`w-full bg-[#080d1a] border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors disabled:opacity-50 ${
                          errors.name ? 'border-red-500/80 focus:border-red-500' : 'border-slate-800 focus:border-blue-500'
                        }`}
                        placeholder="John Doe" 
                      />
                      {errors.name && <p className="text-[11px] text-red-400 font-mono mt-1">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase text-slate-400 mb-1.5">Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        disabled={isSending}
                        onChange={() => handleInputChange('email')}
                        className={`w-full bg-[#080d1a] border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors disabled:opacity-50 ${
                          errors.email ? 'border-red-500/80 focus:border-red-500' : 'border-slate-800 focus:border-blue-500'
                        }`}
                        placeholder="john@example.com" 
                      />
                      {errors.email && <p className="text-[11px] text-red-400 font-mono mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase text-slate-400 mb-1.5">Message</label>
                      <textarea 
                        name="message" 
                        rows="4" 
                        disabled={isSending}
                        onChange={() => handleInputChange('message')}
                        className={`w-full bg-[#080d1a] border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors resize-none disabled:opacity-50 ${
                          errors.message ? 'border-red-500/80 focus:border-red-500' : 'border-slate-800 focus:border-blue-500'
                        }`}
                        placeholder="Let's build something..." 
                      />
                      {errors.message && <p className="text-[11px] text-red-400 font-mono mt-1">{errors.message}</p>}
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSending}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-sm mt-2 transition-all flex items-center justify-center gap-2 disabled:opacity-50 font-mono tracking-wide uppercase"
                    >
                      {isSending ? 'Routing Stream...' : 'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}