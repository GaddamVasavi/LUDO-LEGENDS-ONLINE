import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { useAuthStore } from '../store/authStore';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6">
      {/* Header */}
      <header className="flex justify-between items-center max-w-7xl mx-auto w-full py-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎲</span>
          <h1 className="text-2xl font-bold font-heading bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            LUDO LEGENDS
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-300">Welcome, {user?.username}</span>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto w-full py-12 flex flex-col items-center text-center gap-8">
        <div className="space-y-4">
          <h2 className="text-5xl md:text-6xl font-extrabold font-heading tracking-tight leading-tight">
            BECOME THE ULTIMATE <br />
            <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              LUDO CHAMPION
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Experience real-time 4-player online matches, 60fps custom canvas gameplay, ELO tournaments, and rich cosmetic customization.
          </p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-6">
          <Card onClick={() => navigate('/game/quick')} className="flex flex-col items-center p-8 gap-4 text-center">
            <span className="text-5xl">⚡</span>
            <h3 className="text-xl font-bold font-heading">Quick Match</h3>
            <p className="text-slate-400 text-sm">Instant 1v1 or 4-player match with players of your skill level.</p>
            <Button variant="primary" className="w-full mt-2">Play Now</Button>
          </Card>

          <Card onClick={() => navigate('/lobby')} className="flex flex-col items-center p-8 gap-4 text-center">
            <span className="text-5xl">🏠</span>
            <h3 className="text-xl font-bold font-heading">Lobby Rooms</h3>
            <p className="text-slate-400 text-sm">Create or join custom rooms with custom rules and passwords.</p>
            <Button variant="secondary" className="w-full mt-2">Browse Rooms</Button>
          </Card>

          <Card onClick={() => navigate('/leaderboard')} className="flex flex-col items-center p-8 gap-4 text-center">
            <span className="text-5xl">🏆</span>
            <h3 className="text-xl font-bold font-heading">Leaderboard</h3>
            <p className="text-slate-400 text-sm">Check global rankings, seasonal tiers, and player statistics.</p>
            <Button variant="outline" className="w-full mt-2">Rankings</Button>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-slate-500 text-sm py-4 border-t border-slate-900">
        © 2026 LUDO LEGENDS ONLINE. All rights reserved.
      </footer>
    </div>
  );
};
