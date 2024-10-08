import logging from "../../config/logging";
import { RequestType, ResponseType } from "common";

import { getDateString } from "../../utils/getDateString";
import { getPaymentMethodString } from "../../utils/getPatmentMethodString";
import { formatUser } from "../../utils/formatUser";
import { formatProduct } from "../../utils/formatProduct";

import Sale from "../../models/sale";
import User from "../../models/user";
import Product from "../../models/product";

module.exports = async (req: RequestType, res: ResponseType) => {
  try {
    // Find the sale by ID.
    const sale = await Sale.findOne({ _id: req.params.id });
    if (!sale)
      return res.status(404).json({
        message: `Sale with id ${req.params.id} not found`,
      });

    // Find users by ID, get the name, format and handle errors.
    const [installer, customer, seller] = await Promise.all([
      User.findById(sale.delivery.installer).select("name"),
      User.findById(sale.customerId).select("name"),
      User.findById(sale.sellerId).select("name"),
    ]);
    const formattedInstaller = formatUser(installer, sale.delivery.installer)
    const formattedCustomer = formatUser(customer, sale.customerId)
    const formattedSeller = formatUser(seller, sale.sellerId)

    // Find products by ID, get the info, format and handle errors.
    const productPromises = sale.products.map(async (productId) => {
      const product = await Product.findById(productId).select("name currency price")
      return formatProduct(productId, product)
    })
    const products = await Promise.all(productPromises)

    // Format delivery dates.
    const formattedDelivery = {
      from: getDateString(sale.delivery.fromTimestamp),
      to: getDateString(sale.delivery.toTimestamp),
      installer: formattedInstaller,
    };

    // Create new sale object with the formatted info.
    const formattedSale = {
      ...sale.toObject(), // Convert Mongoose document to plain object.
      paymentMethod: getPaymentMethodString(sale.paymentMethod),
      delivery: formattedDelivery,
      customer: formattedCustomer,
      seller: formattedSeller,
      products: products
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
