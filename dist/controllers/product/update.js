"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../../config/logging"));
const product_1 = __importDefault(require("../../models/product"));
module.exports = (req, res) => {
    product_1.default.findOne({ _id: req.params.id })
        .then((product) => {
        product.set(req.body);
        product.save().then(() => {
            res.status(200).json({
                message: `Product with id ${req.params.id} successfully updated.`
            })
                .end();
        }).catch((error) => {
            logging_1.default.error(`Error: ${error}`);
            res.status(500).json({
                message: "Error trying to update the product.",
            });
        });
    }).catch((error) => {
        logging_1.default.error(`Error: ${error}`);
        res.status(500).json({
            message: "Error trying to update the product.",
        });
    });
};
//# sourceMappingURL=update.js.map