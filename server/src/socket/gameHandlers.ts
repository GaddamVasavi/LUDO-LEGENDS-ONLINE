import { Server, Socket } from 'socket.io';
import { GameEngine } from '../game/GameEngine';
import { PlayerColor, SOCKET_EVENTS } from '@ludo/shared';
import { AIEngine } from '../game/AIEngine';

export const activeGames: Map<string, GameEngine> = new Map();

export function registerGameHandlers(io: Server, socket: Socket) {
  socket.on(SOCKET_EVENTS.JOIN_GAME, ({ roomCode }, callback) => {
    let game = Array.from(activeGames.values()).find((g) => g.roomCode === roomCode);

    if (!game) {
      game = new GameEngine(`game_${Date.now()}`, roomCode, 'CLASSIC');
      activeGames.set(game.id, game);
    }

    const userId = (socket as any).userId || `guest_${socket.id.slice(0, 5)}`;
    const username = (socket as any).username || `Player_${socket.id.slice(0, 4)}`;

    const colors: PlayerColor[] = ['RED', 'GREEN', 'YELLOW', 'BLUE'];
    const takenColors = Array.from(game.players.keys());
    const availableColor = colors.find((c) => !takenColors.includes(c)) || 'RED';

    if (!game.players.has(availableColor)) {
      game.addPlayer(userId, username, availableColor);
    }

    socket.join(game.id);

    if (game.players.size === 4 && game.status === 'WAITING') {
      game.startGame();
      io.to(game.id).emit(SOCKET_EVENTS.GAME_STARTED, game.getGameState());
    }

    if (typeof callback === 'function') {
      callback({ success: true, state: game.getGameState() });
    }

    io.to(game.id).emit(SOCKET_EVENTS.GAME_STATE, game.getGameState());
  });

  socket.on(SOCKET_EVENTS.ROLL_DICE, ({ gameId }) => {
    const game = activeGames.get(gameId);
    if (!game) return;

    const currentColor = game.turnManager.getCurrentColor();
    const result = game.rollDice(currentColor);

    io.to(game.id).emit(SOCKET_EVENTS.DICE_ROLLED, {
      color: currentColor,
      value: result.value,
      consecutiveSixes: game.dice.getConsecutiveSixes(),
      validMoves: result.validMoves,
    });
  });

  socket.on(SOCKET_EVENTS.MOVE_TOKEN, ({ gameId, tokenId, diceValue }) => {
    const game = activeGames.get(gameId);
    if (!game) return;

    const currentColor = game.turnManager.getCurrentColor();
    try {
      const moveLog = game.moveToken(currentColor, tokenId, diceValue);
      io.to(game.id).emit(SOCKET_EVENTS.TOKEN_MOVED, moveLog, game.getGameState());
    } catch (err: any) {
      socket.emit(SOCKET_EVENTS.GAME_ERROR, err.message);
    }
  });
}
