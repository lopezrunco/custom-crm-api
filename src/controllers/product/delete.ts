import logging from "../../config/logging";
import { RequestType, ResponseType } from "common";

import Product from "../../models/product";

module.exports = (req: RequestType, res: ResponseType) => {
    Product.findOneAndDelete({ _id: req.params.id })
        .then(() => {
            res.status(200).json({
                message: `Product with id ${req.params.id} successfully deleted.`
            })
            .end()
        })
        .catch((error: Error) => {
            logging.error(`Error: ${error}`);
            res.status(500).json({
                message: "Error trying to delete the product.",
            });
        })
}