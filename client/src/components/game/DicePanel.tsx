import React, { useState } from 'react';
import { Button } from '../common/Button';

export interface DicePanelProps {
  diceValue: number;
  isMyTurn: boolean;
  canRoll: boolean;
  onRoll: () => void;
}

export const DicePanel: React.FC<DicePanelProps> = ({ diceValue, isMyTurn, canRoll, onRoll }) => {
  const [isRolling, setIsRolling] = useState(false);

  const handleRoll = () => {
    if (!canRoll || !isMyTurn) return;
    setIsRolling(true);
    onRoll();
    setTimeout(() => setIsRolling(false), 800);
  };

  const pipsMap: Record<number, string> = {
    1: '⚀',
    2: '⚁',
    3: '⚂',
    4: '⚃',
    5: '⚄',
    6: '⚅',
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl glass-panel">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {isMyTurn ? "Your Turn to Roll!" : "Waiting for Opponent..."}
        </span>
      </div>

      <div
        onClick={handleRoll}
        className={`w-24 h-24 rounded-2xl bg-gradient-to-br from-white to-slate-200 text-slate-950 text-6xl font-bold flex items-center justify-center shadow-2xl cursor-pointer select-none transition-transform duration-200 border-2 border-slate-300 ${
          isRolling ? 'animate-dice-roll' : 'hover:scale-105'
        }`}
      >
        {pipsMap[diceValue] || '🎲'}
      </div>

      <Button
        variant="primary"
        size="lg"
        onClick={handleRoll}
        disabled={!isMyTurn || !canRoll}
        className="w-full"
      >
        {isMyTurn ? 'ROLL DICE' : 'WAITING...'}
      </Button>
    </div>
  );
};
