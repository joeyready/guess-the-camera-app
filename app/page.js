"use client";

import React, { useState, useEffect } from "react";
import levels from "../data/levels.json";
import CameraSearch from "./components/CameraSearch";
import Image from "next/image";
import { getDailyLevelIndex, formatDate, generateShareText } from "./utils/dailyLevel";
import CAMERAS from "./data/cameras";

export default function CameraGame() {
  const [guesses, setGuesses] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [gameState, setGameState] = useState("playing");
  const [viewingHint, setViewingHint] = useState(null); // null means show current hint
  const [todayDate, setTodayDate] = useState(new Date());
  const [gameStats, setGameStats] = useState(null);

  // Load stats from localStorage on mount
  useEffect(() => {
    setTodayDate(new Date());
    const saved = localStorage.getItem("cameraGameStats");
    if (saved) {
      setGameStats(JSON.parse(saved));
    } else {
      setGameStats({
        lastPlayedDate: null,
        currentStreak: 0,
        longestStreak: 0,
        gamesPlayed: 0,
        gamesWon: 0,
        bestTime: null,
        stats: {},
      });
    }
  }, []);

  const levelIndex = getDailyLevelIndex(todayDate);
  const currentLevel = levels[levelIndex % levels.length];
  const hintsRevealed = Math.min(guesses.length + 1, 5);
  const roundNum = String((levelIndex % levels.length) + 1).padStart(2, "0");
  const dateStr = formatDate(todayDate);
  const hasPlayedToday = gameStats?.lastPlayedDate === dateStr;

  // Restore display state from localStorage when already played today
  const todayGameData = hasPlayedToday && gameStats?.stats?.[dateStr] ? gameStats.stats[dateStr] : null;
  const displayGuesses = hasPlayedToday && todayGameData ? todayGameData.guesses : guesses;
  const displayGameState = hasPlayedToday && todayGameData ? (todayGameData.won ? "won" : "lost") : gameState;
  const displayHintsRevealed = hasPlayedToday ? 5 : Math.min(guesses.length + 1, 5);
  const displayCurrentHintIndex = Math.max(0, displayHintsRevealed - 1);
  const displayedHintIndex =
    hasPlayedToday || viewingHint === null ? displayCurrentHintIndex : viewingHint;
  const displayMainImageIndex =
    displayGameState !== "playing" ? "answer" : displayedHintIndex + 1;
  
  // Called when the player selects a camera from the autocomplete dropdown
  const handleGuess = (selectedCamera) => {
    if (gameState !== "playing") return;
    // If skip (empty guess), just reveal next hint
    if (!selectedCamera) {
      if (guesses.length < 5) {
        const newGuesses = [...guesses, { text: "", status: "skipped" }];
        setGuesses(newGuesses);
        setInputValue("");
        // Reset to viewing current hint
        setViewingHint(null);
        // If last hint, end game
        if (newGuesses.length >= 5) {
          setGameState("lost");
        }
      }
      return;
    }
    const isCorrect =
      selectedCamera.toLowerCase() === currentLevel.fullName.toLowerCase();
    const isSameBrand = selectedCamera
      .toLowerCase()
      .includes(currentLevel.brand.toLowerCase());
    const feedbackStatus = isCorrect
      ? "correct"
      : isSameBrand
        ? "same-brand"
        : "wrong";
    const newGuesses = [
      ...guesses,
      { text: selectedCamera, status: feedbackStatus },
    ];
    setGuesses(newGuesses);
    setInputValue("");
    // Reset to viewing current hint after a guess
    setViewingHint(null);
    if (isCorrect) {
      setGameState("won");
    } else if (newGuesses.length >= 5) {
      setGameState("lost");
    }
  };

  const handleShare = () => {
    const shareText = generateShareText(guesses, currentLevel, (levelIndex % levels.length) + 1);
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareText).then(() => {
      alert("Results copied to clipboard!");
    }).catch(err => {
      // Fallback: show the text in an alert
      alert(`Share this:\n\n${shareText}`);
    });
  };

  // Skip: reveal next hint (submit empty guess)
  const handleSkip = () => {
    if (gameState !== "playing") return;
    handleGuess("");
  };

  // Update stats when game ends
  const updateStats = (won) => {
    if (!gameStats) return;
    
    const today = formatDate(new Date());
    const alreadyPlayed = gameStats.stats[today];
    if (alreadyPlayed) return; // Already played today
    
    const newStats = { ...gameStats };
    
    // Check if played yesterday to maintain streak
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const yesterdayStr = formatDate(yesterday);
    const playedYesterday = gameStats.stats[yesterdayStr]?.won === true;
    
    if (won) {
      newStats.currentStreak = playedYesterday ? gameStats.currentStreak + 1 : 1;
      newStats.longestStreak = Math.max(newStats.currentStreak, gameStats.longestStreak);
      newStats.gamesWon += 1;
      newStats.bestTime = gameStats.bestTime === null 
        ? guesses.length 
        : Math.min(gameStats.bestTime, guesses.length);
    } else {
      newStats.currentStreak = 0;
    }
    
    newStats.gamesPlayed += 1;
    newStats.lastPlayedDate = today;
    newStats.stats[today] = { won, guesses: guesses.length };
    
    setGameStats(newStats);
    localStorage.setItem("cameraGameStats", JSON.stringify(newStats));
  };

  // Save stats when game ends
  useEffect(() => {
    if (gameState !== "playing" && gameStats) {
      updateStats(gameState === "won");
    }
  }, [gameState]);

  const lastGuess = guesses[guesses.length - 1];
  // Removed pointsEarned
  const currentHintIndex = Math.max(0, hintsRevealed - 1);

  const mainImageIndex = gameState === "playing" ? displayedHintIndex + 1 : "answer";

  // Emoji map for IN GAME guess feedback
  const emojiMap = {
    wrong: "❌",
    "same-brand": "🟡",
    correct: "✅",
    skipped: "❌",
  };

  return (
    <main
      style={{
        height: "100vh",
        maxHeight: "-webkit-fill-available",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "16px",
        paddingTop: "50px",
        background: "var(--color-background-tertiary)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 440,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            alignItems: "end", // Align to the bottom of the grid row
            gap: 55,
            width: "100%",
          }}
        >
          <h1
            className="game-title"
            style={{
              fontSize: 32,
              lineHeight: "30px", // Set a fixed line-height smaller than the font-size to "crop" the box
              letterSpacing: 2,
              color: "var(--color-text-primary)",
              margin: 0,
              padding: 0,
              textTransform: "uppercase",
            }}
          >
            GUESS THE CAMERA
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              // This is the manual nudge. Adjust this pixel value until it looks perfect.
              marginBottom: "2px",
            }}
          >
            <span
              className="mono"
              style={{
                fontSize: 12,
                lineHeight: 1,
                letterSpacing: 1,
                color: "var(--color-text-tertiary)",
              }}
            >
              NO. {roundNum}
            </span>
            <span
              className="mono"
              style={{
                fontSize: 12,
                lineHeight: 1,
                letterSpacing: 1,
                color: "var(--color-text-secondary)",
              }}
            >
              {dateStr}
            </span>
          </div>
        </div>
        {/* Main image — square via padding-bottom trick */}
        <div style={{ width: "100%", flexShrink: 0 }}>
          <div
            style={{
              position: "relative",
              paddingBottom: "100%",
              borderRadius: 12,
              overflow: "hidden",
              border: "0.5px solid var(--color-border-tertiary)",
              background: "var(--color-background-secondary)",
            }}
          >
            <Image
              src={`/images/${currentLevel.imagePrefix}-${mainImageIndex}.jpg`}
              alt="Camera Hint"
              width={400}
              height={400}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <span
              className="mono"
              style={{
                position: "absolute",
                top: 10,
                right: 12,
                fontSize: 11,
                letterSpacing: 1,
                color: "var(--color-text-secondary)",
                background: "var(--color-background-primary)",
                padding: "3px 8px",
                borderRadius: 20,
                border: "0.5px solid var(--color-border-tertiary)",
              }}
            >
              {gameState !== "playing" ? "ANSWER" : `HINT ${mainImageIndex} / 5`}
            </span>
          </div>
        </div>
        {/* Hint thumbnail strip */}
        <div style={{ display: "flex", gap: 10 }}>
          {[...Array(5)].map((_, i) => {
            const revealed = i < hintsRevealed;
            // Get guess for this hint (may be undefined)
            const isSelected =
              (viewingHint === null ? currentHintIndex : viewingHint) === i &&
              gameState !== "won";
            const guess = guesses[i];
            let emoji = null;
            if (guess) {
              if (guess.status === "correct") emoji = emojiMap.correct;
              else if (guess.status === "same-brand")
                emoji = emojiMap["same-brand"];
              else if (guess.status === "wrong") emoji = emojiMap.wrong;
              else if (guess.status === "skipped") emoji = emojiMap.skipped;
            }
            return (
              <div key={i} style={{ flex: 1, position: "relative" }}>
                <div
                  className="hint-slot"
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingBottom: "100%",
                    overflow: "hidden",
                    borderRadius: 8,
                    border: isSelected
                      ? "2.5px solid var(--color-accent, #FFD600)"
                      : "0.5px solid var(--color-border-tertiary)",
                    background: "var(--color-background-secondary)",
                    cursor: revealed ? "pointer" : "default",
                    transition: "border-color 0.15s",
                    boxShadow: isSelected ? "0 0 0 2px #FFD60055" : undefined,
                  }}
                  onClick={() => revealed && setViewingHint(i)}
                >
                  <div style={{ position: "absolute", inset: 0 }}>
                    {revealed ? (
                      <>
                        <Image
                          src={`/images/${currentLevel.imagePrefix}-${i + 1}.jpg`}
                          alt={`hint ${i + 1}`}
                          width={400}
                          height={400}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                        {emoji && (
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "rgba(0,0,0,0.45)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 36,
                              color: "#fff",
                              fontWeight: 700,
                              zIndex: 2,
                            }}
                          >
                            {emoji}
                          </div>
                        )}
                      </>
                    ) : (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 3,
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 20 20"
                          fill="none"
                          style={{ opacity: 0.25 }}
                        >
                          <rect
                            x="4"
                            y="9"
                            width="12"
                            height="9"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M7 9V6a3 3 0 0 1 6 0v3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span
                          className="mono"
                          style={{
                            fontSize: 9,
                            color: "var(--color-text-tertiary)",
                            letterSpacing: 1,
                          }}
                        >
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
        {/* Game stats */}
        {gameStats && gameState !== "playing" && (
          <div style={{ margin: "-4px auto 0 auto", width: "80%" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, width: "100%" }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 8px 0" }}>Current streak</p>
                <p style={{ fontSize: 28, color: "var(--color-text-primary)", margin: 0, fontWeight: 600 }}>{gameStats.currentStreak}</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 8px 0" }}>Best streak</p>
                <p style={{ fontSize: 28, color: "var(--color-text-primary)", margin: 0, fontWeight: 600 }}>{gameStats.longestStreak}</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 8px 0" }}>Total played</p>
                <p style={{ fontSize: 28, color: "var(--color-text-primary)", margin: 0, fontWeight: 600 }}>{gameStats.gamesPlayed}</p>
              </div>
            </div>
          </div>
        )}
        {/* Search input — fuzzy autocomplete, guess fires on submit, skip next to submit */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (gameState === "playing") handleGuess(inputValue);
          }}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          {gameState === "playing" && (
            <>
              <CameraSearch
                value={inputValue}
                onChange={setInputValue}
                onSelect={() => {}}
                disabled={gameState !== "playing"}
              />
              <div style={{ display: "flex", gap: 8, width: "100%" }}>
                <button
                  type="submit"
                  className="mono guess-btn"
                  disabled={gameState !== "playing" || !inputValue || !CAMERAS.includes(inputValue)}
                  style={{
                    flex: 4,
                    height: 36,
                    borderRadius: 8,
                    border: "none",
                    background: "var(--color-text-primary)",
                    color: "var(--color-background-primary)",
                    fontSize: 13,
                    letterSpacing: 1,
                    cursor:
                      gameState !== "playing" || !inputValue
                        ? "not-allowed"
                        : "pointer",
                    transition: "opacity 0.15s",
                  }}
                >
                  SUBMIT
                </button>
                <button
                  type="button"
                  className="mono skip-btn"
                  onClick={handleSkip}
                  style={{
                    flex: 1,
                    height: 36,
                    borderRadius: 8,
                    border: "0.5px solid var(--color-border-secondary)",
                    background: "transparent",
                    color: "var(--color-text-secondary)",
                    fontSize: 13,
                    letterSpacing: 1,
                    cursor: "pointer",
                    transition: "background 0.12s, color 0.12s",
                  }}
                >
                  SKIP
                </button>
              </div>
            </>
          )}
          
          {gameState !== "playing" && (
            <button
              type="button"
              className="mono share-btn"
              onClick={handleShare}
              style={{
                width: "80%",
                height: 54,
                borderRadius: 8,
                border: "none",
                background: "#22c55e",
                color: "#fff",
                fontSize: 13,
                letterSpacing: 1,
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.15s",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              SHARE
            </button>
          )}
        </form>
        {/* Game completion message */}
        {gameState !== "playing" && (
          <div style={{ marginTop: 16, width: "100%", textAlign: "center" }}>
            <p
              style={{
                fontSize: 15,
                color: "var(--color-text-primary)",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {gameState === "won"
                ? <>Congrats!! You correctly identified the <strong>{currentLevel.fullName}</strong>, come back tomorrow to test your camera knowledge again!<br /><br />Share your results to challenge your friends!</>
                : <>Sorry, better luck tomorrow!<br /><br />Today's camera was the <strong>{currentLevel.fullName}</strong>.<br /><br />Share your results to challenge your friends with today's puzzle!</>}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
