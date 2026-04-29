import React, { useState } from "react";
import { Link } from "react-router-dom";

const Browser = () => {
  const [hasRead, setHasRead] = useState(false);

  const completeModule = () => {
    setHasRead(true);
    localStorage.setItem('browserComplete', 'true');
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

        {/* --- CLEAN INTRODUCTION (No Box, No H2) --- */}
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
            1. The Address Bar
          </h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '20px' }}>
            The **Address Bar** is the long white box at the top of your screen. This is where you type the name of the place you want to go.
          </p>
          <div style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', backgroundColor: '#fdfdfd' }}>
            
            <p className="text-sm italic text-gray-500 mt-2">Example: Typing "www.google.com" into the bar.</p>
          </div>
        </section>

        {/* Section 2: Navigation Buttons */}
        <section style={{ border: '3px solid black', padding: '30px', marginBottom: '40px', backgroundColor: '#f9fafb' }}>
          <h2 style={{ textTransform: 'uppercase', fontWeight: '900', fontSize: '1.8rem', marginBottom: '15px' }}>
            2. Moving Back and Forth
          </h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '20px' }}>
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
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
             
          </div>
        </section>

        {/* Section 3: Browser Tabs */}
        <section style={{ border: '3px solid black', padding: '30px', marginBottom: '40px' }}>
          <h2 style={{ textTransform: 'uppercase', fontWeight: '900', fontSize: '1.8rem', marginBottom: '15px' }}>
            3. Using Tabs
          </h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '20px' }}>
            **Tabs** allow you to keep more than one website open at the same time. Think of them like bookmarks in a book.
          </p>
          <div style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
            
          </div>
        </section>

        {/* Completion Area */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          {!hasRead ? (
            <button 
              onClick={completeModule}
              style={{ backgroundColor: '#26d9ca', color: 'black', padding: '25px 50px', fontSize: '1.8rem', fontWeight: '900', border: '4px solid black', cursor: 'pointer' }}
            >
              I HAVE FINISHED READING
            </button>
          ) : (
            <div style={{ border: '4px solid #00857a', padding: '30px', backgroundColor: '#e0fff4' }}>
              <h3 className="text-2xl font-black mb-4 uppercase">Module Complete!</h3>
              <Link to="/dashboard" style={{ color: 'black', fontWeight: 'bold', fontSize: '1.2rem' }}>
                Go back to see your progress update →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browser;