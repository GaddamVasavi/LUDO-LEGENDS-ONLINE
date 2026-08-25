import { AchievementDef } from './achievements.js';

export const FULL_ACHIEVEMENTS_DATASET: AchievementDef[] = Array.from({ length: 350 }, (_, idx) => {
  const i = idx + 1;
  const categories: Array<'GAMEPLAY' | 'WINS' | 'SOCIAL' | 'COLLECTION' | 'TOURNAMENT'> = [
    'GAMEPLAY', 'WINS', 'SOCIAL', 'COLLECTION', 'TOURNAMENT'
  ];
  const category = categories[i % categories.length];

  return {
    id: `ach_full_${i}`,
    title: `Mastery Challenge #${i}`,
    description: `Complete stage ${i} in multiplayer match challenges and unlock legendary rewards.`,
    category,
    icon: i % 2 === 0 ? '🏆' : '🏅',
    targetValue: i * 3,
    rewardCoins: i * 300,
    rewardGems: i * 5,
    rewardXP: i * 75,
  };
});
