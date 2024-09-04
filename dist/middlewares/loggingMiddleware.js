"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = void 0;
const logging_1 = __importDefault(require("../config/logging"));
// This middleware logs requests & responses (Useful for monitoring and debugging purposes).
const loggingMiddleware = (req, res, next) => {
    logging_1.default.info(`METHOD: '${req.method}' - URL: '${req.url}' - IP: '${req.socket.remoteAddress}'`);
    res.on('finish', () => {
        logging_1.default.info(`METHOD: '${req.method}' - URL: '${req.url}' - IP: '${req.socket.remoteAddress}' - STATUS: '${res.statusCode}'`);
    });
    next();
};
exports.loggingMiddleware = loggingMiddleware;
//# sourceMappingURL=loggingMiddleware.js.map