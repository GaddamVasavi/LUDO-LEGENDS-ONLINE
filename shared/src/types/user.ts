export type UserTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND' | 'LEGEND';

export interface UserStats {
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  winRate: number;
  tokensCaptured: number;
  tokensLost: number;
  totalSixesRolled: number;
  longestWinStreak: number;
  currentWinStreak: number;
  tournamentWins: number;
  tournamentFinals: number;
  totalCoinsEarned: number;
  totalGemsEarned: number;
}

export interface UserCustomization {
  equippedBoardTheme: string;
  equippedTokenSkin: string;
  equippedDiceSkin: string;
  equippedAvatarFrame: string;
  equippedEmoteSet: string[];
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  bio?: string;
  level: number;
  xp: number;
  coins: number;
  gems: number;
  eloRating: number;
  tier: UserTier;
  stats: UserStats;
  customization: UserCustomization;
  isOnline: boolean;
  lastActive: number;
  createdAt: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UserSession {
  user: UserProfile;
  tokens: AuthTokens;
}

export interface AchievementProgress {
  achievementId: string;
  currentValue: number;
  targetValue: number;
  isUnlocked: boolean;
  unlockedAt?: number;
}
