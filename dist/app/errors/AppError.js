"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
// App error handling
class AppError extends Error {
    constructor(statusCode, message, stack = '') {
        super(message);
        this.statusCode = statusCode;
        // more error details
        this.name = this.constructor.name;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.AppError = AppError;
