import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const username = "User"; 
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // 1. Check localStorage to see which modules are finished
  const [progress, setProgress] = useState({
    mouse: localStorage.getItem('mouseComplete') === 'true',
    keyboard: localStorage.getItem('keyboardComplete') === 'true',
    browser: localStorage.getItem('browserComplete') === 'true',
    search: localStorage.getItem('searchComplete') === 'true',
    email: localStorage.getItem('emailComplete') === 'true',
  });

  // 2. Handle window resizing for responsive "Availability" checks
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3. Module Data (Matching your Tablet Wireframe layout)
  const modules = [
    { title: "Mouse Practice", path: "/mouse-practice", isComplete: progress.mouse, minWidth: 1024 }, 
    { title: "Keyboard Basics", path: "/keyboard-basics", isComplete: progress.keyboard, minWidth: 768 }, 
    { title: "What is a browser?", path: "/browser", isComplete: progress.browser, minWidth: 0 },
    { title: "How to search", path: "/search", isComplete: progress.search, minWidth: 0 },
    { title: "Email 101", path: "/email", isComplete: progress.email, minWidth: 0 },
  ];

  return (
    <div id="dashboard" className="w-full min-h-screen bg-white font-sans">
      <div className="container mx-auto px-10 py-12 pb-20">
        
        {/* Welcome Header */}
        <h1 style={{ color: 'black', textTransform: 'uppercase', textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem', fontWeight: '900' }}>
          Welcome, {username}!
        </h1>

        {/* Main Modules Container - Visualized in Tablet User Dashboard wireframe */}
        <div style={{ border: '4px solid black', padding: '20px', backgroundColor: 'white' }}>
          <h2 style={{ color: 'black', textTransform: 'uppercase', textAlign: 'center', marginBottom: '30px', fontSize: '2rem', fontWeight: '800' }}>
            Modules
          </h2>

          {/* 
              Responsive Grid:
              - Mobile: 1 column
              - Tablet/Desktop: 2 columns (md:grid-cols-2) 
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modules.map((mod, index) => {
              const isAvailable = screenWidth >= mod.minWidth;

              return (
                <div 
                  key={index} 
                  style={{ 
                    border: '3px solid black', 
                    padding: '25px', 
                    backgroundColor: isAvailable ? 'white' : '#f3f4f6',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '280px', // Creates the "Square" look from the wireframe
                    opacity: isAvailable ? 1 : 0.7 
                  }}
                >
                  <h3 style={{ color: 'black', textTransform: 'uppercase', marginBottom: '20px', fontSize: '1.4rem', fontWeight: 'bold', textAlign: 'center' }}>
                    {mod.title}
                  </h3>

                  <div className="w-full">
                    {isAvailable ? (
                      <Link 
                        to={mod.path} 
                        style={{ 
                          backgroundColor: '#26d9ca', 
                          color: 'black', 
                          textDecoration: 'none', 
                          display: 'block', 
                          textAlign: 'center', 
                          padding: '12px 0', 
                          fontWeight: '900', 
                          border: '3px solid black', 
                          textTransform: 'uppercase',
                          fontSize: '1.2rem'
                        }}
                      >
                        {mod.isComplete ? "Review" : "Start"}
                      </Link>
                    ) : (
                      /* Unavailable State for Mobile/Tablet */
                      <div style={{ backgroundColor: '#d1d5db', color: '#4b5563', textAlign: 'center', padding: '12px 0', fontWeight: 'bold', border: '3px dashed #9ca3af', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                        Unavailable on device
                      </div>
                    )}

                    <p style={{ 
                      marginTop: '15px', 
                      fontSize: '1rem', 
                      fontWeight: 'bold', 
                      textTransform: 'uppercase',
                      color: mod.isComplete ? '#00857a' : '#d00000'
                    }}>
                      Progress: {mod.isComplete ? "Complete" : "Incomplete"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Physical Spacer to prevent footer overlap as discussed */}
        <div style={{ height: '100px' }}></div>
      </div>
    </div>
  );
};

export default Dashboard;