import React, { useRef, useEffect } from 'react';
import { GameState, PlayerColor, getGridCoordinates } from '@ludo/shared';
import { BoardRenderer } from '../../engine/BoardRenderer';
import { TokenRenderer, RenderableToken } from '../../engine/TokenRenderer';

export interface GameBoardProps {
  gameState: GameState;
  onTokenClick?: (tokenId: string) => void;
  myColor?: PlayerColor;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState, onTokenClick, myColor }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = Math.min(canvas.clientWidth, 600);
    canvas.width = size;
    canvas.height = size;

    const boardRenderer = new BoardRenderer(ctx, size);
    const tokenRenderer = new TokenRenderer(ctx, size);

    // Render Board Grid
    boardRenderer.render();

    // Render Tokens for all active players
    if (gameState && gameState.players) {
      Object.values(gameState.players).forEach((p: any) => {
        if (!p) return;
        p.tokens.forEach((t: any) => {
          const coords = getGridCoordinates(p.color, t.status, t.position, t.index);

          const isMyTurn = gameState.currentTurnColor === myColor;
          const isClickable = isMyTurn && gameState.validMoves.includes(t.id);

          const renderable: RenderableToken = {
            id: t.id,
            color: p.color,
            x: coords.x,
            y: coords.y,
            targetX: coords.x,
            targetY: coords.y,
            isSelected: false,
            isClickable,
          };

          tokenRenderer.renderToken(renderable);
        });
      });
    }
  }, [gameState, myColor]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !onTokenClick) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const cellSize = canvas.width / 15;
    const gridX = Math.floor(clickX / cellSize);
    const gridY = Math.floor(clickY / cellSize);

    // Find token at grid position
    if (gameState && gameState.players) {
      Object.values(gameState.players).forEach((p: any) => {
        if (!p) return;
        p.tokens.forEach((t: any) => {
          const coords = getGridCoordinates(p.color, t.status, t.position, t.index);
          if (Math.round(coords.x) === gridX && Math.round(coords.y) === gridY) {
            if (gameState.validMoves.includes(t.id)) {
              onTokenClick(t.id);
            }
          }
        });
      });
    }
  };

  return (
    <div className="relative flex items-center justify-center p-4 bg-slate-950/80 rounded-3xl border border-slate-800 shadow-2xl">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full max-w-[600px] aspect-square rounded-2xl cursor-pointer shadow-inner"
      />
    </div>
  );
};
