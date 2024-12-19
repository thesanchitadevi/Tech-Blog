import { Types } from 'mongoose';

export interface IBlog {
  title: string;
  content: string;
  author: Types.ObjectId; // User ID of the blog's author
  isPublished: boolean;
}
