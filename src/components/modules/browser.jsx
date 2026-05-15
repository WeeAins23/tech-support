import React, { useState } from "react";
import { Link } from "react-router-dom";

const Browser = () => {
  // isSaved: Tracks if the database has been updated successfully
  const [isSaved, setIsSaved] = useState(false);
  
  // isZoomed: Tracks if the tab image is currently enlarged
  const [isZoomed, setIsZoomed] = useState(false);
  
  // toggleZoom: Opens/closes the lightbox
  const toggleZoom = () => setIsZoomed(!isZoomed);

  // function to save progress to the database
  const completeModule = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) return;

    // Get current date in a readable format (e.g., "12 May 2026")
    const now = new Date();
    const dateString = now.toLocaleDateString('en-GB', {
      day: 'numeric', 
      month: 'long',
      year: 'numeric' 
    });

    try {
      const res = await fetch(`http://localhost:5000/api/user/${userId}`);
      const data = await res.json();
      
      let currentProgress = typeof data.progress === 'string' 
        ? JSON.parse(data.progress) 
        : data.progress;

      const updatedProgress = { 
        ...currentProgress, 
        browser: { complete: true, lastRead: dateString } 
      };

      await fetch('http://localhost:5000/api/update-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, progress: updatedProgress })
      });

      // Update local session so Dashboard sees it immediately
      sessionStorage.setItem('userProgress', JSON.stringify(updatedProgress));
      
      // Flip the state to show the success UI instead of an alert
      setIsSaved(true);

    } catch (err) {
      console.error("Error saving reading progress:", err);
    }
  };

  return (
    <div id="browser-module" className="w-full min-h-screen bg-white font-sans pb-20">
      <div className="container mx-auto px-10 py-12">
        
        {/* Header */}
        <div className="browser-header">
          <h1 className="browser-h1" >
            What is a Browser?
          </h1>
          <Link to="/dashboard" className="dashboard-link">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Introduction Section */}
        <div className="browser-wrapper" >
          <p className="module-intro-text-head">
            A Web Browser is a piece of software (an "app") that lets you visit websites. 
          </p>
          <p className="module-intro-text-body">
            Think of the Internet as a giant library full of books. The Browser is like the front door of that library. Without a browser, you wouldn't be able to "open" the websites you want to see, read the news, or check your email.
          </p>
        </div>

        {/* Section 1: The Address Bar */}
        <section className="module-section">
          <h2 className="module-section-header">
            The Address Bar
          </h2>
          <p className="module-section-body">
            The Address Bar is the long white box at the top of your screen. This is where you type the name of the place you want to go.
          </p>
          <div>
            <p className="text-sm italic text-black-500 mt-2">Example: Typing "www.google.com" into the bar.</p>
          </div>
        </section>

        {/* Section 2: Navigation Buttons */}
        <section className="module-section">
          <h2 className="module-section-header">
            Moving Back and Forth
          </h2>
          <p className="module-section-body">
            Browsers have arrows that let you move between pages you've already visited.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="module-inner-section">
              <strong>← Back Button</strong>
              <p>Takes you back to the page you were looking at before.</p>
            </div>
            <div className="module-inner-section">
              <strong>↻ Refresh Button</strong>
              <p>Reloads the page if it gets stuck or doesn't look right.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Browser Tabs */}
        <section className="module-section">
          <h2 className="module-section-header">
            Using Tabs
          </h2>
          <p className="module-section-body">
            Tabs allow you to keep more than one website open at the same time. Think of them like bookmarks in a book.
          </p>
          <div className="module-image"
            onClick={toggleZoom}
          >
            <img 
              src="/img/browser-tabs.png" 
              alt="An example image of several browser tabs open at once" 
            />
            <p className="image-text">
              (Tap image to see it bigger)
            </p>
          </div>

          {isZoomed && (
            <div 
              className="image-zoom"
              onClick={toggleZoom}
            >
              <img 
                src="/img/browser-tabs.png" 
                alt="Enlarged browser tabs view" 
              />
              <button className="close-button"
              >
                ✕ CLOSE
              </button>
            </div>
          )}
        </section>

        <div className="finished-module">
          {!isSaved ? (
            <button 
              className="finished-module-button"
              onClick={completeModule}
            >
              I Have Finished Reading
            </button>
          ) : (
            <div className="progress-box" >
              <h3 className="progress-header">
                Progress Saved!
              </h3>
              <p className="progress-text">
                You have successfully completed this lesson.
              </p>
              <Link 
                to="/dashboard" 
                className="dashboard-link-bottom"
              >
                RETURN TO DASHBOARD
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { Browser };