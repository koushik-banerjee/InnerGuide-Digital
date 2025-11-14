import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalytics extends Document {
  userId: string;
  date: Date;
  moodScore: number; // 1-5 scale
  stressLevel: number; // 1-5 scale
  sleepHours: number;
  exerciseMinutes: number;
  chatInteractions: number;
  forumPosts: number;
  counselingSessionsAttended: number;
  resourcesViewed: number;
  notes?: string;
  createdAt: Date;
}

const analyticsSchema = new Schema<IAnalytics>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    moodScore: { type: Number, min: 1, max: 5 },
    stressLevel: { type: Number, min: 1, max: 5 },
    sleepHours: Number,
    exerciseMinutes: Number,
    chatInteractions: { type: Number, default: 0 },
    forumPosts: { type: Number, default: 0 },
    counselingSessionsAttended: { type: Number, default: 0 },
    resourcesViewed: { type: Number, default: 0 },
    notes: String,
  },
  { timestamps: true }
);

analyticsSchema.index({ userId: 1, date: -1 });

export const Analytics = mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', analyticsSchema);
