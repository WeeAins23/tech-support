import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import confetti from 'canvas-confetti';

const KeyboardBasics = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameState, setGameState] = useState("start"); 
  const [keyDeck, setKeyDeck] = useState([]); // Stores our 20 unique keys

  // Function to create a fresh, shuffled deck of 20 unique keys
  const startNewGame = () => {
    const allKeys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
    
    // Shuffle the array using Sort (Fisher-Yates style for better randomness)
    const shuffled = allKeys.sort(() => 0.5 - Math.random());
    
    // Grab the first 20 unique keys for this round
    const selectedKeys = shuffled.slice(0, 20);
    
    setKeyDeck(selectedKeys);
    setScore(0);
    setTimeLeft(60);
    setGameState("playing");
  };

  // Handle the Key Press
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (gameState !== "playing") return;

      // The current key the user needs to find
      const currentTarget = keyDeck[score];

      if (event.key.toUpperCase() === currentTarget) {
        const newScore = score + 1;
        setScore(newScore);

        if (newScore >= 20) {
          setGameState("win");
          // Here is where we would save progress to localStorage
          localStorage.setItem('keyboardComplete', 'true');
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState, keyDeck, score]);

  // Independent Timer
  useEffect(() => {
    let timer;
    if (gameState === "playing") {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameState("lose");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
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
    <div id="keyboard-module" className="w-full min-h-screen bg-white font-sans">
      <div className="container mx-auto px-10 py-12 text-center">
        
        <h1 style={{ color: 'black', textTransform: 'uppercase', fontSize: '2.5rem', fontWeight: '900', marginBottom: '10px' }}>
          Keyboard Basics
        </h1>

        {gameState === "start" && (
          <div style={{ border: '4px solid black', padding: '40px', backgroundColor: '#f9fafb' }}>
            <h2 className="text-3xl font-black mb-4 uppercase">The Unique Key Challenge</h2>
            <p className="text-xl mb-8">
              Find <b>20 different keys</b> on your keyboard.<br/>
              No two keys will be the same in one round!
            </p>
            <button 
              onClick={startNewGame}
              style={{ backgroundColor: '#26d9ca', color: 'black', padding: '20px 50px', fontSize: '1.5rem', fontWeight: '900', border: '4px solid black', cursor: 'pointer' }}
            >
              START TYPING
            </button>
          </div>
        )}

        {gameState === "playing" && (
          <>
            <div className="flex justify-around mb-8">
              <p className="text-2xl font-bold">Time: <span style={{ color: timeLeft <= 10 ? 'red' : 'black' }}>{timeLeft}s</span></p>
              <p className="text-2xl font-bold">Progress: {score}/20</p>
            </div>
            
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
                {keyDeck[score]}
              </div>
            </div>
          </>
        )}

        {/* Win the game logic */}
        {gameState === "win" && (
          <div style={{ border: '4px solid black', padding: '50px', backgroundColor: '#e0fff4', textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <h2 className="text-4xl font-black mb-6 uppercase">Well Done!</h2>
            <p className="text-2xl mb-10">You've found all 20 unique keys!</p>
            <Link to="/dashboard" style={{ backgroundColor: 'black', color: '#26d9ca', padding: '20px 40px', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', border: '3px solid black', display: 'inline-block' }}>
              RETURN TO DASHBOARD
            </Link>
          </div>
        )}

        {/* Lose the game logic */}
        {gameState === "lose" && (
          <div style={{ border: '4px solid black', padding: '50px', backgroundColor: '#fff0f0' }}>
            <h2 className="text-4xl font-black mb-6 uppercase">Time's Up!</h2>
            <p className="text-2xl mb-10">You found {score} keys. Want to try a new set of 20?</p>
            <button onClick={startNewGame} style={{ backgroundColor: 'black', color: '#26d9ca', padding: '20px 40px', fontSize: '1.5rem', fontWeight: 'bold', border: '3px solid black', cursor: 'pointer' }}>
              TRY AGAIN
            </button>
          </div>
        )}

      </div>
      {/* Manual spacer at the bottom of dashboard */}
        <div style={{ height: '100px', width: '100%' }}></div>
    </div>
  );
};

export default KeyboardBasics;