export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  category: 'GAMEPLAY' | 'WINS' | 'SOCIAL' | 'COLLECTION' | 'TOURNAMENT';
  icon: string;
  targetValue: number;
  rewardCoins: number;
  rewardGems: number;
  rewardXP: number;
}

export const ACHIEVEMENTS_LIST: AchievementDef[] = [
  {
    id: 'first_win',
    title: 'First Victory',
    description: 'Win your first Ludo Legends match',
    category: 'WINS',
    icon: '🏆',
    targetValue: 1,
    rewardCoins: 500,
    rewardGems: 10,
    rewardXP: 100,
  },
  {
    id: 'wins_10',
    title: 'Rising Star',
    description: 'Win 10 matches',
    category: 'WINS',
    icon: '⭐',
    targetValue: 10,
    rewardCoins: 2000,
    rewardGems: 50,
    rewardXP: 500,
  },
  {
    id: 'wins_50',
    title: 'Ludo Master',
    description: 'Win 50 matches',
    category: 'WINS',
    icon: '🌟',
    targetValue: 50,
    rewardCoins: 10000,
    rewardGems: 200,
    rewardXP: 2000,
  },
  {
    id: 'wins_100',
    title: 'Ludo Legend',
    description: 'Win 100 matches',
    category: 'WINS',
    icon: '👑',
    targetValue: 100,
    rewardCoins: 25000,
    rewardGems: 500,
    rewardXP: 5000,
  },
  {
    id: 'captures_10',
    title: 'Token Hunter',
    description: 'Capture 10 opponent tokens',
    category: 'GAMEPLAY',
    icon: '🎯',
    targetValue: 10,
    rewardCoins: 1000,
    rewardGems: 20,
    rewardXP: 250,
  },
  {
    id: 'captures_50',
    title: 'Ruthless Hunter',
    description: 'Capture 50 opponent tokens',
    category: 'GAMEPLAY',
    icon: '⚔️',
    targetValue: 50,
    rewardCoins: 5000,
    rewardGems: 100,
    rewardXP: 1000,
  },
  {
    id: 'sixes_25',
    title: 'Lucky Roller',
    description: 'Roll a 6 twenty-five times',
    category: 'GAMEPLAY',
    icon: '🎲',
    targetValue: 25,
    rewardCoins: 1500,
    rewardGems: 30,
    rewardXP: 300,
  },
  {
    id: 'perfect_game',
    title: 'Flawless Win',
    description: 'Win a game without losing any tokens',
    category: 'GAMEPLAY',
    icon: '🛡️',
    targetValue: 1,
    rewardCoins: 3000,
    rewardGems: 75,
    rewardXP: 750,
  },
  {
    id: 'friends_5',
    title: 'Popular Player',
    description: 'Add 5 friends',
    category: 'SOCIAL',
    icon: '🤝',
    targetValue: 5,
    rewardCoins: 1000,
    rewardGems: 25,
    rewardXP: 200,
  },
  {
    id: 'tournament_champ',
    title: 'Tournament Champion',
    description: 'Win 1 official tournament',
    category: 'TOURNAMENT',
    icon: '🥇',
    targetValue: 1,
    rewardCoins: 15000,
    rewardGems: 300,
    rewardXP: 3000,
  },
];
