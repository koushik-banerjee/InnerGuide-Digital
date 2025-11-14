import mongoose, { Schema, Document } from 'mongoose';

export interface IResource extends Document {
  title: string;
  description: string;
  category: 'video' | 'audio' | 'guide' | 'article';
  type: 'coping-strategy' | 'meditation' | 'sleep' | 'exercise' | 'nutrition' | 'stress-management' | 'anxiety' | 'depression' | 'relationships' | 'academic';
  languages: string[];
  content: {
    url?: string;
    text?: string;
    duration?: number;
  };
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const resourceSchema = new Schema<IResource>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['video', 'audio', 'guide', 'article'],
      required: true,
    },
    type: {
      type: String,
      enum: ['coping-strategy', 'meditation', 'sleep', 'exercise', 'nutrition', 'stress-management', 'anxiety', 'depression', 'relationships', 'academic'],
      required: true,
    },
    languages: [{ type: String, default: 'en' }],
    content: {
      url: String,
      text: String,
      duration: Number,
    },
    tags: [String],
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    rating: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Resource = mongoose.models.Resource || mongoose.model<IResource>('Resource', resourceSchema);
