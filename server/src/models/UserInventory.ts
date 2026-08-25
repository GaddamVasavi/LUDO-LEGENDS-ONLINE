import mongoose, { Schema, Document } from 'mongoose';

export interface IUserInventory extends Document {
  userId: string;
  itemId: string;
  purchasedAt: Date;
  isEquipped: boolean;
}

const UserInventorySchema = new Schema<IUserInventory>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    itemId: { type: String, required: true },
    purchasedAt: { type: Date, default: Date.now },
    isEquipped: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserInventory = mongoose.model<IUserInventory>('UserInventory', UserInventorySchema);
