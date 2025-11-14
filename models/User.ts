import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'student' | 'counselor' | 'admin';
  collegeId: string;
  phone?: string;
  department?: string;
  year?: number;
  counselorSpecialization?: string;
  bio?: string;
  isAvailable?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'counselor', 'admin'],
      default: 'student',
    },
    collegeId: {
      type: String,
      required: true,
    },
    phone: String,
    department: String,
    year: Number,
    counselorSpecialization: String,
    bio: String,
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
