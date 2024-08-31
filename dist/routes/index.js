"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const routes = (app) => {
    app.get("/", (req, res) => {
        res.send("TypeScript API running.");
    });
    app.get("/ping", (_req, res) => {
        return res.send("pong");
    });
};
exports.routes = routes;
//# sourceMappingURL=index.js.map