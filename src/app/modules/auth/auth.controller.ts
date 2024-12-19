import { HttpStatus } from 'http-status-ts';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const user = await authServices.registerUser(req.body);
  console.log('user', user);

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export const authControllers = {
  registerUser,
};
