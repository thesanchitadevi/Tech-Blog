// App error handling
export class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack = '') {
    super(message);
    this.statusCode = statusCode;
    // more error details
    this.name = this.constructor.name;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
