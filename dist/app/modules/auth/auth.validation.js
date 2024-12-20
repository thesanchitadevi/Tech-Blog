"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = exports.loginUserSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
// User registration schema
exports.registerUserSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required',
    }),
    email: zod_1.z
        .string({
        required_error: 'Email is required',
    })
        .email('Invalid email format'),
    password: zod_1.z.string({
        required_error: 'Password is required',
    }),
});
// User login schema
exports.loginUserSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: 'Email is required',
    }),
    password: zod_1.z.string({
        required_error: 'Password is required',
    }),
});
exports.AuthValidation = {
    registerUserSchema: exports.registerUserSchema,
    loginUserSchema: exports.loginUserSchema,
};
