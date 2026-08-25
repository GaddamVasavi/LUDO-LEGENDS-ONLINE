import { AchievementDef } from './achievements.js';
import { QuestDef } from '../types/quest.js';
import { ShopItem } from '../types/shop.js';

/**
 * Master Seed Catalog for Ludo Legends Online.
 * Contains definitions for achievements, quests, level XP scaling tables, shop cosmetics, and rank tiers.
 */

// 1. Level XP Progression Table (Levels 1 to 100)
export const LEVEL_XP_TABLE: Record<number, number> = (() => {
  const table: Record<number, number> = {};
  let currentXp = 100;
  for (let lvl = 1; lvl <= 100; lvl++) {
    table[lvl] = currentXp;
    currentXp = Math.floor(currentXp * 1.12 + 50);
  }
  return table;
})();

// 2. Comprehensive Achievements Catalog (100 Achievements)
export const EXTENDED_ACHIEVEMENTS_CATALOG: AchievementDef[] = Array.from({ length: 100 }, (_, i) => {
  const idNum = i + 1;
  const categories: Array<'GAMEPLAY' | 'WINS' | 'SOCIAL' | 'COLLECTION' | 'TOURNAMENT'> = [
    'GAMEPLAY', 'WINS', 'SOCIAL', 'COLLECTION', 'TOURNAMENT'
  ];
  const cat = categories[i % categories.length];

  return {
    id: `achievement_${idNum}`,
    title: `Ludo Milestone #${idNum}`,
    description: `Achieve rank status level #${idNum} in multiplayer Ludo matches.`,
    category: cat,
    icon: idNum % 2 === 0 ? '🏆' : '⭐',
    targetValue: idNum * 5,
    rewardCoins: idNum * 250,
    rewardGems: idNum * 5,
    rewardXP: idNum * 50,
  };
});

// 3. Comprehensive Shop Cosmetics Catalog (100 Cosmetic Items)
export const EXTENDED_SHOP_CATALOG: ShopItem[] = Array.from({ length: 100 }, (_, i) => {
  const idNum = i + 1;
  const categories: Array<'BOARD_THEME' | 'TOKEN_SKIN' | 'DICE_SKIN' | 'AVATAR_FRAME' | 'EMOTE_PACK' | 'POWERUP_BUNDLE'> = [
    'BOARD_THEME', 'TOKEN_SKIN', 'DICE_SKIN', 'AVATAR_FRAME', 'EMOTE_PACK', 'POWERUP_BUNDLE'
  ];
  const cat = categories[i % categories.length];

  return {
    id: `shop_item_${idNum}`,
    name: `Legendary ${cat.replace('_', ' ')} #${idNum}`,
    description: `Exclusive premium custom cosmetic item #${idNum} for your Ludo profile.`,
    category: cat,
    price: idNum % 3 === 0 ? idNum * 10 : idNum * 500,
    currency: idNum % 3 === 0 ? 'GEMS' : 'COINS',
    imageUrl: `/assets/images/catalog/item_${idNum}.png`,
    assetKey: `KEY_${idNum}`,
    isLimitedTime: idNum % 5 === 0,
    discountPercent: idNum % 4 === 0 ? 20 : 0,
    requiredLevel: Math.min(50, Math.floor(idNum / 2)),
  };
});

// 4. Daily & Weekly Quest Catalog (50 Quests)
export const EXTENDED_QUESTS_CATALOG: QuestDef[] = Array.from({ length: 50 }, (_, i) => {
  const idNum = i + 1;
  const isDaily = i % 2 === 0;

  return {
    id: `quest_${idNum}`,
    title: `${isDaily ? 'Daily Challenge' : 'Weekly Challenge'} #${idNum}`,
    description: `Play matches and capture ${idNum * 2} tokens in ${isDaily ? 'Daily' : 'Weekly'} mode.`,
    type: isDaily ? 'DAILY' : 'WEEKLY',
    category: 'CAPTURES',
    targetCount: idNum * 2,
    reward: {
      coins: idNum * 200,
      gems: idNum * 4,
      xp: idNum * 40,
    },
    icon: '🎯',
    expirationHours: isDaily ? 24 : 168,
  };
});
