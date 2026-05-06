import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import confetti from 'canvas-confetti';

const KeyboardBasics = () => {
  // score: tracks how many keys the user has succesfully pressed (0-20
  const [score, setScore] = useState(0);
  // timeLeft: countdown starting at 60 seconds
  const [timeLeft, setTimeLeft] = useState(60);
  // gameState: controls what UI to show ("start", "playing", "win", or "lose")
  const [gameState, setGameState] = useState("start"); 
  // keyDeck: an array of 20 random character the user must type
  const [keyDeck, setKeyDeck] = useState([]); 

  // Function to create a fresh, shuffled deck of 20 unique keys
  const startNewGame = () => {
    // Define all possible characters (A-Z and 0-9)
    const allKeys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
    
    // Shuffle characters using a simple random sort
    const shuffled = allKeys.sort(() => 0.5 - Math.random());
    
    // Take the first 20 and update the deck state
    const selectedKeys = shuffled.slice(0, 20);
    
    // Reset game variables to initial "playing" state
    setKeyDeck(selectedKeys);
    setScore(0);
    setTimeLeft(60);
    setGameState("playing");
  };

  // Handle the Key Press
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Ignore key presses if the game isn't active
      if (gameState !== "playing") return;

      // Determine which key the user SHOULD be pressing based on current score
      const currentTarget = keyDeck[score];

      // Convert the user's input to Uppercase to match the keyDeck
      if (event.key.toUpperCase() === currentTarget) {
        const newScore = score + 1;
        setScore(newScore);

        // If the user reaches the end of the 20 keys, they win
        if (newScore >= 20) {
          setGameState("win");
          // Mark the module as complete in the browser's local storage
          localStorage.setItem('keyboardComplete', 'true');
        }
      }
    };

    // Attach listener to the whole window
    window.addEventListener("keydown", handleKeyPress);
    // Remove listener when component unmounts or state changes
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState, keyDeck, score]); // Effect re-runs when these dependencies change

  // Independent Timer
  useEffect(() => {
    let timer;
    if (gameState === "playing") {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          // If time hits zero, stop the timer and trigger "lose" state
          if (prev <= 1) {
            clearInterval(timer);
            setGameState("lose");
            return 0;
          }
          return prev - 1; // Tick down 1 second
        });
      }, 1000);
    }
    // Stop timer if the component is closed or game ends
    return () => clearInterval(timer);
  }, [gameState]);

  // Confetti celebration when the user wins
  useEffect(() => {
  if (gameState === "win") {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.3 },
      colors: ['#26d9ca', '#3b82f6', '#a855f7'], // Your project colors
      zIndex: 9999, // Ensures it's above your navigation
    });
  }
}, [gameState]); // Only runs when gameState changes

  return (
    // Main container for the keyboard module
    <div id="keyboard-module" className="w-full min-h-screen bg-white font-sans">
      <div className="container mx-auto px-10 py-12 text-center">
        // Persistent Header stays regardless of game state
        <h1 style={{ color: 'black', textTransform: 'uppercase', fontSize: '2.5rem', fontWeight: '900', marginBottom: '10px' }}>
          Keyboard Basics
        </h1>


        {/* START SCREEN */}
        {/* Only rendered if gameState is "start" */}
        {gameState === "start" && (
          <div style={{ border: '4px solid black', padding: '40px', backgroundColor: '#f9fafb' }}>
            <h2 className="text-3xl font-black mb-4 uppercase">The Unique Key Challenge</h2>
            <p className="text-xl mb-8">
              Find <b>20 different keys</b> on your keyboard.<br/>
              No two keys will be the same in one round!
            </p>
            {/* Button triggers the shuffle and starts the timer */}
            <button 
              onClick={startNewGame}
              style={{ backgroundColor: '#26d9ca', color: 'black', padding: '20px 50px', fontSize: '1.5rem', fontWeight: '900', border: '4px solid black', cursor: 'pointer' }}
            >
              START TYPING
            </button>
          </div>
        )}

        {/* ACTIVE GAMEPLAY SCREEN */}
        {/* Only rendered if gameState is "playing" */}
        {gameState === "playing" && (
          <>
            {/* Shows current time and progress */}
            <div className="flex justify-around mb-8">
              <p className="text-2xl font-bold">Time: 
                {/* Changes text to red when time is running low (10s or less) */}
                <span style={{ color: timeLeft <= 10 ? 'red' : 'black' }}>{timeLeft}s</span></p>
              <p className="text-2xl font-bold">Progress: {score}/20</p>
            </div>
            
            {/* The Target Key Display */}
            <div style={{ border: '4px solid black', padding: '60px', backgroundColor: '#f9fafb' }}>
              <p className="text-xl mb-4 uppercase font-bold text-gray-600">Press this key:</p>
              <div 
                style={{ 
                  fontSize: '8rem', 
                  fontWeight: '900', 
                  color: 'black', 
                  backgroundColor: 'white', 
                  display: 'inline-block', 
                  padding: '20px 60px', 
                  border: '5px solid #26d9ca',
                  borderRadius: '15px'
                }}
              >
                {/* Dynamically displays the character from the deck at the current score index */}
                {keyDeck[score]}
              </div>
            </div>
          </>
        )}

        {/* WIN SCREEN */}
        {gameState === "win" && (
          <div style={{ border: '4px solid black', padding: '50px', backgroundColor: '#e0fff4', textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <h2 className="text-4xl font-black mb-6 uppercase">Well Done!</h2>
            <p className="text-2xl mb-10">You've found all 20 unique keys!</p>
            {/* Navigation Link to leave the game */}
            <Link to="/dashboard" style={{ backgroundColor: 'black', color: '#26d9ca', padding: '20px 40px', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', border: '3px solid black', display: 'inline-block' }}>
              RETURN TO DASHBOARD
            </Link>
          </div>
        )}

        {/* LOSE SCREEN */}
        {gameState === "lose" && (
          <div style={{ border: '4px solid black', padding: '50px', backgroundColor: '#fff0f0' }}>
            <h2 className="text-4xl font-black mb-6 uppercase">Time's Up!</h2>
            <p className="text-2xl mb-10">You found {score} keys. Want to try a new set of 20?</p>
    
            {/* Flex container set to column to stack the buttons */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '20px' 
            }}>
      
            {/* Button to restart the game without refreshing the page */}
            <button 
              onClick={startNewGame} 
              style={{ 
                backgroundColor: 'black', 
                color: '#26d9ca', 
                padding: '20px 40px', 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                border: '3px solid black', 
                cursor: 'pointer',
                width: '100%',
                maxWidth: '400px' // Keeps the button from getting too wide on desktop
              }}
            >
              TRY AGAIN
            </button>

            {/* Secondary Action: Return to Dashboard */}
            <Link 
              to="/dashboard" 
              style={{ 
                backgroundColor: 'white', 
                color: 'black', 
                padding: '15px 40px', 
                fontSize: '1.2rem', 
                fontWeight: 'bold', 
                textDecoration: 'none', 
                border: '3px solid black', 
                display: 'block',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center'
              }}
            >
              RETURN TO DASHBOARD
            </Link>

      </div>
    </div>
)}

      </div>
      {/* Manual spacer at the bottom of the page*/}
        <div style={{ height: '100px', width: '100%' }}></div>
    </div>
  );
};

export default KeyboardBasics;