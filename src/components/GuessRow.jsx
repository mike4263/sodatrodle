function GuessRow({ guess, isRevealed }) {
  if (!guess) {
    return (
      <div className="guess-row empty">
        <div className="guess-cell"></div>
        <div className="guess-attributes">
          <div className="attribute-cell"></div>
          <div className="attribute-cell"></div>
          <div className="attribute-cell"></div>
          <div className="attribute-cell"></div>
          <div className="attribute-cell"></div>
        </div>
      </div>
    );
  }

  const { soda, feedback } = guess;
  const name = soda?.name || '';
  const attributes = [
    { label: 'Brand', value: soda?.brand, status: feedback?.brand },
    { label: 'Flavor', value: soda?.flavor, status: feedback?.flavor },
    { label: 'Color', value: soda?.color, status: feedback?.color },
    { label: 'Caffeine', value: soda?.caffeine ? 'Yes' : 'No', status: feedback?.caffeine },
    { label: 'Sugar', value: soda?.sugarType || '—', status: feedback?.sugarType },
  ];

  const nameStatus = feedback?.name || 'pending';

  return (
    <div 
      className={`guess-row ${isRevealed ? 'revealed' : ''}`}
      role="row"
      aria-label={name ? `Guess: ${name}` : 'Empty guess row'}
    >
      <div 
        className={`guess-cell name-cell ${nameStatus}`}
        role="cell"
        aria-label={`Soda name: ${name || 'empty'}, status: ${nameStatus}`}
      >
        {name || ' '}
      </div>
      <div className="guess-attributes" role="group" aria-label="Attribute comparisons">
        {attributes.map((attr, index) => (
          <div 
            key={index}
            className={`attribute-cell ${isRevealed && feedback ? attr.status : 'pending'}`}
            title={`${attr.label}: ${attr.value || 'N/A'}, Status: ${isRevealed && feedback ? attr.status : 'pending'}`}
            role="cell"
            aria-label={`${attr.label}: ${attr.value || 'N/A'}, ${isRevealed && feedback ? `Status: ${attr.status}` : 'Not yet revealed'}`}
          >
            <span className="attribute-label">{attr.label}</span>
            <span className="attribute-value">{attr.value || '—'}</span>
            {isRevealed && feedback && (
              <span className="attribute-status" aria-hidden="true">
                {attr.status === 'correct' && '✓'}
                {attr.status === 'partial' && '~'}
                {attr.status === 'wrong' && '✗'}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GuessRow;

