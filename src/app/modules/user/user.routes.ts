import express from 'express';
import { userControllers } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Block user route - admin only
router.patch('/users/:userId/block', auth('admin'), userControllers.blockUser);

export const UserRouter = router;
