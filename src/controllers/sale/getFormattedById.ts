import logging from "../../config/logging";
import { RequestType, ResponseType } from "common";

import { getDateString } from "../../utils/getDateString";
import { getPaymentMethodString } from "../../utils/getPatmentMethodString";

import Sale from "../../models/sale";
import User from "../../models/user";

// TODO: Obtain product names and return it alongside the id.

module.exports = async (req: RequestType, res: ResponseType) => {
  try {
    // Find the sale by ID.
    const sale = await Sale.findOne({ _id: req.params.id });
    if (!sale)
      return res.status(404).json({
        message: `Sale with id ${req.params.id} not found`,
      });

    // Find users by ID and get the name.
    const [installer, customer, seller] = await Promise.all([
      User.findById(sale.delivery.installer).select("name"),
      User.findById(sale.customerId).select("name"),
      User.findById(sale.sellerId).select("name"),
    ]);

    // Format delivery dates.
    const formattedDelivery = {
      from: getDateString(sale.delivery.fromTimestamp),
      to: getDateString(sale.delivery.toTimestamp),
      installer: installer ? installer : null,
    };

    // Create new sale object with the formatted info.
    const formattedSale = {
      ...sale.toObject(), // Convert Mongoose document to plain object.
      paymentMethod: getPaymentMethodString(sale.paymentMethod),
      delivery: formattedDelivery,
      customer: customer ? customer : null,
      seller: seller ? seller : null,
    };

    // Remove customerId and sellerId from formattedSale.
    delete formattedSale.customerId;
    delete formattedSale.sellerId;

    res.status(200).json({ formattedSale });
  } catch (error) {
    logging.error(`Error: ${error}`);
    res.status(500).json({
      message: "Error trying to get the sale.",
    });
  }
};
