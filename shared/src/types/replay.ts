import { MoveLog, PlayerColor } from './game.js';

export interface ReplayKeyframe {
  tickNumber: number;
  timestamp: number;
  moveLog: MoveLog;
  boardStateSnapshot: {
    currentTurnColor: PlayerColor;
    diceValue: number;
    tokenPositions: Record<string, { status: string; position: number; stepCount: number }>;
    scores: Record<PlayerColor, number>;
  };
}

export interface FullGameReplayData {
  gameId: string;
  roomCode: string;
  mode: string;
  startedAt: number;
  endedAt: number;
  durationSeconds: number;
  players: Array<{
    userId: string;
    username: string;
    avatarUrl: string;
    color: PlayerColor;
    rank: number;
    eloChange: number;
  }>;
  winnerColor: PlayerColor;
  totalTurns: number;
  totalCaptures: number;
  keyframes: ReplayKeyframe[];
}
