import { Router } from "express";

const createSale = require("../controllers/sale/create");
const getAllSales = require("../controllers/sale/getAll");
const getSaleById = require("../controllers/sale/getById");
const generateSalePDF = require("../controllers/sale/generatePDF");
const deleteSale = require("../controllers/sale/delete");
const updateSale = require("../controllers/sale/update");

const saleRouter = Router();

saleRouter.post("/create", createSale);
saleRouter.get("/", getAllSales);
saleRouter.get("/:id", getSaleById);
saleRouter.get("/:id/pdf", generateSalePDF)
saleRouter.delete("/:id", deleteSale);
saleRouter.put("/:id", updateSale);

export default saleRouter;
