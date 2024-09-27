import { Router } from "express";

const getAll = require("../controllers/product/getAll");
const getById = require("../controllers/product/getById");

const productRouter = Router();

productRouter.get("/", getAll);
productRouter.get("/:id", getById);

export default productRouter;
