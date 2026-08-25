import { Server, Socket } from 'socket.io';
import { GameEngine } from '../game/GameEngine';
import { PlayerColor, SOCKET_EVENTS } from '@ludo/shared';

export const activeGames: Map<string, GameEngine> = new Map();

export function registerGameHandlers(io: Server, socket: Socket) {
  socket.on(SOCKET_EVENTS.JOIN_GAME, ({ roomCode }, callback) => {
    const roomKey = roomCode || 'quick';
    let game = Array.from(activeGames.values()).find((g) => g.roomCode === roomKey);

    if (!game) {
      game = new GameEngine(`game_${Date.now()}`, roomKey, 'CLASSIC');
      activeGames.set(game.id, game);
    }

    const userId = (socket as any).userId || `user_${socket.id.slice(0, 5)}`;
    const username = (socket as any).username || `Player_${socket.id.slice(0, 4)}`;

    const colors: PlayerColor[] = ['RED', 'GREEN', 'YELLOW', 'BLUE'];
    const takenColors = Array.from(game.players.keys());
    
    // Find player existing color or assign next available color
    let assignedColor: PlayerColor = 'RED';
    let existingEntry = Array.from(game.players.values()).find((e) => e.player.id === userId);

    if (existingEntry) {
      assignedColor = existingEntry.player.color;
    } else {
      assignedColor = colors.find((c) => !takenColors.includes(c)) || colors[game.players.size % 4];
      game.addPlayer(userId, username, assignedColor);
    }

    socket.join(game.id);

    if (game.players.size >= 2 && game.status === 'WAITING') {
      game.startGame();
      io.to(game.id).emit(SOCKET_EVENTS.GAME_STARTED, game.getGameState());
    }

    const currentState = game.getGameState();

    if (typeof callback === 'function') {
      callback({ success: true, state: currentState, color: assignedColor });
    }

    io.to(game.id).emit(SOCKET_EVENTS.GAME_STATE, currentState);
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

    io.to(game.id).emit(SOCKET_EVENTS.GAME_STATE, game.getGameState());
  });

  socket.on(SOCKET_EVENTS.MOVE_TOKEN, ({ gameId, tokenId, diceValue }) => {
    const game = activeGames.get(gameId);
    if (!game) return;

    const currentColor = game.turnManager.getCurrentColor();
    try {
      const moveLog = game.moveToken(currentColor, tokenId, diceValue);
      io.to(game.id).emit(SOCKET_EVENTS.TOKEN_MOVED, moveLog, game.getGameState());
      io.to(game.id).emit(SOCKET_EVENTS.GAME_STATE, game.getGameState());
    } catch (err: any) {
      socket.emit(SOCKET_EVENTS.GAME_ERROR, err.message);
    }
  });
}
