import { Response } from 'express';

type TResponseData<T> = {
  statusCode: number;
  message?: string;
  success: boolean;
  data?: T;
};

const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
    data: data.data,
  });
};

export default sendResponse;
