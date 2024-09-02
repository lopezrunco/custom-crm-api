import { Express, Request, Response } from "express";

import userRoutes from './user'

import { RequestType, ResponseType } from 'common'

export const routes = (app: Express) => {
  app.get("/", (req: RequestType, res: ResponseType) => {
    res.send("TypeScript API running.");
  });
  
  app.get("/ping", (_req: Request, res: Response) => {
    return res.send("pong");
  });

  app.use('/users/', userRoutes)
};
