"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../../config/logging"));
const getDateString_1 = require("../../utils/getDateString");
const getPatmentMethodString_1 = require("../../utils/getPatmentMethodString");
const sale_1 = __importDefault(require("../../models/sale"));
module.exports = (req, res) => {
    sale_1.default.findOne({ _id: req.params.id })
        .then((sale) => {
        if (!sale)
            return res.status(404).json({
                message: `Sale with id ${req.params.id} not found`,
            });
        // Format delivery dates.
        const formattedDelivery = {
            from: (0, getDateString_1.getDateString)(sale.delivery.fromTimestamp),
            to: (0, getDateString_1.getDateString)(sale.delivery.toTimestamp),
            installer: sale.delivery.installer,
        };
        // Create new sale object with the formatted info.
        const formattedSale = Object.assign(Object.assign({}, sale.toObject()), { paymentMethod: (0, getPatmentMethodString_1.getPaymentMethodString)(sale.paymentMethod), delivery: formattedDelivery });
        res.status(200).json({ formattedSale });
    })
        .catch((error) => {
        logging_1.default.error(`Error: ${error}`);
        res.status(500).json({
            message: "Error trying to get the sale.",
        });
    });
};
//# sourceMappingURL=getFormattedById.js.map