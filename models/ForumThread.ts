import mongoose, { Schema, Document } from 'mongoose';

export interface IForumThread extends Document {
  title: string;
  description: string;
  category: 'anxiety' | 'depression' | 'stress' | 'relationships' | 'academic' | 'identity' | 'other';
  authorId: string;
  authorName: string;
  content: string;
  tags: string[];
  replies: Array<{
    _id: string;
    authorId: string;
    authorName: string;
    content: string;
    isVolunteer: boolean;
    createdAt: Date;
  }>;
  status: 'active' | 'archived' | 'moderated';
  isPinned: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const forumThreadSchema = new Schema<IForumThread>(
  {
    title: { type: String, required: true },
    description: String,
    category: {
      type: String,
      enum: ['anxiety', 'depression', 'stress', 'relationships', 'academic', 'identity', 'other'],
      default: 'other',
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    authorName: String,
    content: { type: String, required: true },
    tags: [String],
    replies: [
      {
        authorId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        authorName: String,
        content: String,
        isVolunteer: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'archived', 'moderated'],
      default: 'active',
    },
    isPinned: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ForumThread = mongoose.models.ForumThread || mongoose.model<IForumThread>('ForumThread', forumThreadSchema);
