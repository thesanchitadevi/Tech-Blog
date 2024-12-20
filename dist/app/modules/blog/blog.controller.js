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
exports.blogControllers = void 0;
const http_status_ts_1 = require("http-status-ts");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const blog_service_1 = require("./blog.service");
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // user details are stored in req.user
    const user = req.user;
    const blog = yield blog_service_1.blogServices.createBlogIntoDB(Object.assign(Object.assign({}, req.body), { author: user.userId }));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.CREATED,
        success: true,
        message: 'Blog created successfully',
        data: {
            _id: blog._id,
            title: blog.title,
            content: blog.content,
            author: blog.author,
        },
    });
}));
const getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_service_1.blogServices.getBlogsFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: 'Blogs fetched successfully',
        data: blogs.map((blog) => ({
            _id: blog._id,
            title: blog.title,
            content: blog.content,
            author: blog.author,
        })),
    });
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user; // Extract user ID from authenticated user
    const { id: blogId } = req.params;
    const blog = yield blog_service_1.blogServices.updateBlogInDB(blogId, user.userId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: 'Blog updated successfully',
        data: {
            _id: blog === null || blog === void 0 ? void 0 : blog._id,
            title: blog === null || blog === void 0 ? void 0 : blog.title,
            content: blog === null || blog === void 0 ? void 0 : blog.content,
            author: blog === null || blog === void 0 ? void 0 : blog.author,
        },
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user; // Extract user ID from authenticated user
    const { id: blogId } = req.params;
    yield blog_service_1.blogServices.deleteBlogFromDB(blogId, user.userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Blog deleted successfully',
        statusCode: http_status_ts_1.HttpStatus.OK,
    });
}));
exports.blogControllers = {
    createBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog,
};
