import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const username = "User"; 
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const modules = [
    // We now use 'isComplete' instead of a percentage
    { title: "Mouse Practice", path: "/mouse-practice", isComplete: false, minWidth: 1024 }, 
    { title: "Keyboard Basics", path: "/keyboard-basics", isComplete: false, minWidth: 768 }, 
    { title: "What is a browser?", path: "/browser", isComplete: true, minWidth: 0 },
    { title: "How to search", path: "/search", isComplete: false, minWidth: 0 },
    { title: "Email 101", path: "/email", isComplete: false, minWidth: 0 },
  ];

  return (
    <div id="dashboard" className="w-full min-h-screen bg-white font-sans">
      <div className="container mx-auto px-10 py-12 pb-20">
        
        <h1 style={{ color: 'black', textTransform: 'uppercase', textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem', fontWeight: '900' }}>
          Welcome, {username}!
        </h1>

        <div style={{ border: '4px solid black', padding: '20px', backgroundColor: 'white' }}>
          <h2 style={{ color: 'black', textTransform: 'uppercase', textAlign: 'center', marginBottom: '30px', fontSize: '2rem', fontWeight: '800' }}>
            Modules
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
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
                    alignItems: 'center',
                    opacity: isAvailable ? 1 : 0.7 
                  }}
                >
                  <h3 style={{ color: 'black', textTransform: 'uppercase', marginBottom: '20px', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>
                    {mod.title}
                  </h3>

                  {isAvailable ? (
                    <Link 
                      to={mod.path} 
                      style={{ 
                        backgroundColor: '#26d9ca', 
                        color: 'black', 
                        textDecoration: 'none', 
                        display: 'block', 
                        width: '100%', 
                        textAlign: 'center', 
                        padding: '18px 0', 
                        fontWeight: '900', 
                        fontSize: '1.5rem', 
                        border: '3px solid black', 
                        textTransform: 'uppercase' 
                      }}
                    >
                      {mod.isComplete ? "Review" : "Start"}
                    </Link>
                  ) : (
                    <div style={{ backgroundColor: '#d1d5db', color: '#4b5563', width: '100%', textAlign: 'center', padding: '18px 0', fontWeight: 'bold', fontSize: '1.1rem', border: '3px dashed #9ca3af', textTransform: 'uppercase' }}>
                      Unavailable on this device
                    </div>
                  )}

                  {/* BINARY PROGRESS STATUS */}
                  <p 
                    style={{ 
                      marginTop: '15px', 
                      fontSize: '1.25rem', 
                      fontWeight: 'bold', 
                      textTransform: 'uppercase',
                      color: mod.isComplete ? '#00857a' : '#d00000' // Dark Teal for Complete, Red for Incomplete
                    }}
                  >
                    Status: {mod.isComplete ? "Complete" : "Incomplete"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Physical Spacer for Footer */}
        <div style={{ height: '100px' }}></div>
      </div>
    </div>
  );
};

export default Dashboard;