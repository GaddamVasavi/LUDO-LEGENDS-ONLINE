export type GuildRole = 'LEADER' | 'OFFICER' | 'VETERAN' | 'MEMBER';

export interface GuildMember {
  userId: string;
  username: string;
  avatarUrl: string;
  role: GuildRole;
  joinedAt: number;
  weeklyContributionXp: number;
  totalContributionXp: number;
  lastOnlineAt: number;
  isOnline: boolean;
}

export interface GuildPerk {
  id: string;
  name: string;
  description: string;
  requiredGuildLevel: number;
  bonusPercent: number; // e.g. +10% coin boost
  icon: string;
}

export interface GuildWarMatch {
  id: string;
  opponentGuildId: string;
  opponentGuildName: string;
  myScore: number;
  opponentScore: number;
  status: 'UPCOMING' | 'ACTIVE' | 'VICTORY' | 'DEFEAT';
  endedAt?: number;
}

export interface Guild {
  id: string;
  name: string;
  tag: string; // 3-4 character tag e.g. "LUDO"
  description: string;
  emblemUrl: string;
  bannerUrl: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  trophies: number;
  leaderUserId: string;
  members: GuildMember[];
  maxMembers: number;
  isPublic: boolean;
  minEloRequired: number;
  perks: GuildPerk[];
  warHistory: GuildWarMatch[];
  createdAt: number;
}
