import { GameRules } from '../../../server/src/game/GameRules.js';
import { Token } from '../../../server/src/game/Token.js';
import { PlayerColor } from '@ludo/shared';

describe('GameRules Engine Evaluation', () => {
  let redToken: Token;
  let allTokens: Map<PlayerColor, Token[]>;

  beforeEach(() => {
    redToken = new Token('RED', 0);
    allTokens = new Map();
    allTokens.set('RED', [redToken]);
    allTokens.set('GREEN', [new Token('GREEN', 0)]);
  });

  test('Rejects move out of BASE when dice roll is not 6', () => {
    const evalRes = GameRules.evaluateMove(redToken, 4, allTokens, 0);
    expect(evalRes.isValid).toBe(false);
    expect(evalRes.reason).toContain('6');
  });

  test('Allows move out of BASE when dice roll is 6', () => {
    const evalRes = GameRules.evaluateMove(redToken, 6, allTokens, 0);
    expect(evalRes.isValid).toBe(true);
    expect(evalRes.earnsExtraTurn).toBe(true);
  });

  test('Forfeits turn on triple 6 consecutive rolls', () => {
    const evalRes = GameRules.evaluateMove(redToken, 6, allTokens, 3);
    expect(evalRes.isValid).toBe(false);
    expect(evalRes.reason).toContain('Triple 6');
  });
});
