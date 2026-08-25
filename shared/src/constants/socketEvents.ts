export const SOCKET_EVENTS = {
  // Game Events
  GAME_STATE: 'game:state',
  GAME_STARTED: 'game:started',
  DICE_ROLLED: 'game:dice_rolled',
  TOKEN_MOVED: 'game:token_moved',
  TURN_CHANGED: 'game:turn_changed',
  PLAYER_JOINED: 'game:player_joined',
  PLAYER_LEFT: 'game:player_left',
  PLAYER_DISCONNECTED: 'game:player_disconnected',
  PLAYER_RECONNECTED: 'game:player_reconnected',
  GAME_ENDED: 'game:ended',
  GAME_ERROR: 'game:error',

  // Client Actions
  JOIN_GAME: 'game:join',
  LEAVE_GAME: 'game:leave',
  PLAYER_READY: 'game:ready',
  ROLL_DICE: 'game:roll_dice',
  MOVE_TOKEN: 'game:move_token',
  USE_POWERUP: 'game:use_powerup',

  // Room & Matchmaking
  CREATE_ROOM: 'room:create',
  ROOM_CREATED: 'room:created',
  ROOM_UPDATED: 'room:updated',
  JOIN_MATCHMAKING: 'matchmaking:join',
  LEAVE_MATCHMAKING: 'matchmaking:leave',
  MATCHMAKING_SEARCHING: 'matchmaking:searching',
  MATCHMAKING_FOUND: 'matchmaking:found',

  // Chat & Social
  SEND_CHAT: 'chat:send',
  CHAT_MESSAGE: 'chat:message',
  SEND_EMOTE: 'chat:send_emote',
  EMOTE_BROADCAST: 'chat:emote',
  FRIEND_STATUS: 'friend:status',
  NOTIFICATION_NEW: 'notification:new',
} as const;
