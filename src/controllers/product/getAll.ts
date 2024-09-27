import logging from "../../config/logging";
import { RequestType, ResponseType } from "common";

import Product from "../../models/product";

module.exports = (req: RequestType, res: ResponseType) => {
  const pagination = { offset: 0, limit: 10 };
  const page = parseInt(req.query.page as string, 10);
  const itemsPerPage = parseInt(req.query.itemsPerPage as string, 10);

  if (page && itemsPerPage) {
    (pagination.offset = (page - 1) * itemsPerPage),
      (pagination.limit = itemsPerPage);
  }

  Product.find()
    .skip(pagination.offset)
    .limit(pagination.limit)
    .then((products) => {
      Product.countDocuments()
        .then((count) => {
          const meta = { count };
          res.status(200).json({ meta, products });
        })
        .catch((error: Error) => {
          logging.error(`Error: ${error}`);
          res
            .status(500)
            .json({ message: "Error trying to list the products." });
        });
    })
    .catch((error: Error) => {
      logging.error(`Error: ${error}`);
      res.status(500).json({ message: "Error trying to list the products." });
    });
};
