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
      style={{ backgroundColor: '#26d9ca', position: 'relative' }} 
      className="w-full py-10 px-6 font-sans text-black mt-auto"
    >
      <div 
        style={{ 
          maxWidth: '1400px', // Slightly wider to give the "Center" more room
          margin: '0 auto', 
          display: 'flex', 
          // If Desktop, arrange in a row. If not, stack in a column and centre everything.
          flexDirection: isDesktop ? 'row' : 'column', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: '30px' 
        }}
      >
        
        {/* Logo */}
        <div style={{ 
          flex: isDesktop ? '1' : 'none', 
          display: 'flex', 
          justifyContent: isDesktop ? 'flex-start' : 'center' 
        }}>
          <img 
            src="/img/ts-logo.png" 
            alt="Tech Support Logo" 
            style={{ width: isDesktop ? '180px' : '150px', height: 'auto' }} 
          />
        </div>

        {/* Navigation Links */}
        <nav style={{ 
          flex: isDesktop ? '1' : 'none', 
          display: 'flex', 
          justifyContent: 'center',
          marginTop: isDesktop ? '40px' : '0px'
        }}>
          <ul 
            style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '12px',
              textAlign: 'center'
            }} 
          >
            <li><Link to="/faqs" style={{ color: 'black', textDecoration: 'none' }} className="text-xl font-bold hover:underline">FAQs</Link></li>
            <li><Link to="/privacy" style={{ color: 'black', textDecoration: 'none' }} className="text-xl font-bold hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" style={{ color: 'black', textDecoration: 'none' }} className="text-xl font-bold hover:underline">Terms Of Use</Link></li>
            <li><Link to="/dashboard" style={{ color: 'black', textDecoration: 'none' }} className="text-xl font-bold hover:underline">Dashboard</Link></li>
          </ul>
        </nav>

        {/* Social Media */}
        <div style={{ 
          // If on desktop, push the icons to the right. If on mobile, centre them below the other content.
          flex: isDesktop ? '1' : 'none', 
          display: 'flex', 
          justifyContent: isDesktop ? 'flex-end' : 'center',
          gap: '20px'
        }}>
          {/* target="_blank" will open the link in a new tab */}
          {/* rel="noreferrer" prevents the new tab from accessing the referrer information */}
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-facebook" style={{ fontSize: '35px', color: 'black' }}></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-twitter" style={{ fontSize: '35px', color: 'black' }}></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-youtube" style={{ fontSize: '35px', color: 'black' }}></i>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div 
        style={{ 
          marginTop: '40px', 
          paddingTop: '20px', 
          borderTop: '1px solid rgba(0,0,0,0.1)', 
          textAlign: 'center'
        }} 
      >
        <p style={{ color: 'black', fontSize: '14px', fontWeight: '600', margin: '0' }}>
          &copy; {currentYear} Tech Support
        </p>
      </div>
    </footer>
  );
};

export { Footer };