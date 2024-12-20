import { HttpStatus } from 'http-status-ts';
import { AppError } from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { IUserLogin, IUserRegister } from './auth.interface';
import config from '../../config';
import { createToken } from './auth.utils';

// Register a new user in the database
const registerUser = async (payload: IUserRegister) => {
  // Check if the email is already taken
  if (await UserModel.isEmailTaken(payload.email)) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'Email is already taken');
  }

  const user = await UserModel.create(payload);
  return user;
};

// Login a user and generate access and refresh tokens
const loginUser = async (payload: IUserLogin) => {
  const user = await UserModel.findOne({ email: payload.email });

  // Check if the user exists
  if (!user) {
    throw new AppError(HttpStatus.NOT_FOUND, 'User not found');
  }

  // Check if the user is blocked
  if (user.isBlocked) {
    throw new AppError(HttpStatus.FORBIDDEN, 'User is blocked');
  }

  // Check if the password is matched
  const isPasswordMatched = await UserModel.isPasswordMatched(
    payload.password,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(HttpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  // JWT payload
  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  // access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    user,
    accessToken,
  };
};

export const authServices = {
  registerUser,
  loginUser,
};
