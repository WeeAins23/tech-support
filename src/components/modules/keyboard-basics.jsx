import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import confetti from 'canvas-confetti';

const KeyboardBasics = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameState, setGameState] = useState("start"); 
  const [keyDeck, setKeyDeck] = useState([]); 

  // 1. CONFETTI & SAVE TRIGGER
  useEffect(() => {
    if (gameState === "win") {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.3 },
        colors: ['#26d9ca', '#3b82f6', '#a855f7'],
        zIndex: 9999,
      });
      // TRIGGER THE SAVE
      updateKeyboardProgress();
    }
  }, [gameState]);

  // 2. CONSOLIDATED SAVE FUNCTION
  const updateKeyboardProgress = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) return;

    // Calculate time taken (60s total - remaining time)
    const timeTaken = 60 - timeLeft; 

    try {
      const res = await fetch(`http://localhost:5000/api/user/${userId}`);
      const data = await res.json();
      
      let currentProgress = typeof data.progress === 'string' 
        ? JSON.parse(data.progress) 
        : data.progress;

      // Handle Best Time (Lower is better for "Time Taken")
      const existingBest = currentProgress.keyboard?.bestTime;
      const newBest = (existingBest === null || existingBest === undefined || timeTaken < existingBest) 
        ? timeTaken 
        : existingBest;

      const updatedProgress = { 
        ...currentProgress, 
        keyboard: { complete: true, bestTime: newBest } 
      };

      // Save to Database
      await fetch('http://localhost:5000/api/update-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, progress: updatedProgress })
      });

      // Update Local Session
      sessionStorage.setItem('userProgress', JSON.stringify(updatedProgress));
      console.log("Keyboard Progress Saved!");
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const startNewGame = () => {
    const allKeys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
    const shuffled = allKeys.sort(() => 0.5 - Math.random());
    const selectedKeys = shuffled.slice(0, 20);
    
    setKeyDeck(selectedKeys);
    setScore(0);
    setTimeLeft(60);
    setGameState("playing");
  };

  // Handle Key Press logic
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (gameState !== "playing") return;
      const currentTarget = keyDeck[score];

      if (event.key.toUpperCase() === currentTarget) {
        const newScore = score + 1;
        setScore(newScore);
        if (newScore >= 20) {
          setGameState("win");
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState, keyDeck, score]);

  // Timer Logic
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

  return (
    <div id="keyboard-module" className="w-full min-h-screen bg-white font-sans">
      <div className="container mx-auto px-10 py-12 text-center">
        
        {/* EMERGENCY EXIT: Back to Dashboard */}
        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          <Link 
            to="/dashboard" 
            style={{ 
              color: 'black', 
              textDecoration: 'none', 
              fontWeight: 'bold', 
              fontSize: '1.2rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderBottom: '2px solid #26d9ca'
            }}
          >
            ← BACK TO DASHBOARD
          </Link>
        </div>

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

        {gameState === "win" && (
          <div style={{ border: '4px solid black', padding: '50px', backgroundColor: '#e0fff4' }}>
            <h2 className="text-4xl font-black mb-6 uppercase">Well Done!</h2>
            <p className="text-2xl mb-10">You finished in <b>{60 - timeLeft} seconds!</b></p>
            <Link to="/dashboard" style={{ backgroundColor: 'black', color: '#26d9ca', padding: '20px 40px', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', border: '3px solid black', display: 'inline-block' }}>
              RETURN TO DASHBOARD
            </Link>
          </div>
        )}

        {gameState === "lose" && (
          <div style={{ border: '4px solid black', padding: '50px', backgroundColor: '#fff0f0' }}>
            <h2 className="text-4xl font-black mb-6 uppercase">Time's Up!</h2>
            <p className="text-2xl mb-10">You found {score} keys. Want to try a new set of 20?</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <button 
                onClick={startNewGame} 
                style={{ backgroundColor: 'black', color: '#26d9ca', padding: '20px 40px', fontSize: '1.5rem', fontWeight: 'bold', border: '3px solid black', cursor: 'pointer', width: '100%', maxWidth: '400px' }}
              >
                TRY AGAIN
              </button>
              <Link 
                to="/dashboard" 
                style={{ backgroundColor: 'white', color: 'black', padding: '15px 40px', fontSize: '1.2rem', fontWeight: 'bold', textDecoration: 'none', border: '3px solid black', display: 'block', width: '100%', maxWidth: '400px', textAlign: 'center' }}
              >
                RETURN TO DASHBOARD
              </Link>
            </div>
          </div>
        )}
      </div>
      <div style={{ height: '100px', width: '100%' }}></div>
    </div>
  );
};

export { KeyboardBasics };