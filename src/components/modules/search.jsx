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
        <div style={{ borderBottom: '4px solid #26d9ca', marginBottom: '40px', paddingBottom: '20px' }}>
          <h1 style={{ color: 'black', textTransform: 'uppercase', fontSize: '2.5rem', fontWeight: '900' }}>
            How to Search
          </h1>
          <Link to="/dashboard" style={{ color: '#26d9ca', fontWeight: 'bold', textDecoration: 'none' }}>
            ← Back to Dashboard
          </Link>
        </div>

        {/* Introduction */}
        <div style={{ marginBottom: '50px' }}>
          <p style={{ fontSize: '1.6rem', lineHeight: '1.5', color: 'black', fontWeight: '700' }}>
            Searching is how you find specific information on the internet without knowing the exact website address.
          </p>
          <p style={{ fontSize: '1.3rem', lineHeight: '1.6', marginTop: '20px', color: '#333' }}>
            If the Internet is a giant library, a Search Engine (like Google) is the Librarian. You tell the Librarian what you are looking for, and they show you all the books that might have the answer.
          </p>
        </div>

        {/* Section 1: The Search Box */}
        <section style={{ border: '3px solid black', padding: '30px', marginBottom: '40px' }}>
          <h2 style={{ textTransform: 'uppercase', fontWeight: '900', fontSize: '1.8rem', marginBottom: '15px' }}>
            The Search Box
          </h2>
          <p style={{ fontSize: '1.75rem', marginBottom: '20px' }}>
            To start, you look for a large white box, usually in the middle of the page. This is where you type your "Keywords."
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
              src="/img/google-home-page.png" 
              alt="An example image of the Google search engine homepage" 
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
                src="/img/google-home-page.png" 
                alt="Enlarged Google homepage view" 
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

        {/* Section 2: Keywords */}
        <section style={{ border: '3px solid black', padding: '30px', marginBottom: '40px', backgroundColor: '#f9fafb' }}>
          <h2 style={{ textTransform: 'uppercase', fontWeight: '900', fontSize: '1.8rem', marginBottom: '15px' }}>
            Using Keywords
          </h2>
          <p style={{ fontSize: '1.75rem', marginBottom: '20px' }}>
            You don't need to type perfect sentences. Just type the most important words.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div style={{ border: '2px solid black', padding: '20px', backgroundColor: 'white' }}>
              <p className="text-red-600 font-bold">Too Much Information:</p>
              <p className="italic">"Where can I find a place that sells nice flowers near me today?"</p>
            </div>
            <div style={{ border: '2px solid black', padding: '20px', backgroundColor: 'white' }}>
              <p className="text-green-700 font-bold">Just Right (Keywords):</p>
              <p className="font-black italic">"Florists in Glasgow"</p>
            </div>
          </div>
        </section>

        {/* Section 3: Choosing a Result */}
        <section style={{ border: '3px solid black', padding: '30px', marginBottom: '40px' }}>
          <h2 style={{ textTransform: 'uppercase', fontWeight: '900', fontSize: '1.8rem', marginBottom: '15px' }}>
            Picking a Result
          </h2>
          <p style={{ fontSize: '1.75rem', marginBottom: '20px' }}>
            After you press 'Enter', the browser shows a list of websites. Look for the Large Blue Text - this is the link that will take you to that website.
          </p>
          <div style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
            <p className="text-sm italic text-gray-500 mt-2">Tip: Avoid results that say "Ad" or "Sponsored" at first.</p>
          </div>
        </section>

        {/* DYNAMIC COMPLETION AREA */}
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
                ✅ Search Module Complete!
              </h3>
              <p style={{ fontSize: '1.2rem', marginBottom: '20px', fontWeight: 'bold' }}>
                Your progress has been recorded.
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
    </div>
  );
};

export { Search };