import { Router } from "express";

const getAll = require("../controllers/product/getAll");

const productRouter = Router();

productRouter.get("/", getAll);

export default productRouter;
