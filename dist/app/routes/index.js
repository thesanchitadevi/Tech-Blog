"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/user/user.routes");
const blog_routes_1 = require("../modules/blog/blog.routes");
const router = (0, express_1.Router)();
// Application routes
const moduleRoutes = [
    {
        path: '/auth',
        module: auth_routes_1.AuthRouter,
    },
    {
        path: '/admin',
        module: user_routes_1.UserRouter,
    },
    {
        path: '/blogs',
        module: blog_routes_1.BlogRouter,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.module);
});
exports.default = router;
