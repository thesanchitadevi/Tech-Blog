import { HttpStatus } from 'http-status-ts';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const blockUser = catchAsync(async (req, res) => {
  await userServices.blockUserDB(req.params.userId);

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: HttpStatus.OK,
  });
});

export const userControllers = {
  blockUser,
};
