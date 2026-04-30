import React, { useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [hasRead, setHasRead] = useState(false);

  const completeModule = () => {
    setHasRead(true);
    localStorage.setItem('searchComplete', 'true');
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

        {/* Introduction (Clean Style) */}
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
          <p style={{ fontSize: '1.25rem', marginBottom: '20px' }}>
            To start, you look for a large white box, usually in the middle of the page. This is where you type your "Keywords."
          </p>
          <div style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', backgroundColor: '#fdfdfd' }}>
            
            <p className="text-sm italic text-gray-500 mt-2">Example: The Google search box waiting for you to type.</p>
          </div>
        </section>

        {/* Section 2: Keywords */}
        <section style={{ border: '3px solid black', padding: '30px', marginBottom: '40px', backgroundColor: '#f9fafb' }}>
          <h2 style={{ textTransform: 'uppercase', fontWeight: '900', fontSize: '1.8rem', marginBottom: '15px' }}>
            Using Keywords
          </h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '20px' }}>
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
          <p style={{ fontSize: '1.25rem', marginBottom: '20px' }}>
            After you press 'Enter', the browser shows a list of websites. Look for the Large Blue Text - this is the link that will take you to that website.
          </p>
          <div style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
            
            <p className="text-sm italic text-gray-500 mt-2">Tip: Avoid results that say "Ad" or "Sponsored" at first.</p>
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
              <h3 className="text-2xl font-black mb-4 uppercase">Search Module Complete!</h3>
              <Link to="/dashboard" style={{ color: 'black', fontWeight: 'bold', fontSize: '1.2rem' }}>
                Return to Dashboard →
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Manual spacer at the bottom of dashboard */}
        <div style={{ height: '100px', width: '100%' }}></div>
    </div>
  );
};

export default Search;