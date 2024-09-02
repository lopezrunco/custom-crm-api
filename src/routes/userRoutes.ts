import { Router, Request, Response } from "express";

type RequestType = Request;
type ResponseType = Response;

const userRouter = Router();

userRouter.get('/', (req: RequestType, res: ResponseType) => {
  res.send('User list');
});

export default userRouter;
