import React from 'react';

export const LeaderboardPage: React.FC = () => {
  const dummyRankings = [
    { rank: 1, name: 'GrandMaster_V', rating: 2450, wins: 142, tier: 'LEGEND' },
    { rank: 2, name: 'DiceKing_99', rating: 2310, wins: 118, tier: 'LEGEND' },
    { rank: 3, name: 'ShadowPawn', rating: 2180, wins: 95, tier: 'DIAMOND' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 max-w-5xl mx-auto">
      <header className="py-6 border-b border-slate-800 mb-8">
        <h1 className="text-3xl font-bold font-heading text-yellow-400">GLOBAL LEADERBOARD</h1>
        <p className="text-slate-400 text-sm">Top ranked players of Season 1</p>
      </header>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-950 text-slate-400 text-xs uppercase border-b border-slate-800">
            <tr>
              <th className="p-4">Rank</th>
              <th className="p-4">Player</th>
              <th className="p-4">ELO Rating</th>
              <th className="p-4">Wins</th>
              <th className="p-4">Tier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-sm">
            {dummyRankings.map((r) => (
              <tr key={r.rank} className="hover:bg-slate-800/50">
                <td className="p-4 font-bold text-yellow-400">#{r.rank}</td>
                <td className="p-4 font-semibold">{r.name}</td>
                <td className="p-4 text-indigo-400 font-bold">{r.rating}</td>
                <td className="p-4">{r.wins}</td>
                <td className="p-4 text-xs font-bold text-emerald-400">{r.tier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
