"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const http_status_ts_1 = require("http-status-ts");
const AppError_1 = require("../../errors/AppError");
const user_model_1 = require("../user/user.model");
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("./auth.utils");
// Register a new user in the database
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the email is already taken
    if (yield user_model_1.UserModel.isEmailTaken(payload.email)) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.BAD_REQUEST, 'Email is already taken');
    }
    const user = yield user_model_1.UserModel.create(payload);
    return user;
});
// Login a user and generate access and refresh tokens
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ email: payload.email });
    // Check if the user exists
    if (!user) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, 'User not found');
    }
    // Check if the user is blocked
    if (user.isBlocked) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.FORBIDDEN, 'User is blocked');
    }
    // Check if the password is matched
    const isPasswordMatched = yield user_model_1.UserModel.isPasswordMatched(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.UNAUTHORIZED, 'Invalid credentials');
    }
    // JWT payload
    const jwtPayload = {
        userId: user._id,
        role: user.role,
    };
    // access token
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        user,
        accessToken,
    };
});
exports.authServices = {
    registerUser,
    loginUser,
};
