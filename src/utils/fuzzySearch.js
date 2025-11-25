import { SODAS } from './sodaDatabase.js';
import { normalizeSodaName } from './sodaDatabase.js';

/**
 * Simple fuzzy search - checks if all characters in search term appear in order in the target
 */
function fuzzyMatch(searchTerm, target) {
  const search = normalizeSodaName(searchTerm);
  const text = normalizeSodaName(target);
  
  if (!search) return true;
  if (!text) return false;
  
  let searchIndex = 0;
  for (let i = 0; i < text.length && searchIndex < search.length; i++) {
    if (text[i] === search[searchIndex]) {
      searchIndex++;
    }
  }
  
  return searchIndex === search.length;
}

/**
 * Calculate a match score - higher is better
 * Exact matches get highest score, then starts-with, then contains, then fuzzy
 */
function calculateScore(searchTerm, sodaName) {
  const search = searchTerm.toLowerCase().trim();
  const name = sodaName.toLowerCase();
  const normalizedSearch = normalizeSodaName(searchTerm);
  const normalizedName = normalizeSodaName(sodaName);
  
  // Exact match
  if (name === search || normalizedName === normalizedSearch) {
    return 1000;
  }
  
  // Starts with
  if (name.startsWith(search) || normalizedName.startsWith(normalizedSearch)) {
    return 500 + (search.length / name.length) * 100;
  }
  
  // Contains
  if (name.includes(search) || normalizedName.includes(normalizedSearch)) {
    return 200 + (search.length / name.length) * 100;
  }
  
  // Fuzzy match - score based on how many characters matched
  if (fuzzyMatch(searchTerm, sodaName)) {
    let matchCount = 0;
    let searchIndex = 0;
    for (let i = 0; i < normalizedName.length && searchIndex < normalizedSearch.length; i++) {
      if (normalizedName[i] === normalizedSearch[searchIndex]) {
        matchCount++;
        searchIndex++;
      }
    }
    return 50 + (matchCount / normalizedSearch.length) * 100;
  }
  
  return 0;
}

/**
 * Search sodas by name with fuzzy matching
 * Returns sorted array of matching sodas
 */
export function searchSodas(searchTerm, limit = 10) {
  if (!searchTerm || searchTerm.trim().length === 0) {
    return [];
  }
  
  const results = SODAS.map(soda => ({
    soda,
    score: calculateScore(searchTerm, soda.name)
  }))
  .filter(result => result.score > 0)
  .sort((a, b) => {
    // Sort by score descending, then alphabetically
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.soda.name.localeCompare(b.soda.name);
  })
  .slice(0, limit)
  .map(result => result.soda);
  
  return results;
}

