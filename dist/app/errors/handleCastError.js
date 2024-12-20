"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errorSources = [
        {
            name: error === null || error === void 0 ? void 0 : error.name,
            path: error === null || error === void 0 ? void 0 : error.path,
            type: error === null || error === void 0 ? void 0 : error.kind,
            message: error === null || error === void 0 ? void 0 : error.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Cast Error: Invalid ID',
        errorSources,
    };
};
exports.default = handleCastError;