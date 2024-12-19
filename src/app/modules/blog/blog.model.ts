import { model, Schema } from 'mongoose';
import { IBlog } from './blog.interface';

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
  },
  {
    timestamps: true,
  },
);

export const BlogModel = model<IBlog>('Blog', BlogSchema);