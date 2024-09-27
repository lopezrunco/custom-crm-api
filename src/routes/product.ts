import { Router } from "express";

const create = require("../controllers/product/create")
const getAll = require("../controllers/product/getAll");
const getById = require("../controllers/product/getById");

const productRouter = Router();

productRouter.post("/create", create)
productRouter.get("/", getAll);
productRouter.get("/:id", getById);

export default productRouter;
