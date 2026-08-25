export type ShopCategory = 'BOARD_THEME' | 'TOKEN_SKIN' | 'DICE_SKIN' | 'AVATAR_FRAME' | 'EMOTE_PACK' | 'POWERUP_BUNDLE';
export type CurrencyType = 'COINS' | 'GEMS';

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  category: ShopCategory;
  price: number;
  currency: CurrencyType;
  imageUrl: string;
  assetKey: string;
  isLimitedTime?: boolean;
  discountPercent?: number;
  requiredLevel?: number;
  requiredTier?: string;
  previewColors?: string[];
}

export interface UserInventoryItem {
  id: string;
  userId: string;
  itemId: string;
  purchasedAt: number;
  isEquipped: boolean;
}
