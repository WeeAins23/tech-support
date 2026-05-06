import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const username = "User"; 
  // screenWidth: Tracks the current width of the browser window for responsive design
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // progress: An object that checks localStorage for every module
  // It converts the string 'true' to a real Boolean (true/false)
  const [progress, setProgress] = useState({
    mouse: localStorage.getItem('mouseComplete') === 'true',
    keyboard: localStorage.getItem('keyboardComplete') === 'true',
    browser: localStorage.getItem('browserComplete') === 'true',
    search: localStorage.getItem('searchComplete') === 'true',
    email: localStorage.getItem('emailComplete') === 'true',
  });

  // Handle window resizing for responsive "Availability" checks
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    // Listen for the browser window changing size
    window.addEventListener("resize", handleResize);
    // Cleanup: Remove the listener when leaving the dashboard
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Module Data
  // title: Display name
  // path: Where the Link takes the user
  // isComplete: Boolean to show progress status
  // minWidth: The minimum screen size (in pixels) required to play
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
          <h2 style={{ color: 'black', textTransform: 'uppercase', textAlign: 'center', marginBottom: '30px', fontSize: '3rem', fontWeight: '800' }}>
            Modules
          </h2>

          {/* Grid Layout: Handles the spacing and wrapping of the cards */}
          <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row lg:flex-wrap lg:justify-center gap-8" style={{ 
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '30px'
          }}
          >
            {/* Map Function: Loops through each module and creates a Card */}
            {modules.map((mod, index) => {
              // Logic Check: Is the user's screen wide enough for this specific module?
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
                    minHeight: '280px', 
                    width: screenWidth >= 768 ? 'calc(33% - 20px)' : '100%',
                    minWidth: '300px',
                    opacity: isAvailable ? 1 : 0.7 
                  }}
                >
                  <h3 style={{ 
                    color: 'black',
                    textTransform: 'uppercase',
                    marginBottom: '20px',
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    textAlign: 'center'
                    }}>
                    {mod.title}
                  </h3>

                  {/* Conditional: Show "Start/Review" button OR "Unavailable" message */}
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
                        {/* If complete, let htem Review. If not, let htem Start. */}
                        {mod.isComplete ? "Review" : "Start"}
                      </Link>
                    ) : (
                      /* Unavailable State for Mobile/Tablet */
                      <div style={{ backgroundColor: '#d1d5db', color: '#4b5563', textAlign: 'center', padding: '12px 0', fontWeight: 'bold', border: '3px dashed #9ca3af', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                        Unavailable on device
                      </div>
                    )}

                    {/* Progress Indicator: Changes color based on completion status */}
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

        {/* Manual spacer at the bottom of the page*/}
        <div style={{ height: '100px' }}></div>
      </div>
    </div>
  );
};

export default Dashboard;