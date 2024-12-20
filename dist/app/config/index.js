"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    database_url: process.env.DATABASE_URL,
    bycrpt_salt: process.env.BCRYPT_SALT,
    default_password: process.env.DEFAULT_PASS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
};
