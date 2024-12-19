import { Router } from 'express';
import { AuthRouter } from '../modules/auth/auth.routes';
import { UserRouter } from '../modules/user/user.routes';
import { BlogRouter } from '../modules/blog/blog.routes';

const router = Router();

// Application routes
const moduleRoutes = [
  {
    path: '/auth',
    module: AuthRouter,
  },
  {
    path: '/admin',
    module: UserRouter,
  },
  {
    path: '/blogs',
    module: BlogRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.module);
});

export default router;
