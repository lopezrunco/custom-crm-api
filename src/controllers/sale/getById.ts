import logging from "../../config/logging";
import { RequestType, ResponseType } from "common";

import Sale from "../../models/sale";

module.exports = (req: RequestType, res: ResponseType) => {
  Sale.findOne({ _id: req.params.id })
    .then((sale) => {
      res.status(200).json({ sale });
    })
    .catch((error: Error) => {
      logging.error(`Error: ${error}`);
      res.status(500).json({
        message: "Error trying to get the sale.",
      });
    });
};
