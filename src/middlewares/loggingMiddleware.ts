import { RequestType, ResponseType } from "common";
import { NextFunction } from "express";
import logging from "../config/logging";

// This middleware logs requests & responses (Useful for monitoring and debugging purposes).
export const loggingMiddleware = (req: RequestType, res: ResponseType, next: NextFunction) => {
    logging.info(`METHOD: '${req.method}' - URL: '${req.url}' - IP: '${req.socket.remoteAddress}'`);

    res.on('finish', () => {
        logging.info(`METHOD: '${req.method}' - URL: '${req.url}' - IP: '${req.socket.remoteAddress}' - STATUS: '${res.statusCode}'`);
    });

    next();
};