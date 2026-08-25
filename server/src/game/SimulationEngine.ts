import { GameEngine } from './GameEngine.js';
import { PlayerColor } from '@ludo/shared';
import { AIEngine } from './AIEngine.js';

export interface SimulationResult {
  gameId: string;
  winner: PlayerColor;
  totalTurns: number;
  totalMoves: number;
  durationMs: number;
  tokensCaptured: Record<PlayerColor, number>;
  sixesRolled: Record<PlayerColor, number>;
}

export class SimulationEngine {
  /**
   * Runs an automated head-to-head bot simulation for testing game engine performance.
   */
  public static runBotSimulation(
    botDifficulties: Record<PlayerColor, 'EASY' | 'MEDIUM' | 'HARD'> = {
      RED: 'HARD',
      GREEN: 'MEDIUM',
      YELLOW: 'MEDIUM',
      BLUE: 'EASY',
    }
  ): SimulationResult {
    const startTime = Date.now();
    const game = new GameEngine(`sim_${Date.now()}`, 'SIM_LOBBY', 'CLASSIC');

    const colors: PlayerColor[] = ['RED', 'GREEN', 'YELLOW', 'BLUE'];
    colors.forEach((c) => {
      game.addPlayer(`bot_${c}`, `Bot_${c}`, c, true, botDifficulties[c]);
    });

    game.startGame();

    let turns = 0;
    const maxSafetyTurns = 2000;

    const sixesRolled: Record<PlayerColor, number> = { RED: 0, GREEN: 0, YELLOW: 0, BLUE: 0 };

    while (game.status === 'IN_PROGRESS' && turns < maxSafetyTurns) {
      turns++;
      const currentTurnColor = game.turnManager.getCurrentColor();
      const rollRes = game.rollDice(currentTurnColor);

      if (rollRes.value === 6) {
        sixesRolled[currentTurnColor]++;
      }

      if (rollRes.validMoves.length > 0) {
        const botObj = game.players.get(currentTurnColor)!;
        const opponentTokens = Array.from(game.players.entries())
          .filter(([color]) => color !== currentTurnColor)
          .flatMap(([, obj]) => obj.tokens);

        const chosenTokenId = AIEngine.chooseMove(
          currentTurnColor,
          botObj.tokens,
          opponentTokens,
          rollRes.value,
          botObj.player.botDifficulty || 'MEDIUM'
        );

        if (chosenTokenId) {
          game.moveToken(currentTurnColor, chosenTokenId, rollRes.value);
        }
      }
    }

    const winner = game.winners[0] || 'RED';
    const tokensCaptured: Record<PlayerColor, number> = {
      RED: game.players.get('RED')?.player.stats.tokensCaptured || 0,
      GREEN: game.players.get('GREEN')?.player.stats.tokensCaptured || 0,
      YELLOW: game.players.get('YELLOW')?.player.stats.tokensCaptured || 0,
      BLUE: game.players.get('BLUE')?.player.stats.tokensCaptured || 0,
    };

    return {
      gameId: game.id,
      winner,
      totalTurns: turns,
      totalMoves: game.moveLogs.length,
      durationMs: Date.now() - startTime,
      tokensCaptured,
      sixesRolled,
    };
  }
}
