import QueryBuilder from '../../builder/QueryBuilder';
import { BlogSearchableFields } from './blog.constant';
import { IBlog } from './blog.interface';
import { BlogModel } from './blog.model';

const createBlogIntoDB = async (payload: IBlog) => {
  // Create a new blog in the database
  const blog = await BlogModel.create(payload);

  // Populate the author field with name, email, and role
  const populatedBlog = await blog.populate('author', 'name email role');
  return populatedBlog;
};

const getBlogsFromDB = async (query: Record<string, unknown>) => {
  // Get all blogs from the database
  const blogQuery = new QueryBuilder(
    BlogModel.find().populate('author', 'name email role'),
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

export const blogServices = {
  createBlogIntoDB,
  getBlogsFromDB,
};
