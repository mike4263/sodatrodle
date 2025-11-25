import { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard.jsx';
import StatsModal from './components/StatsModal.jsx';
import ShareModal from './components/ShareModal.jsx';
import { Analytics } from "@vercel/analytics/react";
import { getTodayString } from './utils/dateUtils.js';
import { getStats } from './utils/storage.js';

function App() {
  const [showStats, setShowStats] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [shareData, setShareData] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats(getStats());
  }, []);

  const handleShowStats = () => {
    setStats(getStats());
    setShowStats(true);
  };

  const handleShowShare = (data) => {
    setShareData(data);
    setShowShare(true);
  };

  const handleStatsUpdate = () => {
    setStats(getStats());
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sodatrodle</h1>
        <div className="header-buttons">
          <button 
            className="icon-button" 
            onClick={handleShowStats}
            aria-label="Statistics"
            title="Statistics"
          >
            📊
          </button>
        </div>
      </header>
      
      <main className="app-main">
        <GameBoard 
          onShowShare={handleShowShare}
          onStatsUpdate={handleStatsUpdate}
        />
      </main>

      {showStats && (
        <StatsModal 
          stats={stats}
          onClose={() => setShowStats(false)}
        />
      )}

      {showShare && (
        <ShareModal 
          shareData={shareData}
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  );
}

export default App;

