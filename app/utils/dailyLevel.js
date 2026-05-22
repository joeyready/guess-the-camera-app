// Calculate which level to show based on the current date
export function getDailyLevelIndex(date = new Date()) {
  // Use a fixed start date for the game
  const startDate = new Date("2026-05-22");
  
  // Get the start of today in local time
  const today = new Date(date);
  today.setHours(0, 0, 0, 0);
  
  // Get the start of the start date in local time
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  
  // Calculate days difference
  const timeDiff = today.getTime() - start.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
  return daysDiff;
}

// Format date as MM/DD/YYYY
export function formatDate(date = new Date()) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

// Generate a shareable result text with emojis
export function generateShareText(guesses, currentLevel, levelNumber) {
  const emojiMap = {
    wrong: "🟥",
    "same-brand": "🟨",
    correct: "🟩",
    skipped: "🟥",
  };
  
  const emojis = guesses.map(g => emojiMap[g.status]).join(" ");
  const won = guesses.some(g => g.status === "correct");
  
  // Add blank boxes if won in fewer than 5 guesses to show uniform 5-box display
  let emojisDisplay = emojis;
  if (won && guesses.length < 5) {
    const blankBoxes = " ⬜".repeat(5 - guesses.length);
    emojisDisplay = emojis + blankBoxes;
  }
  
  const gameUrl = "http://guess.awesomecameras.com/";
  
  return `Guess The Camera #${String(levelNumber).padStart(2, "0")}\n📸 ${emojisDisplay}\n${gameUrl}`;
}

// Create a shareable URL with encoded results
export function createShareUrl(guesses, currentLevel, levelNumber) {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareText = generateShareText(guesses, currentLevel, levelNumber);
  const encodedText = encodeURIComponent(shareText);
  
  return `${baseUrl}?share=${encodedText}`;
}
