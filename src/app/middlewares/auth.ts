import { HttpStatus } from 'http-status-ts';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { UserModel } from '../modules/user/user.model';
import {
  AuthenticationError,
  AuthorizationError,
} from '../errors/CustomeErrors';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // checking if the token is missing
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthorizationError(
        HttpStatus.UNAUTHORIZED,
        'No authorization token provided',
      );
    }

    const token = authHeader.split(' ')[1];
    // checking if the token is valid
    const decoded = jwt.verify(token, config.jwt_access_secret as string);

    // checking if the token is valid
    if (!token || !decoded) {
      throw new AuthenticationError(
        HttpStatus.UNAUTHORIZED,
        'Invalid token provided',
      );
    }

    const { role, userId, exp } = decoded as JwtPayload;

    // Check if token is expired
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (exp && exp < currentTimestamp) {
      throw new AuthenticationError(
        HttpStatus.UNAUTHORIZED,
        'Token has expired',
      );
    }

    // check if the user is exists
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new AppError(HttpStatus.NOT_FOUND, 'User not found !');
    }

    // checking if the user is blocked
    const userStatus = user?.isBlocked;
    if (userStatus === true) {
      throw new AppError(HttpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        HttpStatus.FORBIDDEN,
        'You are not allowed to access this resource!',
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
