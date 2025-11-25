import { getDailySeed } from './dateUtils.js';

// Comprehensive soda database with attributes
export const SODAS = [
  { name: "Coca-Cola", brand: "Coca-Cola Company", flavor: "Cola", color: "Brown", caffeine: true, year: 1886 },
  { name: "Pepsi", brand: "PepsiCo", flavor: "Cola", color: "Brown", caffeine: true, year: 1893 },
  { name: "Sprite", brand: "Coca-Cola Company", flavor: "Lemon-Lime", color: "Clear", caffeine: false, year: 1961 },
  { name: "7-Up", brand: "Keurig Dr Pepper", flavor: "Lemon-Lime", color: "Clear", caffeine: false, year: 1929 },
  { name: "Fanta Orange", brand: "Coca-Cola Company", flavor: "Orange", color: "Orange", caffeine: false, year: 1940 },
  { name: "Mountain Dew", brand: "PepsiCo", flavor: "Citrus", color: "Yellow-Green", caffeine: true, year: 1940 },
  { name: "Dr Pepper", brand: "Keurig Dr Pepper", flavor: "Cherry-Cola", color: "Brown", caffeine: true, year: 1885 },
  { name: "Root Beer", brand: "Various", flavor: "Root Beer", color: "Brown", caffeine: false, year: 1876 },
  { name: "Ginger Ale", brand: "Various", flavor: "Ginger", color: "Clear", caffeine: false, year: 1851 },
  { name: "Orange Crush", brand: "Keurig Dr Pepper", flavor: "Orange", color: "Orange", caffeine: false, year: 1911 },
  { name: "A&W Root Beer", brand: "Keurig Dr Pepper", flavor: "Root Beer", color: "Brown", caffeine: false, year: 1919 },
  { name: "Barq's Root Beer", brand: "Coca-Cola Company", flavor: "Root Beer", color: "Brown", caffeine: true, year: 1898 },
  { name: "Canada Dry", brand: "Keurig Dr Pepper", flavor: "Ginger Ale", color: "Clear", caffeine: false, year: 1904 },
  { name: "Schweppes", brand: "Keurig Dr Pepper", flavor: "Ginger Ale", color: "Clear", caffeine: false, year: 1783 },
  { name: "Cream Soda", brand: "Various", flavor: "Vanilla", color: "Clear", caffeine: false, year: 1850 },
  { name: "Cherry Cola", brand: "Various", flavor: "Cherry-Cola", color: "Brown", caffeine: true, year: 1985 },
  { name: "Vanilla Cola", brand: "Various", flavor: "Vanilla-Cola", color: "Brown", caffeine: true, year: 2002 },
  { name: "Lemonade", brand: "Various", flavor: "Lemon", color: "Yellow", caffeine: false, year: 1630 },
  { name: "Grape Soda", brand: "Various", flavor: "Grape", color: "Purple", caffeine: false, year: 1929 },
  { name: "Strawberry Soda", brand: "Various", flavor: "Strawberry", color: "Red", caffeine: false, year: 1950 },
  { name: "Pineapple Soda", brand: "Various", flavor: "Pineapple", color: "Yellow", caffeine: false, year: 1940 },
  { name: "Blue Raspberry", brand: "Various", flavor: "Blue Raspberry", color: "Blue", caffeine: false, year: 1970 },
  { name: "Cherry Soda", brand: "Various", flavor: "Cherry", color: "Red", caffeine: false, year: 1920 },
  { name: "Black Cherry", brand: "Various", flavor: "Black Cherry", color: "Dark Red", caffeine: false, year: 1930 },
  { name: "Watermelon", brand: "Various", flavor: "Watermelon", color: "Pink", caffeine: false, year: 1980 },
  { name: "Mello Yello", brand: "Coca-Cola Company", flavor: "Citrus", color: "Yellow", caffeine: true, year: 1979 },
  { name: "Sunkist", brand: "Keurig Dr Pepper", flavor: "Orange", color: "Orange", caffeine: false, year: 1978 },
  { name: "Fresca", brand: "Coca-Cola Company", flavor: "Grapefruit", color: "Clear", caffeine: false, year: 1966 },
  { name: "Squirt", brand: "Keurig Dr Pepper", flavor: "Grapefruit", color: "Clear", caffeine: false, year: 1938 },
  { name: "Crush Grape", brand: "Keurig Dr Pepper", flavor: "Grape", color: "Purple", caffeine: false, year: 1916 },
  { name: "Fanta Grape", brand: "Coca-Cola Company", flavor: "Grape", color: "Purple", caffeine: false, year: 1955 },
  { name: "Fanta Pineapple", brand: "Coca-Cola Company", flavor: "Pineapple", color: "Yellow", caffeine: false, year: 1955 },
  { name: "Fanta Strawberry", brand: "Coca-Cola Company", flavor: "Strawberry", color: "Red", caffeine: false, year: 1955 },
  { name: "Big Red", brand: "Keurig Dr Pepper", flavor: "Cream Soda", color: "Red", caffeine: false, year: 1937 },
  { name: "Sun Drop", brand: "Keurig Dr Pepper", flavor: "Citrus", color: "Yellow", caffeine: true, year: 1949 },
  { name: "Squirt", brand: "Keurig Dr Pepper", flavor: "Grapefruit", color: "Clear", caffeine: false, year: 1938 },
  { name: "RC Cola", brand: "Keurig Dr Pepper", flavor: "Cola", color: "Brown", caffeine: true, year: 1905 },
  { name: "Faygo", brand: "Faygo", flavor: "Various", color: "Various", caffeine: false, year: 1907 },
  { name: "Jarritos", brand: "Jarritos", flavor: "Various", color: "Various", caffeine: false, year: 1950 },
  { name: "Mexican Cola", brand: "Coca-Cola Company", flavor: "Cola", color: "Brown", caffeine: true, year: 1886 },
  { name: "Jones Soda", brand: "Jones Soda", flavor: "Various", color: "Various", caffeine: false, year: 1995 },
  { name: "Stewart's", brand: "Stewart's", flavor: "Root Beer", color: "Brown", caffeine: false, year: 1924 },
  { name: "Vernors", brand: "Keurig Dr Pepper", flavor: "Ginger Ale", color: "Clear", caffeine: false, year: 1866 },
  { name: "Bubble Up", brand: "Various", flavor: "Lemon-Lime", color: "Clear", caffeine: false, year: 1919 },
  { name: "Ting", brand: "Various", flavor: "Grapefruit", color: "Clear", caffeine: false, year: 1954 },
  { name: "Iron Beer", brand: "Various", flavor: "Cream Soda", color: "Clear", caffeine: false, year: 1917 },
  { name: "Cactus Cooler", brand: "Keurig Dr Pepper", flavor: "Orange-Pineapple", color: "Orange", caffeine: false, year: 1984 },
  { name: "Surge", brand: "Coca-Cola Company", flavor: "Citrus", color: "Yellow-Green", caffeine: true, year: 1996 },
  { name: "Mug Root Beer", brand: "PepsiCo", flavor: "Root Beer", color: "Brown", caffeine: false, year: 1940 },
  { name: "Diet Coke", brand: "Coca-Cola Company", flavor: "Cola", color: "Brown", caffeine: true, year: 1982 },
  { name: "Diet Pepsi", brand: "PepsiCo", flavor: "Cola", color: "Brown", caffeine: true, year: 1964 },
  { name: "Coke Zero", brand: "Coca-Cola Company", flavor: "Cola", color: "Brown", caffeine: true, year: 2005 },
  { name: "Pepsi Zero", brand: "PepsiCo", flavor: "Cola", color: "Brown", caffeine: true, year: 2016 },
  { name: "Fanta Apple", brand: "Coca-Cola Company", flavor: "Apple", color: "Clear", caffeine: false, year: 1955 },
  { name: "Fanta Peach", brand: "Coca-Cola Company", flavor: "Peach", color: "Orange", caffeine: false, year: 1955 },
  { name: "Fanta Pineapple", brand: "Coca-Cola Company", flavor: "Pineapple", color: "Yellow", caffeine: false, year: 1955 },
  { name: "Fanta Exotic", brand: "Coca-Cola Company", flavor: "Tropical", color: "Orange", caffeine: false, year: 2005 },
  { name: "Pibb Xtra", brand: "Coca-Cola Company", flavor: "Cherry-Cola", color: "Brown", caffeine: true, year: 1972 },
  { name: "Cherry 7-Up", brand: "Keurig Dr Pepper", flavor: "Cherry-Lemon-Lime", color: "Red", caffeine: false, year: 1987 },
  { name: "Diet 7-Up", brand: "Keurig Dr Pepper", flavor: "Lemon-Lime", color: "Clear", caffeine: false, year: 1979 },
  { name: "Diet Sprite", brand: "Coca-Cola Company", flavor: "Lemon-Lime", color: "Clear", caffeine: false, year: 1974 },
  { name: "Fanta Zero", brand: "Coca-Cola Company", flavor: "Orange", color: "Orange", caffeine: false, year: 2017 },
  { name: "Mountain Dew Code Red", brand: "PepsiCo", flavor: "Cherry-Citrus", color: "Red", caffeine: true, year: 2001 },
  { name: "Mountain Dew Voltage", brand: "PepsiCo", flavor: "Raspberry-Citrus", color: "Blue", caffeine: true, year: 2007 },
  { name: "Mountain Dew Baja Blast", brand: "PepsiCo", flavor: "Tropical-Lime", color: "Blue-Green", caffeine: true, year: 2004 },
  { name: "Mountain Dew LiveWire", brand: "PepsiCo", flavor: "Orange-Citrus", color: "Orange", caffeine: true, year: 2003 },
  { name: "Dr Pepper Cherry", brand: "Keurig Dr Pepper", flavor: "Cherry-Cola", color: "Brown", caffeine: true, year: 2009 },
  { name: "Dr Pepper Vanilla", brand: "Keurig Dr Pepper", flavor: "Vanilla-Cola", color: "Brown", caffeine: true, year: 2004 },
  { name: "Coca-Cola Cherry", brand: "Coca-Cola Company", flavor: "Cherry-Cola", color: "Brown", caffeine: true, year: 1985 },
  { name: "Coca-Cola Vanilla", brand: "Coca-Cola Company", flavor: "Vanilla-Cola", color: "Brown", caffeine: true, year: 2002 },
  { name: "Pepsi Wild Cherry", brand: "PepsiCo", flavor: "Cherry-Cola", color: "Brown", caffeine: true, year: 1988 },
  { name: "Pepsi Vanilla", brand: "PepsiCo", flavor: "Vanilla-Cola", color: "Brown", caffeine: true, year: 2003 },
  { name: "Sierra Mist", brand: "PepsiCo", flavor: "Lemon-Lime", color: "Clear", caffeine: false, year: 1999 },
  { name: "Starry", brand: "PepsiCo", flavor: "Lemon-Lime", color: "Clear", caffeine: false, year: 2023 },
  { name: "Limeade", brand: "Various", flavor: "Lime", color: "Green", caffeine: false, year: 1950 },
  { name: "Grapefruit Soda", brand: "Various", flavor: "Grapefruit", color: "Pink", caffeine: false, year: 1930 },
  { name: "Tangerine Soda", brand: "Various", flavor: "Tangerine", color: "Orange", caffeine: false, year: 1960 },
  { name: "Passion Fruit", brand: "Various", flavor: "Passion Fruit", color: "Yellow", caffeine: false, year: 1970 },
  { name: "Lychee Soda", brand: "Various", flavor: "Lychee", color: "Clear", caffeine: false, year: 1990 },
  { name: "Ramune", brand: "Various", flavor: "Various", color: "Various", caffeine: false, year: 1884 },
  { name: "Bundaberg", brand: "Bundaberg", flavor: "Ginger Beer", color: "Brown", caffeine: false, year: 1960 },
  { name: "Irn-Bru", brand: "AG Barr", flavor: "Unique", color: "Orange", caffeine: true, year: 1901 },
  { name: "Dandelion & Burdock", brand: "Various", flavor: "Herbal", color: "Brown", caffeine: false, year: 1265 },
  { name: "Creaming Soda", brand: "Various", flavor: "Vanilla", color: "Pink", caffeine: false, year: 1950 },
];

/**
 * Normalize a soda name for comparison (lowercase, trim, remove special chars)
 */
export function normalizeSodaName(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
}

/**
 * Find a soda by name (case-insensitive, flexible matching)
 */
export function findSodaByName(name) {
  const normalized = normalizeSodaName(name);
  return SODAS.find(soda => normalizeSodaName(soda.name) === normalized);
}

/**
 * Get the daily soda based on the current date
 */
export function getDailySoda() {
  const seed = getDailySeed();
  const index = seed % SODAS.length;
  return SODAS[index];
}

/**
 * Get all unique values for an attribute
 */
export function getUniqueAttributeValues(attribute) {
  const values = new Set();
  SODAS.forEach(soda => {
    if (soda[attribute] !== undefined) {
      if (Array.isArray(soda[attribute])) {
        soda[attribute].forEach(val => values.add(val));
      } else {
        values.add(soda[attribute]);
      }
    }
  });
  return Array.from(values).sort();
}

