import mongoose, { Schema, Document } from 'mongoose';

export interface IGameReplay extends Document {
  gameId: string;
  roomCode: string;
  mode: string;
  players: any[];
  winners: string[];
  moveLogs: any[];
  durationSeconds: number;
}

const GameReplaySchema = new Schema<IGameReplay>(
  {
    gameId: { type: String, required: true, unique: true, index: true },
    roomCode: { type: String, required: true },
    mode: { type: String, required: true },
    players: [{ type: Schema.Types.Mixed }],
    winners: [{ type: String }],
    moveLogs: [{ type: Schema.Types.Mixed }],
    durationSeconds: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const GameReplay = mongoose.model<IGameReplay>('GameReplay', GameReplaySchema);
