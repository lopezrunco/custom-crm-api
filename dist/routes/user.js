"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register = require("../controllers/user/register");
const login = require("../controllers/user/login");
const getAll = require("../controllers/user/getAll");
const userRouter = (0, express_1.Router)();
userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.get("/", getAll); // TO DO: user credentials middleware
exports.default = userRouter;
//# sourceMappingURL=user.js.map