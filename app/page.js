"use client";

import React, { useState } from 'react';
import levels from '../data/levels.json';
import CameraSearch from './components/CameraSearch';

const POINTS = [5, 4, 3, 2, 1];

export default function CameraGame() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [gameState, setGameState] = useState("playing");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const currentLevel = levels[levelIndex];
  const hintsRevealed = Math.min(guesses.length + 1, 5);
  const roundNum = String(levelIndex + 1).padStart(2, '0');

  // Called when the player selects a camera from the autocomplete dropdown
  const handleGuess = (selectedCamera) => {
    if (!selectedCamera || gameState !== "playing") return;

    const isCorrect = selectedCamera.toLowerCase() === currentLevel.fullName.toLowerCase();
    const isSameBrand = selectedCamera.toLowerCase().includes(currentLevel.brand.toLowerCase());

    const feedbackStatus = isCorrect ? "correct" : isSameBrand ? "same-brand" : "wrong";
    const newGuesses = [...guesses, { text: selectedCamera, status: feedbackStatus }];

    setGuesses(newGuesses);
    setInputValue("");

    if (isCorrect) {
      const pts = POINTS[Math.min(newGuesses.length - 1, POINTS.length - 1)];
      setScore(s => s + pts);
      setStreak(s => s + 1);
      setGameState("won");
    } else if (newGuesses.length >= 5) {
      setStreak(0);
      setGameState("lost");
    }
  };

  const handleNextLevel = () => {
    setLevelIndex(i => (i + 1) % levels.length);
    setGuesses([]);
    setInputValue("");
    setGameState("playing");
  };

  const handleSkip = () => {
    setStreak(0);
    setLevelIndex(i => (i + 1) % levels.length);
    setGuesses([]);
    setInputValue("");
    setGameState("playing");
  };

  const lastGuess = guesses[guesses.length - 1];
  const pointsEarned = POINTS[Math.min(guesses.length - 1, POINTS.length - 1)];

  return (
    <main style={{
      height: '100vh',
      maxHeight: '-webkit-fill-available',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      background: 'var(--color-background-tertiary)',
      fontFamily: "'DM Sans', sans-serif",
      overflow: 'hidden',
    }}>

      <div style={{
        width: '100%',
        maxWidth: 440,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <h1 className="game-title" style={{
            fontSize: 28, letterSpacing: 2,
            color: 'var(--color-text-primary)', lineHeight: 1, margin: 0,
          }}>
            GUESS THE CAMERA
          </h1>
          <span className="mono" style={{ fontSize: 11, letterSpacing: 1, color: 'var(--color-text-tertiary)' }}>
            ROUND {roundNum}
          </span>
        </div>

        {/* Hint thumbnail strip */}
        <div style={{ display: 'flex', gap: 6 }}>
          {[...Array(5)].map((_, i) => {
            const revealed = i < hintsRevealed;
            const isActive = i === hintsRevealed - 1;
            return (
              <div key={i} style={{ flex: 1, position: 'relative' }}>
                <div
                  className="hint-slot"
                  style={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '100%',
                    overflow: 'hidden',
                    borderRadius: 8,
                    border: isActive
                      ? '1.5px solid var(--color-border-primary)'
                      : '0.5px solid var(--color-border-tertiary)',
                    background: 'var(--color-background-secondary)',
                    cursor: revealed ? 'pointer' : 'default',
                    transition: 'border-color 0.15s',
                  }}
                >
                  <div style={{ position: 'absolute', inset: 0 }}>
                    {revealed ? (
                      <>
                        <img
                          src={`/images/${currentLevel.imagePrefix}-${i + 1}.jpg`}
                          alt={`hint ${i + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                        <span
                          className="reveal-label mono"
                          style={{
                            position: 'absolute', bottom: 4, left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: 9, letterSpacing: 1,
                            color: 'var(--color-text-secondary)',
                            background: 'var(--color-background-primary)',
                            padding: '1px 5px', borderRadius: 3,
                            border: '0.5px solid var(--color-border-tertiary)',
                            whiteSpace: 'nowrap', opacity: 0,
                            transition: 'opacity 0.15s', pointerEvents: 'none',
                          }}
                        >
                          HINT {i + 1}
                        </span>
                      </>
                    ) : (
                      <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', gap: 3,
                      }}>
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ opacity: 0.25 }}>
                          <rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M7 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        <span className="mono" style={{ fontSize: 9, color: 'var(--color-text-tertiary)', letterSpacing: 1 }}>
                          {i + 1}/5
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main image — square via padding-bottom trick */}
        <div style={{ width: '100%', flexShrink: 0 }}>
          <div style={{
            position: 'relative',
            width: '100%',
            paddingBottom: '100%',
            borderRadius: 12,
            overflow: 'hidden',
            border: '0.5px solid var(--color-border-tertiary)',
            background: 'var(--color-background-secondary)',
          }}>
            <img
              src={`/images/${currentLevel.imagePrefix}-${gameState === 'won' ? 'answer' : hintsRevealed}.jpg`}
              alt="Camera hint"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
              }}
            />
            <span className="mono" style={{
              position: 'absolute', top: 10, right: 12,
              fontSize: 11, letterSpacing: 1,
              color: 'var(--color-text-secondary)',
              background: 'var(--color-background-primary)',
              padding: '3px 8px', borderRadius: 20,
              border: '0.5px solid var(--color-border-tertiary)',
            }}>
              HINT {hintsRevealed} / 5
            </span>
          </div>
        </div>

        {/* Feedback bar */}
        {lastGuess && gameState === 'playing' && (
          <div className="feedback-enter mono" style={{
            padding: '7px 12px', borderRadius: 8, fontSize: 12, letterSpacing: 0.5,
            border: '0.5px solid',
            background: 'var(--color-background-warning)',
            color: 'var(--color-text-warning)',
            borderColor: 'var(--color-text-warning)',
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>Not quite — next hint revealed</span>
            <span style={{ opacity: 0.6 }}>↳ {lastGuess.text}</span>
          </div>
        )}

        {gameState === 'won' && (
          <div className="feedback-enter mono" style={{
            padding: '7px 12px', borderRadius: 8, fontSize: 12, letterSpacing: 0.5,
            border: '0.5px solid',
            background: 'var(--color-background-success)',
            color: 'var(--color-text-success)',
            borderColor: 'var(--color-text-success)',
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>+ {pointsEarned} pts — correct!</span>
            <span style={{ opacity: 0.7 }}>{currentLevel.fullName}</span>
          </div>
        )}

        {gameState === 'lost' && (
          <div className="feedback-enter mono" style={{
            padding: '7px 12px', borderRadius: 8, fontSize: 12, letterSpacing: 0.5,
            border: '0.5px solid',
            background: 'var(--color-background-danger)',
            color: 'var(--color-text-danger)',
            borderColor: 'var(--color-text-danger)',
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>Out of hints!</span>
            <span style={{ opacity: 0.7 }}>It was the {currentLevel.fullName}</span>
          </div>
        )}

        {/* Search input — fuzzy autocomplete, guess fires on selection */}
        <CameraSearch
          value={inputValue}
          onChange={setInputValue}
          onSelect={handleGuess}
          disabled={gameState !== 'playing'}
        />

        {/* Score row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: 1, color: 'var(--color-text-tertiary)' }}>SCORE</div>
            <div className="game-title" style={{ fontSize: 22, lineHeight: 1, color: 'var(--color-text-primary)' }}>{score}</div>
          </div>
          <div style={{ width: 1, height: 20, background: 'var(--color-border-tertiary)' }} />
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: 1, color: 'var(--color-text-tertiary)' }}>STREAK</div>
            <div className="game-title" style={{ fontSize: 22, lineHeight: 1, color: 'var(--color-text-primary)' }}>{streak}</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            {gameState !== 'playing' ? (
              <button
                className="mono guess-btn"
                onClick={handleNextLevel}
                style={{
                  height: 36, padding: '0 14px',
                  borderRadius: 8, border: 'none',
                  background: 'var(--color-text-primary)',
                  color: 'var(--color-background-primary)',
                  fontSize: 11, letterSpacing: 1, cursor: 'pointer',
                  transition: 'opacity 0.15s',
                }}
              >
                NEXT →
              </button>
            ) : (
              <button
                className="mono skip-btn"
                onClick={handleSkip}
                style={{
                  height: 36, padding: '0 14px',
                  borderRadius: 8,
                  border: '0.5px solid var(--color-border-secondary)',
                  background: 'transparent',
                  color: 'var(--color-text-secondary)',
                  fontSize: 11, letterSpacing: 1, cursor: 'pointer',
                  transition: 'background 0.12s, color 0.12s',
                }}
              >
                SKIP →
              </button>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}