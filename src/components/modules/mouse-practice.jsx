import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import confetti from 'canvas-confetti';

const MousePractice = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameState, setGameState] = useState("start"); 
  const [position, setPosition] = useState({ top: "50%", left: "50%" });

  // Confetti and save trigger
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
      updateDatabaseProgress();
    }
  }, [gameState]);

  // Timer logic
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

  // Save function
  const updateDatabaseProgress = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) return;

    const timeTaken = 60 - timeLeft; 

    try {
      // Fetch current data from database
      const res = await fetch(`http://localhost:5000/api/user/${userId}`);
      const data = await res.json();
      
      let currentProgress = typeof data.progress === 'string' 
        ? JSON.parse(data.progress) 
        : data.progress;

      // Calculate Best Time
      const existingBest = currentProgress.mouse?.bestTime;
      const newBest = (existingBest === null || existingBest === undefined || timeTaken < existingBest) 
        ? timeTaken
        : existingBest;

      const updatedProgress = { 
        ...currentProgress, 
        mouse: { complete: true, bestTime: newBest } 
      };

      // Save to Database
      await fetch('http://localhost:5000/api/update-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, progress: updatedProgress })
      });

      // Force Session update so Dashboard knows immediately
      sessionStorage.setItem('userProgress', JSON.stringify(updatedProgress));

      console.log("Progress & Best Time saved successfully!");
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameState("playing");
  };

  const handleTargetClick = () => {
    const newScore = score + 1;
    setScore(newScore);

    if (newScore >= 20) {
      setGameState("win");
    } else {
      const randomTop = Math.floor(Math.random() * 70) + 15;
      const randomLeft = Math.floor(Math.random() * 70) + 15;
      setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
    }
  };

  return (
    <div id="mouse-practice" className="w-full min-h-screen bg-white font-sans">
      <div className="container mx-auto px-10 py-12 text-center">
        
        {/* BACK TO DASHBOARD EXIT */}
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
          Mouse Practice
        </h1>

        {gameState === "start" && (
          <div style={{ border: '4px solid black', padding: '40px', backgroundColor: '#f9fafb' }}>
            <h2 className="text-3xl font-black mb-4 uppercase">The 60-Second Challenge</h2>
            <p className="text-xl mb-8">Click the teal box <b>20 times</b> before the clock runs out.</p>
            <button onClick={startGame} style={{ backgroundColor: '#26d9ca', color: 'black', padding: '20px 50px', fontSize: '1.5rem', fontWeight: '900', border: '4px solid black', cursor: 'pointer' }}>
              START GAME
            </button>
          </div>
        )}

        {gameState === "playing" && (
          <>
            <div className="flex justify-around mb-6">
              <p className="text-2xl font-bold">Time: <span style={{ color: timeLeft <= 10 ? 'red' : 'black' }}>{timeLeft}s</span></p>
              <p className="text-2xl font-bold">Clicks: {score}/20</p>
            </div>
            <div style={{ border: '4px solid black', height: '500px', position: 'relative', backgroundColor: '#f9fafb', overflow: 'hidden' }}>
              <button
                onClick={handleTargetClick}
                style={{
                  position: 'absolute',
                  top: position.top,
                  left: position.left,
                  width: '120px',
                  height: '120px',
                  backgroundColor: '#26d9ca',
                  border: '4px solid black',
                  cursor: 'pointer',
                  transform: 'translate(-50%, -50%)',
                  fontWeight: '900'
                }}
              >
                CLICK!
              </button>
            </div>
          </>
        )}

        {gameState === "win" && (
          <div style={{ border: '4px solid black', padding: '50px', backgroundColor: '#e0fff4' }}>
            <h2 className="text-4xl font-black mb-6 uppercase">Success!</h2>
            <p className="text-2xl mb-10">You completed the challenge in {60 - timeLeft} seconds!</p>
            <Link to="/dashboard" style={{ backgroundColor: 'black', color: '#26d9ca', padding: '20px 40px', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', border: '3px solid black', display: 'inline-block' }}>
              RETURN TO DASHBOARD
            </Link>
          </div>
        )}

        {gameState === "lose" && (
          <div style={{ border: '4px solid black', padding: '50px', backgroundColor: '#fff0f0' }}>
            <h2 className="text-4xl font-black mb-6 uppercase">Time's Up!</h2>
            <p className="text-2xl mb-10">You got {score} clicks. Would you like to try again?</p>
            <button onClick={startGame} style={{ backgroundColor: 'black', color: '#26d9ca', padding: '20px 40px', fontSize: '1.5rem', fontWeight: 'bold', border: '3px solid black', cursor: 'pointer' }}>
              RETRY
            </button>
          </div>
        )}
      </div>
      <div style={{ height: '100px', width: '100%' }}></div>
    </div>
  );
};

export { MousePractice };