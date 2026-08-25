import { PlayerColor } from '@ludo/shared';

export class TurnManager {
  private turnSequence: PlayerColor[];
  private currentIndex: number = 0;
  private turnTimerSeconds: number;
  private timerExpiresAt: number = 0;

  constructor(players: PlayerColor[], turnTimerSeconds: number = 15) {
    this.turnSequence = [...players];
    this.turnTimerSeconds = turnTimerSeconds;
    this.resetTimer();
  }

  public getCurrentColor(): PlayerColor {
    return this.turnSequence[this.currentIndex];
  }

  public nextTurn(): PlayerColor {
    this.currentIndex = (this.currentIndex + 1) % this.turnSequence.length;
    this.resetTimer();
    return this.getCurrentColor();
  }

  public resetTimer(): void {
    this.timerExpiresAt = Date.now() + this.turnTimerSeconds * 1000;
  }

  public getTimerExpiresAt(): number {
    return this.timerExpiresAt;
  }

  public removePlayer(color: PlayerColor): void {
    const idx = this.turnSequence.indexOf(color);
    if (idx !== -1) {
      this.turnSequence.splice(idx, 1);
      if (this.currentIndex >= this.turnSequence.length) {
        this.currentIndex = 0;
      }
    }
  }

  public getTurnSequence(): PlayerColor[] {
    return [...this.turnSequence];
  }
}
