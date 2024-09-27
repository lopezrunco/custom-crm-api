import { Router } from "express";

const userRegister = require("../controllers/user/register");
const userLogin = require("../controllers/user/login");
const getAllUsers = require("../controllers/user/getAll");
const getUserById = require("../controllers/user/getById");

const userRouter = Router();

userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);
userRouter.get("/", getAllUsers); 
userRouter.get("/:id", getUserById); 

export default userRouter;
