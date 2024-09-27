import { Router } from "express";

const createProduct = require("../controllers/product/create")
const getAllProducts = require("../controllers/product/getAll");
const getProductById = require("../controllers/product/getById");
const deleteProduct = require("../controllers/product/delete")
const updateProduct = require("../controllers/product/update")

const productRouter = Router();

productRouter.post("/create", createProduct)
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.delete("/:id", deleteProduct)
productRouter.put("/:id", updateProduct)

export default productRouter;
