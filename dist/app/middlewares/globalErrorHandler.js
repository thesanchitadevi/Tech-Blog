"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const AppError_1 = require("../errors/AppError");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const CustomeErrors_1 = require("../errors/CustomeErrors");
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Internal Server Error';
    let errorSources = [
        {
            name: '',
            path: '',
            type: '',
            message: 'Something went wrong',
        },
    ];
    if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(error);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        message = simplifiedError.message;
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        errorSources = simplifiedError.errorSources;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (error instanceof AppError_1.AppError ||
        error instanceof CustomeErrors_1.AuthenticationError ||
        error instanceof CustomeErrors_1.AuthorizationError ||
        error instanceof CustomeErrors_1.InternalServerError ||
        error instanceof CustomeErrors_1.NotFoundError) {
        statusCode = error.statusCode;
        message = error.message;
        errorSources = [
            {
                name: error === null || error === void 0 ? void 0 : error.name,
                path: '',
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        ];
    }
    else if (error instanceof Error) {
        message = error.message;
        errorSources = [
            {
                name: error === null || error === void 0 ? void 0 : error.name,
                path: '',
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        error: { details: error.details || errorSources },
        stack: config_1.default.NODE_ENV === 'development' ? error === null || error === void 0 ? void 0 : error.stack : null,
    });
};
exports.default = globalErrorHandler;
