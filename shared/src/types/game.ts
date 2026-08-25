export type PlayerColor = 'RED' | 'GREEN' | 'YELLOW' | 'BLUE';

export type GameMode = 'CLASSIC' | 'QUICK' | 'POWERUP' | 'TOURNAMENT' | 'PRACTICE';

export type GameStatus = 'WAITING' | 'STARTING' | 'IN_PROGRESS' | 'FINISHED' | 'ABANDONED';

export type TokenStatus = 'BASE' | 'ACTIVE' | 'SAFE' | 'HOME_PATH' | 'HOME';

export type PowerUpType = 'SHIELD' | 'BOOST' | 'SWAP' | 'FREEZE' | 'DOUBLE_DICE';

export interface Position2D {
  x: number;
  y: number;
}

export interface TokenState {
  id: string; // e.g. "RED_0", "GREEN_2"
  color: PlayerColor;
  index: number; // 0..3
  status: TokenStatus;
  position: number; // 0..51 on main track, or 0..5 on home path
  stepCount: number; // total steps taken from start box (0..57)
  isSafe: boolean;
  hasShield: boolean;
}

export interface PlayerStats {
  tokensHome: number;
  tokensCaptured: number;
  tokensLost: number;
  sixesRolled: number;
  totalMoves: number;
  powerUpsUsed: number;
}

export interface GamePlayer {
  id: string;
  userId: string;
  username: string;
  avatarUrl?: string;
  color: PlayerColor;
  seatIndex: number;
  isHost: boolean;
  isBot: boolean;
  botDifficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  isDisconnected: boolean;
  disconnectedAt?: number;
  rank?: string;
  eloRating: number;
  tokens: TokenState[];
  stats: PlayerStats;
  inventory: {
    boardTheme: string;
    tokenSkin: string;
    diceSkin: string;
  };
}

export interface DiceState {
  currentValue: number;
  isRolled: boolean;
  rolledBy?: PlayerColor;
  rolledAt?: number;
  consecutiveSixes: number;
  canRoll: boolean;
  history: number[];
}

export interface PowerUpItem {
  id: string;
  type: PowerUpType;
  name: string;
  description: string;
  cost: number;
  durationSeconds?: number;
}

export interface ActivePowerUp {
  id: string;
  type: PowerUpType;
  appliedBy: PlayerColor;
  targetPlayer?: PlayerColor;
  targetTokenId?: string;
  expiresAtTurn?: number;
}

export interface MoveLog {
  id: string;
  turnNumber: number;
  playerColor: PlayerColor;
  diceValue: number;
  tokenId: string;
  fromPosition: number;
  toPosition: number;
  fromStatus: TokenStatus;
  toStatus: TokenStatus;
  capturedTokenId?: string;
  earnedExtraTurn: boolean;
  timestamp: number;
}

export interface GameBoardConfig {
  trackLength: number; // 52
  homePathLength: number; // 6
  safePositions: number[]; // e.g., [1, 9, 14, 22, 27, 35, 40, 48]
  startPositions: Record<PlayerColor, number>;
  homeEntryPositions: Record<PlayerColor, number>;
  colorOffset: Record<PlayerColor, number>;
}

export interface GameState {
  id: string;
  roomCode: string;
  mode: GameMode;
  status: GameStatus;
  createdAt: number;
  startedAt?: number;
  endedAt?: number;
  currentTurnColor: PlayerColor;
  turnSequence: PlayerColor[];
  turnIndex: number;
  turnTimeLimit: number; // in seconds
  turnTimerExpiresAt: number;
  dice: DiceState;
  players: Record<PlayerColor, GamePlayer | null>;
  activePowerUps: ActivePowerUp[];
  validMoves: string[]; // tokenIds that can legally move
  winners: PlayerColor[]; // Ranked list of finished players
  moveLogs: MoveLog[];
  isPaused: boolean;
  spectatorCount: number;
}

export interface MoveRequest {
  gameId: string;
  tokenId: string;
  diceValue: number;
}

export interface MoveResult {
  valid: boolean;
  reason?: string;
  gameState?: GameState;
  moveLog?: MoveLog;
  nextTurnColor?: PlayerColor;
  gameEnded?: boolean;
}
