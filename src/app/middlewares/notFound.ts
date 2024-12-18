import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from 'http-status-ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFound = (_req: Request, res: Response, _next: NextFunction) => {
  res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    message: 'Resource not found',
    error: '',
  });
};

export default notFound;
