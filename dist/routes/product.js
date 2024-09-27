"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create = require("../controllers/product/create");
const getAll = require("../controllers/product/getAll");
const getById = require("../controllers/product/getById");
const productRouter = (0, express_1.Router)();
productRouter.post("/create", create);
productRouter.get("/", getAll);
productRouter.get("/:id", getById);
exports.default = productRouter;
//# sourceMappingURL=product.js.map