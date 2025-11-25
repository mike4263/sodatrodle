const STORAGE_KEY = 'sodatrodle';
const STATS_KEY = `${STORAGE_KEY}_stats`;
const GAME_STATE_KEY = `${STORAGE_KEY}_gameState`;

/**
 * Get stored statistics
 */
export function getStats() {
  try {
    const stats = localStorage.getItem(STATS_KEY);
    return stats ? JSON.parse(stats) : {
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      bestStreak: 0,
      guessDistribution: [0, 0, 0, 0, 0, 0], // 1-6 guesses
      lastPlayedDate: null
    };
  } catch (e) {
    return {
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      bestStreak: 0,
      guessDistribution: [0, 0, 0, 0, 0, 0],
      lastPlayedDate: null
    };
  }
}

/**
 * Save statistics
 */
export function saveStats(stats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats:', e);
  }
}

/**
 * Update statistics after a game
 */
export function updateStats(won, guessCount, dateString) {
  const stats = getStats();
  
  stats.gamesPlayed += 1;
  
  if (won) {
    stats.gamesWon += 1;
    if (guessCount >= 1 && guessCount <= 6) {
      stats.guessDistribution[guessCount - 1] += 1;
    }
    
    // Update streak
    if (stats.lastPlayedDate === dateString) {
      // Already played today, don't update streak
    } else if (stats.lastPlayedDate === getPreviousDateString(dateString)) {
      // Consecutive day
      stats.currentStreak += 1;
    } else {
      // New streak
      stats.currentStreak = 1;
    }
    
    if (stats.currentStreak > stats.bestStreak) {
      stats.bestStreak = stats.currentStreak;
    }
  } else {
    // Lost, reset streak
    if (stats.lastPlayedDate !== dateString) {
      stats.currentStreak = 0;
    }
  }
  
  stats.lastPlayedDate = dateString;
  saveStats(stats);
  return stats;
}

/**
 * Get previous date string
 */
function getPreviousDateString(dateString) {
  const date = new Date(dateString);
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}

/**
 * Get game state for today
 */
export function getGameState(dateString) {
  try {
    const state = localStorage.getItem(GAME_STATE_KEY);
    if (!state) return null;
    
    const parsed = JSON.parse(state);
    if (parsed.date === dateString) {
      return parsed;
    }
    return null;
  } catch (e) {
    return null;
  }
}

/**
 * Save game state
 */
export function saveGameState(gameState, dateString) {
  try {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify({
      date: dateString,
      ...gameState
    }));
  } catch (e) {
    console.error('Failed to save game state:', e);
  }
}

/**
 * Clear game state (for testing or reset)
 */
export function clearGameState() {
  try {
    localStorage.removeItem(GAME_STATE_KEY);
  } catch (e) {
    console.error('Failed to clear game state:', e);
  }
}

