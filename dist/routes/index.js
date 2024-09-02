"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const userRoutes_1 = __importDefault(require("./userRoutes"));
const routes = (app) => {
    app.get("/", (req, res) => {
        res.send("TypeScript API running.");
    });
    app.get("/ping", (_req, res) => {
        return res.send("pong");
    });
    app.use('/users/', userRoutes_1.default);
};
exports.routes = routes;
//# sourceMappingURL=index.js.map