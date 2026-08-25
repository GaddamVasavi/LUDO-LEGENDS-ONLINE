import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  avatarUrl: string;
  bio?: string;
  level: number;
  xp: number;
  coins: number;
  gems: number;
  eloRating: number;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND' | 'LEGEND';
  stats: {
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    tokensCaptured: number;
    tokensLost: number;
    totalSixesRolled: number;
    longestWinStreak: number;
    currentWinStreak: number;
    tournamentWins: number;
    tournamentFinals: number;
    totalCoinsEarned: number;
    totalGemsEarned: number;
  };
  customization: {
    equippedBoardTheme: string;
    equippedTokenSkin: string;
    equippedDiceSkin: string;
    equippedAvatarFrame: string;
    equippedEmoteSet: string[];
  };
  isOnline: boolean;
  lastActive: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true, index: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true },
    avatarUrl: { type: String, default: '/assets/images/avatars/default.png' },
    bio: { type: String, default: 'Ludo Legend in the making!' },
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    coins: { type: Number, default: 1000 }, // Starting bonus
    gems: { type: Number, default: 20 },
    eloRating: { type: Number, default: 1000, index: true },
    tier: { type: String, enum: ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'LEGEND'], default: 'BRONZE' },
    stats: {
      gamesPlayed: { type: Number, default: 0 },
      gamesWon: { type: Number, default: 0 },
      gamesLost: { type: Number, default: 0 },
      tokensCaptured: { type: Number, default: 0 },
      tokensLost: { type: Number, default: 0 },
      totalSixesRolled: { type: Number, default: 0 },
      longestWinStreak: { type: Number, default: 0 },
      currentWinStreak: { type: Number, default: 0 },
      tournamentWins: { type: Number, default: 0 },
      tournamentFinals: { type: Number, default: 0 },
      totalCoinsEarned: { type: Number, default: 1000 },
      totalGemsEarned: { type: Number, default: 20 },
    },
    customization: {
      equippedBoardTheme: { type: String, default: 'theme_classic' },
      equippedTokenSkin: { type: String, default: 'token_standard' },
      equippedDiceSkin: { type: String, default: 'dice_classic' },
      equippedAvatarFrame: { type: String, default: 'frame_default' },
      equippedEmoteSet: { type: [String], default: ['thumbs_up', 'laughing', 'crying', 'angry'] },
    },
    isOnline: { type: Boolean, default: false },
    lastActive: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.passwordHash);
};

export const User = mongoose.model<IUser>('User', UserSchema);
