import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // currentYear: Use's the computer's clock to get the current year for the copyright notice
  const currentYear = new Date().getFullYear();
  // isDesktop: Tracks if the window is wide enough foe a row-based layout or if it should stack in a column
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    // handleResize: Updates the isDesktop state whenever the window is dragged or rotated to a new size. 768px is the common breakpoint for switching between mobile and desktop layouts.
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    // Cleanup: Stops listening when the user leaves the page
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <footer
      className="w-full py-10 px-6 font-sans text-black mt-auto" 
    >
      <div className="footer-layout" style={{
        // If Desktop, arrange in a row. If not, stack in a column and centre everything.
          flexDirection: isDesktop ? 'row' : 'column',
      }}
      >
        
        {/* Logo */}
        <div className="footer-logo" style={{ 
          flex: isDesktop ? '1' : 'none', 
          justifyContent: isDesktop ? 'flex-start' : 'center' 
        }}>
          <img 
            className="footer-logo-img"
            src="/img/ts-logo.png" 
            alt="Tech Support Logo" 
            style={{ 
              width: isDesktop ? '180px' : '150px',
            }} 
          />
        </div>

        {/* Navigation Links */}
        <nav className="footer-nav" style={{ 
          flex: isDesktop ? '1' : 'none',
          marginTop: isDesktop ? '40px' : '0px'
        }}>
          <ul 
          className="footer-nav-list"
          >
            <li><Link to="/faqs" className="text-xl font-bold hover:underline footer-nav-link">FAQs</Link></li>
            <li><Link to="/privacy" className="text-xl font-bold hover:underline footer-nav-link">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-xl font-bold hover:underline footer-nav-link">Terms Of Use</Link></li>
            <li><Link to="/dashboard" className="text-xl font-bold hover:underline footer-nav-link">Dashboard</Link></li>
          </ul>
        </nav>

        {/* Social Media */}
        <div className="footer-socials" style={{ 
          // If on desktop, push the icons to the right. If on mobile, centre them below the other content.
          flex: isDesktop ? '1' : 'none', 
          justifyContent: isDesktop ? 'flex-end' : 'center'
        }}>
          {/* target="_blank" will open the link in a new tab */}
          {/* rel="noreferrer" prevents the new tab from accessing the referrer information */}
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-facebook" style={{ fontSize: '35px', color: 'black', padding: '5px' }}></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-twitter" style={{ fontSize: '35px', color: 'black', padding: '5px' }}></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-youtube" style={{ fontSize: '35px', color: 'black', padding: '5px' }}></i>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright" >
        <p className="copyright-content">
          &copy; {currentYear} Tech Support
        </p>
      </div>
    </footer>
  );
};

export { Footer };