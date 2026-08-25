import { COLOR_HEX, COLOR_SECONDARY_HEX, Position2D, SAFE_POSITIONS_MAIN_TRACK } from '@ludo/shared';

export class BoardRenderer {
  private ctx: CanvasRenderingContext2D;
  private canvasSize: number;
  private cellSize: number;

  constructor(ctx: CanvasRenderingContext2D, canvasSize: number) {
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.cellSize = canvasSize / 15;
  }

  public resize(newSize: number): void {
    this.canvasSize = newSize;
    this.cellSize = newSize / 15;
  }

  public render(): void {
    const { ctx, cellSize } = this;
    ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);

    // 1. Draw background grid
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);

    // 2. Draw 4 Corner Home Bases (6x6 cells each)
    this.drawHomeBase(0, 0, 'RED');
    this.drawHomeBase(9, 0, 'GREEN');
    this.drawHomeBase(9, 9, 'YELLOW');
    this.drawHomeBase(0, 9, 'BLUE');

    // 3. Draw Colored Home Corridors
    this.drawHomeCorridor('RED');
    this.drawHomeCorridor('GREEN');
    this.drawHomeCorridor('YELLOW');
    this.drawHomeCorridor('BLUE');

    // 4. Draw Center Victory Triangle (3x3 area)
    this.drawCenterTriangle();

    // 5. Draw 15x15 Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 15; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, this.canvasSize);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(this.canvasSize, i * cellSize);
      ctx.stroke();
    }

    // 6. Draw Safe Stars on Main Track
    this.drawSafeStars();
  }

  private drawHomeBase(startCol: number, startRow: number, color: 'RED' | 'GREEN' | 'YELLOW' | 'BLUE'): void {
    const { ctx, cellSize } = this;
    const x = startCol * cellSize;
    const y = startRow * cellSize;
    const size = 6 * cellSize;

    ctx.fillStyle = COLOR_HEX[color];
    ctx.fillRect(x, y, size, size);

    // Inner White Container Box
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + cellSize, y + cellSize, 4 * cellSize, 4 * cellSize);

    // 4 Colored Pawn Circles inside base
    const circles: Position2D[] = [
      { x: x + 2 * cellSize, y: y + 2 * cellSize },
      { x: x + 4 * cellSize, y: y + 2 * cellSize },
      { x: x + 2 * cellSize, y: y + 4 * cellSize },
      { x: x + 4 * cellSize, y: y + 4 * cellSize },
    ];

    ctx.fillStyle = COLOR_HEX[color];
    circles.forEach((c) => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, cellSize * 0.6, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  private drawHomeCorridor(color: 'RED' | 'GREEN' | 'YELLOW' | 'BLUE'): void {
    const { ctx, cellSize } = this;
    ctx.fillStyle = COLOR_HEX[color];

    for (let i = 1; i <= 5; i++) {
      let col = 0, row = 0;
      if (color === 'RED') { col = i; row = 7; }
      else if (color === 'GREEN') { col = 7; row = i; }
      else if (color === 'YELLOW') { col = 14 - i; row = 7; }
      else if (color === 'BLUE') { col = 7; row = 14 - i; }

      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
  }

  private drawCenterTriangle(): void {
    const { ctx, cellSize } = this;
    const center = 7.5 * cellSize;

    // Red Left Triangle
    ctx.fillStyle = COLOR_HEX.RED;
    ctx.beginPath();
    ctx.moveTo(6 * cellSize, 6 * cellSize);
    ctx.lineTo(center, center);
    ctx.lineTo(6 * cellSize, 9 * cellSize);
    ctx.fill();

    // Green Top Triangle
    ctx.fillStyle = COLOR_HEX.GREEN;
    ctx.beginPath();
    ctx.moveTo(6 * cellSize, 6 * cellSize);
    ctx.lineTo(center, center);
    ctx.lineTo(9 * cellSize, 6 * cellSize);
    ctx.fill();

    // Yellow Right Triangle
    ctx.fillStyle = COLOR_HEX.YELLOW;
    ctx.beginPath();
    ctx.moveTo(9 * cellSize, 6 * cellSize);
    ctx.lineTo(center, center);
    ctx.lineTo(9 * cellSize, 9 * cellSize);
    ctx.fill();

    // Blue Bottom Triangle
    ctx.fillStyle = COLOR_HEX.BLUE;
    ctx.beginPath();
    ctx.moveTo(6 * cellSize, 9 * cellSize);
    ctx.lineTo(center, center);
    ctx.lineTo(9 * cellSize, 9 * cellSize);
    ctx.fill();
  }

  private drawSafeStars(): void {
    const { ctx, cellSize } = this;

    const starCoords: Position2D[] = [
      { x: 1, y: 6 }, { x: 6, y: 2 },
      { x: 8, y: 1 }, { x: 12, y: 6 },
      { x: 13, y: 8 }, { x: 8, y: 12 },
      { x: 6, y: 13 }, { x: 2, y: 8 },
    ];

    ctx.fillStyle = '#f59e0b';
    starCoords.forEach((st) => {
      const cx = (st.x + 0.5) * cellSize;
      const cy = (st.y + 0.5) * cellSize;
      this.drawStar(cx, cy, 5, cellSize * 0.35, cellSize * 0.18);
    });
  }

  private drawStar(cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number): void {
    const { ctx } = this;
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }
}
