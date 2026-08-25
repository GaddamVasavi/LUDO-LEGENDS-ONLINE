import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestProgress extends Document {
  userId: mongoose.Types.ObjectId;
  questId: string;
  currentCount: number;
  targetCount: number;
  isCompleted: boolean;
  isClaimed: boolean;
}

const QuestProgressSchema = new Schema<IQuestProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    questId: { type: String, required: true },
    currentCount: { type: Number, default: 0 },
    targetCount: { type: Number, required: true },
    isCompleted: { type: Boolean, default: false },
    isClaimed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const QuestProgress = mongoose.model<IQuestProgress>('QuestProgress', QuestProgressSchema);
