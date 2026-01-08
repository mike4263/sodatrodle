import { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard.jsx';
import StatsModal from './components/StatsModal.jsx';
import ShareModal from './components/ShareModal.jsx';
import { Analytics } from "@vercel/analytics/react";
import { getTodayString } from './utils/dateUtils.js';
import { getStats, getTheme, saveTheme } from './utils/storage.js';

function App() {
  const [showStats, setShowStats] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [shareData, setShareData] = useState(null);
  const [stats, setStats] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setStats(getStats());
    // Load theme preference
    const savedTheme = getTheme();
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
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

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <img src="/logo.png" alt="Sodatrodle Logo" className="header-logo" />
        </div>
        <div className="header-buttons">
          <button 
            className="icon-button theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
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
      <Analytics />
    </div>
  );
}

export default App;

