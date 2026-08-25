import { COLOR_HEX, COLOR_SECONDARY_HEX, PlayerColor } from '@ludo/shared';

export interface RenderableToken {
  id: string;
  color: PlayerColor;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  isSelected: boolean;
  isClickable: boolean;
}

export class TokenRenderer {
  private ctx: CanvasRenderingContext2D;
  private cellSize: number;

  constructor(ctx: CanvasRenderingContext2D, canvasSize: number) {
    this.ctx = ctx;
    this.cellSize = canvasSize / 15;
  }

  public resize(newSize: number): void {
    this.cellSize = newSize / 15;
  }

  public renderToken(token: RenderableToken): void {
    const { ctx, cellSize } = this;
    const px = (token.x + 0.5) * cellSize;
    const py = (token.y + 0.5) * cellSize;
    const radius = cellSize * 0.38;

    ctx.save();

    // Pulse animation if clickable
    if (token.isClickable) {
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 15;
    }

    // Outer Shadow / Base Ring
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.arc(px, py + 3, radius, 0, Math.PI * 2);
    ctx.fill();

    // Main Token Body Gradient
    const grad = ctx.createRadialGradient(px - radius * 0.3, py - radius * 0.3, radius * 0.1, px, py, radius);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.4, COLOR_HEX[token.color]);
    grad.addColorStop(1, COLOR_SECONDARY_HEX[token.color]);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fill();

    // Border Ring
    ctx.lineWidth = token.isSelected ? 3 : 2;
    ctx.strokeStyle = token.isSelected ? '#ffeaa7' : '#ffffff';
    ctx.stroke();

    // Inner Crown/Pawn Accent
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(px, py, radius * 0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}
