# Guess the Camera 📸

A daily camera guessing game inspired by Wordle. Test your photography knowledge by identifying vintage and modern cameras from visual hints!

![Description of screenshot](screenshots/gameplay-1.jpg)
![Description of screenshot](screenshots/gameplay-2.jpg)

## How to Play

- **Get 5 guesses** to identify the camera of the day
- **Use the hints** — progressive images reveal more details
- **Feedback on each guess:**
  - 🟢 **Correct** — You nailed it!
  - 🟡 **Same Brand** — Right manufacturer, wrong model
  - 🔴 **Wrong** — Keep guessing!
- **Build your streak** — Play daily to maintain a winning streak
- **Share your results** — Challenge friends with your score

## Features

- 🎮 Daily camera challenges
- 📊 Persistent game stats and streaks
- 🎨 Smooth animations with Framer Motion
- 🎯 Search autocomplete for camera guesses
- 📱 Responsive design
- 📈 Track your best streak and win rate

## Tech Stack

- **Next.js 16** — React framework
- **React 19** — UI library
- **Tailwind CSS** — Styling
- **Framer Motion** — Animations
- **Lucide React** — Icons

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/guess-the-camera.git
cd guess-the-camera

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to play!

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
  ├── components/
  │   └── CameraSearch.js       # Autocomplete search component
  ├── data/
  │   └── cameras.js            # Camera database
  ├── utils/
  │   └── dailyLevel.js         # Daily challenge logic
  ├── page.js                   # Main game page
  ├── layout.js                 # Layout wrapper
  └── globals.css               # Global styles

data/
  └── levels.json               # Camera challenge definitions

public/
  └── images/                   # Camera hint images
```

## Game Data

The game features hundreds of classic and modern cameras across major manufacturers including Canon, Nikon, Pentax, Olympus, Leica, and more.

Each daily challenge includes:
- Progressive image hints
- Camera brand and model information
- Difficulty tracking

## Features Coming Soon

- [ ] Difficulty levels
- [ ] Camera factory hints
- [ ] Leaderboards
- [ ] Camera trivia

## License

This project is open source and available under the MIT License.

## Contributing

Got ideas for cameras to add or want to improve the game? Contributions are welcome!

---

**Play daily at:** [Your deployed URL here]
