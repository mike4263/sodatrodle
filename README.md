# Sodatrodle

A daily soda guessing game inspired by Wordle. Guess the soda of the day by trying different sodas and receiving feedback on attributes like brand, flavor, color, and caffeine content.

## Features

- **Daily Challenge**: A new soda to guess every day
- **Attribute Feedback**: Get feedback on brand, flavor, color, and caffeine
- **Progressive Hints**: Unlock hints as you make guesses
- **Statistics Tracking**: Track your win rate, streaks, and guess distribution
- **Share Results**: Share your results with friends
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

## How to Play

1. Enter a soda name in the input field
2. Submit your guess to see feedback
3. Use the feedback to narrow down your next guess:
   - 🟩 Green: Correct match
   - 🟨 Yellow: Partial/close match
   - ⬜ Gray: No match
4. You have 6 guesses to find the daily soda
5. Hints unlock progressively as you make guesses

## Game Mechanics

- Each day, a random soda is selected from the database
- The same soda is selected for all players on the same day
- Your progress is saved locally in your browser
- Statistics track your performance over time

## Technologies Used

- React 18
- Vite
- CSS3 (with animations)
- LocalStorage for data persistence

## License

This project is open source and available for personal use.

