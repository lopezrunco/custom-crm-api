import { Router } from "express";

const register = require("../controllers/user/register");
const login = require("../controllers/user/login");
const getAll = require("../controllers/user/getAll");
const getById = require("../controllers/user/getById");

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.get("/", getAll); 
userRouter.get("/:id", getById); 

export default userRouter;
