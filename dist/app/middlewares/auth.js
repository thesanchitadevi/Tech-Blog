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
const http_status_ts_1 = require("http-status-ts");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = require("../errors/AppError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/user/user.model");
const CustomeErrors_1 = require("../errors/CustomeErrors");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        // checking if the token is missing
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new CustomeErrors_1.AuthorizationError(http_status_ts_1.HttpStatus.UNAUTHORIZED, 'No authorization token provided');
        }
        const token = authHeader.split(' ')[1];
        // checking if the token is valid
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        // checking if the token is valid
        if (!token || !decoded) {
            throw new CustomeErrors_1.AuthenticationError(http_status_ts_1.HttpStatus.UNAUTHORIZED, 'Invalid token provided');
        }
        const { role, userId, exp } = decoded;
        // Check if token is expired
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (exp && exp < currentTimestamp) {
            throw new CustomeErrors_1.AuthenticationError(http_status_ts_1.HttpStatus.UNAUTHORIZED, 'Token has expired');
        }
        // check if the user is exists
        const user = yield user_model_1.UserModel.findById(userId);
        if (!user) {
            throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, 'User not found !');
        }
        // checking if the user is blocked
        const userStatus = user === null || user === void 0 ? void 0 : user.isBlocked;
        if (userStatus === true) {
            throw new AppError_1.AppError(http_status_ts_1.HttpStatus.FORBIDDEN, 'This user is blocked ! !');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.AppError(http_status_ts_1.HttpStatus.FORBIDDEN, 'You are not allowed to access this resource!');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
