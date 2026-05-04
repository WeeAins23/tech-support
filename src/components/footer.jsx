import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
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
          flexDirection: isDesktop ? 'row' : 'column', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: '30px' 
        }}
      >
        
        {/* 1. Left Section (Logo) */}
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

        {/* 2. Middle Section (Links) - Dead Centre */}
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
            <li><a href="/sitemap.xml" style={{ color: 'black', textDecoration: 'none' }} className="text-xl font-bold hover:underline">Site Map</a></li>
            <li><Link to="/privacy" style={{ color: 'black', textDecoration: 'none' }} className="text-xl font-bold hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" style={{ color: 'black', textDecoration: 'none' }} className="text-xl font-bold hover:underline">Terms Of Use</Link></li>
            <li><Link to="/dashboard" style={{ color: 'black', textDecoration: 'none' }} className="text-xl font-bold hover:underline">Dashboard</Link></li>
          </ul>
        </nav>

        {/* 3. Right Section (Social Media) */}
        <div style={{ 
          flex: isDesktop ? '1' : 'none', 
          display: 'flex', 
          justifyContent: isDesktop ? 'flex-end' : 'center',
          gap: '20px'
        }}>
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

      {/* Copyright Section */}
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