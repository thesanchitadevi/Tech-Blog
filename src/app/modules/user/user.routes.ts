import express from 'express';
import { userControllers } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Block user route - admin only
router.patch(
  '/users/:userId/block',
  auth('admin'),
  userControllers.blockUserHandle,
);

// Admin can delete any blog
router.delete('/blogs/:id', auth('admin'), userControllers.deleteBlog);

export const UserRouter = router;
