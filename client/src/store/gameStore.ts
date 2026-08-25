import { create } from 'zustand';
import { GameState, MoveLog, PlayerColor, SOCKET_EVENTS } from '@ludo/shared';
import { socketService } from '../services/socketService';

interface GameStore {
  gameState: GameState | null;
  myColor: PlayerColor | null;
  logs: MoveLog[];
  setGameState: (state: GameState) => void;
  initSocketListeners: () => void;
  rollDice: () => void;
  moveToken: (tokenId: string) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: null,
  myColor: 'RED',
  logs: [],

  setGameState: (state) => set({ gameState: state }),

  initSocketListeners: () => {
    const socket = socketService.connect();

    socket.on(SOCKET_EVENTS.GAME_STATE, (state: GameState) => {
      set({ gameState: state });
    });

    socket.on(SOCKET_EVENTS.TOKEN_MOVED, (log: MoveLog, newState: GameState) => {
      set((prev) => ({
        gameState: newState,
        logs: [log, ...prev.logs],
      }));
    });
  },

  rollDice: () => {
    const state = get().gameState;
    if (!state) return;
    const socket = socketService.getSocket();
    if (socket) {
      socket.emit(SOCKET_EVENTS.ROLL_DICE, { gameId: state.id });
    }
  },

  moveToken: (tokenId: string) => {
    const state = get().gameState;
    if (!state) return;
    const socket = socketService.getSocket();
    if (socket) {
      socket.emit(SOCKET_EVENTS.MOVE_TOKEN, {
        gameId: state.id,
        tokenId,
        diceValue: state.dice.currentValue,
      });
    }
  },
}));
