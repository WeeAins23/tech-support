import React, { useState } from "react";
import { Link } from "react-router-dom";

const Email = () => {
  const [hasRead, setHasRead] = useState(false);

  const completeModule = () => {
    setHasRead(true);
    localStorage.setItem('emailComplete', 'true');
  };

  return (
    <div id="email-module" className="w-full min-h-screen bg-white font-sans pb-20">
      <div className="container mx-auto px-10 py-12">
        
        {/* Header */}
        <div style={{ borderBottom: '4px solid #26d9ca', marginBottom: '40px', paddingBottom: '20px' }}>
          <h1 style={{ color: 'black', textTransform: 'uppercase', fontSize: '2.5rem', fontWeight: '900' }}>
            Email 101
          </h1>
          <Link to="/dashboard" style={{ color: '#26d9ca', fontWeight: 'bold', textDecoration: 'none' }}>
            ← Back to Dashboard
          </Link>
        </div>

        {/* Introduction (Clean Style) */}
        <div style={{ marginBottom: '50px' }}>
          <p style={{ fontSize: '1.6rem', lineHeight: '1.5', color: 'black', fontWeight: '700' }}>
            Email is a way to send and receive digital letters over the internet.
          </p>
          <p style={{ fontSize: '1.3rem', lineHeight: '1.6', marginTop: '20px', color: '#333' }}>
            It is just like the traditional post office, but much faster. Instead of a physical mailbox on your house, you have an **Inbox** on your computer or phone where your messages arrive instantly.
          </p>
        </div>

        {/* Section 1: The Inbox */}
        <section style={{ border: '3px solid black', padding: '30px', marginBottom: '40px' }}>
          <h2 style={{ textTransform: 'uppercase', fontWeight: '900', fontSize: '1.8rem', marginBottom: '15px' }}>
            Your Inbox
          </h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '20px' }}>
            The Inbox is where all your incoming mail is kept. Messages that you haven't read yet will usually appear in <b>bold text</b> to help them stand out.
          </p>
          <div style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', backgroundColor: '#fdfdfd' }}>
            
            <p className="text-sm italic text-gray-500 mt-2">Example: A list of messages waiting to be opened.</p>
          </div>
        </section>

        {/* Section 2: Parts of an Email */}
        <section style={{ border: '3px solid black', padding: '30px', marginBottom: '40px', backgroundColor: '#f9fafb' }}>
          <h2 style={{ textTransform: 'uppercase', fontWeight: '900', fontSize: '1.8rem', marginBottom: '15px' }}>
            Writing a Message
          </h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '20px' }}>
            When you want to send a message, there are three important boxes you need to fill in:
          </p>
          <div className="space-y-4">
            <div style={{ border: '2px solid black', padding: '15px', backgroundColor: 'white' }}>
              <strong>To:</strong> Where you type the recipient's email address (like <i>friend@email.com</i>).
            </div>
            <div style={{ border: '2px solid black', padding: '15px', backgroundColor: 'white' }}>
              <strong>Subject:</strong> A short title so the person knows what the email is about.
            </div>
            <div style={{ border: '2px solid black', padding: '15px', backgroundColor: 'white' }}>
              <strong>Body:</strong> The main area where you type your letter.
            </div>
          </div>
        </section>

        {/* Section 3: Staying Safe */}
        <section style={{ border: '3px solid black', padding: '30px', marginBottom: '40px' }}>
          <h2 style={{ textTransform: 'uppercase', fontWeight: '900', fontSize: '1.8rem', marginBottom: '15px' }}>
            A Note on Safety
          </h2>
          <p style={{ fontSize: '1.25rem', lineHeight: '1.6' }}>
            Just like the Junk Mail that comes through your door, you might get Spam/Junk emails. If you receive an email from someone you don't know, it is best <b>not to click</b> any links inside it.
          </p>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
             
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
              <h3 className="text-2xl font-black mb-4 uppercase">Email Module Complete!</h3>
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

export default Email;