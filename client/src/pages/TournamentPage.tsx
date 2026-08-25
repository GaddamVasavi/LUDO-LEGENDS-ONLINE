import React from 'react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const TournamentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 max-w-6xl mx-auto">
      <header className="flex justify-between items-center py-6 border-b border-slate-800 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-indigo-400">CHAMPIONSHIP TOURNAMENTS</h1>
          <p className="text-slate-400 text-sm">Compete in bracket knockouts to win trophy badges and massive coin pools</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs bg-emerald-950 text-emerald-300 px-3 py-1 rounded-full font-bold">REGISTRATION OPEN</span>
            <span className="text-xs text-slate-400">STARTS IN 2 HOURS</span>
          </div>

          <h3 className="text-xl font-bold font-heading">GRAND LUDO MASTERS #42</h3>
          <p className="text-slate-400 text-sm">16-Player Single Elimination Knockout. Winner takes 50,000 Coins + Legend Badge!</p>

          <div className="flex justify-between items-center text-sm pt-4 border-t border-slate-800">
            <span className="text-yellow-400 font-bold">ENTRY FEE: 500 COINS</span>
            <Button variant="primary">Register Now</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
