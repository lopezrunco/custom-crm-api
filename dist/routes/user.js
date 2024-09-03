"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register = require("../controllers/user/register");
const login = require("../controllers/user/login");
const getAll = require("../controllers/user/getAll");
const getById = require("../controllers/user/getById");
const userRouter = (0, express_1.Router)();
userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.get("/", getAll);
userRouter.get("/:id", getById);
exports.default = userRouter;
//# sourceMappingURL=user.js.map