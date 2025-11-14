import mongoose, { Schema, Document } from 'mongoose';

export interface ICounselor extends Document {
  userId: string;
  specializations: string[];
  qualifications: string;
  availableDays: string[];
  availableHours: {
    start: string;
    end: string;
  };
  consultationDuration: number;
  consultationFee: number;
  description: string;
  rating: number;
  totalSessions: number;
  createdAt: Date;
  updatedAt: Date;
}

const counselorSchema = new Schema<ICounselor>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    specializations: [String],
    qualifications: String,
    availableDays: [String],
    availableHours: {
      start: String,
      end: String,
    },
    consultationDuration: { type: Number, default: 60 },
    consultationFee: { type: Number, default: 0 },
    description: String,
    rating: { type: Number, default: 0 },
    totalSessions: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Counselor = mongoose.models.Counselor || mongoose.model<ICounselor>('Counselor', counselorSchema);
