import React, { useState } from "react";
import { Link } from "react-router-dom";

const Email = () => {
  // isSaved: Tracks if the database has been updated successfully
  const [isSaved, setIsSaved] = useState(false);
  
  // isZoomed: Tracks if the email screenshot is enlarged
  const [isZoomed, setIsZoomed] = useState(false);
  
  // toggleZoom: Toggles the zoom state when the image is clicked
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

      // Update the 'email' object
      const updatedProgress = { 
        ...currentProgress, 
        email: { complete: true, lastRead: dateString } 
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
      console.error("Error saving email progress:", err);
    }
  };

  return (
    <div id="email-module" className="w-full min-h-screen bg-white font-sans pb-20">
      <div className="container mx-auto px-10 py-12">
        
        {/* Header */}
        <div style={{ borderBottom: '4px solid #26d9ca', marginBottom: '40px', paddingBottom: '20px' }}>
          <h1 style={{ color: 'black', textTransform: 'uppercase', fontSize: '2.5rem', fontWeight: '900' }}>
            Email 101
          </h1>
          <Link to="/dashboard" style={{ color: '#26d9ca', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.2rem' }}>
            ← Back to Dashboard
          </Link>
        </div>

        {/* Introduction */}
        <div style={{ marginBottom: '50px' }}>
          <p style={{ fontSize: '1.6rem', lineHeight: '1.5', color: 'black', fontWeight: '700' }}>
            Email is a way to send and receive digital letters over the internet.
          </p>
          <p style={{ fontSize: '1.3rem', lineHeight: '1.6', marginTop: '20px', color: '#333' }}>
            It is just like the traditional post office, but much faster. Instead of a physical mailbox on your house, you have an **Inbox** on your computer or phone where your messages arrive instantly.
          </p>
        </div>

        {/* Section 1: Your Inbox */}
        <section style={{ border: '3px solid black', padding: '30px', marginBottom: '40px' }}>
          <h2 style={{ textTransform: 'uppercase', fontWeight: '900', fontSize: '1.8rem', marginBottom: '15px' }}>
            Your Inbox
          </h2>
          <p style={{ fontSize: '1.75rem', marginBottom: '20px' }}>
            The Inbox is where all your incoming mail is kept. Messages that you haven't read yet will usually appear in <b>bold text</b> to help them stand out.
          </p>
          <div 
            onClick={toggleZoom}
            style={{ 
              border: '2px dashed #ccc', 
              padding: '10px', 
              textAlign: 'center', 
              backgroundColor: '#fdfdfd',
              cursor: 'zoom-in'
            }}
          >
            <img 
              src="/img/email.jpg" 
              alt="An example image of a digital email inbox list" 
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
                src="/img/email.jpg" 
                alt="Enlarged inbox view" 
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

        {/* Section 2: Writing a Message */}
        <section style={{ border: '3px solid black', padding: '30px', marginBottom: '40px', backgroundColor: '#f9fafb' }}>
          <h2 style={{ textTransform: 'uppercase', fontWeight: '900', fontSize: '1.8rem', marginBottom: '15px' }}>
            Writing a Message
          </h2>
          <p style={{ fontSize: '1.75rem', marginBottom: '20px' }}>
            When you want to send a message, there are three important boxes you need to fill in:
          </p>
          <div className="space-y-4">
            <div style={{ border: '2px solid black', padding: '15px', backgroundColor: 'white', fontSize: '1.75rem' }}>
              <strong>To:</strong> Where you type the recipient's email address (like <i>friend@email.com</i>).
            </div>
            <div style={{ border: '2px solid black', padding: '15px', backgroundColor: 'white', fontSize: '1.75rem' }}>
              <strong>Subject:</strong> A short title so the person knows what the email is about.
            </div>
            <div style={{ border: '2px solid black', padding: '15px', backgroundColor: 'white', fontSize: '1.75rem' }}>
              <strong>Body:</strong> The main area where you type your letter.
            </div>
          </div>
        </section>

        {/* Section 3: Safety Advice */}
        <section style={{ border: '3px solid black', padding: '30px', marginBottom: '40px' }}>
          <h2 style={{ textTransform: 'uppercase', fontWeight: '900', fontSize: '1.8rem', marginBottom: '15px' }}>
            A Note on Safety
          </h2>
          <p style={{ fontSize: '1.75rem', lineHeight: '1.6' }}>
            Just like the Junk Mail that comes through your door, you might get Spam/Junk emails. If you receive an email from someone you don't know, it is best <b>not to click</b> any links inside it.
          </p>
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
                ✅ Email Module Complete!
              </h3>
              <p style={{ fontSize: '1.2rem', marginBottom: '20px', fontWeight: 'bold' }}>
                Your reading progress has been updated.
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

export { Email };