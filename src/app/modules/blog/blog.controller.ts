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

export const blogControllers = {
  createBlog,
};
