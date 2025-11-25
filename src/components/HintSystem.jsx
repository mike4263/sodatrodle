function HintSystem({ hints }) {
  if (!hints || hints.length === 0) {
  return (
    <div className="hint-system" role="region" aria-label="Hints">
      <h3>Hints</h3>
      <p className="hint-placeholder" aria-live="polite">Make a guess to unlock hints!</p>
    </div>
  );
  }

  return (
    <div className="hint-system" role="region" aria-label="Hints">
      <h3>Hints Unlocked</h3>
      <div className="hints-list" role="list">
        {hints.map((hint, index) => (
          <div key={index} className="hint-item" role="listitem" aria-live="polite">
            {hint}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HintSystem;

