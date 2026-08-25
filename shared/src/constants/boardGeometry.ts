import { PlayerColor, Position2D } from '../types/game.js';

/**
 * Complete 15x15 Grid cell mapping table for standard Ludo board layout.
 * Grid coordinates: Column X (0..14), Row Y (0..14).
 */
export const GRID_CELL_MAP: Record<number, Position2D> = {
  // Main Track Loop (1..52)
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
  52: { x: 0, y: 6 },
};

export const COLOR_HOME_PATHS: Record<PlayerColor, Position2D[]> = {
  RED: [
    { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }
  ],
  GREEN: [
    { x: 7, y: 1 }, { x: 7, y: 2 }, { x: 7, y: 3 }, { x: 7, y: 4 }, { x: 7, y: 5 }, { x: 7, y: 6 }
  ],
  YELLOW: [
    { x: 13, y: 7 }, { x: 12, y: 7 }, { x: 11, y: 7 }, { x: 10, y: 7 }, { x: 9, y: 7 }, { x: 8, y: 7 }
  ],
  BLUE: [
    { x: 7, y: 13 }, { x: 7, y: 12 }, { x: 7, y: 11 }, { x: 7, y: 10 }, { x: 7, y: 9 }, { x: 7, y: 8 }
  ]
};

export const BASE_HOME_BOX_CENTERS: Record<PlayerColor, Position2D[]> = {
  RED: [
    { x: 1.5, y: 1.5 }, { x: 3.5, y: 1.5 }, { x: 1.5, y: 3.5 }, { x: 3.5, y: 3.5 }
  ],
  GREEN: [
    { x: 10.5, y: 1.5 }, { x: 12.5, y: 1.5 }, { x: 10.5, y: 3.5 }, { x: 12.5, y: 3.5 }
  ],
  YELLOW: [
    { x: 10.5, y: 10.5 }, { x: 12.5, y: 10.5 }, { x: 10.5, y: 12.5 }, { x: 12.5, y: 12.5 }
  ],
  BLUE: [
    { x: 1.5, y: 10.5 }, { x: 3.5, y: 10.5 }, { x: 1.5, y: 12.5 }, { x: 3.5, y: 12.5 }
  ]
};
