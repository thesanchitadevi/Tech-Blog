import { Types } from 'mongoose';

export interface IBlog {
  _id?: string;
  title: string;
  content: string;
  author: Types.ObjectId; // User ID of the blog's author
  isPublished: boolean;
}
