"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getAll = require("../controllers/product/getAll");
const productRouter = (0, express_1.Router)();
productRouter.get("/", getAll);
exports.default = productRouter;
//# sourceMappingURL=product.js.map