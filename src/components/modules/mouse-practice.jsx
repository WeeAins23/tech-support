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
        
        <div className="games-dashboard-link">
          <Link 
            to="/dashboard" 
            className="dashboard-link"
          >
            ← BACK TO DASHBOARD
          </Link>
        </div>

        <h1 className="games-header">
          Mouse Practice
        </h1>

        {gameState === "start" && (
          <div className="games-section">
            <h2 className="game-intro-header">The 60-Second Challenge</h2>
            <p className="game-intro-text">Click the teal box <b>20 times</b> before the clock runs out.</p>
            <button onClick={startGame} className="start-button">
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
            <div className="mouse-play-area">
              <button
                onClick={handleTargetClick}
                className="mouse-click-button"
                style={{
                  top: position.top,
                  left: position.left,
                }}
              >
                CLICK!
              </button>
            </div>
          </>
        )}

        {gameState === "win" && (
          <div className="finished-game-screen">
            <h2 className="text-4xl font-black mb-6 uppercase">Success!</h2>
            <p className="text-2xl mb-10">You completed the challenge in {60 - timeLeft} seconds!</p>
            <Link to="/dashboard" className="dashboard-link-end">
              RETURN TO DASHBOARD
            </Link>
          </div>
        )}

        {gameState === "lose" && (
          <div className="lose-game-screen">
            <h2 className="text-4xl font-black mb-6 uppercase">Time's Up!</h2>
            <p className="text-2xl mb-10">You got {score} click. Would you like to try again?</p>
              <div className="new-game">
                <button 
                  onClick={startGame} 
                  className="try-again-button"
                >
                  TRY AGAIN
                </button>
                <Link 
                  to="/dashboard" 
                  className="dashboard-link-end"
                  >
                    RETURN TO DASHBOARD
                  </Link>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export { MousePractice };