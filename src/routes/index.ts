import { Express } from "express";

import userRoutes from './user'
import productRoutes from './product'

import { RequestType, ResponseType } from 'common'

export const routes = (app: Express) => {
  app.get("/", (req: RequestType, res: ResponseType) => {
    res.send("TypeScript API running.");
  });
  
  app.use('/users/', userRoutes)
  app.use('/products/', productRoutes)
};
