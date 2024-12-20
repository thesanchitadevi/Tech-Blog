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
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// Middleware - pre save hook
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Hash the password
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bycrpt_salt));
        next();
    });
});
// Middleware - post save hook
userSchema.post('save', function (doc, next) {
    // doc
    doc.password = '**********'; // Hide the password
    next();
});
userSchema.statics.isEmailTaken = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.UserModel.findOne({ email });
    });
};
userSchema.statics.isPasswordMatched = function (plainPassword, hashPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainPassword, hashPassword);
    });
};
exports.UserModel = (0, mongoose_1.model)('User', userSchema);