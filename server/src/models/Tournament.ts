import mongoose, { Schema, Document } from 'mongoose';

export interface ITournament extends Document {
  name: string;
  description: string;
  format: 'SINGLE_ELIMINATION' | 'ROUND_ROBIN' | 'KNOCKOUT';
  status: 'UPCOMING' | 'REGISTRATION_OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  maxParticipants: number;
  entryFeeCoins: number;
  entryFeeGems: number;
  prizes: any[];
  participants: any[];
  matches: any[];
  currentRound: number;
  totalRounds: number;
  startTime: Date;
  winnerId?: string;
}

const TournamentSchema = new Schema<ITournament>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    format: { type: String, enum: ['SINGLE_ELIMINATION', 'ROUND_ROBIN', 'KNOCKOUT'], default: 'SINGLE_ELIMINATION' },
    status: { type: String, enum: ['UPCOMING', 'REGISTRATION_OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'], default: 'UPCOMING' },
    maxParticipants: { type: Number, default: 16 },
    entryFeeCoins: { type: Number, default: 100 },
    entryFeeGems: { type: Number, default: 0 },
    prizes: [{ type: Schema.Types.Mixed }],
    participants: [{ type: Schema.Types.Mixed }],
    matches: [{ type: Schema.Types.Mixed }],
    currentRound: { type: Number, default: 1 },
    totalRounds: { type: Number, default: 4 },
    startTime: { type: Date, required: true },
    winnerId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Tournament = mongoose.model<ITournament>('Tournament', TournamentSchema);
