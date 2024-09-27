const PDFDocument =  require("pdfkit");
import { PassThrough } from "stream";

import logging from "../../config/logging";
import { RequestType, ResponseType } from "common";
import Sale from "../../models/sale";

module.exports = async (req: RequestType, res: ResponseType) => {
    try {
        const sale = await Sale.findOne({ _id: req.params.id })
        if (!sale) {
            return res.status(404).json({
                message: `Sale ${req.params.id} not found.`
            })
        }

        // Create a new PDF document.
        const doc = new PDFDocument()

        // Create a PassThrough stream in Node, which is a type of stream 
        // that passes the data it receives to its output.
        const passThrough = new PassThrough()

        // Set the response headers to say the client's browser how to handle the response, in this case, a PDF file.
        res.setHeader('Content-Disposition', `attachment; filename=sale-${sale._id}.pdf`);
        res.setHeader('Content-Type', 'application/pdf');

        // Pipe the PDF document to the response.
        doc.pipe(passThrough) // Tell the doc stream to send its output to the passThrough stream.
        passThrough.pipe(res) // Connect the passThrough stream to the HTTP response object.

        // Add content to the PDF.
        doc.fontSize(20).text('Reporte de la venta', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Id de la venta: ${sale._id}`);
        doc.text(`ID del comprador: ${sale.customerId}`);
        doc.text(`ID del vendedor: ${sale.sellerId}`);
        doc.text(`Metodo de pago: ${sale.paymentMethod}`);
        doc.text(`Moneda: ${sale.currency}`);
        doc.text(`Precio total: ${sale.price}`);
        doc.text(`Commisión: ${sale.commission}`);
        doc.text(`Delivery: Desde ${sale.delivery.fromTimestamp} a ${sale.delivery.toTimestamp}`);
        doc.text(`Instalador: ${sale.delivery.installer}`);
        doc.text(`Productos: ${sale.products}`);
        doc.text(`Beneficios: ${sale.benefit}`);
        doc.text(`Observaciones: ${sale.observations}`);
        doc.text('Este es un texto de ejemplo.');

        // Finalize the PDF and end the stream.
        doc.end()
    } catch (error) {
        logging.error(`Error: ${error}`);
        res.status(500).json({ message: `Error trying to generate the PDF for the sale ${req.params.id}.` });
    }
}
