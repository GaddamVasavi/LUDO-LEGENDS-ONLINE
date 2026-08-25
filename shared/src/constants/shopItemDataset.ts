import { ShopItem } from '../types/shop.js';

export const FULL_SHOP_ITEMS_DATASET: ShopItem[] = Array.from({ length: 350 }, (_, idx) => {
  const i = idx + 1;
  const categories: Array<'BOARD_THEME' | 'TOKEN_SKIN' | 'DICE_SKIN' | 'AVATAR_FRAME' | 'EMOTE_PACK' | 'POWERUP_BUNDLE'> = [
    'BOARD_THEME', 'TOKEN_SKIN', 'DICE_SKIN', 'AVATAR_FRAME', 'EMOTE_PACK', 'POWERUP_BUNDLE'
  ];
  const category = categories[i % categories.length];

  return {
    id: `shop_full_${i}`,
    name: `Premium Customization #${i}`,
    description: `Unlock rare ${category.replace('_', ' ')} #${i} for your character profile and board.`,
    category,
    price: i % 4 === 0 ? i * 15 : i * 400,
    currency: i % 4 === 0 ? 'GEMS' : 'COINS',
    imageUrl: `/assets/images/shop/item_${i}.png`,
    assetKey: `ASSET_KEY_${i}`,
    isLimitedTime: i % 7 === 0,
    discountPercent: i % 5 === 0 ? 15 : 0,
    requiredLevel: Math.min(100, i),
    previewColors: ['#E74C3C', '#2ECC71', '#F1C40F', '#3498DB'],
  };
});
