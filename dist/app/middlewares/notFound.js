"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_ts_1 = require("http-status-ts");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFound = (_req, res, _next) => {
    res.status(http_status_ts_1.HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Not Found Error',
        error: {
            details: 'The requested resource was not found',
        },
    });
};
exports.default = notFound;
