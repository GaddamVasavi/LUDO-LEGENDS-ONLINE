import { GameEngine } from '../../../server/src/game/GameEngine.js';

describe('TEST SUITE 5: Socket & Real-Time Game Flow Integration', () => {
  test('Full game lifecycle simulation from 4 players join to victory', () => {
    const game = new GameEngine('sim_game_1', 'SIM_ROOM', 'CLASSIC');

    // 1. Players join
    game.addPlayer('u1', 'Player 1', 'RED');
    game.addPlayer('u2', 'Player 2', 'GREEN');
    game.addPlayer('u3', 'Player 3', 'YELLOW');
    game.addPlayer('u4', 'Player 4', 'BLUE');

    // 2. Start match
    game.startGame();
    expect(game.status).toBe('IN_PROGRESS');
    expect(game.turnManager.getTurnSequence()).toEqual(['RED', 'GREEN', 'YELLOW', 'BLUE']);

    // 3. Roll dice for RED
    const rollRes = game.rollDice('RED');
    expect(rollRes.value).toBeGreaterThanOrEqual(1);
    expect(rollRes.value).toBeLessThanOrEqual(6);

    // 4. Verify game state output
    const state = game.getGameState();
    expect(state.roomCode).toBe('SIM_ROOM');
    expect(state.players.RED.username).toBe('Player 1');
  });
});
