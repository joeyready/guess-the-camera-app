"use client";

import React, { useState } from "react";
import levels from "../data/levels.json";
import CameraSearch from "./components/CameraSearch";
import Image from "next/image";

export default function CameraGame() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [gameState, setGameState] = useState("playing");
  const [viewingHint, setViewingHint] = useState(null); // null means show current hint

  const currentLevel = levels[levelIndex];
  const hintsRevealed = Math.min(guesses.length + 1, 5);
  const roundNum = String(levelIndex + 1).padStart(2, "0");
  
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

  const handleNextLevel = () => {
    setLevelIndex((i) => (i + 1) % levels.length);
    setGuesses([]);
    setInputValue("");
    setGameState("playing");

    setViewingHint(null);
  };

  // Skip: reveal next hint (submit empty guess)
  const handleSkip = () => {
    if (gameState !== "playing") return;
    handleGuess("");
  };

  const lastGuess = guesses[guesses.length - 1];
  // Removed pointsEarned
  const currentHintIndex = Math.max(0, hintsRevealed - 1);
  const displayedHintIndex =
    viewingHint === null ? currentHintIndex : viewingHint;
  const mainImageIndex =
    gameState !== "playing" ? "answer" : displayedHintIndex + 1;

  // Emoji map for guess feedback
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
              fontSize: 36,
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
              05/21/2026
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
        {/* Search input — fuzzy autocomplete, guess fires on submit, skip next to submit */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (gameState === "playing") handleGuess(inputValue);
          }}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
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
              disabled={gameState !== "playing" || !inputValue}
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

            {/* <div>{`state: ${gameState}, guesses: ${guesses.length}`}</div> */}
            <button
              type="button"
              className="mono skip-btn"
              onClick={gameState === "playing" ? handleSkip : handleNextLevel}
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
              {gameState === "playing" ? "SKIP" : "NEXT"}
            </button>
          </div>
        </form>
        {/* List guesses under the form */}
        {guesses.length > 0 && (
          <div style={{ marginTop: 8, width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {guesses.map((guess, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 0,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 15,
                    }}
                  >
                    <span style={{ fontSize: 20 }}>
                      {emojiMap[guess.status]}
                    </span>
                    <span
                      className="mono"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {guess.text || (
                        <span style={{ color: "var(--color-text-tertiary)" }}>
                          Skipped
                        </span>
                      )}
                    </span>
                  </div>
                  {guess.status === "same-brand" && (
                    <span
                      style={{
                        fontSize: 10,
                        color: "#FFD600",
                        marginLeft: 32,
                        marginTop: 1,
                      }}
                    >
                      (brand is correct)
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
