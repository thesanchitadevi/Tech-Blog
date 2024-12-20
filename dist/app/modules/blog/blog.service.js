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
exports.blogServices = void 0;
const http_status_ts_1 = require("http-status-ts");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = require("../../errors/AppError");
const blog_constant_1 = require("./blog.constant");
const blog_model_1 = require("./blog.model");
const createBlogIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Create a new blog in the database
    const blog = yield blog_model_1.BlogModel.create(payload);
    // Populate the author field with name, email, and role
    const populatedBlog = yield blog.populate('author', '-password');
    return populatedBlog;
});
const getBlogsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // Get all blogs from the database
    const blogQuery = new QueryBuilder_1.default(blog_model_1.BlogModel.find().populate('author', '-password'), query)
        .search(blog_constant_1.BlogSearchableFields)
        .filter()
        .sortBy()
        .sortOrder()
        .paginate()
        .fields();
    const result = yield blogQuery.modelQuery;
    return result;
});
const updateBlogInDB = (blogId, userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the blog by ID
    const blog = yield blog_model_1.BlogModel.findById({ _id: blogId });
    // Check if the blog exists
    if (!blog) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, 'Blog not found');
    }
    // Check if the user is the author of the blog
    if (blog.author.toString() !== userId) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.FORBIDDEN, 'You are not allowed to update this blog');
    }
    // Update the blog
    const updateBlog = yield blog_model_1.BlogModel.findByIdAndUpdate(blogId, Object.assign({}, payload), {
        new: true,
        runValidators: true,
    }).populate('author', '-password');
    return updateBlog;
});
const deleteBlogFromDB = (blogId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the blog by ID
    const blog = yield blog_model_1.BlogModel.findById({ _id: blogId });
    // Check if the blog exists
    if (!blog) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, 'Blog not found');
    }
    // Check if the user is the author of the blog
    if (blog.author.toString() !== userId) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.FORBIDDEN, 'You are not allowed to delete this blog');
    }
    // Delete the blog
    const deletedBlog = yield blog_model_1.BlogModel.findByIdAndDelete(blogId);
    return deletedBlog;
});
exports.blogServices = {
    createBlogIntoDB,
    getBlogsFromDB,
    updateBlogInDB,
    deleteBlogFromDB,
};
