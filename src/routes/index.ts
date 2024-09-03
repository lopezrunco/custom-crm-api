import { Express } from "express";

import userRoutes from './user'

import { RequestType, ResponseType } from 'common'

export const routes = (app: Express) => {
  app.get("/", (req: RequestType, res: ResponseType) => {
    res.send("TypeScript API running.");
  });
  
  app.use('/users/', userRoutes)
};
