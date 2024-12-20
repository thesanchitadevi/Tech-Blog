import { HttpStatus } from 'http-status-ts';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { blogServices } from './blog.service';
import { JwtPayload } from 'jsonwebtoken';

const createBlog = catchAsync(async (req, res) => {
  // user details are stored in req.user
  const user = req.user as JwtPayload;

  const blog = await blogServices.createBlogIntoDB({
    ...req.body,
    author: user.userId,
  });

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: {
      _id: blog._id,
      title: blog.title,
      content: blog.content,
      author: blog.author,
    },
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const blogs = await blogServices.getBlogsFromDB(req.query);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: blogs,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const user = req.user as JwtPayload; // Extract user ID from authenticated user

  const { id: blogId } = req.params;

  const blog = await blogServices.updateBlogInDB(blogId, user.userId, req.body);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: blog,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const user = req.user as JwtPayload; // Extract user ID from authenticated user

  const { id: blogId } = req.params;

  await blogServices.deleteBlogFromDB(blogId, user.userId);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: HttpStatus.OK,
  });
});

export const blogControllers = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
