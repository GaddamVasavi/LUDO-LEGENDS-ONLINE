import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GameBoard } from '../components/game/GameBoard';
import { DicePanel } from '../components/game/DicePanel';
import { useGameStore } from '../store/gameStore';
import { socketService } from '../services/socketService';
import { PlayerColor, SOCKET_EVENTS } from '@ludo/shared';

export const GamePage: React.FC = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const { gameState, myColor, initSocketListeners, rollDice, moveToken } = useGameStore();

  useEffect(() => {
    initSocketListeners();
    const socket = socketService.connect();

    const targetRoom = roomCode || 'quick';
    socket.emit(SOCKET_EVENTS.JOIN_GAME, { roomCode: targetRoom }, (res: any) => {
      if (res && res.success) {
        if (res.color) {
          useGameStore.setState({ myColor: res.color as PlayerColor });
        }
        if (res.state) {
          useGameStore.setState({ gameState: res.state });
        }
      }
    });
  }, [roomCode]);

  const isMyTurn = gameState ? gameState.currentTurnColor === myColor : false;
  const canRoll = gameState ? !gameState.dice.isRolled : false;

  const colorBadgeClass = {
    RED: 'bg-red-950 text-red-400 border-red-500/50',
    GREEN: 'bg-emerald-950 text-emerald-400 border-emerald-500/50',
    YELLOW: 'bg-amber-950 text-amber-400 border-amber-500/50',
    BLUE: 'bg-blue-950 text-blue-400 border-blue-500/50',
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col items-center">
      {/* Top Info Bar */}
      <header className="w-full max-w-6xl flex justify-between items-center py-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎲</span>
          <div>
            <h2 className="text-xl font-bold font-heading">
              MATCH ROOM: <span className="text-indigo-400 font-mono">{roomCode || 'quick'}</span>
            </h2>
            <p className="text-xs text-slate-400">
              STATUS: <span className="font-semibold text-emerald-400">{gameState?.status || 'WAITING'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className={`px-4 py-2 rounded-xl border text-sm font-bold ${colorBadgeClass[myColor || 'RED']}`}>
            YOU ARE: {myColor || 'CONNECTING...'}
          </div>

          <div className="text-sm font-semibold text-slate-300">
            CURRENT TURN: <span className="text-yellow-400 font-bold">{gameState?.currentTurnColor || 'RED'}</span>
          </div>
        </div>
      </header>

      {/* Main Game Interface */}
      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Left Player Cards */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Connected Players</h3>
          
          {(['RED', 'GREEN', 'YELLOW', 'BLUE'] as PlayerColor[]).map((col) => {
            const player = gameState?.players ? (gameState.players as any)[col] : null;
            const isMe = col === myColor;
            return (
              <div
                key={col}
                className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                  player ? 'bg-slate-900/90 border-slate-700' : 'bg-slate-950/40 border-slate-800 opacity-50'
                } ${gameState?.currentTurnColor === col ? 'ring-2 ring-yellow-400' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    col === 'RED' ? 'bg-red-500' : col === 'GREEN' ? 'bg-emerald-500' : col === 'YELLOW' ? 'bg-amber-400' : 'bg-blue-500'
                  }`} />
                  <div>
                    <div className="font-bold text-sm">
                      {player ? player.name : `Waiting for ${col}...`}
                    </div>
                    {isMe && <span className="text-[10px] bg-indigo-900 text-indigo-200 px-1.5 py-0.5 rounded font-mono">YOU</span>}
                  </div>
                </div>

                <span className="text-xs text-slate-400 font-mono">
                  {player ? (player.isBot ? 'BOT' : 'PLAYER') : 'EMPTY'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Center Canvas Board */}
        <div className="flex flex-col items-center">
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
