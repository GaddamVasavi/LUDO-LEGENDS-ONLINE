import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const LobbyPage: React.FC = () => {
  const navigate = useNavigate();

  const dummyRooms = [
    { code: 'LUDO_9988', name: 'Legends Arena #1', mode: 'CLASSIC', players: '2/4', isPrivate: false },
    { code: 'SPEED_101', name: 'Quick Blitz Mode', mode: 'QUICK', players: '3/4', isPrivate: false },
    { code: 'ROYAL_CHALLENGE', name: 'High Stakes 1v1', mode: 'CLASSIC', players: '1/2', isPrivate: true },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 max-w-6xl mx-auto">
      <header className="flex justify-between items-center py-6 border-b border-slate-800 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading">ROOM LOBBY</h1>
          <p className="text-slate-400 text-sm">Join public rooms or create your own custom room</p>
        </div>
        <Button variant="primary" onClick={() => navigate('/game/ROOM_NEW')}>
          + Create Room
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyRooms.map((room) => (
          <Card key={room.code} className="flex justify-between items-center p-6">
            <div>
              <h3 className="text-lg font-bold font-heading">{room.name}</h3>
              <div className="flex gap-3 text-xs text-slate-400 mt-2">
                <span className="bg-slate-800 px-2 py-1 rounded">{room.mode}</span>
                <span className="bg-slate-800 px-2 py-1 rounded">PLAYERS: {room.players}</span>
              </div>
            </div>
            <Button variant="secondary" size="sm" onClick={() => navigate(`/game/${room.code}`)}>
              Join Room
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
