"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.createUserValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: 'Name is required',
    })
        .min(3)
        .max(255),
    email: zod_1.z
        .string({
        required_error: 'Email is required',
    })
        .email({
        message: 'Invalid email',
    }),
    password: zod_1.z
        .string({
        required_error: 'Password is required',
    })
        .min(6)
        .max(255),
    role: zod_1.z.enum(['admin', 'user']).default('user'),
    isBlocked: zod_1.z.boolean(),
});
exports.UserValidation = {
    createUserValidationSchema: exports.createUserValidationSchema,
};
