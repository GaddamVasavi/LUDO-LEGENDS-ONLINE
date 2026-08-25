import { PlayerColor, TOTAL_STEPS_TO_HOME, MAIN_TRACK_LENGTH } from '@ludo/shared';
import { Token } from './Token.js';

export interface MoveEvaluation {
  isValid: boolean;
  reason?: string;
  targetStepCount: number;
  willCapture: boolean;
  capturedTokenId?: string;
  willReachHome: boolean;
  earnsExtraTurn: boolean;
}

export class GameRules {
  /**
   * Evaluates a proposed move against all classic and custom Ludo game rules.
   */
  public static evaluateMove(
    token: Token,
    diceValue: number,
    allPlayerTokens: Map<PlayerColor, Token[]>,
    consecutiveSixes: number
  ): MoveEvaluation {
    // Rule 1: 3 consecutive 6s automatically invalidates move and forfeits turn
    if (consecutiveSixes >= 3) {
      return {
        isValid: false,
        reason: 'Triple 6 foul: Turn forfeited',
        targetStepCount: token.stepCount,
        willCapture: false,
        willReachHome: false,
        earnsExtraTurn: false,
      };
    }

    // Rule 2: Token in BASE requires a 6 to move to START square
    if (token.status === 'BASE') {
      if (diceValue === 6) {
        return {
          isValid: true,
          targetStepCount: 1,
          willCapture: false,
          willReachHome: false,
          earnsExtraTurn: true, // Rolling 6 grants extra turn
        };
      }
      return {
        isValid: false,
        reason: 'Must roll a 6 to move token out of base',
        targetStepCount: 0,
        willCapture: false,
        willReachHome: false,
        earnsExtraTurn: false,
      };
    }

    // Rule 3: Token already HOME cannot move further
    if (token.status === 'HOME') {
      return {
        isValid: false,
        reason: 'Token is already in Home',
        targetStepCount: TOTAL_STEPS_TO_HOME,
        willCapture: false,
        willReachHome: false,
        earnsExtraTurn: false,
      };
    }

    // Rule 4: Exact die roll required to reach Home Triangle (step 57)
    const targetStepCount = token.stepCount + diceValue;
    if (targetStepCount > TOTAL_STEPS_TO_HOME) {
      return {
        isValid: false,
        reason: 'Exact roll required to enter Home',
        targetStepCount: token.stepCount,
        willCapture: false,
        willReachHome: false,
        earnsExtraTurn: false,
      };
    }

    // Rule 5: Check capture mechanics on main track
    let willCapture = false;
    let capturedTokenId: string | undefined;

    if (targetStepCount <= MAIN_TRACK_LENGTH) {
      // Calculate target main track 1..52 position
      for (const [oppColor, oppTokens] of allPlayerTokens.entries()) {
        if (oppColor === token.color) continue;

        for (const oppToken of oppTokens) {
          if (
            oppToken.status === 'ACTIVE' &&
            !oppToken.isSafe &&
            oppToken.position === (token.position + diceValue - 1) % MAIN_TRACK_LENGTH + 1 &&
            !oppToken.hasShield
          ) {
            willCapture = true;
            capturedTokenId = oppToken.id;
            break;
          }
        }
      }
    }

    const willReachHome = targetStepCount === TOTAL_STEPS_TO_HOME;
    const earnsExtraTurn = diceValue === 6 || willCapture || willReachHome;

    return {
      isValid: true,
      targetStepCount,
      willCapture,
      capturedTokenId,
      willReachHome,
      earnsExtraTurn,
    };
  }
}
