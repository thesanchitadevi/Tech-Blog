import { HttpStatus } from 'http-status-ts';
import { UserModel } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import { AppError } from '../../errors/AppError';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: ILoginUser) => {
  // check if the user is exists
  const user = await UserModel.isUserExistsByCustomId(payload.id);
  if (!user) {
    throw new AppError(HttpStatus.NOT_FOUND, 'User not found !');
  }

  // check if the user is deleted
  const isDeletdUser = user?.isDeleted;
  if (isDeletdUser) {
    throw new AppError(HttpStatus.NOT_FOUND, 'User is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(HttpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  // checking if the password is correct
  if (!(await UserModel.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(HttpStatus.FORBIDDEN, 'Password is incorrect !');

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  // access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  // check if the user is exists
  const user = await UserModel.isUserExistsByCustomId(userData.userId);
  if (!user) {
    throw new AppError(HttpStatus.NOT_FOUND, 'User not found !');
  }

  // check if the user is deleted
  const isDeletdUser = user?.isDeleted;
  if (isDeletdUser) {
    throw new AppError(HttpStatus.NOT_FOUND, 'User is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(HttpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  // checking if the password is correct
  if (
    !(await UserModel.isPasswordMatched(payload?.oldPassword, user?.password))
  )
    throw new AppError(HttpStatus.FORBIDDEN, 'Password is incorrect !');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bycrpt_salt),
  );

  await UserModel.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  // checking if the token is missing
  if (!token) {
    throw new AppError(HttpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  // checking if the token is valid
  const decoded = jwt.verify(token, config.jwt_refresh_secret as string);

  const { userId, iat } = decoded as JwtPayload;

  // check if the user is exists
  const user = await UserModel.isUserExistsByCustomId(userId);
  if (!user) {
    throw new AppError(HttpStatus.NOT_FOUND, 'User not found !');
  }

  // check if the user is deleted
  const isDeletdUser = user?.isDeleted;
  if (isDeletdUser) {
    throw new AppError(HttpStatus.NOT_FOUND, 'User is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(HttpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  if (
    user.passwordChangedAt &&
    UserModel.isJWTIssuedBeforePasswordChanged(
      user.passwordChangedAt,
      iat as number,
    )
  ) {
    throw new AppError(HttpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
};
