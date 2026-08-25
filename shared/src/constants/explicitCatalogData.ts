import { AchievementDef } from './achievements.js';
import { ShopItem } from '../types/shop.js';

export const EXPLICIT_ACHIEVEMENT_RECORDS: AchievementDef[] = [
  { id: 'ach_1', title: 'First Blood', description: 'Win your very first match in Ludo Legends Online.', category: 'WINS', icon: '🏆', targetValue: 1, rewardCoins: 500, rewardGems: 10, rewardXP: 100 },
  { id: 'ach_2', title: 'Double Trouble', description: 'Win 2 consecutive multiplayer matches.', category: 'WINS', icon: '🏆', targetValue: 2, rewardCoins: 1000, rewardGems: 20, rewardXP: 200 },
  { id: 'ach_3', title: 'Triple Threat', description: 'Win 3 consecutive multiplayer matches.', category: 'WINS', icon: '🏆', targetValue: 3, rewardCoins: 1500, rewardGems: 30, rewardXP: 300 },
  { id: 'ach_4', title: 'Unstoppable', description: 'Win 5 consecutive multiplayer matches.', category: 'WINS', icon: '🔥', targetValue: 5, rewardCoins: 2500, rewardGems: 50, rewardXP: 500 },
  { id: 'ach_5', title: 'Dominator', description: 'Win 10 matches total across all game modes.', category: 'WINS', icon: '⭐', targetValue: 10, rewardCoins: 5000, rewardGems: 100, rewardXP: 1000 },
  { id: 'ach_6', title: 'Master Player', description: 'Win 25 matches total across all game modes.', category: 'WINS', icon: '🌟', targetValue: 25, rewardCoins: 12500, rewardGems: 250, rewardXP: 2500 },
  { id: 'ach_7', title: 'Grandmaster', description: 'Win 50 matches total across all game modes.', category: 'WINS', icon: '👑', targetValue: 50, rewardCoins: 25000, rewardGems: 500, rewardXP: 5000 },
  { id: 'ach_8', title: 'Legendary Champion', description: 'Win 100 matches total across all game modes.', category: 'WINS', icon: '👑', targetValue: 100, rewardCoins: 50000, rewardGems: 1000, rewardXP: 10000 },
  { id: 'ach_9', title: 'Pawn Hunter I', description: 'Capture 5 opponent tokens.', category: 'GAMEPLAY', icon: '🎯', targetValue: 5, rewardCoins: 500, rewardGems: 10, rewardXP: 100 },
  { id: 'ach_10', title: 'Pawn Hunter II', description: 'Capture 15 opponent tokens.', category: 'GAMEPLAY', icon: '🎯', targetValue: 15, rewardCoins: 1500, rewardGems: 30, rewardXP: 300 },
  { id: 'ach_11', title: 'Pawn Hunter III', description: 'Capture 30 opponent tokens.', category: 'GAMEPLAY', icon: '⚔️', targetValue: 30, rewardCoins: 3000, rewardGems: 60, rewardXP: 600 },
  { id: 'ach_12', title: 'Pawn Hunter IV', description: 'Capture 60 opponent tokens.', category: 'GAMEPLAY', icon: '⚔️', targetValue: 60, rewardCoins: 6000, rewardGems: 120, rewardXP: 1200 },
  { id: 'ach_13', title: 'Pawn Hunter V', description: 'Capture 100 opponent tokens.', category: 'GAMEPLAY', icon: '⚔️', targetValue: 100, rewardCoins: 10000, rewardGems: 200, rewardXP: 2000 },
  { id: 'ach_14', title: 'Lucky Six Roller I', description: 'Roll a 6 ten times in active matches.', category: 'GAMEPLAY', icon: '🎲', targetValue: 10, rewardCoins: 1000, rewardGems: 20, rewardXP: 200 },
  { id: 'ach_15', title: 'Lucky Six Roller II', description: 'Roll a 6 fifty times in active matches.', category: 'GAMEPLAY', icon: '🎲', targetValue: 50, rewardCoins: 5000, rewardGems: 100, rewardXP: 1000 },
  { id: 'ach_16', title: 'Lucky Six Roller III', description: 'Roll a 6 one hundred times in active matches.', category: 'GAMEPLAY', icon: '🎲', targetValue: 100, rewardCoins: 10000, rewardGems: 200, rewardXP: 2000 },
  { id: 'ach_17', title: 'Social Butterfly', description: 'Add 5 friends to your friends list.', category: 'SOCIAL', icon: '🤝', targetValue: 5, rewardCoins: 1000, rewardGems: 20, rewardXP: 200 },
  { id: 'ach_18', title: 'Popular Legend', description: 'Add 20 friends to your friends list.', category: 'SOCIAL', icon: '🤝', targetValue: 20, rewardCoins: 4000, rewardGems: 80, rewardXP: 800 },
  { id: 'ach_19', title: 'Tournament Contender', description: 'Participate in 1 official tournament.', category: 'TOURNAMENT', icon: '🥇', targetValue: 1, rewardCoins: 2000, rewardGems: 40, rewardXP: 400 },
  { id: 'ach_20', title: 'Tournament Victor', description: 'Win 1 official tournament championship.', category: 'TOURNAMENT', icon: '🥇', targetValue: 1, rewardCoins: 15000, rewardGems: 300, rewardXP: 3000 },
];
