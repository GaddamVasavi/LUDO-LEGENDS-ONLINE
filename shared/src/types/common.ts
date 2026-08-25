export interface HealthCheckResponse {
  status: 'ok' | 'degraded' | 'error';
  timestamp: number;
  uptime: number;
  version: string;
  services: {
    database: 'connected' | 'disconnected';
    redis: 'connected' | 'disconnected';
  };
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatarUrl: string;
  tier: string;
  eloRating: number;
  gamesWon: number;
  winRate: number;
  coins: number;
}
