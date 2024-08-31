import { Express, Request, Response } from "express";

type RequestType = Request;
type ResponseType = Response;

export const routes = (app: Express) => {
  app.get("/", (req: RequestType, res: ResponseType) => {
    res.send("TypeScript API running.");
  });
  
  app.get("/ping", (_req: Request, res: Response) => {
    return res.send("pong");
  });
};
