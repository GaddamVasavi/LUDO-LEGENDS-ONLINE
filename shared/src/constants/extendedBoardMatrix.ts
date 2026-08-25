import { Position2D } from '../types/game.js';

export interface BoardCellDefinition {
  cellId: number;
  gridX: number;
  gridY: number;
  normX: number;
  normY: number;
  isMainTrack: boolean;
  isSafeSquare: boolean;
  isStarSquare: boolean;
  colorZone: 'NEUTRAL' | 'RED' | 'GREEN' | 'YELLOW' | 'BLUE';
  redStepIndex: number;
  greenStepIndex: number;
  yellowStepIndex: number;
  blueStepIndex: number;
  neighborCells: number[];
}

/**
 * Explicit Cell Definition Table for 15x15 Ludo Grid (225 cells).
 * Fully maps grid coordinates, color zones, step indices, and neighbor cell connections.
 */
export const EXPLICIT_GRID_225_MAP: Record<string, BoardCellDefinition> = (() => {
  const map: Record<string, BoardCellDefinition> = {};
  const safePositions = [1, 9, 14, 22, 27, 35, 40, 48];

  const mainTrackPositions: Record<string, number> = {
    '1,6': 1, '2,6': 2, '3,6': 3, '4,6': 4, '5,6': 5,
    '6,5': 6, '6,4': 7, '6,3': 8, '6,2': 9, '6,1': 10, '6,0': 11,
    '7,0': 12,
    '8,0': 13, '8,1': 14, '8,2': 15, '8,3': 16, '8,4': 17, '8,5': 18,
    '9,6': 19, '10,6': 20, '11,6': 21, '12,6': 22, '13,6': 23, '14,6': 24,
    '14,7': 25,
    '14,8': 26, '13,8': 27, '12,8': 28, '11,8': 29, '10,8': 30, '9,8': 31,
    '8,9': 32, '8,10': 33, '8,11': 34, '8,12': 35, '8,13': 36, '8,14': 37,
    '7,14': 38,
    '6,14': 39, '6,13': 40, '6,12': 41, '6,11': 42, '6,10': 43, '6,9': 44,
    '5,8': 45, '4,8': 46, '3,8': 47, '2,8': 48, '1,8': 49, '0,8': 50,
    '0,7': 51, '0,6': 52,
  };

  for (let x = 0; x < 15; x++) {
    for (let y = 0; y < 15; y++) {
      const key = `${x},${y}`;
      const trackPos = mainTrackPositions[key] || 0;
      const isMain = trackPos > 0;
      const isSafe = isMain && safePositions.includes(trackPos);

      let zone: 'NEUTRAL' | 'RED' | 'GREEN' | 'YELLOW' | 'BLUE' = 'NEUTRAL';
      if (x < 6 && y < 6) zone = 'RED';
      else if (x >= 9 && y < 6) zone = 'GREEN';
      else if (x >= 9 && y >= 9) zone = 'YELLOW';
      else if (x < 6 && y >= 9) zone = 'BLUE';

      map[key] = {
        cellId: x + y * 15,
        gridX: x,
        gridY: y,
        normX: (x + 0.5) / 15,
        normY: (y + 0.5) / 15,
        isMainTrack: isMain,
        isSafeSquare: isSafe,
        isStarSquare: isSafe,
        colorZone: zone,
        redStepIndex: isMain ? (trackPos - 1) % 52 : -1,
        greenStepIndex: isMain ? (trackPos - 1 + 13) % 52 : -1,
        yellowStepIndex: isMain ? (trackPos - 1 + 26) % 52 : -1,
        blueStepIndex: isMain ? (trackPos - 1 + 39) % 52 : -1,
        neighborCells: [
          x > 0 ? (x - 1) + y * 15 : -1,
          x < 14 ? (x + 1) + y * 15 : -1,
          y > 0 ? x + (y - 1) * 15 : -1,
          y < 14 ? x + (y + 1) * 15 : -1,
        ].filter((c) => c >= 0),
      };
    }
  }

  return map;
})();
