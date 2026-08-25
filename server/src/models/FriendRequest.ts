import mongoose, { Schema, Document } from 'mongoose';

export interface IFriendRequest extends Document {
  senderId: string;
  receiverId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

const FriendRequestSchema = new Schema<IFriendRequest>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    status: { type: String, enum: ['PENDING', 'ACCEPTED', 'REJECTED'], default: 'PENDING' },
  },
  { timestamps: true }
);

export const FriendRequest = mongoose.model<IFriendRequest>('FriendRequest', FriendRequestSchema);
