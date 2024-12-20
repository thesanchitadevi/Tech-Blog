"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.InternalServerError = exports.AuthorizationError = exports.AuthenticationError = void 0;
// Custom error classes
class AuthenticationError extends Error {
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
exports.AuthenticationError = AuthenticationError;
class AuthorizationError extends Error {
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
exports.AuthorizationError = AuthorizationError;
class InternalServerError extends Error {
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
exports.InternalServerError = InternalServerError;
class NotFoundError extends Error {
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
exports.NotFoundError = NotFoundError;
