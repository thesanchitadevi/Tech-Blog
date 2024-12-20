"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (error) => {
    const errorSources = error.issues.map((issue) => {
        return {
            name: 'ZodError',
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1], // Get the last element of the path array
            type: issue === null || issue === void 0 ? void 0 : issue.code,
            message: issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Zod Validation Error',
        errorSources,
    };
};
exports.default = handleZodError;