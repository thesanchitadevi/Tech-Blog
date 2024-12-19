import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { authControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerUserSchema),
  authControllers.registerUser,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginUserSchema),
  authControllers.loginUser,
);

export const AuthRouter = router;
