"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import CAMERAS from "../data/cameras";

function fuzzyScore(query, candidate) {
  const q = query.toLowerCase();
  const c = candidate.toLowerCase();
  if (c === q) return 1000;
  if (c.startsWith(q)) return 900;
  const words = c.split(/[\s\-]+/);
  for (const word of words) {
    if (word.startsWith(q)) return 800;
  }
  let qi = 0, score = 0, consecutive = 0;
  for (let ci = 0; ci < c.length && qi < q.length; ci++) {
    if (c[ci] === q[qi]) {
      qi++;
      consecutive++;
      score += consecutive * 10;
    } else {
      consecutive = 0;
    }
  }
  if (qi < q.length) return -1;
  return score;
}

function getMatches(query) {
  if (!query || query.length < 3) return [];
  return CAMERAS
    .map(cam => ({ cam, score: fuzzyScore(query, cam) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ cam }) => cam);
}

function HighlightMatch({ text, query }) {
  if (!query) return <span>{text}</span>;
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  const positions = new Set();
  let qi = 0;
  for (let ci = 0; ci < t.length && qi < q.length; ci++) {
    if (t[ci] === q[qi]) { positions.add(ci); qi++; }
  }
  return (
    <span>
      {text.split("").map((char, i) =>
        positions.has(i)
          ? <mark key={i} style={{ background: "none", color: "var(--color-text-primary)", fontWeight: 600 }}>{char}</mark>
          : <span key={i} style={{ opacity: 0.55 }}>{char}</span>
      )}
    </span>
  );
}

export default function CameraSearch({ onSelect, disabled, value, onChange }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const skipBlurRef = useRef(false); // prevents blur from closing dropdown on item click

  // Reset when parent clears value (new round)
  const prevValue = useRef(value);
  useEffect(() => {
    if (value === "" && prevValue.current !== "") {
      setQuery("");
      setResults([]);
      setOpen(false);
      setActiveIndex(-1);
    }
    prevValue.current = value;
  }, [value]);

  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    onChange?.(q);
    if (q.length >= 3) {
      const matches = getMatches(q);
      setResults(matches);
      setOpen(matches.length > 0);
    } else {
      setResults([]);
      setOpen(false);
    }
    setActiveIndex(-1);
  };

  const handleSelect = useCallback((camera) => {
    setQuery("");
    setResults([]);
    setOpen(false);
    setActiveIndex(-1);
    onChange?.("");
    onSelect(camera);
  }, [onSelect, onChange]);

  const handleKeyDown = (e) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = activeIndex >= 0 ? results[activeIndex] : results.length === 1 ? results[0] : null;
      if (target) handleSelect(target);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const handleBlur = () => {
    // Delay so mousedown on a list item fires first
    setTimeout(() => {
      if (!skipBlurRef.current) setOpen(false);
      skipBlurRef.current = false;
    }, 150);
  };

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      listRef.current.children[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        ref={inputRef}
        className="mono"
        style={{
          width: "100%",
          height: 42,
          padding: "0 12px",
          fontSize: 14,
          letterSpacing: 0.5,
          borderRadius: open ? "8px 8px 0 0" : 8,
          border: "0.5px solid",
          borderColor: open ? "var(--color-border-primary)" : "var(--color-border-secondary)",
          borderBottom: open ? "none" : undefined,
          background: "var(--color-background-primary)",
          color: "var(--color-text-primary)",
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.15s",
        }}
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={disabled ? "" : "Type to guess the camera..."}
        disabled={disabled}
        autoFocus
        autoComplete="off"
        spellCheck={false}
      />

      {/* "X more" nudge */}
      {!disabled && query.length > 0 && query.length < 3 && (
        <span className="mono" style={{
          position: "absolute", right: 10, top: "50%",
          transform: "translateY(-50%)",
          fontSize: 10, letterSpacing: 1,
          color: "var(--color-text-tertiary)",
          pointerEvents: "none",
        }}>
          {3 - query.length} MORE
        </span>
      )}

      {/* Dropdown */}
      {open && results.length > 0 && (
        <ul
          ref={listRef}
          style={{
            position: "absolute",
            top: "100%", left: 0, right: 0,
            margin: 0, padding: 0,
            listStyle: "none",
            background: "var(--color-background-primary)",
            border: "0.5px solid var(--color-border-primary)",
            borderTop: "none",
            borderRadius: "0 0 8px 8px",
            maxHeight: 240,
            overflowY: "auto",
            zIndex: 100,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          }}
        >
          {results.map((cam, i) => (
            <li
              key={cam}
              onMouseDown={() => {
                skipBlurRef.current = true;
                handleSelect(cam);
              }}
              onMouseEnter={() => setActiveIndex(i)}
              style={{
                padding: "10px 12px",
                fontSize: 13,
                cursor: "pointer",
                background: i === activeIndex
                  ? "var(--color-background-secondary)"
                  : "transparent",
                borderBottom: i < results.length - 1
                  ? "0.5px solid var(--color-border-tertiary)"
                  : "none",
                userSelect: "none",
              }}
            >
              <HighlightMatch text={cam} query={query} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}