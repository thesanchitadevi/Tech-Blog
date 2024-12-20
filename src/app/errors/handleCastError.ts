import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      name: error?.name,
      path: error?.path,
      type: error?.kind,
      message: error?.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error: Invalid ID',
    errorSources,
  };
};

export default handleCastError;
