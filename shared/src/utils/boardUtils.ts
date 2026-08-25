import { PlayerColor, Position2D } from '../types/game.js';
import {
  BOARD_SIZE,
  COLOR_OFFSETS,
  HOME_ENTRY_POSITIONS_MAIN_TRACK,
  HOME_PATH_LENGTH,
  MAIN_TRACK_LENGTH,
  SAFE_POSITIONS_MAIN_TRACK,
  START_POSITIONS_MAIN_TRACK,
  TOTAL_STEPS_TO_HOME,
} from '../constants/gameConstants.js';

/**
 * Maps step count (0 to 57) for a given player color to main track position or home path index.
 */
export function calculateTokenLocation(
  color: PlayerColor,
  stepCount: number
): { status: 'BASE' | 'ACTIVE' | 'HOME_PATH' | 'HOME'; position: number } {
  if (stepCount <= 0) {
    return { status: 'BASE', position: 0 };
  }

  if (stepCount >= TOTAL_STEPS_TO_HOME) {
    return { status: 'HOME', position: HOME_PATH_LENGTH - 1 };
  }

  // Check if token has moved past main track entry point into Home Corridor
  if (stepCount > MAIN_TRACK_LENGTH) {
    const homeIndex = stepCount - MAIN_TRACK_LENGTH - 1;
    return { status: 'HOME_PATH', position: homeIndex };
  }

  // Token is on main 52-square loop track
  const offset = COLOR_OFFSETS[color];
  const rawPos = (offset + (stepCount - 1)) % MAIN_TRACK_LENGTH + 1;

  return { status: 'ACTIVE', position: rawPos };
}

/**
 * Checks if a specific position on main track is a safe square (star).
 */
export function isSafePosition(position: number): boolean {
  return SAFE_POSITIONS_MAIN_TRACK.includes(position);
}

/**
 * Returns grid coordinates (x, y: 0..14) for a token based on color, status, and position index.
 * Useful for Canvas rendering and client layout engine.
 */
export function getGridCoordinates(
  color: PlayerColor,
  status: 'BASE' | 'ACTIVE' | 'HOME_PATH' | 'HOME',
  position: number,
  tokenIndex: number = 0
): Position2D {
  // 15x15 grid layout mapping
  if (status === 'BASE') {
    return getBaseCoordinates(color, tokenIndex);
  }

  if (status === 'HOME') {
    return { x: 7, y: 7 }; // Center triangle
  }

  if (status === 'HOME_PATH') {
    return getHomePathCoordinates(color, position);
  }

  return getMainTrackCoordinates(position);
}

/**
 * Base home positions for each color's 4 tokens inside the starting box.
 */
function getBaseCoordinates(color: PlayerColor, tokenIndex: number): Position2D {
  const offsets: Position2D[] = [
    { x: 1.5, y: 1.5 },
    { x: 3.5, y: 1.5 },
    { x: 1.5, y: 3.5 },
    { x: 3.5, y: 3.5 },
  ];
  const baseOffset = offsets[tokenIndex % 4];

  switch (color) {
    case 'RED':
      return { x: baseOffset.x, y: baseOffset.y };
    case 'GREEN':
      return { x: 9 + baseOffset.x, y: baseOffset.y };
    case 'YELLOW':
      return { x: 9 + baseOffset.x, y: 9 + baseOffset.y };
    case 'BLUE':
      return { x: baseOffset.x, y: 9 + baseOffset.y };
  }
}

/**
 * Home corridor coordinates leading into center.
 */
function getHomePathCoordinates(color: PlayerColor, index: number): Position2D {
  switch (color) {
    case 'RED':
      return { x: 1 + index, y: 7 };
    case 'GREEN':
      return { x: 7, y: 1 + index };
    case 'YELLOW':
      return { x: 13 - index, y: 7 };
    case 'BLUE':
      return { x: 7, y: 13 - index };
  }
}

/**
 * Maps main track 1..52 positions to 15x15 grid coordinates.
 */
function getMainTrackCoordinates(pos: number): Position2D {
  // 52-step clockwise path lookup table on 15x15 board
  const trackMap: Record<number, Position2D> = {
    1: { x: 1, y: 6 }, 2: { x: 2, y: 6 }, 3: { x: 3, y: 6 }, 4: { x: 4, y: 6 }, 5: { x: 5, y: 6 },
    6: { x: 6, y: 5 }, 7: { x: 6, y: 4 }, 8: { x: 6, y: 3 }, 9: { x: 6, y: 2 }, 10: { x: 6, y: 1 }, 11: { x: 6, y: 0 },
    12: { x: 7, y: 0 },
    13: { x: 8, y: 0 }, 14: { x: 8, y: 1 }, 15: { x: 8, y: 2 }, 16: { x: 8, y: 3 }, 17: { x: 8, y: 4 }, 18: { x: 8, y: 5 },
    19: { x: 9, y: 6 }, 20: { x: 10, y: 6 }, 21: { x: 11, y: 6 }, 22: { x: 12, y: 6 }, 23: { x: 13, y: 6 }, 24: { x: 14, y: 6 },
    25: { x: 14, y: 7 },
    26: { x: 14, y: 8 }, 27: { x: 13, y: 8 }, 28: { x: 12, y: 8 }, 29: { x: 11, y: 8 }, 30: { x: 10, y: 8 }, 31: { x: 9, y: 8 },
    32: { x: 8, y: 9 }, 33: { x: 8, y: 10 }, 34: { x: 8, y: 11 }, 35: { x: 8, y: 12 }, 36: { x: 8, y: 13 }, 37: { x: 8, y: 14 },
    38: { x: 7, y: 14 },
    39: { x: 6, y: 14 }, 40: { x: 6, y: 13 }, 41: { x: 6, y: 12 }, 42: { x: 6, y: 11 }, 43: { x: 6, y: 10 }, 44: { x: 6, y: 9 },
    45: { x: 5, y: 8 }, 46: { x: 4, y: 8 }, 47: { x: 3, y: 8 }, 48: { x: 2, y: 8 }, 49: { x: 1, y: 8 }, 50: { x: 0, y: 8 },
    51: { x: 0, y: 7 },
    52: { x: 0, y: 6 }
  };

  return trackMap[pos] || { x: 0, y: 0 };
}
