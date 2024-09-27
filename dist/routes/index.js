"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const user_1 = __importDefault(require("./user"));
const product_1 = __importDefault(require("./product"));
const routes = (app) => {
    app.get("/", (req, res) => {
        res.send("TypeScript API running.");
    });
    app.use('/users/', user_1.default);
    app.use('/products/', product_1.default);
};
exports.routes = routes;
//# sourceMappingURL=index.js.map