"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../../config/logging"));
const sale_1 = __importDefault(require("../../models/sale"));
module.exports = (req, res) => {
    sale_1.default.findOne({ _id: req.params.id })
        .then((sale) => {
        res.status(200).json({ sale });
    })
        .catch((error) => {
        logging_1.default.error(`Error: ${error}`);
        res.status(500).json({
            message: "Error trying to get the sale.",
        });
    });
};
//# sourceMappingURL=getById.js.map