import { z } from 'zod';

const createBlogSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  content: z.string({
    required_error: 'Content is required',
  }),
});

export const BlogValidation = {
  createBlogSchema,
};
