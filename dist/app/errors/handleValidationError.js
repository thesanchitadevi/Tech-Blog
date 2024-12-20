"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (error) => {
    const errorSources = Object.values(error.errors).map((value) => {
        return {
            name: value === null || value === void 0 ? void 0 : value.name,
            path: value === null || value === void 0 ? void 0 : value.path,
            type: value === null || value === void 0 ? void 0 : value.kind,
            message: value === null || value === void 0 ? void 0 : value.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    };
};
exports.default = handleValidationError;
