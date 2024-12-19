import { Router } from 'express';
import { AuthRouter } from '../modules/auth/auth.routes';

const router = Router();

// Application routes
const moduleRoutes = [
  {
    path: '/auth',
    module: AuthRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.module);
});

export default router;
