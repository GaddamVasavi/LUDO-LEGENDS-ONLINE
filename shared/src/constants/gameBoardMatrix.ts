import { Position2D } from '../types/game.js';

/**
 * Full 52-cell track vector matrix lookup table.
 * Provides explicit position details and step offsets for every single step on the board.
 */
export const FULL_TRACK_VECTOR_MATRIX: Record<number, { grid: Position2D; colorStartOffset: Record<string, number>; isSafeSquare: boolean; starIcon: boolean }> = (() => {
  const map: Record<number, { grid: Position2D; colorStartOffset: Record<string, number>; isSafeSquare: boolean; starIcon: boolean }> = {};

  const safePositions = [1, 9, 14, 22, 27, 35, 40, 48];

  const gridMap: Record<number, Position2D> = {
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
    51: { x: 0, y: 7 }, 52: { x: 0, y: 6 },
  };

  for (let i = 1; i <= 52; i++) {
    map[i] = {
      grid: gridMap[i] || { x: 0, y: 0 },
      colorStartOffset: {
        RED: (i - 1) % 52,
        GREEN: (i - 1 + 13) % 52,
        YELLOW: (i - 1 + 26) % 52,
        BLUE: (i - 1 + 39) % 52,
      },
      isSafeSquare: safePositions.includes(i),
      starIcon: safePositions.includes(i),
    };
  }

  return map;
})();

/**
 * Generates an exhaustive lookup table for cell distances across all 52 track points.
 */
export const CELL_DISTANCE_TABLE: number[][] = Array.from({ length: 100 }, (_, r) =>
  Array.from({ length: 100 }, (_, c) => (r === c ? 0 : Math.abs(r - c)))
);
