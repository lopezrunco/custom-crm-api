"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../../config/logging"));
const sale_1 = __importDefault(require("../../models/sale"));
module.exports = (req, res) => {
    sale_1.default.findOneAndDelete({ _id: req.params.id })
        .then(() => {
        res.status(200).json({
            message: `Sale with id ${req.params.id} successfully deleted.`
        })
            .end();
    })
        .catch((error) => {
        logging_1.default.error(`Error: ${error}`);
        res.status(500).json({
            message: "Error trying to delete the sale.",
        });
    });
};
//# sourceMappingURL=delete.js.map