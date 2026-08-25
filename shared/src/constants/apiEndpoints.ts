export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    STATS: '/users/stats',
    INVENTORY: '/users/inventory',
    EQUIP_ITEM: '/users/equip',
    SEARCH: '/users/search',
  },
  GAMES: {
    CREATE: '/games/create',
    GET_BY_ID: (id: string) => `/games/${id}`,
    HISTORY: '/games/history',
    REPLAY: (id: string) => `/games/replay/${id}`,
  },
  ROOMS: {
    LIST: '/rooms',
    CREATE: '/rooms',
    GET_BY_CODE: (code: string) => `/rooms/${code}`,
    JOIN: (code: string) => `/rooms/${code}/join`,
  },
  TOURNAMENTS: {
    LIST: '/tournaments',
    GET_BY_ID: (id: string) => `/tournaments/${id}`,
    REGISTER: (id: string) => `/tournaments/${id}/register`,
    BRACKET: (id: string) => `/tournaments/${id}/bracket`,
  },
  LEADERBOARD: {
    GLOBAL: '/leaderboard/global',
    SEASONAL: '/leaderboard/seasonal',
    FRIENDS: '/leaderboard/friends',
  },
  SHOP: {
    ITEMS: '/shop/items',
    PURCHASE: '/shop/purchase',
  },
  FRIENDS: {
    LIST: '/friends',
    REQUESTS: '/friends/requests',
    SEND_REQUEST: '/friends/request',
    ACCEPT_REQUEST: (id: string) => `/friends/accept/${id}`,
    REJECT_REQUEST: (id: string) => `/friends/reject/${id}`,
    REMOVE_FRIEND: (id: string) => `/friends/${id}`,
  },
} as const;
