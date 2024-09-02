import { Router } from "express";

import { RequestType, ResponseType } from "common";

const register = require("../controllers/user/register");
const login = require("../controllers/user/login");

const userRouter = Router();

userRouter.get("/", (req: RequestType, res: ResponseType) => {
  res.send("User list");
});

userRouter.post("/register", register);
userRouter.post("/login", login);

export default userRouter;
