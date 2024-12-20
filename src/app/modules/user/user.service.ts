import { HttpStatus } from 'http-status-ts';
import { AppError } from '../../errors/AppError';
import { UserModel } from './user.model';
import { BlogModel } from '../blog/blog.model';

// Block a user from the database
const blockUserHandleFromDB = async (userId: string) => {
  const user = await UserModel.findByIdAndUpdate(
    {
      _id: userId,
      role: 'user',
    },
    { isBlocked: true },
    { new: true },
  );

  if (!user) {
    throw new AppError(HttpStatus.NOT_FOUND, 'User not found');
  }

  return user;
};

// Admin can delete any blog from the database
const deleteBlogFromDB = async (id: string) => {
  const blog = await BlogModel.findByIdAndDelete({ _id: id });

  if (!blog) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Blog not found');
  }

  return blog;
};

export const userServices = {
  blockUserHandleFromDB,
  deleteBlogFromDB,
};
