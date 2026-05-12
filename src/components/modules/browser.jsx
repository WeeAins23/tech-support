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
        <div style={{ borderBottom: '4px solid #26d9ca', marginBottom: '40px', paddingBottom: '20px' }}>
          <h1 style={{ color: 'black', textTransform: 'uppercase', fontSize: '2.5rem', fontWeight: '900' }}>
            What is a Browser?
          </h1>
          <Link to="/dashboard" style={{ color: '#26d9ca', fontWeight: 'bold', textDecoration: 'none' }}>
            ← Back to Dashboard
          </Link>
        </div>

        {/* Introduction Section */}
        <div style={{ marginBottom: '50px' }}>
          <p style={{ fontSize: '1.6rem', lineHeight: '1.5', color: 'black', fontWeight: '700' }}>
            A Web Browser is a piece of software (an "app") that lets you visit websites. 
          </p>
          <p style={{ fontSize: '1.3rem', lineHeight: '1.6', marginTop: '20px', color: '#333' }}>
            Think of the Internet as a giant library full of books. The Browser is like the front door of that library. Without a browser, you wouldn't be able to "open" the websites you want to see, read the news, or check your email.
          </p>
        </div>

        {/* Section 1: The Address Bar */}
        <section style={{ border: '3px solid black', padding: '30px', marginBottom: '40px' }}>
          <h2 style={{ textTransform: 'uppercase', fontWeight: '900', fontSize: '1.8rem', marginBottom: '15px' }}>
            The Address Bar
          </h2>
          <p style={{ fontSize: '1.75rem', marginBottom: '20px' }}>
            The Address Bar is the long white box at the top of your screen. This is where you type the name of the place you want to go.
          </p>
          <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fdfdfd' }}>
            <p className="text-sm italic text-gray-500 mt-2">Example: Typing "www.google.com" into the bar.</p>
          </div>
        </section>

        {/* Section 2: Navigation Buttons */}
        <section style={{ border: '3px solid black', padding: '30px', marginBottom: '40px', backgroundColor: '#f9fafb' }}>
          <h2 style={{ textTransform: 'uppercase', fontWeight: '900', fontSize: '1.8rem', marginBottom: '15px' }}>
            Moving Back and Forth
          </h2>
          <p style={{ fontSize: '1.75rem', marginBottom: '20px' }}>
            Browsers have arrows that let you move between pages you've already visited.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div style={{ border: '2px solid black', padding: '15px', backgroundColor: 'white' }}>
              <strong style={{ fontSize: '1.4rem' }}>← Back Button</strong>
              <p>Takes you back to the page you were looking at before.</p>
            </div>
            <div style={{ border: '2px solid black', padding: '15px', backgroundColor: 'white' }}>
              <strong style={{ fontSize: '1.4rem' }}>↻ Refresh Button</strong>
              <p>Reloads the page if it gets stuck or doesn't look right.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Browser Tabs */}
        <section style={{ border: '3px solid black', padding: '30px', marginBottom: '40px' }}>
          <h2 style={{ textTransform: 'uppercase', fontWeight: '900', fontSize: '1.8rem', marginBottom: '15px' }}>
            Using Tabs
          </h2>
          <p style={{ fontSize: '1.75rem', marginBottom: '20px' }}>
            Tabs allow you to keep more than one website open at the same time. Think of them like bookmarks in a book.
          </p>
          <div 
            onClick={toggleZoom}
            style={{ 
              padding: '10px', 
              textAlign: 'center', 
              backgroundColor: '#fdfdfd',
              cursor: 'zoom-in'
            }}
          >
            <img 
              src="/img/browser-tabs.png" 
              alt="An example image of several browser tabs open at once" 
              style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} 
            />
            <p style={{ fontSize: '0.9rem', marginTop: '10px', color: '#666' }}>
              (Tap image to see it bigger)
            </p>
          </div>

          {isZoomed && (
            <div 
              onClick={toggleZoom}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.9)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10000,
                cursor: 'zoom-out'
              }}
            >
              <img 
                src="/img/browser-tabs.png" 
                alt="Enlarged browser tabs view" 
                style={{ maxWidth: '95%', maxHeight: '95%', border: '2px solid white' }} 
              />
              <button 
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  backgroundColor: 'white',
                  border: 'none',
                  fontSize: '2rem',
                  padding: '10px 20px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                ✕ CLOSE
              </button>
            </div>
          )}
        </section>

        {/* NEW DYNAMIC COMPLETION AREA */}
        <div style={{ textAlign: 'center', marginTop: '60px', padding: '40px', borderTop: '4px solid black' }}>
          {!isSaved ? (
            <button 
              onClick={completeModule}
              style={{ 
                backgroundColor: '#26d9ca', 
                color: 'black', 
                padding: '25px 50px', 
                fontSize: '1.8rem', 
                fontWeight: '900', 
                border: '4px solid black', 
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              I Have Finished Reading
            </button>
          ) : (
            <div style={{ border: '4px solid #00857a', padding: '30px', backgroundColor: '#e0fff4' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: '900', color: '#00857a', marginBottom: '15px', textTransform: 'uppercase' }}>
                Progress Saved!
              </h3>
              <p style={{ fontSize: '1.2rem', marginBottom: '20px', fontWeight: 'bold' }}>
                You have successfully completed this lesson.
              </p>
              <Link 
                to="/dashboard" 
                style={{ 
                  backgroundColor: 'black', 
                  color: '#26d9ca', 
                  padding: '20px 40px', 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  textDecoration: 'none', 
                  border: '3px solid black', 
                  display: 'inline-block' 
                }}
              >
                RETURN TO DASHBOARD
              </Link>
            </div>
          )}
        </div>
      </div>
      <div style={{ height: '100px', width: '100%' }}></div>
    </div>
  );
};

export { Browser };