import { useState, useEffect, useRef } from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

function SmoothIndicator({ isActive, location }) {
  return (
    isActive && (
      <motion.div
        layoutId={location.pathname === '/' ? 'activeNavIndicator' : undefined}
        className="absolute inset-0 bg-blue-100/80 border border-blue-200/70 rounded-full shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 380,
          damping: 30,
        }}
      />
    )
  );
}

export default function Navbar({ onLinkClick, onSmoothLinkClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const location = useLocation();
  const navigate = useNavigate();
  const clickedSection = useRef(null);
  const drawerRef = useRef(null);

  const navLinks = [
    { title: 'Home', path: '/#top', id: 'top' },
    { title: 'About', path: '/#about', id: 'about' },
    { title: 'My Journey', path: '/#journey', id: 'journey' },
    { title: 'Projects', path: '/#projects', id: 'projects' },
    { title: 'Insights', path: '/#blog', id: 'blog' },
    { title: 'Gallery', path: '/#gallery', id: 'gallery' },
    { title: 'Contact', path: '/#contact', id: 'contact' },
  ];

  // Close drawer on scroll or outside tap/click
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      setIsOpen(false);
    };

    const handleOutsideTouch = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('touchstart', handleOutsideTouch, { passive: true });
    document.addEventListener('mousedown', handleOutsideTouch);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('touchstart', handleOutsideTouch);
      document.removeEventListener('mousedown', handleOutsideTouch);
    };
  }, [isOpen]);

  // 1. Intersection Observer for Sections + Scroll Listener for Home
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      if (window.scrollY < 150) {
        clickedSection.current = null;
        setActiveSection('top');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -40% 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      if (window.scrollY < 150) {
        setActiveSection('top');
        return;
      }

      entries.forEach((entry) => {
        if (entry.isIntersecting && window.location.pathname === '/') {
          if (
            clickedSection.current &&
            entry.target.id !== clickedSection.current
          ) {
            return;
          }

          setActiveSection(entry.target.id);

          if (entry.target.id === clickedSection.current) {
            clickedSection.current = null;
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const targets = ['top', 'about', 'journey', 'gallery', 'projects', 'blog', 'contact'];

    targets.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [location.pathname]);

  // 2. Track Route Switches
  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith('/blog') || path.startsWith('/insights')) {
      setActiveSection('blog');
    } else if (path.startsWith('/projects')) {
      setActiveSection('projects');
    } else if (path.startsWith('/gallery')) {
      setActiveSection('gallery');
    } else if (path === '/' && location.state?.scrollToId) {
      setActiveSection(location.state.scrollToId);
    } else if (path === '/' && window.scrollY < 150) {
      setActiveSection('top');
    }
  }, [location.pathname, location.state]);

  const triggerNavFlag = () => {
    if (onLinkClick) onLinkClick();
  };

  const scrollWithOffset = (el) => {
    if (el.id === 'gallery' && onSmoothLinkClick) {
      onSmoothLinkClick();
    } else {
      triggerNavFlag();
    }

    clickedSection.current = el.id;
    setActiveSection(el.id);

    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
      top: el.id === 'top' || el.id === 'hero' ? 0 : yCoordinate - 80,
      behavior: 'smooth',
    });
  };

  const handleNavigationClick = (e, path, targetId) => {
    setIsOpen(false);
    setActiveSection(targetId);
    clickedSection.current = targetId;

    if (location.pathname !== '/') {
      e.preventDefault();
      triggerNavFlag();

      navigate('/', {
        state: {
          scrollToId: targetId,
        },
      });
    } else {
      if (targetId === 'gallery' && onSmoothLinkClick) {
        onSmoothLinkClick();
      } else {
        triggerNavFlag();
      }
    }
  };

  const handleHomeClick = (e) => {
    setIsOpen(false);
    setActiveSection('top');
    clickedSection.current = 'top';

    if (location.pathname !== '/') {
      e.preventDefault();
      triggerNavFlag();
      navigate('/');
    } else {
      e.preventDefault();
      triggerNavFlag();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/40 backdrop-blur-md border-b border-slate-200/40 px-4 md:px-6 lg:px-10 py-4 flex items-center shadow-sm">
        <Link
          smooth
          to="/#top"
          onClick={handleHomeClick}
          className={`text-slate-900 font-mono font-bold tracking-tighter text-lg transition-colors ${
            activeSection === 'top' ? 'text-blue-600' : 'hover:text-blue-600'
          }`}
        >
          TP
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link, idx) => {
            const isActive = activeSection === link.id;

            return (
              <Link
                key={idx}
                smooth
                to={link.path}
                scroll={scrollWithOffset}
                onClick={(e) =>
                  handleNavigationClick(e, link.path, link.id)
                }
                className={`relative whitespace-nowrap px-2 md:px-3 lg:px-4 py-2 rounded-full text-[11px] md:text-xs lg:text-sm font-medium font-mono tracking-wide transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-700'
                    : 'text-black hover:text-blue-700'
                }`}
              >
                <SmoothIndicator
                  isActive={isActive}
                  location={location}
                />
                <span className="relative z-10 whitespace-nowrap">
                  {link.title}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-auto block md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors z-50"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </header>

      {/* MOBILE LEFT SLIDE-IN DRAWER & OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />

            {/* Left Drawer */}
            <motion.div
              ref={drawerRef}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="absolute top-0 left-0 bottom-0 w-[78vw] max-w-xs h-screen bg-white/90 backdrop-blur-xl border-r border-slate-200/50 shadow-2xl flex flex-col p-6 pt-20 gap-4 overflow-y-auto"
            >
              <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest mb-2 px-2">
                Navigation
              </div>

              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  smooth
                  to={link.path}
                  scroll={scrollWithOffset}
                  onClick={(e) =>
                    handleNavigationClick(e, link.path, link.id)
                  }
                  className={`text-base font-bold font-mono px-3 py-2.5 rounded-xl transition-all ${
                    activeSection === link.id
                      ? 'text-blue-600 bg-blue-50/80 border border-blue-200/50'
                      : 'text-slate-800 hover:text-blue-600 hover:bg-slate-100/50'
                  }`}
                >
                  {link.title}
                </Link>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}