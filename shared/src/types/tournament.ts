import { PlayerColor } from './game.js';

export type TournamentFormat = 'SINGLE_ELIMINATION' | 'DOUBLE_ELIMINATION' | 'ROUND_ROBIN' | 'SWISS' | 'KNOCKOUT';
export type TournamentStatus = 'UPCOMING' | 'REGISTRATION_OPEN' | 'REGISTRATION_CLOSED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface TournamentPrize {
  rank: number; // 1 for 1st place, 2 for 2nd place, etc.
  coins: number;
  gems: number;
  badgeId?: string;
  trophyTitle?: string;
  avatarFrameId?: string;
  customTitle?: string;
}

export interface TournamentMatchPlayer {
  userId: string;
  username: string;
  avatarUrl: string;
  color: PlayerColor;
  score: number;
  tokensHome: number;
  isWinner: boolean;
  isDisqualified: boolean;
}

export interface TournamentMatch {
  id: string;
  roundNumber: number;
  matchIndex: number;
  bracketType: 'WINNERS' | 'LOSERS' | 'FINALS';
  players: TournamentMatchPlayer[];
  winnerId?: string;
  gameId?: string;
  status: 'PENDING' | 'SCHEDULED' | 'IN_PROGRESS' | 'FINISHED' | 'BYE' | 'ABANDONED';
  scheduledStartTime: number;
  actualStartTime?: number;
  actualEndTime?: number;
}

export interface TournamentParticipant {
  userId: string;
  username: string;
  avatarUrl: string;
  eloRating: number;
  seed: number;
  registeredAt: number;
  isEliminated: boolean;
  eliminatedInRound?: number;
  finalRank?: number;
  matchesPlayed: number;
  matchesWon: number;
  totalCoinsEarned: number;
}

export interface TournamentStructure {
  totalRounds: number;
  currentRound: number;
  matchesPerRound: number[];
  winnersBracket: TournamentMatch[];
  losersBracket?: TournamentMatch[];
  finalsMatch?: TournamentMatch;
}

export interface Tournament {
  id: string;
  name: string;
  slug: string;
  description: string;
  rulesOverview: string;
  bannerUrl: string;
  iconUrl: string;
  format: TournamentFormat;
  status: TournamentStatus;
  maxParticipants: number;
  minParticipants: number;
  currentParticipantsCount: number;
  entryFeeCoins: number;
  entryFeeGems: number;
  minLevelRequired: number;
  minEloRequired: number;
  prizes: TournamentPrize[];
  participants: TournamentParticipant[];
  structure: TournamentStructure;
  registrationOpensAt: number;
  registrationClosesAt: number;
  startsAt: number;
  endedAt?: number;
  winnerUserId?: string;
  createdByUserId: string;
  isOfficial: boolean;
}

export interface TournamentFilterOptions {
  status?: TournamentStatus;
  format?: TournamentFormat;
  searchQuery?: string;
  minFee?: number;
  maxFee?: number;
  isOfficialOnly?: boolean;
}
