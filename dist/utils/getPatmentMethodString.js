"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentMethodString = void 0;
const paymentMethods = new Map([
    ["DEBIT", "Débito"],
    ["CREDIT", "Crédito"],
    ["CASH", "Efectivo"],
    ["CHECK", "Cheque"],
    ["MOBILE", "Celular"],
    ["MERCADOPAGO", "Mercado Pago"],
    ["TRANSFER", "Transferencia"],
]);
const getPaymentMethodString = (paymentMethod) => {
    // Look for the payment method value by key, if not found return the provided paymentMethod.
    return paymentMethods.get(paymentMethod) || paymentMethod;
};
exports.getPaymentMethodString = getPaymentMethodString;
//# sourceMappingURL=getPatmentMethodString.js.map