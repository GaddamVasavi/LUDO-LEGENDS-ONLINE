import crypto from 'crypto';

export class Dice {
  private currentValue: number = 1;
  private isRolled: boolean = false;
  private consecutiveSixes: number = 0;
  private history: number[] = [];

  /**
   * Cryptographically secure random number generator (1 to 6).
   */
  public roll(): number {
    const randomBuffer = crypto.randomBytes(4);
    const randomNumber = randomBuffer.readUInt32BE(0);
    this.currentValue = (randomNumber % 6) + 1;
    this.isRolled = true;

    if (this.currentValue === 6) {
      this.consecutiveSixes += 1;
    } else {
      this.consecutiveSixes = 0;
    }

    this.history.push(this.currentValue);
    return this.currentValue;
  }

  public getValue(): number {
    return this.currentValue;
  }

  public getIsRolled(): boolean {
    return this.isRolled;
  }

  public getConsecutiveSixes(): number {
    return this.consecutiveSixes;
  }

  public resetTurn(): void {
    this.isRolled = false;
  }

  public resetConsecutiveSixes(): void {
    this.consecutiveSixes = 0;
  }

  public getState() {
    return {
      currentValue: this.currentValue,
      isRolled: this.isRolled,
      consecutiveSixes: this.consecutiveSixes,
      canRoll: !this.isRolled,
      history: [...this.history],
    };
  }
}
