"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRegister = require("../controllers/user/register");
const userLogin = require("../controllers/user/login");
const getAllUsers = require("../controllers/user/getAll");
const getUserById = require("../controllers/user/getById");
const userRouter = (0, express_1.Router)();
userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
exports.default = userRouter;
//# sourceMappingURL=user.js.map