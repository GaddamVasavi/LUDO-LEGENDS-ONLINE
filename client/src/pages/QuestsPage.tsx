import React from 'react';
import { EXTENDED_QUESTS_CATALOG } from '@ludo/shared';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const QuestsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 max-w-5xl mx-auto">
      <header className="py-6 border-b border-slate-800 mb-8">
        <h1 className="text-3xl font-bold font-heading text-emerald-400">DAILY & WEEKLY QUESTS</h1>
        <p className="text-slate-400 text-sm">Complete challenges to level up your Battle Pass and claim free rewards</p>
      </header>

      <div className="space-y-4">
        {EXTENDED_QUESTS_CATALOG.slice(0, 10).map((q) => (
          <Card key={q.id} className="flex justify-between items-center p-5">
            <div className="flex items-center gap-4">
              <span className="text-3xl">{q.icon}</span>
              <div>
                <h3 className="font-bold font-heading text-base">{q.title}</h3>
                <p className="text-slate-400 text-xs mt-1">{q.description}</p>
                <div className="w-48 bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full w-1/2" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-yellow-400 font-bold text-xs">+{q.reward.coins} COINS</span>
              <Button variant="primary" size="sm">
                Claim Reward
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
