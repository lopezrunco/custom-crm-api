"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createProduct = require("../controllers/product/create");
const getAllProducts = require("../controllers/product/getAll");
const getProductById = require("../controllers/product/getById");
const deleteProduct = require("../controllers/product/delete");
const updateProduct = require("../controllers/product/update");
const productRouter = (0, express_1.Router)();
productRouter.post("/create", createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.delete("/:id", deleteProduct);
productRouter.put("/:id", updateProduct);
exports.default = productRouter;
//# sourceMappingURL=product.js.map