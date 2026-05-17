import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToView = () => {
  // useLocation detects whenever the URL path changes (e.g., /dashboard to /mouse-practice)
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Find the active page element
      const mainElement = document.getElementById("main-content");
      
      if (mainElement) {
        // This instantly brings the component into view, bypassing header and footer voids
        mainElement.scrollIntoView({
          behavior: "smooth", // or "auto" for instant jump
          block: "start",      // Aligns the top of the component to the top of the screen
        });
      } else {
        // Fallback to top if the ID isn't found on a specific page
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null; // This component doesn't render anything visual
};

export default ScrollToView;