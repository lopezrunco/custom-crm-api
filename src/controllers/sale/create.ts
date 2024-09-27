const Joi = require("joi");

import logging from "../../config/logging";
import { RequestType, ResponseType } from "common";

import Sale from "../../models/sale";

module.exports = (req: RequestType, res: ResponseType) => {
  const sale = req.body;

  const schema = Joi.object({
    customerId: Joi.string().length(24).hex().required(),
    sellerId: Joi.string().length(24).hex().required(),
    paymentMethod: Joi.string()
      .valid(
        "DEBIT",
        "CREDIT",
        "CASH",
        "CHECK",
        "MOBILE",
        "MERCADOPAGO",
        "TRANSFER"
      )
      .required(),
    currency: Joi.string().valid("UYU", "USD").required(),
    price: Joi.number().required(),
    commission: Joi.number().required(),
    delivery: Joi.object({
      fromTimestamp: Joi.date().required(),
      toTimestamp: Joi.date().required(),
      installer: Joi.string().length(24).hex(),
    }).required(),
    products: Joi.array().items(Joi.string().length(24).hex()).required(),
    benefit: Joi.string().optional(),
    observations: Joi.string().optional(),
  });

  const validationResult = schema.validate(sale);

  if (!validationResult.error) {
    const { fromTimestamp, toTimestamp, installer } = sale.delivery || {};

    Sale.create({
      customerId: sale.customerId,
      sellerId: sale.sellerId,
      paymentMethod: sale.paymentMethod,
      currency: sale.currency,
      price: sale.price,
      commission: sale.commission,
      delivery: {
        fromTimestamp: fromTimestamp,
        toTimestamp: toTimestamp,
        installer: installer,
      },
      products: sale.products,
      benefit: sale.benefit,
      observations: sale.observations,
    })
      .then((sale) => {
        res.status(200).json({
          message: `Sale with id ${sale._id} created.`,
        });
      })
      .catch((error: Error) => {
        res.status(500).json({
          message: `Could not create the new sale: ${error}`,
        });
      });
  } else {
    logging.error(`Error: ${validationResult.error}`);
    res.status(400).json({ message: validationResult.error });
  }
};
