import logging from "../../config/logging";
import { RequestType, ResponseType } from "common";

import { getDateString } from "../../utils/getDateString";
import { getPaymentMethodString } from "../../utils/getPatmentMethodString";

import Sale from "../../models/sale";

module.exports = (req: RequestType, res: ResponseType) => {
  Sale.findOne({ _id: req.params.id })
    .then((sale) => {
      if (!sale)
        return res.status(404).json({
          message: `Sale with id ${req.params.id} not found`,
        });

      // Format delivery dates.
      const formattedDelivery = {
        from: getDateString(sale.delivery.fromTimestamp),
        to: getDateString(sale.delivery.toTimestamp),
        installer: sale.delivery.installer,
      }

      // Create new sale object with the formatted info.
      const formattedSale = {
        ...sale.toObject(), // Convert Mongoose document to plain object.
        paymentMethod: getPaymentMethodString(sale.paymentMethod),
        delivery: formattedDelivery
      }

      res.status(200).json({ formattedSale });
    })
    .catch((error: Error) => {
      logging.error(`Error: ${error}`);
      res.status(500).json({
        message: "Error trying to get the sale.",
      });
    });
};
