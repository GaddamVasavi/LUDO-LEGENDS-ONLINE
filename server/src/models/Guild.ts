import mongoose, { Schema, Document } from 'mongoose';

export interface IGuild extends Document {
  name: string;
  tag: string;
  description: string;
  emblemUrl: string;
  bannerUrl: string;
  level: number;
  xp: number;
  trophies: number;
  leaderUserId: mongoose.Types.ObjectId;
  members: any[];
  maxMembers: number;
  isPublic: boolean;
  minEloRequired: number;
}

const GuildSchema = new Schema<IGuild>(
  {
    name: { type: String, required: true, unique: true, trim: true, index: true },
    tag: { type: String, required: true, unique: true, uppercase: true, trim: true, maxlength: 5 },
    description: { type: String, default: 'Join us to dominate Ludo Legends!' },
    emblemUrl: { type: String, default: '/assets/images/guilds/emblem_default.png' },
    bannerUrl: { type: String, default: '/assets/images/guilds/banner_default.png' },
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    trophies: { type: Number, default: 0 },
    leaderUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.Mixed }],
    maxMembers: { type: Number, default: 30 },
    isPublic: { type: Boolean, default: true },
    minEloRequired: { type: Number, default: 1000 },
  },
  { timestamps: true }
);

export const GuildModel = mongoose.model<IGuild>('Guild', GuildSchema);
