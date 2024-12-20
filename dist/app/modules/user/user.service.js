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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const http_status_ts_1 = require("http-status-ts");
const AppError_1 = require("../../errors/AppError");
const user_model_1 = require("./user.model");
const blog_model_1 = require("../blog/blog.model");
// Block a user from the database
const blockUserHandleFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findByIdAndUpdate({
        _id: userId,
        role: 'user',
    }, { isBlocked: true }, { new: true });
    if (!user) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, 'User not found');
    }
    return user;
});
// Admin can delete any blog from the database
const deleteBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.BlogModel.findByIdAndDelete({ _id: id });
    if (!blog) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, 'Blog not found');
    }
    return blog;
});
exports.userServices = {
    blockUserHandleFromDB,
    deleteBlogFromDB,
};