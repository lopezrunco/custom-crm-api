"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../../config/logging"));
const getDateString_1 = require("../../utils/getDateString");
const getPatmentMethodString_1 = require("../../utils/getPatmentMethodString");
const sale_1 = __importDefault(require("../../models/sale"));
const user_1 = __importDefault(require("../../models/user"));
// TODO: Obtain product names and return it alongside the id.
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the sale by ID.
        const sale = yield sale_1.default.findOne({ _id: req.params.id });
        if (!sale)
            return res.status(404).json({
                message: `Sale with id ${req.params.id} not found`,
            });
        // Find users by ID and get the name.
        const [installer, customer, seller] = yield Promise.all([
            user_1.default.findById(sale.delivery.installer).select("name"),
            user_1.default.findById(sale.customerId).select("name"),
            user_1.default.findById(sale.sellerId).select("name"),
        ]);
        // Format delivery dates.
        const formattedDelivery = {
            from: (0, getDateString_1.getDateString)(sale.delivery.fromTimestamp),
            to: (0, getDateString_1.getDateString)(sale.delivery.toTimestamp),
            installer: installer ? installer : null,
        };
        // Create new sale object with the formatted info.
        const formattedSale = Object.assign(Object.assign({}, sale.toObject()), { paymentMethod: (0, getPatmentMethodString_1.getPaymentMethodString)(sale.paymentMethod), delivery: formattedDelivery, customer: customer ? customer : null, seller: seller ? seller : null });
        // Remove customerId and sellerId from formattedSale.
        delete formattedSale.customerId;
        delete formattedSale.sellerId;
        res.status(200).json({ formattedSale });
    }
    catch (error) {
        logging_1.default.error(`Error: ${error}`);
        res.status(500).json({
            message: "Error trying to get the sale.",
        });
    }
});
//# sourceMappingURL=getFormattedById.js.map