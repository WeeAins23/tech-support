import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("User");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [progress, setProgress] = useState({
    mouse: false,
    keyboard: false,
    browser: false,
    search: false,
    email: false,
  });

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Security Check and Data Sync
  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    
    if (!userId) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:5000/api/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.name) setDisplayName(data.name);

        if (data.progress) {
          let parsed = typeof data.progress === 'string' ? JSON.parse(data.progress) : data.progress;
          
          // We set the raw parsed data to state so we can access .complete and .bestTime
          setProgress(parsed);
        }
      })
      .catch((err) => console.error("Dashboard Sync Error:", err));
  }, [navigate]);

  // Helper function to check completion status (handles old boolean and new object formats)
  const checkComplete = (modState) => {
    if (typeof modState === 'object' && modState !== null) {
      return modState.complete;
    }
    return modState === true;
  };

  // Module Data
  const modules = [
    { 
      title: "Mouse Practice",
      path: "/mouse-practice",
      isComplete: checkComplete(progress.mouse),
      bestTime: progress.mouse?.bestTime || null,
      minWidth: 1024
    }, 
    { 
      title: "Keyboard Basics", 
      path: "/keyboard-basics", 
      isComplete: checkComplete(progress.keyboard),
      bestTime: progress.keyboard?.bestTime || null,
      minWidth: 768
    }, 
    {
      title: "What is a browser?",
      path: "/browser",
      isComplete: checkComplete(progress.browser),
      lastRead: progress.browser?.lastRead || null,
      minWidth: 0
    },
    {
      title: "How to search",
      path: "/search",
      isComplete: checkComplete(progress.search),
      lastRead: progress.search?.lastRead || null,
      minWidth: 0
    },
    { 
      title: "Email 101",
      path: "/email", 
      isComplete: checkComplete(progress.email),
      lastRead: progress.email?.lastRead || null,
      minWidth: 0
    },
  ];

  return (
    <div id="dashboard" className="w-full min-h-screen bg-white font-sans">
      <div className="container mx-auto px-10 py-12 pb-20">
        <h1 style={{ color: 'black', textTransform: 'uppercase', textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem', fontWeight: '900' }}>
          Welcome, {displayName}!
        </h1>

        <div style={{ border: '4px solid black', padding: '20px', backgroundColor: 'white' }}>
          <h2 style={{ color: 'black', textTransform: 'uppercase', textAlign: 'center', marginBottom: '30px', fontSize: '3rem', fontWeight: '800' }}>
            Modules
          </h2>

          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
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
                    minHeight: '320px', 
                    width: screenWidth >= 768 ? 'calc(33% - 20px)' : '100%',
                    minWidth: '300px',
                    opacity: isAvailable ? 1 : 0.7 
                  }}
                >
                  <h3 style={{ color: 'black', textTransform: 'uppercase', marginBottom: '20px', fontSize: '2.5rem', fontWeight: '900', textAlign: 'center' }}>
                    {mod.title}
                  </h3>

                  <div className="w-full text-center">
                    {/* Best time or last read displayed */}
                    {mod.isComplete && (
                      <div style={{ marginBottom: '15px' }}>
                        {/* If it has a Best Time (Games) */}
                        {mod.bestTime ? (
                          <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#00857a', border: '2px solid #00857a', padding: '4px 8px' }}>
                            ⏱ BEST: {mod.bestTime}s
                          </span>
                        ) : mod.lastRead ? (
                          /* If it has a Last Read date (Lessons) */
                          <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#00857a', border: '2px solid #00857a', padding: '4px 8px' }}>
                            📖 LAST READ: {mod.lastRead}
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.9rem', color: '#666' }}>No record yet</span>
                        )}
                      </div>
                    )}

                    {isAvailable ? (
                      <Link 
                        to={mod.path} 
                        style={{ 
                          backgroundColor: '#26d9ca', 
                          color: 'black', 
                          textDecoration: 'none', 
                          padding: '12px 0', 
                          fontWeight: '900', 
                          border: '3px solid black', 
                          textTransform: 'uppercase',
                          fontSize: '1.2rem',
                          display: 'block'
                        }}
                      >
                        {mod.isComplete ? "Review" : "Start"}
                      </Link>
                    ) : (
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
        <div style={{ height: '100px', width: '100%' }}></div>
      </div>
    </div>
  );
};

export { Dashboard };