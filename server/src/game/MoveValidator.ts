import { PlayerColor, TOTAL_STEPS_TO_HOME } from '@ludo/shared';
import { Token } from './Token.js';

export class MoveValidator {
  /**
   * Validates if a specific token can legally move given a dice roll value.
   */
  public static canTokenMove(token: Token, diceValue: number): boolean {
    // 1. If token is in BASE, requires a 6 to move onto the start square
    if (token.status === 'BASE') {
      return diceValue === 6;
    }

    // 2. If token is already HOME, it cannot move further
    if (token.status === 'HOME') {
      return false;
    }

    // 3. Exact die roll required to land on HOME triangle (stepCount = 57)
    const targetStepCount = token.stepCount + diceValue;
    if (targetStepCount > TOTAL_STEPS_TO_HOME) {
      return false;
    }

    return true;
  }

  /**
   * Returns array of token IDs that can legally move given player's tokens & dice roll.
   */
  public static getValidMoveTokenIds(tokens: Token[], diceValue: number): string[] {
    return tokens
      .filter((t) => this.canTokenMove(t, diceValue))
      .map((t) => t.id);
  }
}
