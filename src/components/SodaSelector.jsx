import { useState, useEffect, useRef, useCallback } from 'react';
import { searchSodas } from '../utils/fuzzySearch.js';

function SodaSelector({ value, onChange, onSelect, placeholder, disabled, guesses }) {
  const [searchTerm, setSearchTerm] = useState(value || '');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const resultsRef = useRef([]);

  // Get already guessed soda names
  const guessedNames = guesses ? guesses.map(g => g.soda.name) : [];

  // Search for matching sodas
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const matches = searchSodas(searchTerm, 10);
      // Filter out already guessed sodas
      const filtered = matches.filter(soda => !guessedNames.includes(soda.name));
      setResults(filtered);
      resultsRef.current = filtered;
      setIsOpen(filtered.length > 0);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }, [searchTerm, guessedNames]);

  // Update search term when value prop changes
  useEffect(() => {
    if (value !== searchTerm) {
      setSearchTerm(value || '');
    }
  }, [value]);

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    onChange?.(newValue);
  };

  // Handle selection
  const handleSelect = useCallback((soda) => {
    setSearchTerm(soda.name);
    setIsOpen(false);
    setSelectedIndex(-1);
    onChange?.(soda.name);
    onSelect?.(soda.name);
    inputRef.current?.focus();
  }, [onChange, onSelect]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (isOpen && results.length > 0) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          e.stopPropagation();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          );
          return;
        case 'ArrowUp':
          e.preventDefault();
          e.stopPropagation();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          return;
        case 'Enter':
          e.preventDefault();
          e.stopPropagation();
          if (selectedIndex >= 0 && selectedIndex < results.length) {
            handleSelect(results[selectedIndex]);
          } else if (results.length > 0) {
            // Select first result if nothing is selected
            handleSelect(results[0]);
          }
          return;
        case 'Escape':
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(false);
          setSelectedIndex(-1);
          return;
      }
    }
    
    // Allow Enter key to pass through if dropdown is closed
    // This will allow the parent component to handle submission
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Highlight matching text in results
  const highlightMatch = (text, search) => {
    if (!search || !text) return text;
    const searchLower = search.toLowerCase();
    const textLower = text.toLowerCase();
    
    // Find matching characters (fuzzy match)
    const matchedIndices = new Set();
    let searchIdx = 0;
    for (let i = 0; i < text.length && searchIdx < search.length; i++) {
      if (textLower[i] === searchLower[searchIdx]) {
        matchedIndices.add(i);
        searchIdx++;
      }
    }
    
    // Build highlighted text
    const parts = [];
    let currentPart = '';
    let isHighlighted = false;
    
    for (let i = 0; i < text.length; i++) {
      const shouldHighlight = matchedIndices.has(i);
      
      if (shouldHighlight !== isHighlighted && currentPart) {
        parts.push(
          isHighlighted ? (
            <mark key={parts.length}>{currentPart}</mark>
          ) : (
            <span key={parts.length}>{currentPart}</span>
          )
        );
        currentPart = '';
      }
      
      currentPart += text[i];
      isHighlighted = shouldHighlight;
    }
    
    if (currentPart) {
      parts.push(
        isHighlighted ? (
          <mark key={parts.length}>{currentPart}</mark>
        ) : (
          <span key={parts.length}>{currentPart}</span>
        )
      );
    }
    
    return parts.length > 0 ? parts : text;
  };

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && dropdownRef.current) {
      const selectedElement = dropdownRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div className="soda-selector">
      <input
        ref={inputRef}
        type="text"
        className="guess-input"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          handleKeyDown(e);
          // If Enter is pressed and dropdown is closed, let it bubble up for submission
          if (e.key === 'Enter' && (!isOpen || results.length === 0)) {
            // Allow parent to handle Enter key
          }
        }}
        onFocus={() => {
          if (results.length > 0) {
            setIsOpen(true);
          }
        }}
        placeholder={placeholder || "Enter soda name..."}
        disabled={disabled}
        aria-label="Enter your soda guess"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-autocomplete="list"
      />
      
      {isOpen && results.length > 0 && (
        <div 
          ref={dropdownRef}
          className="soda-selector-dropdown"
          role="listbox"
        >
          {results.map((soda, index) => (
            <div
              key={soda.name}
              className={`soda-selector-option ${
                index === selectedIndex ? 'selected' : ''
              }`}
              onClick={() => handleSelect(soda)}
              onMouseEnter={() => setSelectedIndex(index)}
              role="option"
              aria-selected={index === selectedIndex}
            >
              <span className="soda-option-name">
                {highlightMatch(soda.name, searchTerm)}
              </span>
              <span className="soda-option-brand">{soda.brand}</span>
            </div>
          ))}
        </div>
      )}
      
      {searchTerm && results.length === 0 && searchTerm.trim().length > 0 && (
        <div className="soda-selector-no-results">
          No matching sodas found
        </div>
      )}
    </div>
  );
}

export default SodaSelector;

