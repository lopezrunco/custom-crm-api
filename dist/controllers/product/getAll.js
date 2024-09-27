"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../../config/logging"));
const product_1 = __importDefault(require("../../models/product"));
module.exports = (req, res) => {
    const pagination = { offset: 0, limit: 10 };
    const page = parseInt(req.query.page, 10);
    const itemsPerPage = parseInt(req.query.itemsPerPage, 10);
    if (page && itemsPerPage) {
        (pagination.offset = (page - 1) * itemsPerPage),
            (pagination.limit = itemsPerPage);
    }
    product_1.default.find()
        .skip(pagination.offset)
        .limit(pagination.limit)
        .then((products) => {
        product_1.default.countDocuments()
            .then((count) => {
            const meta = { count };
            res.status(200).json({ meta, products });
        })
            .catch((error) => {
            logging_1.default.error(`Error: ${error}`);
            res
                .status(500)
                .json({ message: "Error trying to list the products." });
        });
    })
        .catch((error) => {
        logging_1.default.error(`Error: ${error}`);
        res.status(500).json({ message: "Error trying to list the products." });
    });
};
//# sourceMappingURL=getAll.js.map