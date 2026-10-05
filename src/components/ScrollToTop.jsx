import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType(); // Detects "PUSH", "REPLACE", or "POP" (back/forward)

  useEffect(() => {
    // Enable browser's native scroll restoration for POP (Back/Forward) events
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'auto';
    }

    // Do nothing if navigating with a hash anchor (e.g. #projects)
    if (hash) return;

    // Only scroll to top on new page navigations (PUSH/REPLACE), NOT when pressing Back (POP)
    if (navigationType !== "POP") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }, [pathname, hash, navigationType]);

  return null;
}