function StatsModal({ stats, onClose }) {
  if (!stats) return null;

  const winPercentage = stats.gamesPlayed > 0 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
    : 0;

  const maxGuesses = Math.max(...stats.guessDistribution, 1);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Statistics</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{stats.gamesPlayed}</div>
            <div className="stat-label">Games Played</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-value">{winPercentage}%</div>
            <div className="stat-label">Win %</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-value">{stats.currentStreak}</div>
            <div className="stat-label">Current Streak</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-value">{stats.bestStreak}</div>
            <div className="stat-label">Best Streak</div>
          </div>
        </div>

        <div className="guess-distribution">
          <h3>Guess Distribution</h3>
          {stats.guessDistribution.map((count, index) => (
            <div key={index} className="distribution-row">
              <span className="distribution-label">{index + 1}</span>
              <div className="distribution-bar-container">
                <div 
                  className="distribution-bar"
                  style={{ 
                    width: `${(count / maxGuesses) * 100}%`,
                    backgroundColor: count > 0 ? '#6aaa64' : '#d3d6da'
                  }}
                >
                  {count > 0 && <span className="distribution-count">{count}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatsModal;

