"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setContentInPdf = void 0;
const getDateString_1 = require("./getDateString");
const getPatmentMethodString_1 = require("./getPatmentMethodString");
const setContentInPdf = (doc, sale) => {
    // Add content to the PDF in a table format
    const tableStartX = 50; // Starting X position
    const tableStartY = 80; // Starting Y position
    const rowHeight = 30; // Height of each row
    const columnWidth1 = 150; // Width of the first column
    const columnWidth2 = 350; // Width of the second column
    // Title
    doc.fontSize(20).text("Reporte de la venta", { align: "center" });
    doc.moveDown();
    // Draw a line under the header
    doc
        .moveTo(tableStartX, tableStartY + rowHeight)
        .lineTo(tableStartX + columnWidth1 + columnWidth2, tableStartY + rowHeight)
        .stroke();
    // Increment Y position for the first row
    let currentY = tableStartY + rowHeight + 10;
    // Add rows
    const rows = [
        { field: "ID de la venta:", value: sale._id },
        { field: "ID del comprador:", value: sale.customerId },
        { field: "ID del vendedor:", value: sale.sellerId },
        { field: "Método de pago:", value: (0, getPatmentMethodString_1.getPaymentMethodString)(sale.paymentMethod) },
        { field: `Precio total (${sale.currency}):`, value: sale.price },
        { field: `Comisión (${sale.currency}):`, value: sale.commission },
        {
            field: "Envío:",
            value: `Desde ${(0, getDateString_1.getDateString)(sale.delivery.fromTimestamp)} a ${(0, getDateString_1.getDateString)(sale.delivery.toTimestamp)}`,
        },
        { field: "ID del Instalador:", value: sale.delivery.installer },
        { field: "ID de productos:", value: sale.products.join(", ") },
        { field: "Beneficios:", value: sale.benefit },
        { field: "Observaciones:", value: sale.observations },
    ];
    // Draw each row
    rows.forEach((row) => {
        doc.fontSize(12).text(row.field, tableStartX, currentY);
        doc.text(row.value, tableStartX + columnWidth1, currentY);
        currentY += rowHeight; // Move down for the next row
    });
    return doc;
};
exports.setContentInPdf = setContentInPdf;
//# sourceMappingURL=setContentInPdf.js.map