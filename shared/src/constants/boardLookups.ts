import { Position2D } from '../types/game.js';
import { GRID_CELL_MAP } from './boardGeometry.js';

/**
 * Precomputed Step Distance Matrix between every pair of positions (1..52) on main track.
 * Used for instant O(1) distance calculations in AI engines and rendering interpolation.
 */
export const MAIN_TRACK_DISTANCE_MATRIX: number[][] = (() => {
  const matrix: number[][] = Array.from({ length: 53 }, () => new Array(53).fill(0));

  for (let from = 1; from <= 52; from++) {
    for (let to = 1; to <= 52; to++) {
      if (from === to) {
        matrix[from][to] = 0;
      } else if (to > from) {
        matrix[from][to] = to - from;
      } else {
        matrix[from][to] = (52 - from) + to;
      }
    }
  }

  return matrix;
})();

/**
 * Precomputed Pixel Coordinate Centroids for all 52 main track cells.
 * Normalized to [0..1] range for screen resolution scaling.
 */
export const NORMALIZED_CELL_CENTROIDS: Record<number, Position2D> = (() => {
  const centroids: Record<number, Position2D> = {};

  for (let pos = 1; pos <= 52; pos++) {
    const gridPos = GRID_CELL_MAP[pos] || { x: 0, y: 0 };
    centroids[pos] = {
      x: (gridPos.x + 0.5) / 15,
      y: (gridPos.y + 0.5) / 15,
    };
  }

  return centroids;
})();
