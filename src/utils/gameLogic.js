import { findSodaByName, getDailySoda } from './sodaDatabase.js';

/**
 * Compare two sodas and return feedback for each attribute
 * Returns an object with match status for each attribute
 */
export function compareSodas(guess, answer) {
  const feedback = {
    name: guess.name === answer.name ? 'correct' : 'wrong',
    brand: compareAttribute(guess.brand, answer.brand),
    flavor: compareAttribute(guess.flavor, answer.flavor),
    color: compareAttribute(guess.color, answer.color),
    caffeine: guess.caffeine === answer.caffeine ? 'correct' : 'wrong',
  };
  
  return feedback;
}

/**
 * Compare a single attribute
 * Returns 'correct', 'partial', or 'wrong'
 */
function compareAttribute(guessValue, answerValue) {
  if (!guessValue || !answerValue) {
    return 'wrong';
  }
  
  const guessLower = String(guessValue).toLowerCase().trim();
  const answerLower = String(answerValue).toLowerCase().trim();
  
  if (guessLower === answerLower) {
    return 'correct';
  }
  
  // Check for partial matches (contains, similar words)
  if (guessLower.includes(answerLower) || answerLower.includes(guessLower)) {
    return 'partial';
  }
  
  // Check for similar flavors (e.g., "Lemon-Lime" vs "Lemon Lime")
  const guessWords = guessLower.split(/[\s-]+/);
  const answerWords = answerLower.split(/[\s-]+/);
  const commonWords = guessWords.filter(word => answerWords.includes(word));
  
  if (commonWords.length > 0 && commonWords.length >= Math.min(guessWords.length, answerWords.length) / 2) {
    return 'partial';
  }
  
  return 'wrong';
}

/**
 * Validate a guess
 */
export function validateGuess(guessName) {
  if (!guessName || typeof guessName !== 'string') {
    return { valid: false, error: 'Please enter a soda name' };
  }
  
  const trimmed = guessName.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'Please enter a soda name' };
  }
  
  const soda = findSodaByName(trimmed);
  if (!soda) {
    return { valid: false, error: 'Soda not found in database' };
  }
  
  return { valid: true, soda };
}

/**
 * Get the daily answer soda
 */
export function getDailyAnswer() {
  return getDailySoda();
}

/**
 * Check if game is won
 */
export function isGameWon(feedback) {
  return feedback.name === 'correct';
}

/**
 * Generate hints based on feedback
 * Returns an array of hint strings
 */
export function generateHints(feedback, answer, guessCount) {
  const hints = [];
  
  // After first guess
  if (guessCount >= 1) {
    if (feedback.brand === 'correct') {
      hints.push(`The brand is ${answer.brand}`);
    } else if (feedback.brand === 'partial') {
      hints.push(`The brand is similar to your guess`);
    } else {
      hints.push(`The brand is not ${feedback.brand || 'that'}`);
    }
  }
  
  // After second guess
  if (guessCount >= 2) {
    if (feedback.flavor === 'correct') {
      hints.push(`The flavor is ${answer.flavor}`);
    } else if (feedback.flavor === 'partial') {
      hints.push(`The flavor is similar to your guess`);
    } else {
      hints.push(`The flavor is not ${feedback.flavor || 'that'}`);
    }
  }
  
  // After third guess
  if (guessCount >= 3) {
    if (feedback.color === 'correct') {
      hints.push(`The color is ${answer.color}`);
    } else if (feedback.color === 'partial') {
      hints.push(`The color is similar to your guess`);
    } else {
      hints.push(`The color is not ${feedback.color || 'that'}`);
    }
  }
  
  // After fourth guess
  if (guessCount >= 4) {
    hints.push(`This soda ${answer.caffeine ? 'contains' : 'does not contain'} caffeine`);
  }
  
  // After fifth guess
  if (guessCount >= 5) {
    if (answer.year) {
      hints.push(`This soda was introduced around ${answer.year}`);
    }
  }
  
  return hints;
}

