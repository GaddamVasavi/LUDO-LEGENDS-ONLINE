export type TournamentFormat = 'SINGLE_ELIMINATION' | 'ROUND_ROBIN' | 'KNOCKOUT';
export type TournamentStatus = 'UPCOMING' | 'REGISTRATION_OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface TournamentPrize {
  rank: number; // 1 for 1st place, 2 for 2nd, etc.
  coins: number;
  gems: number;
  badgeId?: string;
  trophyTitle?: string;
}

export interface TournamentMatch {
  id: string;
  round: number;
  matchIndex: number;
  playerIds: string[];
  winnerId?: string;
  gameId?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'FINISHED';
  scheduledTime: number;
}

export interface TournamentParticipant {
  userId: string;
  username: string;
  avatarUrl: string;
  seed: number;
  registeredAt: number;
  eliminatedInRound?: number;
  finalRank?: number;
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
  bannerUrl?: string;
  format: TournamentFormat;
  status: TournamentStatus;
  maxParticipants: number;
  entryFeeCoins: number;
  entryFeeGems: number;
  prizes: TournamentPrize[];
  participants: TournamentParticipant[];
  matches: TournamentMatch[];
  currentRound: number;
  totalRounds: number;
  startTime: number;
  endTime?: number;
  winnerId?: string;
}
