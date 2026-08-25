export type QuestType = 'DAILY' | 'WEEKLY' | 'SEASONAL' | 'MILESTONE' | 'SPECIAL_EVENT';
export type QuestCategory = 'MATCHES_PLAYED' | 'WINS' | 'CAPTURES' | 'SIXES' | 'TOURNAMENTS' | 'SOCIAL' | 'SPEND_COINS';

export interface QuestReward {
  coins: number;
  gems: number;
  xp: number;
  badgeId?: string;
  itemCatalogId?: string;
}

export interface QuestDef {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  category: QuestCategory;
  targetCount: number;
  reward: QuestReward;
  icon: string;
  expirationHours?: number;
}

export interface UserQuestProgress {
  questId: string;
  currentCount: number;
  targetCount: number;
  isCompleted: boolean;
  isClaimed: boolean;
  assignedAt: number;
  completedAt?: number;
}

export interface BattlePassTier {
  tierNumber: number;
  requiredXp: number;
  freeReward: QuestReward;
  premiumReward: QuestReward;
}

export interface UserBattlePass {
  seasonId: string;
  currentLevel: number;
  currentXp: number;
  isPremiumUnlocked: boolean;
  claimedFreeTiers: number[];
  claimedPremiumTiers: number[];
}
