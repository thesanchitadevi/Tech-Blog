import express from 'express';
import { blogControllers } from './blog.controller';
import { BlogValidation } from './blog.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(BlogValidation.createBlogSchema),
  blogControllers.createBlog,
);

router.get('/', blogControllers.getAllBlogs);

router.patch('/:id', auth('user'), blogControllers.updateBlog);

export const BlogRouter = router;
