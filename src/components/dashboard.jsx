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
    <div id="dashboard" className="w-full h-screen bg-white font-sans overflow-hidden">
      <div className="container mx-auto px-10 h-full flex flex-col justify-center py-4">
        <h1>
          Welcome, {displayName}!
        </h1>

        <div className="module-container">
          <h2>
            Modules
          </h2>

          <div className="modules" >
            {modules.map((mod, index) => {
              const isAvailable = screenWidth >= mod.minWidth;
              return (
                <div className="dashboard"
                  key={index} 
                  style={{ 
                    width: screenWidth >= 768 ? 'calc(33% - 20px)' : '100%',
                    opacity: isAvailable ? 1 : 0.7
                  }}
                >
                  <h3>
                    {mod.title}
                  </h3>

                  <div className="w-full text-center">
                    {/* Best time or last read displayed */}
                    {mod.isComplete && (
                      <div className="complete" >
                        {/* If it has a best time (Games) */}
                        {mod.bestTime ? (
                          <span className="best-time">
                            ⏱ BEST: {mod.bestTime}s
                          </span>
                        ) : mod.lastRead ? (
                          /* If it has a Last Read date (Lessons) */
                          <span className="last-read">
                            📖 LAST READ: {mod.lastRead}
                          </span>
                        ) : (
                          <span className="no-record">No record yet</span>
                        )}
                      </div>
                    )}

                    {isAvailable ? (
                      <Link className="is-available"
                        to={mod.path}>
                        {mod.isComplete ? "Review" : "Start"}
                      </Link>
                    ) : (
                      <div className="unavailable">
                        Unavailable on device
                      </div>
                    )}

                    <p style={{ 
                      marginTop: '15px', 
                      fontSize: '1.25rem', 
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
      </div>
    </div>
  );
};

export { Dashboard };