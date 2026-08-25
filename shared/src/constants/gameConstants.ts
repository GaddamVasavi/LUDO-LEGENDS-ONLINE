import { PlayerColor } from '../types/game.js';

export const BOARD_SIZE = 15; // 15x15 Ludo Grid
export const MAIN_TRACK_LENGTH = 52;
export const HOME_PATH_LENGTH = 6; // 5 steps + 1 Home Triangle
export const TOTAL_STEPS_TO_HOME = 57;

export const PLAYER_COLORS: PlayerColor[] = ['RED', 'GREEN', 'YELLOW', 'BLUE'];

export const COLOR_HEX: Record<PlayerColor, string> = {
  RED: '#E74C3C',
  GREEN: '#2ECC71',
  YELLOW: '#F1C40F',
  BLUE: '#3498DB',
};

export const COLOR_SECONDARY_HEX: Record<PlayerColor, string> = {
  RED: '#C0392B',
  GREEN: '#27AE60',
  YELLOW: '#F39C12',
  BLUE: '#2980B9',
};

export const COLOR_LIGHT_HEX: Record<PlayerColor, string> = {
  RED: '#FF6B6B',
  GREEN: '#51CF66',
  YELLOW: '#FCC419',
  BLUE: '#339AF0',
};

// Safe squares on main track (1-indexed based on classic Ludo board)
export const SAFE_POSITIONS_MAIN_TRACK: number[] = [1, 9, 14, 22, 27, 35, 40, 48];

// Starting position index on main 52-cell loop for each player color
export const START_POSITIONS_MAIN_TRACK: Record<PlayerColor, number> = {
  RED: 1,
  GREEN: 14,
  YELLOW: 27,
  BLUE: 40,
};

// Position where player exits main track into their colored home corridor
export const HOME_ENTRY_POSITIONS_MAIN_TRACK: Record<PlayerColor, number> = {
  RED: 51,
  GREEN: 12,
  YELLOW: 25,
  BLUE: 38,
};

// Offset relative to main 52-cell track
export const COLOR_OFFSETS: Record<PlayerColor, number> = {
  RED: 0,
  GREEN: 13,
  YELLOW: 26,
  BLUE: 39,
};

// Default turn timeout in seconds
export const DEFAULT_TURN_TIME_SECONDS = 15;
export const DEFAULT_MAX_CONSECUTIVE_SIXES = 3;
