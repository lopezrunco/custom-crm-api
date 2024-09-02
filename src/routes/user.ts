import { Router, Request, Response } from "express";

const register = require('../controllers/user/register')

type RequestType = Request;
type ResponseType = Response;

const userRouter = Router();

userRouter.get('/', (req: RequestType, res: ResponseType) => {
  res.send('User list');
});

userRouter.post('/register', register)

export default userRouter;
