import { Router } from "express";

const register = require("../controllers/user/register");
const login = require("../controllers/user/login");
const getAll = require("../controllers/user/getAll");

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.get("/", getAll); // TO DO: user credentials middleware

export default userRouter;
