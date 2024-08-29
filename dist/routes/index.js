"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const routes = (app) => {
    app.get("/", (req, res) => {
        res.send("TypeScript API running.");
    });
};
exports.routes = routes;
//# sourceMappingURL=index.js.map