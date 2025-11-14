import mongoose, { Schema, Document } from 'mongoose';

export interface IVolunteer extends Document {
  userId: string;
  trainingCompletedDate: Date;
  certifications: string[];
  specializations: string[];
  status: 'active' | 'inactive' | 'training';
  repliesCount: number;
  rating: number;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}

const volunteerSchema = new Schema<IVolunteer>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    trainingCompletedDate: Date,
    certifications: [String],
    specializations: [String],
    status: {
      type: String,
      enum: ['active', 'inactive', 'training'],
      default: 'training',
    },
    repliesCount: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    bio: String,
  },
  { timestamps: true }
);

export const Volunteer = mongoose.models.Volunteer || mongoose.model<IVolunteer>('Volunteer', volunteerSchema);
