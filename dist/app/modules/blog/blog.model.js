"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
const mongoose_1 = require("mongoose");
const BlogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.BlogModel = (0, mongoose_1.model)('Blog', BlogSchema);
