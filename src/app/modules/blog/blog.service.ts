import { HttpStatus } from 'http-status-ts';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../errors/AppError';
import { BlogSearchableFields } from './blog.constant';
import { IBlog } from './blog.interface';
import { BlogModel } from './blog.model';

const createBlogIntoDB = async (payload: IBlog) => {
  // Create a new blog in the database
  const blog = await BlogModel.create(payload);

  // Populate the author field with name, email, and role
  const populatedBlog = await blog.populate('author', '-password');
  return populatedBlog;
};

const getBlogsFromDB = async (query: Record<string, unknown>) => {
  // Get all blogs from the database
  const blogQuery = new QueryBuilder(
    BlogModel.find().populate('author', '-password'),
    query,
  )
    .search(BlogSearchableFields)
    .filter()
    .sortBy()
    .sortOrder()
    .paginate()
    .fields();

  const result = await blogQuery.modelQuery;
  return result;
};

const updateBlogInDB = async (
  blogId: string,
  userId: string,
  payload: Partial<IBlog>,
) => {
  // Find the blog by ID
  const blog = await BlogModel.findById({ _id: blogId });

  // Check if the blog exists
  if (!blog) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Blog not found');
  }

  // Check if the user is the author of the blog
  if (blog.author.toString() !== userId) {
    throw new AppError(
      HttpStatus.FORBIDDEN,
      'You are not allowed to update this blog',
    );
  }

  // Update the blog
  const updateBlog = await BlogModel.findByIdAndUpdate(blogId, payload, {
    new: true,
    runValidators: true,
  }).populate('author', '-password');

  return updateBlog;
};

const deleteBlogFromDB = async (blogId: string, userId: string) => {
  // Find the blog by ID
  const blog = await BlogModel.findById({ _id: blogId });

  // Check if the blog exists
  if (!blog) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Blog not found');
  }

  // Check if the user is the author of the blog
  if (blog.author.toString() !== userId) {
    throw new AppError(
      HttpStatus.FORBIDDEN,
      'You are not allowed to delete this blog',
    );
  }

  // Delete the blog
  const deletedBlog = await BlogModel.findByIdAndDelete(blogId);
  return deletedBlog;
};

export const blogServices = {
  createBlogIntoDB,
  getBlogsFromDB,
  updateBlogInDB,
  deleteBlogFromDB,
};
