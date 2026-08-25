import React from 'react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const GuildsPage: React.FC = () => {
  const dummyGuilds = [
    { id: '1', name: 'Ludo Warriors', tag: 'WAR', level: 12, members: '28/30', trophies: 15400 },
    { id: '2', name: 'Crown Strikers', tag: 'STRK', level: 9, members: '24/30', trophies: 12100 },
    { id: '3', name: 'Dice Dragons', tag: 'DRG', level: 15, members: '30/30', trophies: 21900 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 max-w-5xl mx-auto">
      <header className="flex justify-between items-center py-6 border-b border-slate-800 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-purple-400">GUILDS & CLANS</h1>
          <p className="text-slate-400 text-sm">Join a clan, participate in Guild Wars, and earn clan coin boosts</p>
        </div>

        <Button variant="primary">+ Create Guild</Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dummyGuilds.map((g) => (
          <Card key={g.id} className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold bg-purple-950 text-purple-300 px-3 py-1 rounded-full">[{g.tag}]</span>
              <span className="text-xs text-slate-400">LVL {g.level}</span>
            </div>

            <h3 className="text-xl font-bold font-heading">{g.name}</h3>

            <div className="text-xs text-slate-400 space-y-1">
              <div>MEMBERS: <span className="text-slate-200 font-semibold">{g.members}</span></div>
              <div>TROPHIES: <span className="text-yellow-400 font-semibold">{g.trophies}</span></div>
            </div>

            <Button variant="secondary" className="w-full">
              Request to Join
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
