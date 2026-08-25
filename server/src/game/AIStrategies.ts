import { PlayerColor } from '@ludo/shared';
import { Token } from './Token.js';

export class AIStrategies {
  /**
   * Evaluates token move for aggressive AI profile (prioritizes capturing opponents).
   */
  public static evaluateAggressiveScore(token: Token, diceValue: number, opponentTokens: Token[]): number {
    let score = token.stepCount;

    if (token.status === 'BASE' && diceValue === 6) score += 40;

    const targetStep = token.stepCount + diceValue;
    const canCapture = opponentTokens.some((t) => t.status === 'ACTIVE' && !t.isSafe && t.stepCount === targetStep);
    if (canCapture) score += 200; // Extremely high capture priority

    return score;
  }

  /**
   * Evaluates token move for defensive AI profile (prioritizes safe squares and protecting tokens).
   */
  public static evaluateDefensiveScore(token: Token, diceValue: number, opponentTokens: Token[]): number {
    let score = token.stepCount;

    if (token.status === 'BASE' && diceValue === 6) score += 20;

    const targetStep = token.stepCount + diceValue;
    // Check if moving lands on a safe square
    if (targetStep % 13 === 1 || targetStep % 13 === 9) {
      score += 120;
    }

    return score;
  }
}
