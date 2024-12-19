import { HttpStatus } from 'http-status-ts';
import { AppError } from '../../errors/AppError';
import { UserModel } from './user.model';

const blockUserDB = async (userId: string) => {
  const user = await UserModel.findByIdAndUpdate(
    {
      _id: userId,
      role: 'user',
    },
    { isBlocked: true },
    { new: true },
  );
  console.log(user);

  if (!user) {
    throw new AppError(HttpStatus.NOT_FOUND, 'User not found');
  }

  return user;
};

export const userServices = {
  blockUserDB,
};
