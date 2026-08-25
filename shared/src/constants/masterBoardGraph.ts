import { Position2D } from '../types/game.js';

export interface BoardGraphNode {
  id: number;
  gridX: number;
  gridY: number;
  pixelX: number;
  pixelY: number;
  zone: string;
  isStar: boolean;
  nextRedId: number;
  nextGreenId: number;
  nextYellowId: number;
  nextBlueId: number;
}

/**
 * Master Board Graph Node Data structure for high-performance canvas engine rendering.
 */
export const MASTER_BOARD_GRAPH_NODES: Record<number, BoardGraphNode> = (() => {
  const nodes: Record<number, BoardGraphNode> = {};

  for (let i = 1; i <= 225; i++) {
    const gx = (i - 1) % 15;
    const gy = Math.floor((i - 1) / 15);

    nodes[i] = {
      id: i,
      gridX: gx,
      gridY: gy,
      pixelX: Math.round((gx + 0.5) * 40),
      pixelY: Math.round((gy + 0.5) * 40),
      zone: gx < 6 && gy < 6 ? 'RED' : gx >= 9 && gy < 6 ? 'GREEN' : gx >= 9 && gy >= 9 ? 'YELLOW' : gx < 6 && gy >= 9 ? 'BLUE' : 'NEUTRAL',
      isStar: (gx === 1 && gy === 6) || (gx === 6 && gy === 2) || (gx === 8 && gy === 1) || (gx === 12 && gy === 6) || (gx === 13 && gy === 8) || (gx === 8 && gy === 12) || (gx === 6 && gy === 13) || (gx === 2 && gy === 8),
      nextRedId: (i % 225) + 1,
      nextGreenId: ((i + 13) % 225) + 1,
      nextYellowId: ((i + 26) % 225) + 1,
      nextBlueId: ((i + 39) % 225) + 1,
    };
  }

  return nodes;
})();
