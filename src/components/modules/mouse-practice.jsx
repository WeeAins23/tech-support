import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MousePractice = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameState, setGameState] = useState("start"); // "start", "playing", "win", "lose"
  const [position, setPosition] = useState({ top: "50%", left: "50%" });

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
  
  // Cleanup: This stops the timer when the component unmounts or state changes
  return () => clearInterval(timer);
}, [gameState]); // Removed 'score' and 'timeLeft' from here

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
        
        <h1 style={{ color: 'black', textTransform: 'uppercase', fontSize: '2.5rem', fontWeight: '900', marginBottom: '10px' }}>
          Mouse Practice
        </h1>

        {/* START SCREEN */}
        {gameState === "start" && (
          <div style={{ border: '4px solid black', padding: '40px', backgroundColor: '#f9fafb' }}>
            <h2 className="text-3xl font-black mb-4 uppercase">The 60-Second Challenge</h2>
            <p className="text-xl mb-8">Click the teal box <b>20 times</b> before the clock runs out.</p>
            <button 
              onClick={startGame}
              style={{ backgroundColor: '#26d9ca', color: 'black', padding: '20px 50px', fontSize: '1.5rem', fontWeight: '900', border: '4px solid black', cursor: 'pointer' }}
            >
              START GAME
            </button>
          </div>
        )}

        {/* PLAYING SCREEN */}
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

        {/* WIN SCREEN */}
        {gameState === "win" && (
          <div style={{ border: '4px solid black', padding: '50px', backgroundColor: '#e0fff4' }}>
            <h2 className="text-4xl font-black mb-6 uppercase">Success!</h2>
            <p className="text-2xl mb-10">You completed the challenge with {timeLeft} seconds to spare!</p>
            <Link to="/dashboard" style={{ backgroundColor: 'black', color: '#26d9ca', padding: '20px 40px', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', border: '3px solid black', display: 'inline-block' }}>
              RETURN TO DASHBOARD
            </Link>
          </div>
        )}

        {/* LOSE SCREEN */}
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
      {/* Manual spacer at the bottom of dashboard */}
        <div style={{ height: '100px', width: '100%' }}></div>
    </div>
  );
};

export default MousePractice;