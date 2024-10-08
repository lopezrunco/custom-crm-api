"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatProduct = void 0;
const formatProduct = (productId, product, defaultName = "Desconocido") => {
    return {
        _id: productId,
        name: product ? product.name : defaultName,
        currency: product ? product.currency : defaultName,
        price: product ? product.price : defaultName
    };
};
exports.formatProduct = formatProduct;
//# sourceMappingURL=formatProduct.js.map