import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

require("dotenv").config();

import logging from "./config/logging";
import { getDbConnectionString } from "./utils/getDBConnectionString";
import { routes } from "./routes";
import { loggingMiddleware } from "./middlewares/loggingMiddleware";

const app: Express = express();

app.use(cors({
  origin: 'https://tecmedios.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(loggingMiddleware);

app.use(bodyParser.json());

routes(app);

const port = process.env.PORT || 3000;

mongoose
  .connect(getDbConnectionString())
  .then(() => {
    app.listen(port);
    logging.info(`Server is listening on http://localhost:${port}`);
    logging.info("Connected to database.");
  })
  .catch((error) => {
    logging.error("Could not connect to the database => ", error);
  });
  