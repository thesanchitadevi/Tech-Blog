import { HttpStatus } from 'http-status-ts';
import { AppError } from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { IUserRegister } from './auth.interface';

const registerUser = async (payload: IUserRegister) => {
  // Check if the email is already taken
  if (await UserModel.isEmailTaken(payload.email)) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'Email is already taken');
  }

  const user = await UserModel.create(payload);
  console.log('user', user);

  return user;
};

// const loginUser = async (payload: IUserLogin) => {};

export const authServices = {
  registerUser,
};
