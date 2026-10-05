import { useState, useEffect } from 'react';
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

  const navLinks = [
    { title: 'About', path: '/#about', id: 'about' },
    { title: 'My Journey', path: '/#journey', id: 'journey' },
    { title: 'Projects', path: '/#projects', id: 'projects' },
    { title: 'Insights', path: '/#blog', id: 'blog' },
    { title: 'Gallery', path: '/#gallery', id: 'gallery' },
    { title: 'Contact', path: '/#contact', id: 'contact' },
  ];

  useEffect(() => {
    if (location.pathname !== '/') return;

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && window.location.pathname === '/') {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const targets = [
      'top',
      'about',
      'journey',
      'gallery',
      'projects',
      'blog',
      'contact',
    ];

    targets.forEach((id) => {
      const el = document.getElementById(id);

      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [location.pathname]);

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
    }
  }, [location.pathname, location.state]);

  const triggerNavFlag = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  const scrollWithOffset = (el) => {
    if (el.id === 'gallery' && onSmoothLinkClick) {
      onSmoothLinkClick();
    } else {
      triggerNavFlag();
    }

    const yCoordinate =
      el.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
      top: yCoordinate - 80,
      behavior: 'smooth',
    });
  };

  const handleNavigationClick = (e, path, targetId) => {
    setIsOpen(false);
    setActiveSection(targetId);

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

    if (location.pathname !== '/') {
      e.preventDefault();
      triggerNavFlag();
      navigate('/');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
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
            activeSection === 'top'
              ? 'text-blue-600'
              : 'hover:text-blue-600'
          }`}
        >
          [TP]
        </Link>

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
                  handleNavigationClick(
                    e,
                    link.path,
                    link.id
                  )
                }
                className={`relative whitespace-nowrap px-2 md:px-3 lg:px-4 py-2 rounded-full text-[11px] md:text-xs lg:text-sm font-medium font-mono tracking-wide transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-700'
                    : 'text-slate-700 hover:text-blue-700'
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

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-auto block md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{
              duration: 0.25,
              ease: 'easeInOut',
            }}
            className="fixed inset-0 top-[65px] bg-white/40 backdrop-blur-xl z-40 flex flex-col p-6 gap-6 md:hidden border-b border-slate-200/40 shadow-xl shadow-slate-900/5 h-fit"
          >
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                smooth
                to={link.path}
                scroll={scrollWithOffset}
                onClick={(e) =>
                  handleNavigationClick(
                    e,
                    link.path,
                    link.id
                  )
                }
                className={`text-lg font-bold font-mono border-b border-slate-200/30 pb-3 transition-colors ${
                  activeSection === link.id
                    ? 'text-blue-600 pl-2 border-blue-500/30'
                    : 'text-slate-800 hover:text-blue-600'
                }`}
              >
                {link.title}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}