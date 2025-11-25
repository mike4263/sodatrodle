import { useState } from 'react';

function ShareModal({ shareData, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!shareData) return null;

  const generateShareText = () => {
    const { guesses, answer, won } = shareData;
    const guessCount = guesses.length;
    const maxGuesses = 6;
    
    let text = `Sodatrodle ${new Date().toISOString().split('T')[0]}\n`;
    text += `${won ? guessCount : 'X'}/${maxGuesses}\n\n`;
    
    guesses.forEach((guess, index) => {
      const { feedback } = guess;
      const nameStatus = feedback.name === 'correct' ? '🟩' : feedback.name === 'partial' ? '🟨' : '⬜';
      const brandStatus = feedback.brand === 'correct' ? '🟩' : feedback.brand === 'partial' ? '🟨' : '⬜';
      const flavorStatus = feedback.flavor === 'correct' ? '🟩' : feedback.flavor === 'partial' ? '🟨' : '⬜';
      const colorStatus = feedback.color === 'correct' ? '🟩' : feedback.color === 'partial' ? '🟨' : '⬜';
      const caffeineStatus = feedback.caffeine === 'correct' ? '🟩' : '⬜';
      const sugarStatus = feedback.sugarType === 'correct' ? '🟩' : feedback.sugarType === 'partial' ? '🟨' : '⬜';
      
      text += `Guess ${index + 1}: ${guess.soda.name}\n`;
      text += `  Name: ${nameStatus} Brand: ${brandStatus} Flavor: ${flavorStatus} Color: ${colorStatus} Caffeine: ${caffeineStatus} Sugar: ${sugarStatus}\n`;
    });
    
    if (!won) {
      text += `\nAnswer: ${answer.name}`;
    }
    
    return text;
  };

  const handleCopy = async () => {
    try {
      const text = generateShareText();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareText = generateShareText();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{shareData.won ? '🎉 You Won!' : 'Game Over'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        
        <div className="share-content">
          <div className="share-text-preview">
            <pre>{shareText}</pre>
          </div>
          
          <button 
            className="copy-button"
            onClick={handleCopy}
          >
            {copied ? '✓ Copied!' : 'Copy Results'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;

