import mongoose, { Schema, Document } from 'mongoose';

export interface IShopItem extends Document {
  itemId: string;
  name: string;
  description: string;
  category: 'BOARD_THEME' | 'TOKEN_SKIN' | 'DICE_SKIN' | 'AVATAR_FRAME' | 'EMOTE_PACK' | 'POWERUP_BUNDLE';
  price: number;
  currency: 'COINS' | 'GEMS';
  imageUrl: string;
  assetKey: string;
  isLimitedTime: boolean;
}

const ShopItemSchema = new Schema<IShopItem>(
  {
    itemId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, enum: ['COINS', 'GEMS'], default: 'COINS' },
    imageUrl: { type: String, required: true },
    assetKey: { type: String, required: true },
    isLimitedTime: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ShopItemModel = mongoose.model<IShopItem>('ShopItem', ShopItemSchema);
