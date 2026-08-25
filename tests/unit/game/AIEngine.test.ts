import { AIEngine } from '../../../server/src/game/AIEngine.js';
import { Token } from '../../../server/src/game/Token.js';

describe('AIEngine Decision Matrix', () => {
  test('Bot chooses token move out of base on 6', () => {
    const tokens = [new Token('RED', 0), new Token('RED', 1)];
    const chosen = AIEngine.chooseMove('RED', tokens, [], 6, 'HARD');

    expect(chosen).toBeDefined();
    expect(typeof chosen).toBe('string');
  });

  test('Bot returns null if no valid moves exist', () => {
    const tokens = [new Token('RED', 0)]; // In BASE
    const chosen = AIEngine.chooseMove('RED', tokens, [], 3, 'MEDIUM');

    expect(chosen).toBeNull();
  });
});
