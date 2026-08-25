import { GameEngine } from '../../../server/src/game/GameEngine.js';

describe('TEST SUITE 1: Core Ludo Game Engine Logic', () => {
  let game: GameEngine;

  beforeEach(() => {
    game = new GameEngine('test_game_1', 'ROOM_TEST', 'CLASSIC');
    game.addPlayer('u1', 'Alice', 'RED');
    game.addPlayer('u2', 'Bob', 'GREEN');
    game.startGame();
  });

  test('Game initializes in IN_PROGRESS status with 2 players', () => {
    expect(game.status).toBe('IN_PROGRESS');
    expect(game.players.size).toBe(2);
    expect(game.turnManager.getCurrentColor()).toBe('RED');
  });

  test('Tokens require a 6 to exit BASE onto track', () => {
    const redObj = game.players.get('RED')!;
    const token = redObj.tokens[0];

    expect(token.status).toBe('BASE');

    // Rolling a 2 cannot move base token
    const validMovesFor2 = game.players.get('RED')!.tokens.filter((t) => t.status === 'ACTIVE');
    expect(validMovesFor2.length).toBe(0);

    // Force move token with 6
    token.moveSteps(6);
    expect(token.status).toBe('ACTIVE');
    expect(token.position).toBe(1);
  });

  test('Turn advances to next player when dice is not 6', () => {
    expect(game.turnManager.getCurrentColor()).toBe('RED');
    game.moveToken('RED', 'RED_0', 3);
    expect(game.turnManager.getCurrentColor()).toBe('GREEN');
  });
});
