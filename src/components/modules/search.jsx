import React, { useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {
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

    // Get current date in simplified format: 12 May 2026
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

      // Update the 'search' object
      const updatedProgress = { 
        ...currentProgress, 
        search: { complete: true, lastRead: dateString } 
      };

      await fetch('http://localhost:5000/api/update-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, progress: updatedProgress })
      });

      // Update local session so Dashboard sees it immediately
      sessionStorage.setItem('userProgress', JSON.stringify(updatedProgress));
      
      // Flip the state to show the success UI
      setIsSaved(true);

    } catch (err) {
      console.error("Error saving search progress:", err);
    }
  };

  return (
    <div id="search-module" className="w-full min-h-screen bg-white font-sans pb-20">
      <div className="container mx-auto px-10 py-12">
        
        {/* Header */}
        <div className="module-header">
          <h1 className="module-h1">
            How to Search
          </h1>
          <Link to="/dashboard"
          className="dashboard-link">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Introduction */}
        <div className="module-wrapper">
          <p className="module-intro-text-head">
            Searching is how you find specific information on the internet without knowing the exact website address.
          </p>
          <p className="module-intro-text-bosy">
            If the Internet is a giant library, a Search Engine (like Google) is the Librarian. You tell the Librarian what you are looking for, and they show you all the books that might have the answer.
          </p>
        </div>

        {/* Section 1: The Search Box */}
        <section className="module-section">
          <h2 className="module-section-header">
            The Search Box
          </h2>
          <p className="module-section-body">
            To start, you look for a large white box, usually in the middle of the page. This is where you type your "Keywords."
          </p>
          <div 
            onClick={toggleZoom}
            className="module-image"
          >
            <img 
              src="/img/google-home-page.png" 
              alt="An example image of the Google search engine homepage" 
            />
            <p className="image-text">
              (Tap image to see it bigger)
            </p>
          </div>

          {isZoomed && (
            <div 
              onClick={toggleZoom}
              className="image-zoom"
            >
              <img 
                src="/img/google-home-page.png" 
                alt="Enlarged Google homepage view" 
              />
              <button 
                className="close-button"
              >
                ✕ CLOSE
              </button>
            </div>
          )}
        </section>

        {/* Section 2: Keywords */}
        <section className="module-section">
          <h2 className="module-section-header">
            Using Keywords
          </h2>
          <p className="module-section-body">
            You don't need to type perfect sentences. Just type the most important words.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="module-inner-section">
              <p><b>Too Much Information:</b></p>
              <p><i>"Where can I find a place that sells nice flowers near me today?"</i></p>
            </div>
            <div className="module-inner-section">
              <p><b>Just Right (Keywords):</b></p>
              <p>"<i>Florists in Glasgow"</i></p>
            </div>
          </div>
        </section>

        {/* Section 3: Choosing a Result */}
        <section className="module-section">
          <h2 className="module-section-header">
            Picking a Result
          </h2>
          <p className="module-section-body">
            After you press 'Enter', the browser shows a list of websites. Look for the Large Blue Text - this is the link that will take you to that website.
          </p>
          <p className="module-section-body"><b>Tip: Avoid results that say "Ad" or "Sponsored" at first.</b></p>
        </section>

        {/* Completion Area */}
        <div className="finished-module">
          {!isSaved ? (
            <button 
              onClick={completeModule}
              className="finished-module-button"
            >
              I Have Finished Reading
            </button>
          ) : (
            <div className="progress-box">
              <h3 className="progress-header">
                Search Module Complete!
              </h3>
              <p className="progress-text">
                Your progress has been recorded.
              </p>
              <Link 
                to="/dashboard" 
                className="dashboard-link-end"
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

export { Search };