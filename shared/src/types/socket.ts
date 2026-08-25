import { GameState, MoveLog, PlayerColor } from './game.js';
import { UserProfile } from './user.js';
import { ChatMessage } from './chat.js';

export interface ServerToClientEvents {
  // Game Events
  'game:state': (state: GameState) => void;
  'game:started': (state: GameState) => void;
  'game:dice_rolled': (payload: { color: PlayerColor; value: number; consecutiveSixes: number; validMoves: string[] }) => void;
  'game:token_moved': (moveLog: MoveLog, newState: GameState) => void;
  'game:turn_changed': (payload: { currentTurnColor: PlayerColor; timerExpiresAt: number }) => void;
  'game:player_joined': (player: any) => void;
  'game:player_left': (payload: { color: PlayerColor; userId: string; isBot: boolean }) => void;
  'game:player_disconnected': (payload: { color: PlayerColor; reconnectTimeout: number }) => void;
  'game:player_reconnected': (payload: { color: PlayerColor }) => void;
  'game:ended': (payload: { winners: PlayerColor[]; statsSummary: any; xpEarned: Record<string, number> }) => void;
  'game:error': (message: string) => void;

  // Lobby Events
  'room:created': (roomData: any) => void;
  'room:updated': (roomData: any) => void;
  'room:destroyed': (reason: string) => void;
  'matchmaking:searching': (payload: { queueTime: number; mode: string }) => void;
  'matchmaking:found': (payload: { roomId: string; roomCode: string }) => void;

  // Social & Chat Events
  'chat:message': (message: ChatMessage) => void;
  'chat:emote': (payload: { senderColor: PlayerColor; emoteId: string }) => void;
  'friend:status': (payload: { friendId: string; isOnline: boolean }) => void;
  'notification:new': (notification: any) => void;
}

export interface ClientToServerEvents {
  // Game Actions
  'game:join': (payload: { roomCode: string }, callback: (res: { success: boolean; error?: string; state?: GameState }) => void) => void;
  'game:leave': (payload: { gameId: string }) => void;
  'game:ready': (payload: { gameId: string; isReady: boolean }) => void;
  'game:roll_dice': (payload: { gameId: string }) => void;
  'game:move_token': (payload: { gameId: string; tokenId: string; diceValue: number }) => void;
  'game:use_powerup': (payload: { gameId: string; powerUpId: string; targetTokenId?: string }) => void;

  // Lobby Actions
  'room:create': (payload: { name: string; mode: string; isPrivate: boolean; password?: string; maxPlayers: number }, callback: (res: any) => void) => void;
  'matchmaking:join': (payload: { mode: string }) => void;
  'matchmaking:leave': () => void;

  // Social Actions
  'chat:send': (payload: { roomId: string; text: string }) => void;
  'chat:send_emote': (payload: { roomId: string; emoteId: string }) => void;
}
