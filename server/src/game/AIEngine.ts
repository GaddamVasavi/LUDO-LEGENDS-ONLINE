import { PlayerColor } from '@ludo/shared';
import { Token } from './Token.js';
import { MoveValidator } from './MoveValidator.js';

export class AIEngine {
  /**
   * Selects the optimal token for a bot player to move based on difficulty level.
   */
  public static chooseMove(
    botColor: PlayerColor,
    tokens: Token[],
    opponentTokens: Token[],
    diceValue: number,
    difficulty: 'EASY' | 'MEDIUM' | 'HARD' = 'MEDIUM'
  ): string | null {
    const validTokenIds = MoveValidator.getValidMoveTokenIds(tokens, diceValue);
    if (validTokenIds.length === 0) return null;
    if (validTokenIds.length === 1) return validTokenIds[0];

    const validTokens = tokens.filter((t) => validTokenIds.includes(t.id));

    if (difficulty === 'EASY') {
      // Random pick for Easy bot
      const randomIndex = Math.floor(Math.random() * validTokens.length);
      return validTokens[randomIndex].id;
    }

    // Heuristic Evaluation for Medium & Hard AI
    let bestToken = validTokens[0];
    let bestScore = -9999;

    for (const token of validTokens) {
      let score = 0;

      // 1. Priority: Move out of base on 6
      if (token.status === 'BASE' && diceValue === 6) {
        score += 50;
      }

      // 2. Priority: Capture opponent token
      const targetStepCount = token.stepCount + diceValue;
      if (targetStepCount <= 52) {
        // Check if landing on opponent
        const isCapture = opponentTokens.some(
          (opt) => opt.status === 'ACTIVE' && !opt.isSafe && opt.stepCount === targetStepCount
        );
        if (isCapture) {
          score += 100; // High priority capture
        }
      }

      // 3. Priority: Enter HOME or Home Path
      if (targetStepCount >= 52) {
        score += 80;
      }

      // 4. Priority: Land on a Safe Square
      if (token.status === 'ACTIVE') {
        score += 30;
      }

      // Hard AI: Additional danger calculations (avoid moving into opponent range)
      if (difficulty === 'HARD') {
        score += token.stepCount * 2; // Favor advancing furthest token
      }

      if (score > bestScore) {
        bestScore = score;
        bestToken = token;
      }
    }

    return bestToken.id;
  }
}
