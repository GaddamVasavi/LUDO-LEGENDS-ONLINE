import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GameBoard } from '../components/game/GameBoard';
import { DicePanel } from '../components/game/DicePanel';
import { useGameStore } from '../store/gameStore';
import { socketService } from '../services/socketService';
import { SOCKET_EVENTS } from '@ludo/shared';

export const GamePage: React.FC = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const { gameState, myColor, initSocketListeners, rollDice, moveToken } = useGameStore();

  useEffect(() => {
    initSocketListeners();
    const socket = socketService.connect();

    const targetRoom = roomCode || 'ROOM_LEGEND_1';
    socket.emit(SOCKET_EVENTS.JOIN_GAME, { roomCode: targetRoom }, (res: any) => {
      // Game joined callback
    });
  }, [roomCode]);

  const isMyTurn = gameState ? gameState.currentTurnColor === myColor : false;
  const canRoll = gameState ? !gameState.dice.isRolled : false;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col items-center">
      {/* Top Info Bar */}
      <header className="w-full max-w-6xl flex justify-between items-center py-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎲</span>
          <h2 className="text-xl font-bold font-heading">
            MATCH ROOM: <span className="text-indigo-400">{roomCode || 'ROOM_LEGEND_1'}</span>
          </h2>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-sm font-semibold text-slate-300">
            CURRENT TURN: <span className="text-yellow-400 font-bold">{gameState?.currentTurnColor || 'RED'}</span>
          </span>
        </div>
      </header>

      {/* Main Game Interface */}
      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Left Player Cards */}
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/80 rounded-xl border border-red-500/30 flex items-center justify-between">
            <span className="font-bold text-red-400">RED PLAYER</span>
            <span className="text-xs bg-red-950 text-red-300 px-2 py-1 rounded">HOST</span>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-emerald-500/30 flex items-center justify-between">
            <span className="font-bold text-emerald-400">GREEN PLAYER</span>
            <span className="text-xs bg-emerald-950 text-emerald-300 px-2 py-1 rounded">BOT</span>
          </div>
        </div>

        {/* Center Canvas Board */}
        <div className="flex justify-center">
          <GameBoard
            gameState={gameState || { currentTurnColor: 'RED', validMoves: [], players: {} } as any}
            onTokenClick={(tokenId) => moveToken(tokenId)}
            myColor={myColor || 'RED'}
          />
        </div>

        {/* Right Controls & Dice */}
        <div className="space-y-6">
          <DicePanel
            diceValue={gameState?.dice?.currentValue || 1}
            isMyTurn={isMyTurn}
            canRoll={canRoll}
            onRoll={rollDice}
          />
        </div>
      </main>
    </div>
  );
};
