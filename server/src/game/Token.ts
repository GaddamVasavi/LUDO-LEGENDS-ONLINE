import { PlayerColor, TokenStatus } from '@ludo/shared';
import { calculateTokenLocation, isSafePosition } from '@ludo/shared';

export class Token {
  public readonly id: string;
  public readonly color: PlayerColor;
  public readonly index: number;
  public status: TokenStatus = 'BASE';
  public position: number = 0; // 0..51 main track, or 0..5 home path
  public stepCount: number = 0; // 0..57
  public isSafe: boolean = true; // BASE tokens are safe
  public hasShield: boolean = false;

  constructor(color: PlayerColor, index: number) {
    this.color = color;
    this.index = index;
    this.id = `${color}_${index}`;
  }

  public moveSteps(steps: number): void {
    if (this.status === 'BASE' && steps === 6) {
      this.status = 'ACTIVE';
      this.stepCount = 1;
    } else if (this.status === 'ACTIVE' || this.status === 'HOME_PATH') {
      this.stepCount += steps;
    }

    const location = calculateTokenLocation(this.color, this.stepCount);
    this.status = location.status;
    this.position = location.position;

    if (this.status === 'ACTIVE') {
      this.isSafe = isSafePosition(this.position);
    } else if (this.status === 'BASE' || this.status === 'HOME_PATH' || this.status === 'HOME') {
      this.isSafe = true;
    }
  }

  public sendToBase(): void {
    this.status = 'BASE';
    this.stepCount = 0;
    this.position = 0;
    this.isSafe = true;
    this.hasShield = false;
  }

  public getState() {
    return {
      id: this.id,
      color: this.color,
      index: this.index,
      status: this.status,
      position: this.position,
      stepCount: this.stepCount,
      isSafe: this.isSafe,
      hasShield: this.hasShield,
    };
  }
}
