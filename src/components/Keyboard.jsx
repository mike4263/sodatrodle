function Keyboard({ onKeyPress, guesses }) {
  const topRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const middleRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const bottomRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  const getKeyStatus = (letter) => {
    // This is a simplified version - in a full implementation,
    // you'd track which letters have been used and their status
    return 'unused';
  };

  return (
    <div className="keyboard" role="group" aria-label="Virtual keyboard">
      <div className="keyboard-row" role="row">
        {topRow.map(key => (
          <button
            key={key}
            className={`key ${getKeyStatus(key)}`}
            onClick={() => onKeyPress(key.toLowerCase())}
            aria-label={`Press ${key}`}
            type="button"
          >
            {key}
          </button>
        ))}
      </div>
      <div className="keyboard-row" role="row">
        {middleRow.map(key => (
          <button
            key={key}
            className={`key ${getKeyStatus(key)}`}
            onClick={() => onKeyPress(key.toLowerCase())}
            aria-label={`Press ${key}`}
            type="button"
          >
            {key}
          </button>
        ))}
      </div>
      <div className="keyboard-row" role="row">
        <button
          className="key special enter"
          onClick={() => onKeyPress('Enter')}
          aria-label="Submit guess"
          type="button"
        >
          Enter
        </button>
        {bottomRow.map(key => (
          <button
            key={key}
            className={`key ${getKeyStatus(key)}`}
            onClick={() => onKeyPress(key.toLowerCase())}
            aria-label={`Press ${key}`}
            type="button"
          >
            {key}
          </button>
        ))}
        <button
          className="key special backspace"
          onClick={() => onKeyPress('Backspace')}
          aria-label="Delete character"
          type="button"
        >
          ⌫
        </button>
      </div>
    </div>
  );
}

export default Keyboard;

