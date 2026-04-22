import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      style={{ backgroundColor: '#26d9ca', display: 'block', position: 'relative' }} 
      className="w-full py-12 px-6 font-sans text-black m-0 mt-auto"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-8">
        
        {/* Logo Section */}
        <div className="w-full flex justify-center">
          <img 
            src="/img/ts-logo.png" 
            alt="Tech Support Logo" 
            style={{ width: '130px', height: 'auto' }} 
          />
        </div>

        {/* Footer Links */}
        <nav className="w-full">
          <ul className="list-none p-0 m-0 flex flex-col items-center space-y-4">
            <li><Link to="/faqs" style={{ color: 'black' }} className="text-2xl font-bold">FAQs</Link></li>
            <li><Link to="/sitemap" style={{ color: 'black' }} className="text-2xl font-bold">Site Map</Link></li>
            <li><Link to="/privacy" style={{ color: 'black' }} className="text-2xl font-bold">Privacy Policy</Link></li>
            <li><Link to="/terms" style={{ color: 'black' }} className="text-2xl font-bold">Terms Of Use</Link></li>
          </ul>
        </nav>

        {/* Social Media Icons */}
        <div 
          style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}
          className="space-x-10">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-facebook" style={{ fontSize: '30px', color: 'black' }}></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-twitter" style={{ fontSize: '30px', color: 'black' }}></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-youtube" style={{ fontSize: '30px', color: 'black' }}></i>
          </a>
        </div>
      </div>

      {/* Copyright Section*/}
      <div 
        style={{ 
          marginTop: '40px', 
          paddingTop: '24px', 
          paddingBottom: '40px', // Extra padding at the very bottom
          borderTop: '1px solid rgba(0,0,0,0.1)', 
          width: '100%',
          display: 'block',
          clear: 'both' 
        }} 
        className="text-center"
      >
        <p style={{ 
          color: 'black', 
          fontSize: '10px', 
          fontWeight: '500', 
          margin: '0',
          display: 'block' 
        }}>
          &copy; {new Date().getFullYear()} Tech Support
        </p>
      </div>
    </footer>
    );
  };

export { Footer };