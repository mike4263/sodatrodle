/**
 * Get a deterministic seed based on the current date
 * This ensures the same soda is selected for everyone on the same day
 */
export function getDailySeed() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  
  // Create a simple seed from the date
  return year * 10000 + month * 100 + day;
}

/**
 * Check if a date is today
 */
export function isToday(date) {
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
}

/**
 * Get the date string for today in YYYY-MM-DD format
 */
export function getTodayString() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

