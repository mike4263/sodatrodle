import { useState, useEffect, useCallback } from 'react';
import GuessRow from './GuessRow.jsx';
import Keyboard from './Keyboard.jsx';
import HintSystem from './HintSystem.jsx';
import SodaSelector from './SodaSelector.jsx';
import { getTodayString } from '../utils/dateUtils.js';
import { getDailyAnswer, validateGuess, compareSodas, isGameWon } from '../utils/gameLogic.js';
import { getGameState, saveGameState, updateStats } from '../utils/storage.js';

const MAX_GUESSES = 6;

function GameBoard({ onShowShare, onStatsUpdate }) {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [error, setError] = useState('');
  const [answer, setAnswer] = useState(null);
  const [allHints, setAllHints] = useState([]);
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    const today = getTodayString();
    setDateString(today);
    
    // Get or initialize answer
    const dailyAnswer = getDailyAnswer();
    setAnswer(dailyAnswer);
    
    // Load saved game state
    const savedState = getGameState(today);
    if (savedState) {
      setGuesses(savedState.guesses || []);
      setGameStatus(savedState.gameStatus || 'playing');
      setAllHints(savedState.hints || []);
    }
  }, []);

  useEffect(() => {
    if (answer && dateString) {
      const savedState = getGameState(dateString);
      if (savedState) {
        return; // Don't overwrite saved state
      }
      // Save initial state
      saveGameState({
        guesses: [],
        gameStatus: 'playing',
        hints: []
      }, dateString);
    }
  }, [answer, dateString]);

  const handleGuessSubmit = useCallback(() => {
    if (!currentGuess.trim() || !answer) {
      setError('Please enter a soda name');
      return;
    }
    
    if (gameStatus !== 'playing') {
      return;
    }
    
    setError('');
    
    try {
      const validation = validateGuess(currentGuess);
      if (!validation.valid) {
        setError(validation.error);
        return;
      }
      
      const guessSoda = validation.soda;
      
      // Check for duplicate guesses
      if (guesses.some(g => g.soda.name === guessSoda.name)) {
        setError('You already guessed this soda');
        return;
      }
    
    // Compare guess with answer
    const feedback = compareSodas(guessSoda, answer);
    const won = isGameWon(feedback);
    
    const newGuess = {
      soda: guessSoda,
      feedback: feedback
    };
    
    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);
    setCurrentGuess('');
    
    // Generate hints
    const hints = generateHints(feedback, answer, newGuesses.length);
    const updatedHints = [...allHints, ...hints];
    setAllHints(updatedHints);
    
    let newGameStatus = gameStatus;
    if (won) {
      newGameStatus = 'won';
      // Update stats
      updateStats(true, newGuesses.length, dateString);
      onStatsUpdate();
      
      // Show share modal after a short delay
      setTimeout(() => {
        onShowShare({
          guesses: newGuesses,
          answer: answer,
          won: true
        });
      }, 1500);
    } else if (newGuesses.length >= MAX_GUESSES) {
      newGameStatus = 'lost';
      // Update stats
      updateStats(false, MAX_GUESSES, dateString);
      onStatsUpdate();
      
      // Show share modal after a short delay
      setTimeout(() => {
        onShowShare({
          guesses: newGuesses,
          answer: answer,
          won: false
        });
      }, 1500);
    }
    
    setGameStatus(newGameStatus);
    
      // Save game state
      saveGameState({
        guesses: newGuesses,
        gameStatus: newGameStatus,
        hints: updatedHints
      }, dateString);
    } catch (error) {
      console.error('Error submitting guess:', error);
      setError('An error occurred. Please try again.');
    }
  }, [currentGuess, answer, guesses, gameStatus, allHints, dateString, onShowShare, onStatsUpdate]);

  const generateHints = (feedback, answer, guessCount) => {
    const hints = [];
    
    if (guessCount >= 1) {
      if (feedback.brand === 'correct') {
        hints.push(`Brand: ${answer.brand}`);
      } else if (feedback.brand === 'partial') {
        hints.push(`Brand is similar`);
      }
    }
    
    if (guessCount >= 2) {
      if (feedback.flavor === 'correct') {
        hints.push(`Flavor: ${answer.flavor}`);
      } else if (feedback.flavor === 'partial') {
        hints.push(`Flavor is similar`);
      }
    }
    
    if (guessCount >= 3) {
      if (feedback.color === 'correct') {
        hints.push(`Color: ${answer.color}`);
      } else if (feedback.color === 'partial') {
        hints.push(`Color is similar`);
      }
    }
    
    if (guessCount >= 4) {
      hints.push(`Caffeine: ${answer.caffeine ? 'Yes' : 'No'}`);
    }
    
    if (guessCount >= 5) {
      if (feedback.sugarType === 'correct') {
        hints.push(`Sugar Type: ${answer.sugarType}`);
      } else if (feedback.sugarType === 'partial') {
        hints.push(`Sugar type is similar`);
      }
    }
    
    if (guessCount >= 6 && answer.year) {
      hints.push(`Introduced: ${answer.year}`);
    }
    
    return hints;
  };

  const handleKeyPress = useCallback((key) => {
    if (gameStatus !== 'playing') return;
    
    if (key === 'Enter') {
      handleGuessSubmit();
    } else if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (key.length === 1 && /[a-zA-Z0-9\s-]/.test(key)) {
      setCurrentGuess(prev => {
        const newGuess = prev + key;
        // Limit guess length
        if (newGuess.length <= 30) {
          return newGuess;
        }
        return prev;
      });
    }
  }, [gameStatus, handleGuessSubmit]);

  useEffect(() => {
    const handleKeyboardInput = (e) => {
      if (e.target.tagName === 'INPUT') return;
      
      if (e.key === 'Enter') {
        handleKeyPress('Enter');
      } else if (e.key === 'Backspace') {
        handleKeyPress('Backspace');
      } else if (e.key.length === 1) {
        handleKeyPress(e.key);
      }
    };
    
    window.addEventListener('keydown', handleKeyboardInput);
    return () => window.removeEventListener('keydown', handleKeyboardInput);
  }, [handleKeyPress]);

  const emptyRows = Array(MAX_GUESSES - guesses.length).fill(null);
  const isCurrentRow = guesses.length < MAX_GUESSES;

  return (
    <div className="game-board">
      <div className="game-info">
        <p className="game-description">
          Guess the soda of the day! You have {MAX_GUESSES} tries.
        </p>
      </div>

      {error && (
        <div className="error-message" role="alert" id="error-message">
          {error}
        </div>
      )}

      <div className="guesses-container">
        {guesses.map((guess, index) => (
          <GuessRow 
            key={index} 
            guess={guess}
            isRevealed={true}
          />
        ))}
        
        {isCurrentRow && (
          <GuessRow 
            guess={{ soda: { name: currentGuess }, feedback: null }}
            isRevealed={false}
          />
        )}
        
        {emptyRows.map((_, index) => (
          <GuessRow 
            key={`empty-${index}`}
            guess={null}
            isRevealed={false}
          />
        ))}
      </div>

      {gameStatus === 'playing' && (
      <div className="input-section" onKeyDown={(e) => {
        if (e.key === 'Enter' && currentGuess.trim() && gameStatus === 'playing') {
          e.preventDefault();
          handleGuessSubmit();
        }
      }}>
        <SodaSelector
          value={currentGuess}
          onChange={(value) => setCurrentGuess(value)}
          onSelect={(value) => {
            setCurrentGuess(value);
            setError('');
          }}
          placeholder="Type to search sodas..."
          disabled={gameStatus !== 'playing'}
          guesses={guesses}
        />
        <button 
          className="submit-button"
          onClick={handleGuessSubmit}
          disabled={!currentGuess.trim() || gameStatus !== 'playing'}
          aria-label="Submit guess"
        >
          Guess
        </button>
      </div>
      )}

      {gameStatus === 'won' && (
        <div className="game-result won">
          <h2>🎉 Congratulations! You found it!</h2>
          <p>The answer was <strong>{answer?.name}</strong></p>
        </div>
      )}

      {gameStatus === 'lost' && (
        <div className="game-result lost">
          <h2>Game Over</h2>
          <p>The answer was <strong>{answer?.name}</strong></p>
          <p>Try again tomorrow!</p>
        </div>
      )}

      <HintSystem hints={allHints} />

      {gameStatus === 'playing' && (
        <Keyboard 
          onKeyPress={handleKeyPress}
          guesses={guesses}
        />
      )}
    </div>
  );
}

export default GameBoard;

