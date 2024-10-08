import logging from "../../config/logging";
import { RequestType, ResponseType } from "common";

import { getDateString } from "../../utils/getDateString";
import { getPaymentMethodString } from "../../utils/getPatmentMethodString";

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

    const userPromises = [
      User.findById(sale.delivery.installer).select("name"),
      User.findById(sale.customerId).select("name"),
      User.findById(sale.sellerId).select("name"),
    ]

    // Find users by ID and get the name.
    const [installer, customer, seller] = await Promise.all(userPromises);

    // Format users and prevent not fould errors.
    const formattedInstaller = installer 
      ? { _id: installer._id, name: installer.name } 
      : { _id: sale.delivery.installer, name: "Instalador desconocido" }

    const formattedCustomer = customer 
      ? { _id: customer._id, name: customer.name } 
      : { _id: sale.customerId, name: "Cliente desconocido" }

    const formattedSeller = seller 
      ? { _id: seller._id, name: seller.name } 
      : { _id: sale.sellerId, name: "Vendedor desconocido" }

    // Find products by ID and get the required info.
    const productPromises = sale.products.map(async (productId) => {
      const product = await Product.findById(productId).select("name currency price")

      // Format product and prevent not found errors.
      return {
        _id: productId,
        name: product ? product.name : "Producto desconocido.",
        currency: product ? product.currency : "Moneda desconocida.",
        price: product ? product.price : "Precio desconocido."
      }
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
