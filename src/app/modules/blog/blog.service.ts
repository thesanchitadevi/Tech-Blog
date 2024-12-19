import { IBlog } from './blog.interface';
import { BlogModel } from './blog.model';

const createBlogIntoDB = async (payload: IBlog) => {
  // Create a new blog in the database
  const blog = await BlogModel.create(payload);

  // Populate the author field with name, email, and role
  const populatedBlog = await blog.populate('author', 'name email role');
  return populatedBlog;
};

export const blogServices = {
  createBlogIntoDB,
};
