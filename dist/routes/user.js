"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register = require("../controllers/user/register");
const login = require("../controllers/user/login");
const userRouter = (0, express_1.Router)();
userRouter.get("/", (req, res) => {
    res.send("User list");
});
userRouter.post("/register", register);
userRouter.post("/login", login);
exports.default = userRouter;
//# sourceMappingURL=user.js.map