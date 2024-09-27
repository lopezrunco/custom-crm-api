"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../../config/logging"));
const sale_1 = __importDefault(require("../../models/sale"));
module.exports = (req, res) => {
    const pagination = { offset: 0, limit: 10 };
    const page = parseInt(req.query.page, 10);
    const itemsPerPage = parseInt(req.query.itemsPerPage, 10);
    if (page && itemsPerPage) {
        (pagination.offset = (page - 1) * itemsPerPage),
            (pagination.limit = itemsPerPage);
    }
    sale_1.default.find()
        .skip(pagination.offset)
        .limit(pagination.limit)
        .then((sales) => {
        sale_1.default.countDocuments()
            .then((count) => {
            const meta = { count };
            res.status(200).json({ meta, sales });
        })
            .catch((error) => {
            logging_1.default.error(`Error: ${error}`);
            res
                .status(500)
                .json({ message: "Error trying to list the sales." });
        });
    })
        .catch((error) => {
        logging_1.default.error(`Error: ${error}`);
        res.status(500).json({ message: "Error trying to list the sales." });
    });
};
//# sourceMappingURL=getAll.js.map