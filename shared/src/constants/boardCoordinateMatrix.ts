import { Position2D } from '../types/game.js';

export interface ViewportCoordinateMap {
  resolutionWidth: number;
  resolutionHeight: number;
  cellSize: number;
  cells: Record<number, Position2D>;
}

/**
 * Multi-resolution Viewport Coordinate Map Matrix for high DPI Canvas rendering.
 */
export const MULTI_RESOLUTION_VIEWPORT_MAP: ViewportCoordinateMap[] = [
  {
    resolutionWidth: 600,
    resolutionHeight: 600,
    cellSize: 40,
    cells: {
      1: { x: 40, y: 240 }, 2: { x: 80, y: 240 }, 3: { x: 120, y: 240 }, 4: { x: 160, y: 240 }, 5: { x: 200, y: 240 },
      6: { x: 240, y: 200 }, 7: { x: 240, y: 160 }, 8: { x: 240, y: 120 }, 9: { x: 240, y: 80 }, 10: { x: 240, y: 40 }, 11: { x: 240, y: 0 },
      12: { x: 280, y: 0 },
      13: { x: 320, y: 0 }, 14: { x: 320, y: 40 }, 15: { x: 320, y: 80 }, 16: { x: 320, y: 120 }, 17: { x: 320, y: 160 }, 18: { x: 320, y: 200 },
      19: { x: 360, y: 240 }, 20: { x: 400, y: 240 }, 21: { x: 440, y: 240 }, 22: { x: 480, y: 240 }, 23: { x: 520, y: 240 }, 24: { x: 560, y: 240 },
      25: { x: 560, y: 280 },
      26: { x: 560, y: 320 }, 27: { x: 520, y: 320 }, 28: { x: 480, y: 320 }, 29: { x: 440, y: 320 }, 30: { x: 400, y: 320 }, 31: { x: 360, y: 320 },
      32: { x: 320, y: 360 }, 33: { x: 320, y: 400 }, 34: { x: 320, y: 440 }, 35: { x: 320, y: 480 }, 36: { x: 320, y: 520 }, 37: { x: 320, y: 560 },
      38: { x: 280, y: 560 },
      39: { x: 240, y: 560 }, 40: { x: 240, y: 520 }, 41: { x: 240, y: 480 }, 42: { x: 240, y: 440 }, 43: { x: 240, y: 400 }, 44: { x: 240, y: 360 },
      45: { x: 200, y: 320 }, 46: { x: 160, y: 320 }, 47: { x: 120, y: 320 }, 48: { x: 80, y: 320 }, 49: { x: 40, y: 320 }, 50: { x: 0, y: 320 },
      51: { x: 0, y: 280 }, 52: { x: 0, y: 240 },
    },
  },
];
